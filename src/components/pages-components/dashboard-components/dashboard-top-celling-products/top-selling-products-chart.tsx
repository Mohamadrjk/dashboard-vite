/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";
import { ApexOptions } from "apexcharts";

interface TopSellingProductsProps {
  salesData: number[];
  categories: string[];
  chartColors: string[];
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({
  salesData,
  categories,
  chartColors,
}) => {
  const chartOptions: ApexOptions = {
    series: [
      {
        name: "توزیع محصولات", // Total Sales

        data: salesData,
      },
    ],
    legend: {
      show: false,
    },
    colors: chartColors,
    chart: {
      height: 450,
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
        distributed: true,
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
      labels: {
        style: {
          colors: chartColors,
          fontSize: "10px",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "تعداد فروش", // Sales Axis Label
        },
        labels: {
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
            <strong>محصول:</strong> ${categories[dataPointIndex]}
          </p>
             <p style="margin: 0;">
            <strong>تعداد فروش:</strong> ${sales} عدد
          </p>
 
        </div>
      `;
      },
    },
  };

  return (
    <CartCardContainer
      type="bar"
      chartOptions={chartOptions}
      chartContainerClass="w-full grow h-full"
      title="توزیع محصولات"
    />
  );
};

export default TopSellingProducts;
