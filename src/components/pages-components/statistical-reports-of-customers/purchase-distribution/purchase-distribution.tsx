"use client";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { getPurchaseDistribution } from "@/api/customerService";
import { Alert, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
const purchaseData = [
  {
    purchase_range: "1-3 Million",
    customer_count: 274,
    total_spent: 493069005,
  },
  {
    purchase_range: "3-5 Million",
    customer_count: 180,
    total_spent: 398000000,
  },
  {
    purchase_range: "5-10 Million",
    customer_count: 95,
    total_spent: 620000000,
  },
  {
    purchase_range: "10+ Million",
    customer_count: 45,
    total_spent: 750000000,
  },
];

const PurchaseDistribution = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [customerCounts, setcustomerCounts] = useState<number[]>([]);
  const [totalSpent, setTotalSpent] = useState<number[]>([]);

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getPurchaseDistribution();

      setCategories(
        data.data.data.map((item) =>
          item.purchase_range.replace("Million", "میلیون")
        )
      );
      setcustomerCounts(data.data.data.map((item) => item.customer_count));
      setTotalSpent(data.data.data.map((item) => item.total_spent));
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

  const options: ApexOptions = {
    series: [
      {
        name: "مجموع خرید",
        type: "bar",
        data: totalSpent,
        color: "#04E398",
      },
      {
        name: "تعداد خرید",
        type: "bar",
        data: customerCounts,
        color: "#001529",
      },
    ],
    chart: {
      height: 400,
      type: "bar",
      stacked: false,
      fontFamily: "Regular",
      toolbar: { show: false },
      animations: { enabled: true, speed: 200 },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: [
      {
        title: {
          text: "مجموع خرید (تومان)",
        },
        labels: {
          formatter: (value) => `${numberToPersianPrice(value)}`,
          style: { cssClass: "" },
        },
      },
      {
        opposite: true,
        title: {
          text: "تعداد خرید",
        },
      },
    ],
    legend: {
      show: true,
      position: "top",
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const month = w.globals.labels[dataPointIndex];
        const sales = series[0][dataPointIndex];
        const orders = series[1][dataPointIndex];
        return `
        <div style="background: #002140; color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-family: 'Medium'; direction: rtl">
          <p style="margin: 0;">
            <strong>محدوده خرید:</strong> ${month}
          </p>
          <p style="margin: 0;">
            <strong>فروش:</strong> ${numberToPersianPrice(sales)} تومان
          </p>
          <p style="margin: 0;">
            <strong>تعداد مشتریان:</strong> ${orders}
          </p>
        </div>
      `;
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
    <div className="bg-white w-full aspect-[16/6] max-lg:col-span-full rounded-[10px] shadow p-2 animate-fadeIn">
      <h2 className="text-xl font-Medium mb-4">تجزیه و تحلیل محدوده خرید</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default PurchaseDistribution;
