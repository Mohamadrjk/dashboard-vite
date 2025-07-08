"use client";
import { lazy } from "react";

export const SalesPercentagesPieChartLAzy = lazy(
  () => import("./sales-percentages-pie")
);
export const SalesTrendAnalysisLAzy = lazy(
  () => import("./sales-trend-analysis")
);
