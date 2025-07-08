"use client";
import useGetCityStates from "@/hooks/dashboard-hooks/useCityStates";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import { memo, useMemo } from "react";
import Chart from "react-apexcharts";
const CityStatesChartComponent = () => {
  const { data, isLoading, isRefetching, refetch, isError } =
    useGetCityStates();

  const chartColors = [
    "#26A0FC",
    "#26E7A6",
    "#FEBC3B",
    "#FF6178",
    "#8B75D7",
    "#69808A",
    "#46B3A9",
    "#D830EB",
    "#263849",
    "#4BC0C0",
  ];

  const chartOptions: ApexOptions = useMemo(() => {
    return {
      series: data?.totalCustomers,
      legend: {
        show: false,
      },
      colors: chartColors,
      chart: {
        type: "donut",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "Regular",
      },
      labels: data?.cities,
    };
  }, [data]);

  if (isLoading || isRefetching)
    return (
      <>
        <div className="w-full aspect-[16/6]">
          <Skeleton.Node active className="!w-full !h-full rounded-full" />
        </div>
      </>
    );

  if (isError)
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
          onClick={() => refetch()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );
  return (
    <div className="w-full flex flex-col gap-2 p-4 bg-Highlighter rounded-[10px] shadow font-Regular h-full">
      <h2 className=" xl:text-lg ldxl:text-xl">وضعیت ارسال به شهرستان‌ها</h2>
      <div className="flex items-center grow h-full">
        <ul className="w-1/3 flex flex-col gap-2">
          {data?.cities.map((city, index) => {
            return (
              <li key={index} className="flex items-center gap-2 font-Regular ">
                <span
                  style={{
                    backgroundColor: chartColors[index],
                  }}
                  className="block size-4"
                ></span>
                <span>{city}</span>
              </li>
            );
          })}
        </ul>
        <div className="grow w-full h-full">
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type={"donut"}
            width="100%"
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

const MemoizedCityStatesChartComponent = memo(CityStatesChartComponent);

export default MemoizedCityStatesChartComponent;
