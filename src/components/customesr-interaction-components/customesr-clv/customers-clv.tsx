"use client";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { getCustomersClvReport } from "@/utils/customerService";
import { getSalesPerMonth } from "@/utils/dashboardServices";
import { Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const clvData = [
  {
    customer_id: 1,
    first_name: "علی",
    last_name: "احمدی",
    total_orders: 15,
    total_revenue: "5000000",
    average_order_value: "333333.33",
    predicted_clv: "5333333.33",
  },
  {
    customer_id: 2,
    first_name: "مریم",
    last_name: "نیکو",
    total_orders: 10,
    total_revenue: "3000000",
    average_order_value: "300000.00",
    predicted_clv: "4500000.00",
  },
];

const CustomersClvChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [clvValues, setClvValues] = useState<number[]>([]);
  const [revenueValues, setRevenueValues] = useState<number[]>([]);

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getCustomersClvReport({
        end_date: "2025-01-01",
        limit: 10,
        start_date: "2024-01-01",
      });
      if (data && !data.data.errors) {
        setCategories(() =>
          data.data.data.map((item) => `${item.first_name} ${item.last_name}`)
        );
        setClvValues(() =>
          data.data.data.map((item) => parseFloat(item.predicted_clv))
        );
        setRevenueValues(
          data.data.data.map((item) => parseFloat(item.total_revenue))
        );
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      onSetExampleData();
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSetExampleData = () => {
    if (clvData && clvData.length > 0) {
      setCategories(() =>
        clvData.map((item) => `${item.first_name} ${item.last_name}`)
      );
      setClvValues(() => clvData.map((item) => parseFloat(item.predicted_clv)));
      setRevenueValues(clvData.map((item) => parseFloat(item.total_revenue)));
    }
  };

  const chartOptions: ApexOptions = {
    chart: {
      height: 450,
      type: "bar",
      zoom: { enabled: false },
      fontFamily: "Regular",
      toolbar: { show: false },
      animations: { enabled: true, speed: 200 },
    },
    colors: ["#1677FF", "#000C17"],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: false,
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => numberToPersianPrice(val as number),
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    legend: {
      show: true,
      position: "top",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: ["#000C17"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "مجموع خرید / CLV (تومان)",
      },
      labels: {
        formatter: (value) => `${numberToPersianPrice(value)}`,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const customer = clvData[dataPointIndex];
        const sales = series[1][dataPointIndex];
        const predicted = series[0][dataPointIndex];
        return `
              <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
                <p style="margin: 0;">
                  <strong>نام مشتری: </strong> <span style="font-size:18px;">${
                    customer.first_name
                  } ${customer.last_name}</span>
                </p>
                <p style="margin: 0;">
                  <strong>خرید:</strong> ${numberToPersianPrice(sales)} تومان
                </p>
                <p style="margin: 0;">
                  <strong>CLV پیش‌بینی شده:</strong> ${numberToPersianPrice(
                    predicted
                  )} تومان
                </p>
              </div>
            `;
      },
    },
  };

  const chartData = {
    series: [
      { name: "CLV پیش‌بینی شده", data: clvValues },
      { name: "خرید کل", data: revenueValues },
    ],
    options: chartOptions,
  };

  if (loading)
    return (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    );

  return (
    <div
      id="chart"
      className="bg-white w-full aspect-[16/6] rounded-[10px] shadow p-2 animate-fadeIn"
    >
      <div className="w-full flex items-center gap-4 flex-wrap font-Medium">
        <h2 className="text-lg ">پیش‌بینی CLV مشتریان</h2>
      </div>
      {chartData.series.length > 0 && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={300}
        />
      )}
    </div>
  );
};

export default CustomersClvChart;
