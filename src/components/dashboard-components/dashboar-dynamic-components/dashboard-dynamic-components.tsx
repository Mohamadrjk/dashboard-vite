"use client";
import { lazy } from "react";
const DashboardTopCellingProductsLAzy = lazy(() => import("../dashboard-top-celling-products/top-selling-section"));
const CityStatesChartComponentLAzy = lazy(() => import("../city-states/city-states"));
const WeeklyIncomeChartComponentLAzy = lazy(() => import("../weekly-income/weekly-income"));
const SalePerMonthChartsContainerLAzy = lazy(() => import("../sale-per-month/sale-per-month-charts"));
export {
  DashboardTopCellingProductsLAzy,
  CityStatesChartComponentLAzy,
  WeeklyIncomeChartComponentLAzy,
  SalePerMonthChartsContainerLAzy,
};
