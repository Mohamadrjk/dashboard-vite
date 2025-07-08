"use client";
import { lazy } from "react";
const LazyCustomersReports = lazy(() => import("./dashboardTopBarCards"));
const DashboardTopBArCardsContainer = () => {
  return (
    <div className="w-full">
      <LazyCustomersReports />
    </div>
  );
};

export default DashboardTopBArCardsContainer;
