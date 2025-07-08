"use client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Alert, Button, InputNumber, Select } from "antd";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { ApexOptions } from "apexcharts";

import { getProductSalesAnalysis } from "@/utils/report_sale-apis/report_saleService";
import CartCardContainer from "@/components/shared/chart-card/chart-card-containetr";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

const INTERVAL_OPTIONS = [
  { value: "1 MONTH", label: "1 ماه" },
  { value: "3 MONTH", label: "3 ماه" },
  { value: "6 MONTH", label: "6 ماه" },
  { value: "1 YEAR", label: "1 سال" },
];

const BottomSellingProductsAnalysis = () => {
  const [config, setConfig] = useState({ interval: "1 MONTH", limit: 5 });
  const [tempConfig, setTempConfig] = useState(config);

  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["top-selling-products-analysis", config],
    queryFn: () =>
      getProductSalesAnalysis(
        config as {
          interval: "1 MONTH" | "3 MONTH" | "6 MONTH" | "1 YEAR";
          limit: number;
        }
      ),
    refetchOnWindowFocus: false,
  });

  const chartOptions = useCallback(
    (entryData: "top_products" | "bottom_products"): ApexOptions => {
      if (!data?.data?.data) return {};

      const chartData = data.data.data[entryData];

      return {
        series: [
          {
            name: "مبلغ فروش",
            type: "column",
            data: chartData.map((item) => item.total_revenue),
            color: "#001529",
          },
          {
            name: "تعداد فروش",
            type: "line",
            data: chartData.map((item) => item.total_sales),
            color: "#04E398",
          },
        ],
        chart: {
          height: 450,
          type: "line",
          zoom: { enabled: false },
          fontFamily: "Regular",
          toolbar: { show: false },
          animations: { enabled: true, speed: 200 },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
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
          width: [1, 1, 4],
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "30%",
            borderRadius: 3,
            borderRadiusApplication: "end",
          },
        },
        title: {
          text: "",
          align: "right",
          style: { fontFamily: "Medium" },
        },

        grid: {
          row: {
            colors: ["transparent", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: chartData.map((item) =>
            item.product_name.length > 9
              ? item.product_name.substring(0, 9) + "..."
              : item.product_name
          ),
        },
        yaxis: [
          {
            title: {
              text: "مجموع فروش (تومان)", // Sales Axis Label
            },
            labels: {
              formatter: (value) => `${numberToPersianPrice(value)}`,
              style: { cssClass: "" },
            },
          },
          {
            opposite: true,
            title: {
              text: "تعداد فروش", // Orders Axis Label
            },
            labels: {
              formatter: (value) => `${value}`,
              style: { cssClass: "" },
            },
            min: 0,
          },
        ],
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const productData = chartData[dataPointIndex];

            return `
          <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
            <p style="margin: 0;">
              <span>محصول:</span> ${productData.product_name}
            </p>
            <p style="margin: 0;">
              <span>مبلغ فروش:</span> ${numberToPersianPrice(
                productData.total_revenue * 10
              )} تومان
            </p>
            <p style="margin: 0;">
              <span>تعداد فروش:</span> ${productData.total_sales} عدد
            </p>
          </div>
        `;
          },
        },
      };
    },
    [data]
  );

  const handleSubmit = () => setConfig(tempConfig);

  if (!isLoading && !isRefetching && isError)
    return (
      <div className="relative font-Regular">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button onClick={() => refetch()} className="absolute left-2 top-2">
          <RedoOutlined />
        </button>
      </div>
    );

  return (
    <>
      <CartCardContainer
        type="bar"
        chartOptions={chartOptions("bottom_products")}
        chartContainerClass="w-full h-full"
        containerClassName="!aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/8] ldxl:!aspect-[17/7]"
        title="کمترین فروش محصولات"
        loadingComponent={
          isLoading || isRefetching ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <LoadingOutlined className="text-[100px]" />
            </div>
          ) : null
        }
        headerElement={
          <div className="w-full flex items-center justify-end gap-4">
            <span className="flex items-center gap-1">
              <span>تعداد</span>
              <InputNumber
                min={1}
                max={50}
                value={tempConfig.limit}
                onChange={(value) =>
                  setTempConfig({ ...tempConfig, limit: value })
                }
                className="!w-12"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </span>
            <Select
              defaultValue={config.interval}
              style={{ width: 120 }}
              onChange={(value) =>
                setTempConfig({ ...tempConfig, interval: value })
              }
              options={INTERVAL_OPTIONS}
              className="!font-Medium"
              placeholder="انتخاب بازه زمانی"
              popupClassName="rtl-custom !font-Medium"
            />
            <Button
              type="primary"
              className="!font-Medium"
              onClick={handleSubmit}
              loading={isLoading || isRefetching}
            >
              دریافت
            </Button>
          </div>
        }
      />
    </>
  );
};

export default BottomSellingProductsAnalysis;
