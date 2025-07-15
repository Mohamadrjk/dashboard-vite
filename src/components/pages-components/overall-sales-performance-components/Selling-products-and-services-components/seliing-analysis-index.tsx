"use client";

import { dynamic } from "@/components/shared-components/dynamicImport/dynamicImport";
import { Skeleton } from "antd";

const LazyTopSellingProductsAnalysis = dynamic(
  () =>
    import(
      "@/components/pages-components/overall-sales-performance-components/Selling-products-and-services-components/top-selling-products-analysis"
    ),
  {
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
      "@/components/pages-components/overall-sales-performance-components/Selling-products-and-services-components/bottom-selling-products-analysis"
    ),
  {
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
      "@/components/pages-components/overall-sales-performance-components/Selling-products-and-services-components/total-revenue-distribution"
    ),
  {
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
      "@/components/pages-components/overall-sales-performance-components/Sales-Comparison/sales-comparison"
    ),
  {
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
