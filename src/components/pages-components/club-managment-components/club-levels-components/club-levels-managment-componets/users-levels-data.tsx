"use client";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useCallback, useEffect, useState } from "react";
import { Alert, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { getRankingPageLabels } from "@/utils/club-api/club-report-service";
import { IRankingLevelReport } from "@/types/club-types/club-reports-type";

const UsersLevelsData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [cartsData, setCartsData] = useState<IRankingLevelReport[]>([]);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRankingPageLabels();
      if (response.status) {
        setCartsData(() => [
          ...response.result.levels,
          response.result.newcommers,
        ]);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [cartsData]);

  useEffect(() => {
    getData();
  }, []);

  const options: ApexOptions = {
    series: [
      {
        name: "تعداد کاربران",
        data: cartsData.map((item) => item.value),
      },
    ],
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Regular",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        distributed: true,
        borderRadius: 2,
      },
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
    colors: ["#00E396"],
    xaxis: {
      categories: cartsData.map((item) => item.title.replace("مشتریان", "")),
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
      title: { text: "تعداد مشتریان" },
    },
    legend: { show: false }, // Disable legend
    tooltip: {
      custom: function ({ series, dataPointIndex, w }) {
        const level = w.globals.labels[dataPointIndex];
        const customers = series[0][dataPointIndex];
        return `
        <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
          <p style="margin: 0;">
            <strong>سطح:</strong> ${level}
          </p>
          <p style="margin: 0;">
            <strong>تعداد کاربران:</strong> ${customers}
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
          onClick={() => {}}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );

  return (
    <div className="bg-white w-full aspect-[16/6] rounded-[10px] shadow p-2 animate-fadeIn">
      <h2 className="text-xl font-Medium mb-4"> سطح مشتریان</h2>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default UsersLevelsData;
