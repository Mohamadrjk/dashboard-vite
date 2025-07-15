"use client";

import { Provider } from "react-redux";
import { store } from "../store";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/components/shared-components/message-provider/messageProvider";
import { NotifyProvider } from "@/components/shared-components/notife/notife";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NotificationProvider>
      <NotifyProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
      </NotifyProvider>
    </NotificationProvider>

  );
};

export default AppProvider;
