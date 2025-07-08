"use client";


import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";
import { ApexOptions } from "apexcharts";

interface OrderPerMonthChartProps {
  totalOrders: number;
  ordersData: number[];
  categories: string[];
}

const OrderPerMonthChart: React.FC<OrderPerMonthChartProps> = ({
  totalOrders,
  ordersData,
  categories,
}) => {
  const chartOptions: ApexOptions = {
    series: [
      {
        name: "تعداد سفارش", // Total Orders
        type: "column",
        data: ordersData,
        color: "#001529",
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
      width: [0],
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
            <strong>تعداد سفارش ها:</strong> ${sales} عدد
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
      chartContainerClass="w-full grow h-full "
      containerClassName="!aspect-[16/9] lg:!aspect-[16/5] dxl:!aspect-[16/7]"
      title="فروش ماهانه - تعداد سفارش ها"
      headerElement={
        <p>
          <span>مجموع تعداد فروش:</span>
          <span className="pr-1">
            {totalOrders}
            <span className="pr-1">عدد</span>
          </span>
        </p>
      }
    />
  );
};

export default OrderPerMonthChart;
