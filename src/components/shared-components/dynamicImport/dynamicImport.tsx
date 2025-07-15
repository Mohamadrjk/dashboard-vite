// withLazy.tsx
import React, { lazy, Suspense, ComponentType, ReactNode, JSX } from "react";

type daynamicOptions = {
  loading?: () => JSX.Element | ReactNode;
};

export function dynamic<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: daynamicOptions
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense
        fallback={
          options?.loading?.() ?? <div className=" sr-only">Loading...</div>
        }
      >
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
