/* eslint-disable react-refresh/only-export-components */
"use client";
import { notification } from "antd";
import { createContext, useContext } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    message: string,
    description?: string,
    placement?:
      | "topRight"
      | "top"
      | "topLeft"
      | "bottom"
      | "bottomLeft"
      | "bottomRight"
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description?: string,
    placement?:
      | "topRight"
      | "top"
      | "topLeft"
      | "bottom"
      | "bottomLeft"
      | "bottomRight"
  ) => {
    api[type]({
      message,
      description,
      placement: placement ?? "topRight",
      className: "!font-medium",
      style: {
        direction: "rtl",
      },
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
