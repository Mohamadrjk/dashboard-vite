import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import StatisticalReports from "../pages/statistical-reports";
import Dashboard from "@/pages/dashbaord";
import MainLayout from "@/layouts/MainLayout";
import BranchManagement from "@/pages/branch-management/page";
import GenderSalesPage from "@/pages/Gender-sales/page";
import CustomerLoyaltyLevelPage from "@/pages/customer-loyalty-level/page";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            index: true,
            element: <LoginPage />,
        },
        {
            path: "/login",
            element: <LoginPage />, // Layout for all other pages
        },
        {
            path: "/*",
            element: <MainLayout />, // Layout for all other pages
            children: [
                { element: <Navigate to={"dashboard"} />, index: true },
                {
                    path: "dashboard",
                    element: <Dashboard />
                },
                {
                    path: "statistical-reports",
                    element: <StatisticalReports />
                },
                {
                    path: "customer-loyalty-level",
                    element: <CustomerLoyaltyLevelPage />
                },
                {
                    path: 'Gender-sales',
                    element: <GenderSalesPage />
                },
                {
                    path: "branch-management",
                    element: <BranchManagement />
                }

            ]
        },
    ]
)