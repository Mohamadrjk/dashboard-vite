"use client";
import React, { createContext, useContext, useState } from "react";
import { message } from "antd";

type NotificationType = "success" | "error" | "warning";

interface NotifyContextProps {
  notify: (type: NotificationType, content: string) => void;
}

const NotifyContext = createContext<NotifyContextProps | undefined>(undefined);

export const NotifyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const notify = (type: NotificationType, content: string) => {
    messageApi.open({
      type,
      content,
      className: "!font-Medium",
      style: {
        direction: "rtl",
      },
    });
  };

  return (
    <NotifyContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};
