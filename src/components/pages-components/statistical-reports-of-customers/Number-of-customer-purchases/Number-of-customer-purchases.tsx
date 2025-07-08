"use client";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { getCustomerPurchaseCount } from "@/utils/customerService";
import { Alert, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
// Example Data
const purchaseData = [
  {
    purchase_count: 1,
    customer_count: 250,
  },
  {
    purchase_count: 2,
    customer_count: 180,
  },
  {
    purchase_count: 3,
    customer_count: 120,
  },
  {
    purchase_count: 4,
    customer_count: 90,
  },
  {
    purchase_count: 5,
    customer_count: 60,
  },
];

const NumberOfCustomerPurchases = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [purchaseCounts, setPurchaseCounts] = useState<number[]>([]);
  const [customerCounts, setcustomerCounts] = useState<number[]>([]);

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getCustomerPurchaseCount();

      setPurchaseCounts(data.data.data.map((item) => item.purchase_count));
      setcustomerCounts(data.data.data.map((item) => item.customer_count));
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
        name: "تعداد مشتریان",
        data: customerCounts,
        color: "#001529",
      },
    ],
    chart: {
      height: 400,
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: true, speed: 200 },
      fontFamily: "Regular",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: purchaseCounts,
      title: {
        text: "تعداد خرید",
      },
    },
    yaxis: {
      title: {
        text: "تعداد مشتریان",
      },
      labels: {
        formatter: (val) => val.toLocaleString(),
      },
    },
    tooltip: {
      custom: function ({ series, dataPointIndex }) {
        const purchase = purchaseCounts[dataPointIndex];
        const customers = series[0][dataPointIndex];
        return `
        <div style="background: #002140; color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-family: 'Medium'; direction: rtl">
          <p style="margin: 0;">
            <strong>تعداد خرید:</strong> ${purchase}
          </p>
          <p style="margin: 0;">
            <strong>تعداد مشتریان:</strong> ${customers}
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
      <h2 className="text-xl font-Medium mb-4">تعداد دفعات خرید مشتریان</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default NumberOfCustomerPurchases;
