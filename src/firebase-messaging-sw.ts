import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV)
  allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL("index.html"),
  { allowlist },
));

self.skipWaiting();
clientsClaim();


// Your web app"s Firebase configuration
const firebaseConfig = { "apiKey": "AIzaSyBUUot8I-jJyIF1L8mV3N6_mSQfMCdWQLY", "authDomain": "cinlok-ppl.firebaseapp.com", "projectId": "cinlok-ppl", "storageBucket": "cinlok-ppl.appspot.com", "messagingSenderId": "437661024704", "appId": "1:437661024704:web:052e1dd48110992e098825" };

initializeApp(firebaseConfig);
const messaging = getMessaging();

onBackgroundMessage (messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
