import AppLoading from '@/components/Loadings/AppLoading/loading'
import { LoadingIndicator } from '@/components/Loadings/loadingIndicator/loading-indicator'
import { Suspense } from 'react'
import { Outlet } from 'react-router'

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
    )
}

export default MainLayout