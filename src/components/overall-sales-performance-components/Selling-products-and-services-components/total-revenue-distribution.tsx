"use client";
import { useQuery } from "@tanstack/react-query";
import { getRevenueShare } from "@/utils/report_sale-apis/report_saleService";
import { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { Skeleton } from "antd";
import Chart from "react-apexcharts";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import FilterBar from "@/components/shared/chart-card/chart-filterBar";
import { chartColors } from "@/components/shared/chart-card/charts-certain-data";
import PieChartRightSideList from "@/components/shared/chart-card/pieChart-right-silde-list";
import ComponentInnerError from "@/components/shared/component-inner-error/component-inner-error";
import GenerateCustomChartTooltip from "@/components/shared/chart-card/custom-chart-tooltip";
const TotalRevenueDistribution = () => {
  const [config, setConfig] = useState({ interval: "1 MONTH", limit: 10 });
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["total-revenue-distribution", config],
    queryFn: () =>
      getRevenueShare({
        interval: config.interval as
          | "1 MONTH"
          | "3 MONTH"
          | "6 MONTH"
          | "1 YEAR",
        limit: config.limit,
      }),
    refetchOnWindowFocus: false,
  });

  const chartOptions: ApexOptions = useMemo(() => {
    if (!data?.data?.data) return {};

    const chartData = data.data.data;
    return {
      series: chartData.map((item) => item.revenue_share_percentage),
      chart: {
        type: "pie",
        height: 400,
        fontFamily: "Regular",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      labels: chartData.map((item) => item.product_name),
      colors: chartColors,
      title: {
        text: "سهم درآمد محصولات",
        align: "center",
        style: { fontFamily: "Medium", fontSize: "16px" },
      },
      legend: {
        show: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const productData = data.data.data[seriesIndex];

          return GenerateCustomChartTooltip({
            title: {
              title: "محصول",
              value: productData.product_name,
            },
            value: {
              title: "سهم از درآمد",
              value: productData.revenue_share_percentage.toString(),
              unit: "%",
            },
            description: {
              title: "مبلغ فروش",
              value: numberToPersianPrice(productData.total_revenue),
              unit: "تومان",
            },
          });
        },
      },
    };
  }, [data]);

  if (isError)
    return (
      <ComponentInnerError
        refetch={refetch}
        message="خطا"
        description="در بارگذاری اطلاعات خطایی رخ داده است"
      />
    );
  return (
    <div className="w-full flex flex-col gap-2 p-4 bg-Highlighter rounded-[10px] shadow font-Regular !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]">
      <div className="w-full flex items-center justify-between">
        <h2 className=" xl:text-lg ldxl:text-xl">سهم هر کالا از فروش کلی</h2>
        <FilterBar
          config={config}
          isLoading={isLoading}
          handleSubmit={(config) => {
            setConfig(config);
          }}
          INTERVAL_OPTIONS={[
            { value: "1 MONTH", label: "1 ماهه" },
            { value: "3 MONTH", label: "3 ماهه" },
            { value: "6 MONTH", label: "6 ماهه" },
            { value: "1 YEAR", label: "1 ساله" },
          ]}
        />
      </div>
      {isLoading || isRefetching ? (
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
        <div className="flex items-center justify-center grow h-full animate-fadeIn">
          <PieChartRightSideList
            chartColors={chartColors}
            products={data.data.data.map((item) => ({
              product_name: item.product_name,
            }))}
          />
          <div className="grow  h-full">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type={"pie"}
              width="100%"
              height={"90%"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalRevenueDistribution;
