import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "@/pages/dashbaord";

import BranchManagement from "@/pages/branch-management/page";
import GenderSalesPage from "@/pages/Gender-sales/page";
import CustomerLoyaltyLevelPage from "@/pages/customer-loyalty-level/page";
import CustomersInteractionPAge from "@/pages/customer-Interactions/page";
import StatisticalReportsPage from "@/pages/statistical-reports/page";
import GeneralGoodsSalesTermsPage from "@/pages/goods-sales-terms/page";
import MainLayout from "@/components/layouts-components/MainLayout";
import OverallSalesPerformancePage from "@/pages/overall-sales-performance/page";
import SellingProductsAndServicesPage from "@/pages/Selling-products-and-services/page";
import KeyAccounts from "@/pages/key-accounts/page";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/*",
    element: <MainLayout />,
    children: [
      { element: <Navigate to={"dashboard"} />, index: true },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "statistical-reports",
        element: <StatisticalReportsPage />,
      },
      {
        path: "customer-loyalty-level",
        element: <CustomerLoyaltyLevelPage />,
      },
      {
        path: "Gender-sales",
        element: <GenderSalesPage />,
      },

      {
        path: "customer-Interactions",
        element: <CustomersInteractionPAge />,
      },
      {
        path: "branch-management",
        element: <BranchManagement />,
      },
      {
        path: "goods-sales-terms",
        element: <GeneralGoodsSalesTermsPage />,
      },
      {
        path: "overall-sales-performance",
        element: <OverallSalesPerformancePage />,
      },
      {
        path: "Selling-products-and-services",
        element: <SellingProductsAndServicesPage />,
      },
      { path: "key-accounts", element: <KeyAccounts /> },
    ],
  },
]);
