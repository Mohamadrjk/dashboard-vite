"use client";
import { Skeleton } from "antd";

import dynamic from "next/dynamic";

const LazyCustomerPurchasingTrendsData = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/key-customets-components/customer-purchasing-trends-data"
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

const LazyKeyCustomersShareSales = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/key-customets-components/key-customers-share-sales"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full grow h-full flex items-center justify-between bg-Highlighter rounded-[10px] p-2">
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

const LazyTopCustomersByers = dynamic(
  () =>
    import(
      "@/components/overall-sales-performance-components/key-customets-components/top-customers-byers"
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
  LazyCustomerPurchasingTrendsData,
  LazyKeyCustomersShareSales,
  LazyTopCustomersByers,
};
