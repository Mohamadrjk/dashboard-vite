"use client";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { RedoOutlined } from "@ant-design/icons";
import { Skeleton, Alert } from "antd";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import useWeeklyIncome from "@/hooks/dashboard-hooks/useWeeklyIncome";
import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";

const WeeklyIncomeChartComponent = () => {
  const { data, isError, isLoading, isRefetching, refetch } = useWeeklyIncome();

  const chartOptions: ApexOptions = useMemo(() => {
    return {
      series: [
        {
          name: "مجموع فروش", // Total Sales
          type: "line",
          data: data?.salesData ?? [],
          color: "#04E398",
        },
        {
          name: "تعداد سفارش", // Total Orders
          type: "column",
          data: data?.ordersData ?? [],
          color: "#001529",
        },
      ],

      chart: {
        height: 450,
        type: "line", // Multi-type chart
        zoom: { enabled: false },
        fontFamily: "Regular",
        toolbar: { show: false },
        animations: { enabled: true, speed: 200 },
      },
      states: {
        hover: {
          filter: {
            type: "darken", // Use "darken" or "lighten" for hover effect
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "darken",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [3, 0], // Line thickness for sales, no stroke for orders
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
        },
      },
      title: {
        text: "",
        align: "right",
        style: { fontFamily: "Medium" },
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data?.categories,
      },
      yaxis: [
        {
          title: {
            text: "مجموع فروش (تومان)", // Sales Axis Label
          },
          labels: {
            formatter: (value) => `${numberToPersianPrice(value)}`,
            style: { cssClass: "" },
          },
        },
        {
          opposite: true,
          title: {
            text: "تعداد سفارش", // Orders Axis Label
          },
          labels: {
            formatter: (value) => `${value}`,
            style: { cssClass: "" },
          },
        },
      ],
      tooltip: {
        custom: function ({ series, dataPointIndex, w }) {
          const month = w.globals.labels[dataPointIndex];
          const sales = series[0][dataPointIndex];
          const orders = series[1][dataPointIndex];
          return `
        <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
          <p style="margin: 0;">
            <strong>روز:</strong> ${month}
          </p>
          <p style="margin: 0;">
            <strong>فروش:</strong> ${numberToPersianPrice(sales)} تومان
          </p>
          <p style="margin: 0;">
            <strong>تعداد سفارش:</strong> ${orders}
          </p>
        </div>
      `;
        },
      },
    };
  }, [data]);

  if (isLoading || isRefetching)
    return (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
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
    <CartCardContainer
      type="line"
      chartOptions={chartOptions}
      chartContainerClass="w-full grow h-full"
      title="فروش هفتگی"
      headerElement={
        <div className="flex items-center gap-2">
          <p>
            <span>مجموع فروش:</span>
            <span className="pr-1">
              {data?.totalSales && numberToPersianPrice(data.totalSales)}
              <span className="pr-1">تومان</span>
            </span>
          </p>
          <p>
            <span>مجموع تعداد سفارش ها:</span>
            <span className="pr-1">{data?.totalOrders}</span>
          </p>
        </div>
      }
    />
  );
};

export default WeeklyIncomeChartComponent;
