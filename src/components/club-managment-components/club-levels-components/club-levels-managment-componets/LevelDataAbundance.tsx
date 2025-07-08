"use client";

import { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";
import { Alert, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { IRakingPieReport } from "@/types/club-types/club-reports-type";
import { getRankingPagePieReport } from "@/utils/club-api/club-report-service";

const LevelDataAbundance = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const [cartsData, setCartsData] = useState<IRakingPieReport[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const initializeChart = (data: IRakingPieReport[]) => {
    const labels = data.map((item) => item.title);
    const counts = data.map((item) => item.cost);
    const colors = data.map((item) =>
      item.primaryColor ? item.primaryColor : "#eee"
    );
    const sumOfCounts = data.reduce((prev, cur) => (prev += cur.cost), 0);
    setTotal(() => sumOfCounts);
    const chartOptions = {
      chart: { type: "pie", fontFamily: "Regular" },
      labels,
      colors,
      legend: {
        show: false, // Disable legends
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} مشتری`,
        },
      },
    };

    setChartData({ series: counts, options: chartOptions });
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRankingPagePieReport();
      if (response.status) {
        setCartsData(() => response.result.pies);
        initializeChart(response.result.pies);
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

  const returPercentOfEachData = (item: IRakingPieReport) => {
    const calc = (item.cost / total) * 100;
    return Number.isInteger(calc) ? calc.toFixed(0) : calc.toFixed(1);
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-start justify-between p-2 bg-white">
        <div className="flex flex-col justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton.Node key={index} className="!w-24 !h-6" />
          ))}
        </div>
        <Skeleton.Node
          active
          className="!w-[300px] !h-[300px] !rounded-full overflow-hidden"
        />
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
    <div className="bg-white w-full h-full rounded-[10px] shadow p-[15px] dxl:p-[20px] animate-fadeIn flex flex-col gap-2">
      <h2 className="text-xl font-Medium">میزان خرید کاربران وفادار</h2>

      <div className="w-full flex grow">
        <ul className="w-2/5 h-full flex flex-col justify-center gap-3">
          {cartsData.map((item, index) => {
            return (
              <li
                dir="rtl"
                key={index}
                className="flex items-center gap-2 font-Regular"
              >
                <span
                  style={{
                    backgroundColor: item.primaryColor
                      ? item.primaryColor
                      : "#eee",
                  }}
                  className={clsx("w-5 h-5 rounded-full")}
                ></span>
                <span>
                  <span>
                    {item.title.replace("مشتریان", "کاربران").trim()} :
                  </span>
                  <span className="pr-1">{returPercentOfEachData(item)}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="w-3/5">
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
      </div>
    </div>
  );
};

export default LevelDataAbundance;
