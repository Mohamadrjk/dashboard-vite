"use client";
import dynamic from "next/dynamic";

import { Skeleton } from "antd";

const LazyTopSellingProductsAnalysis = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/Selling-products-and-services-components/top-selling-products-analysis"
    ),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);

const LazyBottomSellingProductsAnalysis = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/Selling-products-and-services-components/bottom-selling-products-analysis"
    ),
  {
    ssr: false, // Disable SSR for this client-side component
    loading: () => (
      <div className="w-full !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);

const LazyTotalRevenueDistribution = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/Selling-products-and-services-components/total-revenue-distribution"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);

const LazySalesComparison = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/Sales-Comparison/sales-comparison"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ), // Fallback while loading
  }
);
export {
  LazyTopSellingProductsAnalysis,
  LazyBottomSellingProductsAnalysis,
  LazyTotalRevenueDistribution,
  LazySalesComparison,
};
