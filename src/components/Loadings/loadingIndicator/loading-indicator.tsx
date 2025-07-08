"use client";
import React, { Suspense, useEffect, useMemo, useTransition } from "react";
import InitLoadingPage from "../init-loading/init-loading";
import RedirectLoadingPage from "../init-loading/redirect-loading";
import { useLocation } from "react-router";
import AppLoading from "../AppLoading/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LayoutWarperLazy } from "@/layouts/panel-layout/layout-lazy";


export function LoadingIndicator({
  component,
}: {
  component: React.JSX.Element;
}) {
  const { pathname } = useLocation()
  const [isPending, startTransition] = useTransition();
  const { shoeRedirectLoading } = useSelector(
    (state: RootState) => state.commonSlice
  );

  // Memoize the wrapped component to prevent unnecessary re-renders
  const wrappedComponent = useMemo(() => {
    const isLoginPage = pathname.includes("login");
    return isLoginPage ? (
      component
    ) : (
      <LayoutWarperLazy>
        {isPending ? <AppLoading /> : component}
      </LayoutWarperLazy>
    );
  }, [component, pathname, isPending]);

  // Handle route transitions
  useEffect(() => {
    startTransition(() => { });
  }, [pathname, startTransition]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {shoeRedirectLoading && <RedirectLoadingPage />}
      <Suspense fallback={<InitLoadingPage />}>
        {wrappedComponent}
      </Suspense>
    </div>
  );
}
