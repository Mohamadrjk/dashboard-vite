"use client";

import { ICustomerPurchaseCategory } from "@/types/customers-model";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { getCustomerPurchaseCategory } from "@/utils/customerService";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Button, Dropdown, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { ApexOptions } from "apexcharts";
import { useEffect, useState, useCallback, ReactNode } from "react";
import Chart from "react-apexcharts";

const CustomerPurchaseCategory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState<string>("1 YEAR");
  const [selectedPeriod, setselectedPeriod] = useState<ReactNode>();

  const [chartData, setChartData] = useState<{
    categories: string[];
    counts: number[];
  }>({
    categories: [],
    counts: [],
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getCustomerPurchaseCategory({
        time_period: period,
      });

      const formattedData = response.data.map(
        (item: ICustomerPurchaseCategory) => ({
          category: item.purchase_category.replace("Purchases", "خرید"),
          count: item.customer_count,
        })
      );
      setChartData({
        categories: formattedData.map((item) => item.category),
        counts: formattedData.map((item) => item.count),
      });
    } catch (err) {
      setError(true);
      console.warn(err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartOptions: ApexOptions = {
    series: [
      {
        name: "تعداد خرید",
        type: "bar",
        data: chartData.counts,
        color: "#001529",
      },
    ],
    chart: {
      height: 400,
      type: "bar",
      fontFamily: "Regular",
      toolbar: { show: false },
      animations: { enabled: true, speed: 200 },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "30%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: [1, 1] },
    xaxis: { categories: chartData.categories },
    yaxis: [
      {
        title: { text: "تعداد خرید" },
      },
    ],
    legend: { show: true, position: "top" },
    tooltip: {
      custom: ({ series, dataPointIndex, w }) => {
        const category = w.globals.labels[dataPointIndex];
        const sales = series[0][dataPointIndex];
        return `
        <div style="background: #002140; color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-family: 'Medium'; direction: rtl">
          <p style="margin: 0;"><strong>محدوده خرید:</strong> ${category}</p>
          <p style="margin: 0;"><strong>فروش:</strong> ${numberToPersianPrice(
            sales
          )} تومان</p>
        </div>`;
      },
    },
  };

  if (loading) {
    return <Skeleton.Node active className="!w-full !h-full aspect-[16/6]" />;
  }

  if (error) {
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
          onClick={fetchData}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );
  }

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setPeriod(key);
  };
  const items: MenuItemType[] = [
    { key: "1 MONTH", label: <span className="font-Medium">1 ماهه</span> },
    { key: "2 MONTH", label: <span className="font-Medium">2 ماهه</span> },
    { key: "3 MONTH", label: <span className="font-Medium">3 ماهه</span> },
    { key: "6 MONTH", label: <span className="font-Medium">6 ماهه</span> },
    { key: "1 YEAR", label: <span className="font-Medium">1 ساله</span> },
  ];

  return (
    <div className="bg-white w-full aspect-[16/6] rounded-[10px] shadow p-4 animate-fadeIn">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-Medium mb-4">تجزیه و تحلیل محدوده خرید</h2>
        <div className="flex items-center gap-4">
          <Button
            type="primary"
            className="!font-Medium"
            disabled={loading}
            onClick={() => fetchData()}
          >
            دریافت داده
          </Button>
          <Dropdown menu={{ items, onClick }} placement="top">
            <Button className="!min-w-16 !font-Medium">
              {items.find((item) => item.key == period).label
                ? items.find((item) => item.key == period).label
                : items[0].label}
            </Button>
          </Dropdown>
        </div>
      </div>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default CustomerPurchaseCategory;
