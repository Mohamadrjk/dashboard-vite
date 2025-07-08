import InitLoadingPage from "@/components/Loadings/init-loading/init-loading";
import { LazyLogoContainer } from "@/components/pages-components/login-components/login-components-index";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <Suspense fallback={<InitLoadingPage />}>
            <div className="w-full font-regular h-full">
                <LazyLogoContainer />
            </div>
        </Suspense>
    );
};

export default LoginPage;
