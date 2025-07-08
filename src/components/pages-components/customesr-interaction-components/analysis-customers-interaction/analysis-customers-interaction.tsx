/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { RedoOutlined } from "@ant-design/icons";
import { Skeleton, Alert } from "antd";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { getInteractionsStates } from "@/utils/customerService";
import { IInteractionsStates } from "@/types/customers-model";
import moment from "jalali-moment";

interface Data {
  date: string;
  total_interactions: number;
  with_orders: number;
  without_orders: number;
}

const AnalysisCustomersInteractionChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<IInteractionsStates[]>([]);

  // Example data for illustration
  //   const exampleData: Data[] = [
  //     {
  //       date: "2024-12-01",
  //       total_interactions: 100,
  //       with_orders: 60,
  //       without_orders: 40,
  //     },
  //     {
  //       date: "2024-12-02",
  //       total_interactions: 120,
  //       with_orders: 70,
  //       without_orders: 50,
  //     },
  //     {
  //       date: "2024-12-09",
  //       total_interactions: 4,
  //       with_purchase: 4,
  //       without_purchase: 0,
  //     },
  //     // Add more data here
  //   ];
  const getData = async () => {
    setLoading(true);
    setError(false);
    // start_date=2024-01-01&end_date=2025-01-01
    try {
      const data = await getInteractionsStates({
        interval: "quarterly",
      });

      if (data.data.data && data.data.data.length > 0) {
        setData(data.data.data);
        console.log(data.data.data);
      } else {
        // setData(exampleData);
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

  const maxOrderValue = Math.max(
    ...data.map((item) => Math.max(item.with_purchase, item.without_purchase))
  );

  const options: ApexOptions = {
    series: [
      {
        name: "بدون سفارش",
        data: data.map((item) => -item.without_purchase), // Negative for left side
      },
      {
        name: "با سفارش",
        data: data.map((item) => item.with_purchase), // Positive for right side
      },
    ],
    chart: {
      height: 350,
      type: "area",
      zoom: { enabled: false },
      fontFamily: "Regular",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: data.map((item) =>
        moment.from(item.date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")
      ),
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          const total = data[dataPointIndex].total_interactions;
          return `${val} تعامل (کل: ${total})`;
        },
      },
    },
  };

  if (loading)
    return (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
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
    <div className="bg-white w-full aspect-[16/6] rounded-[10px] shadow p-2 animate-fadeIn">
      <div className="w-full flex items-center gap-4 flex-wrap font-Medium">
        <h2 className="text-xl">
          نمودار تحلیل تعاملات مشتریان با و بدون سفارشات
        </h2>
      </div>
      <Chart
        options={options}
        series={options.series}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default AnalysisCustomersInteractionChart;
