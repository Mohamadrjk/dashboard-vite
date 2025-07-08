"use client";

import { useQuery } from "@tanstack/react-query";
import { getSalesComparison } from "@/utils/report_sale-apis/report_saleService";
import { useMemo, useState } from "react";
import { Select, Skeleton } from "antd";
import ComponentInnerError from "@/components/shared/component-inner-error/component-inner-error";
import { chartColors } from "@/components/shared/chart-card/charts-certain-data";
import PieChartRightSideList from "@/components/shared/chart-card/pieChart-right-silde-list";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
const INTERVAL_OPTIONS = [
  {
    value: "PREVIOUS_MONTH",
    label: "ماه قبل",
  },
  {
    value: "TWO_MONTHS_AGO",
    label: "2 ماه قبل",
  },
  {
    value: "THREE_MONTHS_AGO",
    label: "3 ماه قبل",
  },
  {
    value: "LAST_YEAR_SAME_MONTH",
    label: "سال گذشته در همان ماه",
  },
];

const INTERVAL_OPTIONS_LABELS = [
  { key: "current_month_sales", label: "فروش این ماه" },
  { key: "selected_month_sales", label: "فروش ماه انتخابی" },
  { key: "sales_difference", label: "اختلاف فروش" },
  { key: "percentage_difference", label: "درصد تغییر" },
];

const SalesComparison = () => {
  const [interval, setInterval] = useState<
    | "PREVIOUS_MONTH"
    | "TWO_MONTHS_AGO"
    | "THREE_MONTHS_AGO"
    | "LAST_YEAR_SAME_MONTH"
  >("TWO_MONTHS_AGO");
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["sales-comparison", interval],
    queryFn: () => getSalesComparison({ interval: "PREVIOUS_MONTH" }),
    refetchOnWindowFocus: false,
  });

  const handleIntervalChange = (
    interval:
      | "PREVIOUS_MONTH"
      | "TWO_MONTHS_AGO"
      | "THREE_MONTHS_AGO"
      | "LAST_YEAR_SAME_MONTH"
  ) => {
    setInterval(interval);
  };

  const chartOptions: ApexOptions = useMemo(() => {
    if (!data?.data?.data) return {};

    const chartData = data.data.data;
    return {
      series: [
        chartData.current_month_sales,
        chartData.selected_month_sales,
        chartData.sales_difference,
        chartData.percentage_difference,
      ],
      chart: {
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
              color: "#333",
              offsetY: -7,
              fontFamily: "Medium",
            },
            value: {
              show: true,
              fontSize: "12px",
              fontWeight: 600,
              color: "#000",
              offsetY: 10,
              fontFamily: "Regular",
              formatter: function (val, { seriesIndex, w }) {
                // Convert number to Persian format and append the correct unit
                return `${val < 100 ? "%" : "تومان"} ${numberToPersianPrice(
                  val
                )}`;
              } as unknown as (val: number) => string,
            },
          },

          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -6,
            fontSize: "12px",
            fontFamily: "Regular",
            formatter: function (seriesName, opts) {
              return (
                seriesName +
                ":  " +
                numberToPersianPrice(opts.w.globals.series[opts.seriesIndex])
              );
            },
          },
        },
      },
      colors: ["#001529", "#002140", "#0F4D97", "#0046AA"],
      labels: INTERVAL_OPTIONS_LABELS.map((item) => item.label),
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
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
    <div className="w-full flex flex-col gap-2 p-4 bg-Highlighter rounded-[10px] shadow font-Regular !aspect-[16/5] xl:!aspect-auto h-full">
      <div className="w-full flex items-center justify-between">
        <h2 className=" xl:text-lg ldxl:text-xl">
          مقایسه فروش در بازه‌های زمانی مشابه
        </h2>
        <Select
          defaultValue={interval}
          style={{ width: 180 }}
          onChange={(value) => handleIntervalChange(value)}
          options={INTERVAL_OPTIONS}
          className="!font-Medium"
          placeholder="انتخاب بازه زمانی"
          popupClassName="rtl-custom !font-Medium"
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
            products={INTERVAL_OPTIONS_LABELS.map((item) => ({
              product_name: `${item.label}: ${numberToPersianPrice(
                data?.data?.data[item.key]
              )} ${item.key == "percentage_difference" ? "%" : "تومان"}`,
            }))}
            wrapperClassName="!w-[40%]"
            listItemClassName="[&_.name-item]:max-w-full "
          />
          <div className="grow flex items-center justify-center h-full [&_svg]:!h-max [&_svg]:!flex [&_svg]:!items-center  [&_svg]:my-auto first:!h-max first:!my-auto">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type={"radialBar"}
              width="100%"
              height={300}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesComparison;
