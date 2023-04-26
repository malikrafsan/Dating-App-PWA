import { useToast } from "@chakra-ui/react";
import { getToken, MessagePayload, onMessage } from "firebase/messaging";
import React, { createContext, useContext, useEffect, useState } from "react";
import {Chat} from "../api";
import { messaging } from "../lib/firebase";
import { useAuth } from "./AuthProvider";

interface IMessagingProviderProps {
  children: React.ReactNode;
}

type MessagingContextType = {
  token: string;
};

const MessagingContext = createContext<MessagingContextType>({
  token: "",
});

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error("useMessaging must be used within a MessagingProvider");
  }

  return context;
};

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => resolve(payload));
  });

export const MessagingProvider = ({ children }: IMessagingProviderProps) => {
  const [token, setToken] = useState<string>("");
  const { token: accountToken } = useAuth();

  const toast = useToast();

  onMessageListener().then(payload => {
    console.log(payload);
  });

  useEffect(() => {
    if (accountToken) {
      navigator.serviceWorker.ready.then((registration) => {
        // Add event listener for "message"
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data.id === "refresh") {
            window.location.reload();
          }
        });
        // Get current FCM token
        getToken(messaging, { vapidKey: import.meta.env.VITE_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration })
          .then((currentToken) => {
            if (currentToken) {
              setToken(currentToken);
              Chat.upsertToken(currentToken);
            } else {
              console.log("No registration token available. Request permission to generate one.");
            }
          })
          .catch((err) => {
            // TODO: maksa user buat enable notif
            console.log("An error occurred while retrieving token. ", err);
            if (toast.isActive("notification-disabled")) {
              toast.update("notification-disabled", {
                title: "Notification Disabled",
                description: "Please enable notifications to receive updates realtime.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                id: "notification-disabled",
                title: "Notification Disabled",
                description: "Please enable notifications to receive updates realtime.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          });
      });
    }
  }, [accountToken]);

  return (
    <MessagingContext.Provider value={{
      token,
    }}>
      {children}
    </MessagingContext.Provider>
  );
};