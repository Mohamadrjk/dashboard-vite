"use client";
import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";
import { useSalesTrendAnalysis } from "@/hooks/product-analysis-hooks/useSalesTrendAnalysis";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { RedoOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Dropdown, Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import clsx from "clsx";

const SalesTrendAnalysis = () => {
  const {
    interval,
    isError,
    loading,
    refetch,
    items,
    handleMenuClick,
    chartData,
    intervalOptions,
  } = useSalesTrendAnalysis();
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
    series: [
      {
        name: "مجموع فروش", // Total Sales
        type: "column",
        data: chartData.salesData,
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
    colors: chartColors,
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
      strokeDashArray: 3,
    },
    xaxis: {
      categories: chartData?.categories?.map((item) =>
        item.length > 9 ? item.substring(0, 5) + "..." : item
      ) || [],
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
            <strong>محصول:</strong> ${chartData.categories[dataPointIndex]}
          </p>
          <p style="margin: 0;">
            <strong>فروش:</strong> ${numberToPersianPrice(sales)} تومان
          </p>
 
        </div>
      `;
      },
    },
  };

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
    <CartCardContainer
      type="line"
      chartOptions={chartOptions}
      chartContainerClass="w-full grow h-full !pb-0"
      title="روند فروش هر محصول"
      loadingComponent={
        loading && (
          <div className="w-full aspect-[16/6]">
            <Skeleton.Node active className="!w-full !h-full" />
          </div>
        )
      }
      headerElement={
        <div className="w-full flex justify-end">
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["monthly"],
              onClick: handleMenuClick,
            }}
            overlayClassName="!font-Medium !text-right"
            trigger={["click"]}
            className="!w-[150px] !rounded-[10px] bg-[#F5F5F5] cursor-pointer hover:first:!text-gray-800 "
          >
            <span
              className={clsx(
                "w-full font-Medium text-[15px] px-[10px] py-3  flex justify-between items-center transition-colors",
                interval ? "text-gray-800" : "text-gray-400"
              )}
            >
              <span>{intervalOptions[interval] ?? "بازه زمانی"}</span>
              <Icon icon="mingcute:down-line" width="22" height="22" />
            </span>
          </Dropdown>
        </div>
      }
    />
  );
};

export default SalesTrendAnalysis;
