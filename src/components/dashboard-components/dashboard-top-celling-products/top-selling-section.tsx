"use client";

import useTopSellingProducts from "@/hooks/dashboard-hooks/useTopSellingProducts";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import TopSellingProducts from "./top-selling-products-chart";
import DashboardTopCellingProducts from "./dashboardTopCellingProducts";

const chartColors = [
  "#26A0FC",
  "#26E7A6",
  "#FEBC3B",
  "#FF6178",
  "#8B75D7",
  "#69808A",
  "#46B3A9",
  "#D830EB",
  "#263849",
  "#4BC0C0",
];

const TopSellingProductsSection = () => {
  const { data, isLoading, isRefetching, refetch, isError } =
    useTopSellingProducts();
  if (isLoading || isRefetching)
    return (
      <div className="w-full grid grid-cols-5 gap-4">
        <div className="w-full lg:col-span-3 col-span-5 aspect-[16/6]">
          <Skeleton.Node active className="!w-full !h-full" />
        </div>
        <div className="w-full  lg:col-span-2 col-span-5 h-full">
          <Skeleton.Node active className="!w-full !h-full" />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="font-Regular relative">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button
          onClick={() => refetch()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );
  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <div className="  lg:col-span-3 col-span-5">
        <TopSellingProducts
          categories={data?.categories ?? []}
          salesData={data?.salesData ?? []}
          chartColors={chartColors}
        />
      </div>
      <div className=" lg:col-span-2 col-span-5">
        <DashboardTopCellingProducts
          chartColors={chartColors}
          products={data?.products ?? []}
        />
      </div>
    </div>
  );
};

export default TopSellingProductsSection;
