"use client";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

export const SalesPercentagesPieChartLAzy = dynamic(
  () => import("./sales-percentages-pie"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full p-4 h-full flex items-center justify-between bg-Highlighter">
        <Skeleton
          active
          paragraph={{ rows: 4 }}
          className="!w-1/3 !h-auto aspect-square !rounded-full"
        />
        <Skeleton.Node
          active
          className="!w-[200px] !h-auto aspect-square !rounded-full"
        />
      </div>
    ), // Fallback while loading
  }
);
export const SalesTrendAnalysisLAzy = dynamic(
  () => import("./sales-trend-analysis"),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full aspect-[16/3] dxl:aspect-[16/7]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);
