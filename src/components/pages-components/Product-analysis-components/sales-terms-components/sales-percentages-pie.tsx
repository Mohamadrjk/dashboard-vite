"use client";

import { useGoodsSalesPercentages } from "@/hooks/product-analysis-hooks/useGoodsSalesPercentages";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton, Tooltip } from "antd";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
const SalesPercentagesPieChart = () => {
  const { chartData, loading, products, refetch, isError } =
    useGoodsSalesPercentages();

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

  const chartOptions: ApexOptions = {
    series: chartData.salesData,
    legend: {
      show: false,
    },
    colors: chartColors,
    chart: {
      type: "pie",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Regular",
    },
    labels: chartData.categories,
  };

  if (isError)
    return (
      <div className="font-Regular relative w-full h-full">
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
      <h2 className=" xl:text-lg ldxl:text-xl">سهم هر کالا از فروش کلی</h2>
      {loading ? (
        <div className="w-full grow h-full flex items-center justify-between">
          <Skeleton
            active
            paragraph={{ rows: 4 }}
            className="!w-1/3 !h-auto aspect-square !rounded-full"
          />
          <Skeleton.Node
            active
            className="!w-[200px] !h-auto aspect-square !rounded-full"
          />
        </div>
      ) : (
        <div className="flex items-center grow h-full animate-fadeIn">
          <ul
            dir="rtl"
            className="w-max flex flex-col gap-2 h-full overflow-y-auto max-h-[250px]"
          >
            {products.map((product, index) => {
              return (
                <Tooltip
                  key={index}
                  title={
                    <span
                      dir="rtl"
                      className="line-clamp-2 w-full !font-Regular"
                    >
                      {product.product_name}
                    </span>
                  }
                >
                  <li className="flex items-center gap-2 font-Regular ">
                    <span
                      style={{
                        backgroundColor: chartColors[index % 10],
                      }}
                      className="block size-4"
                    ></span>
                    <span className="max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {product.product_name}
                    </span>
                  </li>
                </Tooltip>
              );
            })}
          </ul>
          <div className="grow  h-full">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type={"pie"}
              width="100%"
              height={"100%"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPercentagesPieChart;
