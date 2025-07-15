"use client";
import { ILoyaltyChanges } from "@/types/customers-model";
import { getAnalysisLoyaltyChanges } from "@/api/customerService";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import moment from "jalali-moment";
import Chart from "react-apexcharts";
import SalesByGenderAndCityReportConfigs from "../../gender-components/new-cityGenders-report/city-and-gender-dateFilter";
const data = [
  {
    month: "2024-10",
    loyal_customers: 1,
    non_loyal_customers: 213,
    total_orders: 214,
    total_revenue: 377354031,
  },
  {
    month: "2024-11",
    loyal_customers: 3,
    non_loyal_customers: 446,
    total_orders: 449,
    total_revenue: 895802481,
  },
  {
    month: "2024-12",
    loyal_customers: 5,
    non_loyal_customers: 723,
    total_orders: 728,
    total_revenue: 1314343096,
  },
];

const reponsive = [
  {
    breakpoint: 2040,
    options: {
      chart: { height: 450 }, // Larger height for ultra-wide screens
      xaxis: {
        labels: { style: { fontSize: "16px" } }, // Increase font size
      },
    },
  },
  {
    breakpoint: 1660,
    options: {
      chart: { height: 420 },
      xaxis: {
        labels: { style: { fontSize: "15px" } },
      },
    },
  },
  {
    breakpoint: 1440,
    options: {
      chart: { height: 400 },
      xaxis: {
        labels: { style: { fontSize: "14px" } },
      },
    },
  },
  {
    breakpoint: 1220,
    options: {
      chart: { height: 380 },
      xaxis: {
        labels: { style: { fontSize: "13px" } },
      },
    },
  },
  {
    breakpoint: 1024,
    options: {
      chart: { height: 350 },
      xaxis: {
        labels: { style: { fontSize: "12px" } },
      },
    },
  },
];

const LoyaltyChangesComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [months, setMonths] = useState<string[]>([]);
  const [loyalCustomers, setLoyalCustomers] = useState<number[]>([]);
  const [nonLoyalCustomers, setNonLoyalCustomers] = useState<number[]>([]);

  const fetchData = useCallback(
    async (payload?: { start_date: string; end_date: string }) => {
      setLoading(true);
      setError(false);

      try {
        const response = await getAnalysisLoyaltyChanges(
          payload
            ? payload
            : {
              start_date: "2024-01-01",
              end_date: "2025-01-01",
            }
        );

        const formattedData = response.data.data;
        setMonths(formattedData.map((item: ILoyaltyChanges) => item.month));
        setLoyalCustomers(
          formattedData.map((item: ILoyaltyChanges) => item.loyal_customers)
        );
        setNonLoyalCustomers(
          formattedData.map((item: ILoyaltyChanges) => item.non_loyal_customers)
        );
      } catch (err) {
        setError(true);
        console.warn("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: { enabled: false },
      fontFamily: "Regular",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Alternating row colors
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: months.map((item) =>
        moment.from(item, "YYYY-MM").locale("fa").format("YYYY/MM")
      ),
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (
          val: number,
          { dataPointIndex }: { dataPointIndex: number }
        ) => {
          const totalOrders = data[dataPointIndex]?.total_orders ?? 0; // Fallback to 0 if data is missing
          return `${val} مشتری (کل سفارشات: ${totalOrders})`;
        },
      },
    },
    responsive: reponsive,
  };

  const series = [
    {
      name: "مشتری وفادار",
      data: loyalCustomers,
    },
    {
      name: "مشتری غیر وفادار",
      data: nonLoyalCustomers,
    },
  ];

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
          onClick={() => fetchData()}
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
      <div className="col-span-2 w-full flex lg:flex-row gap-4 flex-col items-center justify-between p-4">
        <h2 className="lg:text-xl text-base font-Medium text-right text-ellipsis  overflow-hidden w-full whitespace-nowrap">
          نمودار تحلیل تغییرات وفاداری مشتریان در بازه زمانی
        </h2>
        <div className=" w-full lg:max-w-[220px] justify-between">
          <SalesByGenderAndCityReportConfigs
            getData={fetchData}
            loading={loading}
            onlyDate={true}

          />
        </div>
      </div>
      {series && <Chart options={options} series={series} type="line" height={450} />}
    </div>
  );
};

export default LoyaltyChangesComponent;
