"use client";

import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

import { ApexOptions } from "apexcharts";

interface SalePerMonthChartProps {
  totalSales: number;
  salesData: number[];
  categories: string[];
}

const SalePerMonthChart: React.FC<SalePerMonthChartProps> = ({
  salesData,
  categories,
  totalSales,
}) => {
  const chartOptions: ApexOptions = {
    series: [
      {
        name: "مجموع فروش", // Total Sales
        type: "column",
        data: salesData,
        color: "#04E398",
      },
    ],

    chart: {
      height: 450,
      type: "line", // Multi-type chart
      zoom: { enabled: false },
      fontFamily: "Regular",
      toolbar: { show: false },
      animations: { enabled: true, speed: 200 },
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
      width: [0], // Line thickness for sales, no stroke for orders
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
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
      categories: categories,
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
    ],
    tooltip: {
      custom: function ({ series, dataPointIndex }) {
        const sales = series[0][dataPointIndex];

        return `
        <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
          <p style="margin: 0;">
            <strong>ماه:</strong> ${categories[dataPointIndex]}
          </p>
          <p style="margin: 0;">
            <strong>فروش:</strong> ${numberToPersianPrice(sales)} تومان
          </p>
 
        </div>
      `;
      },
    },
  };

  return (
    <CartCardContainer
      type="line"
      chartOptions={chartOptions}
      chartContainerClass="w-full grow h-full"
      containerClassName="!aspect-[16/9] lg:!aspect-[16/5] dxl:!aspect-[16/7]"
      title="فروش ماهانه - مجموع فروش"
      headerElement={
        <p>
          <span>مجموع فروش:</span>
          <span className="pr-1">
            {numberToPersianPrice(totalSales)}
            <span className="pr-1">تومان</span>
          </span>
        </p>
      }
    />
  );
};

export default SalePerMonthChart;
