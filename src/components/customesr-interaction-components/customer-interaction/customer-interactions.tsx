"use client";

import { IAnalysisLoyaltyMonthly } from "@/types/customers-model";
import { getAnalysisLoyaltyMonthly } from "@/utils/customerService";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import moment from "jalali-moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const interactionData = [
  {
    date: "2024-12-05",
    total_interactions: 70,
    with_orders: 40,
    without_orders: 30,
  },
  {
    date: "2024-12-06",
    total_interactions: 60,
    with_orders: 35,
    without_orders: 25,
  },
  {
    date: "2024-12-07",
    total_interactions: 80,
    with_orders: 50,
    without_orders: 30,
  },
  {
    date: "2024-12-08",
    total_interactions: 90,
    with_orders: 55,
    without_orders: 35,
  },
  {
    date: "2024-12-09",
    total_interactions: 75,
    with_orders: 45,
    without_orders: 30,
  },
  {
    date: "2024-12-10",
    total_interactions: 65,
    with_orders: 40,
    without_orders: 25,
  },
  {
    date: "2024-12-11",
    total_interactions: 85,
    with_orders: 55,
    without_orders: 30,
  },
  {
    date: "2024-12-12",
    total_interactions: 95,
    with_orders: 60,
    without_orders: 35,
  },
  {
    date: "2024-12-13",
    total_interactions: 70,
    with_orders: 45,
    without_orders: 25,
  },
  {
    date: "2024-12-14",
    total_interactions: 60,
    with_orders: 35,
    without_orders: 25,
  },
  {
    date: "2024-12-15",
    total_interactions: 80,
    with_orders: 50,
    without_orders: 30,
  },
  {
    date: "2024-12-16",
    total_interactions: 85,
    with_orders: 55,
    without_orders: 30,
  },
  {
    date: "2024-12-17",
    total_interactions: 75,
    with_orders: 45,
    without_orders: 30,
  },
  {
    date: "2024-12-18",
    total_interactions: 65,
    with_orders: 40,
    without_orders: 25,
  },
  {
    date: "2024-12-19",
    total_interactions: 90,
    with_orders: 60,
    without_orders: 30,
  },
  {
    date: "2024-12-20",
    total_interactions: 50,
    with_orders: 30,
    without_orders: 20,
  },
  {
    date: "2024-12-21",
    total_interactions: 60,
    with_orders: 40,
    without_orders: 20,
  },
  {
    date: "2024-12-25",
    total_interactions: 45,
    with_orders: 25,
    without_orders: 20,
  },
];

const InteractionsChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const getData = async () => {
    setLoading(true);
    setError(false);
    // start_date=2024-01-01&end_date=2025-01-01
    try {
      const data = await getAnalysisLoyaltyMonthly({
        start_date: "2024-01-01",
        end_date: "2025-01-01",
      });

      if (data.data.data && data.data.data.length > 0) {
        onInitialChart(data.data.data);
      } else {
        // onInitialChart(interactionData);
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

  const onInitialChart = (cInteractions: IAnalysisLoyaltyMonthly[]) => {
    const categories = cInteractions.map((item) =>
      moment
        .from(item.interaction_date, "YYYY-MM-DD")
        .locale("fa")
        .format("YYYY/MM/DD")
    );
    const withOrders = cInteractions.map(
      (item) => item.interactions_with_purchases
    );
    const withoutOrders = cInteractions.map(
      (item) => item.interactions_without_purchases
    );

    const chartOptions: ApexOptions = {
      chart: {
        type: "bar",
        stacked: true,
        height: 450,
        zoom: { enabled: false },
        fontFamily: "Regular",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: "تعداد تعاملات",
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val, { seriesIndex, dataPointIndex }) => {
            const total = cInteractions[dataPointIndex].total_interactions;
            return `${val} تعامل (کل: ${total})`;
          },
        },
      },
    };

    setChartData({
      series: [
        {
          name: "با سفارش",
          data: withOrders,
        },
        {
          name: "بدون سفارش",
          data: withoutOrders,
        },
      ],
      options: chartOptions,
    });
  };

  if (loading)
    return (
      <div className="w-full aspect-[16/3]">
        <Skeleton.Node active className="!w-full !h-[350px]" />
      </div>
    );

  if (error)
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
      className="bg-white w-full aspect-[16/3] rounded-[10px] shadow p-2 animate-fadeIn"
    >
      <div className="w-full flex items-center gap-4 flex-wrap font-Medium">
        <h2 className="text-xl">
          نمودار تعداد تعاملات مشتریان با و بدون سفارشات
        </h2>
      </div>
      {chartData.series.length > 0 && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={450}
        />
      )}
    </div>
  );
};

export default InteractionsChart;
