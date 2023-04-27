import React, { createContext, useEffect, } from "react";
import { useToast, AlertStatus } from "@chakra-ui/react";

interface IToastProviderProps {
    children: React.ReactNode;
}

interface IToastProps {
    title: string;
    description: string;
    status: AlertStatus;
}

interface IToastContext {
    showToast: (props: IToastProps) => void;
}

const defaultValue = {
  showToast: () => { },
};

export const ToastContext = createContext<IToastContext>(defaultValue);

export class ToastManager {
  private static instance: ToastManager;
  private constructor() { }
  private callback: ((props: IToastProps) => void) | null = null;
  private arr: IToastProps[] = [];

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }
  showToast(props: IToastProps) {
    if (!this.callback) {
      this.arr.push(props);
      return;
    }

    this.callback(props);
  }
  setCallback(callback: (props: IToastProps) => void) {
    this.callback = callback;
    if (this.arr.length > 0) {
      this.arr.forEach((message) => {
                this.callback!(message);
      });
      this.arr = [];
    }
  }
}

export const toastManager = ToastManager.getInstance();

const config = {
  duration: 3000,
} as const;

export const ToastProvider = (props: IToastProviderProps) => {
  const toast = useToast();

  useEffect(() => {
    toastManager.setCallback((props) => {
      toast({
        title: props.title,
        description: props.description,
        status: props.status,
        duration: config.duration,
        isClosable: true,
      });
    });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast: toastManager.showToast,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

