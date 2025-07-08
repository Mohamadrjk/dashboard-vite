"use client";
import useSalesPerMonth from "@/hooks/dashboard-hooks/useSalesPerMonth";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import SalePerMonthChart from "./sale-per-month";
import OrderPerMonthChart from "./order-per-month";
import { memo } from "react";

const SalePerMonthChartsContainer = () => {
  const { data, isLoading, isRefetching, isError, refetch } =
    useSalesPerMonth();
  if (isLoading || isRefetching)
    return (
      <>
        <div className="w-full aspect-[16/6]">
          <Skeleton.Node active className="!w-full !h-full" />
        </div>
        <div className="w-full aspect-[16/6]">
          <Skeleton.Node active className="!w-full !h-full" />
        </div>
      </>
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
    <>
      <SalePerMonthChart
        categories={data?.categories ?? []}
        salesData={data?.salesData ?? []}
        totalSales={data?.totalSales ?? 0}
      />
      <OrderPerMonthChart
        categories={data?.categories ?? []}
        ordersData={data?.ordersData ?? []}
        totalOrders={data?.totalOrders ?? 0}
      />
    </>
  );
};

const MemoizedSalePerMonthChartsContainer = memo(SalePerMonthChartsContainer);

export default MemoizedSalePerMonthChartsContainer;
