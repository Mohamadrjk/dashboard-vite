"use client";

import { ILoyaltyDistribution } from "@/types/customers-model";
import {
  getCustomerLoyaltyDistribution,
  getCustomersClvReport,
} from "@/utils/customerService";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import { lazy } from "react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const customerSegments = [
  {
    customer_type: "مشتریان وفادار",
    customer_count: 150,
    percentage: 15,
  },
  {
    customer_type: "مشتریان یک‌بار خرید",
    customer_count: 700,
    percentage: 70,
  },
  {
    customer_type: "مشتریان جدید",
    customer_count: 150,
    percentage: 15,
  },
];

const CustomerSegmentsChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getCustomerLoyaltyDistribution();

      if (data.data.data && data.data.data.length > 0) {
        initialChart(data.data.data);
      } else {
        initialChart(customerSegments);
      }
    } catch (err) {
      setError(true);

      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const initialChart = (CSegments: ILoyaltyDistribution[]) => {
    const labels = CSegments.map((item) => item.customer_type);
    const counts = CSegments.map((item) => item.customer_count);

    const chartOptions: ApexOptions = {
      chart: {
        type: "pie",
        fontFamily: "Regular",
      },
      labels: labels,
      legend: {
        position: "left",
        horizontalAlign: "center",
        fontFamily: "Regular",
        markers: {
          offsetX: -5,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} مشتری`,
        },
      },
    };

    setChartData({
      series: counts,
      options: chartOptions,
    });
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-start justify-between p-2 bg-white">
        <Skeleton.Node
          active
          className="!w-[300px] !h-[300px] !rounded-full overflow-hidden"
        />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, index) => {
            return <Skeleton.Node key={index} className="!w-24 !h-4" />;
          })}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full font-Regular relative">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button
          onClick={() => getData()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );

  return (
    <div
      id="chart"
      dir="rtl"
      className="bg-white w-full h-full rounded-[10px] shadow p-2 animate-fadeIn"
    >
      {chartData.series.length > 0 && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={300}
          dir="rtl"
        />
      )}
    </div>
  );
};

export default CustomerSegmentsChart;
