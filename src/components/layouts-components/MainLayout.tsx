import { Suspense } from "react";
import { Outlet } from "react-router";
import { LoadingIndicator } from "../shared-components/loadings-components/loading-indicator/loading-indicator";
import AppLoading from "../shared-components/loadings-components/app-loading/loading";

function MainLayout() {
  return (
    <div className="w-full  bg-white">
      <LoadingIndicator
        component={
          <Suspense fallback={<AppLoading />}>
            <Outlet />
          </Suspense>
        }
      ></LoadingIndicator>
    </div>
  );
}

export default MainLayout;
