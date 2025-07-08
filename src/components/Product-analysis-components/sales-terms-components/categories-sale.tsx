"use client";
import SalesByGenderAndCityReportConfigs from "@/components/gender-components/new-cityGenders-report/city-and-gender-dateFilter";
import CartCardContainer from "@/components/shared/chart-card/chart-card-containetr";
import { useCategoriesSale } from "@/hooks/product-analysis-hooks/useGetCategoriesSale";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Select, Skeleton } from "antd";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";

const CategoriesSaleInPeriodOfTime = () => {
  const {
    isError,
    items,
    loading,
    products,
    refetch,

    chartData,
    refetchCats,
    intervalOptions,
    setDefaultPayload,
    handleChangeCat,
    isRefetching,
  } = useCategoriesSale();

  const chartOptions: ApexOptions = useMemo(() => {
    return {
      series: [
        {
          name: "مجموع فروش", // Total Sales
          type: "line",
          data: chartData.salesData,
          color: "#04E398",
        },
        {
          name: "تعداد سفارش", // Total Orders
          type: "column",
          data: chartData?.ordersData,
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
      legend: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: [3, 0], // Line thickness for sales, no stroke for orders
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
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
            formatter: (value) => `${numberToPersianPrice(value * 10)}`,
            style: { cssClass: "" },
          },
        },
        {
          opposite: true,
          title: {
            text: "تعداد سفارش", // Orders Axis Label
          },
          labels: {
            formatter: (value) => `${value}`,
            style: { cssClass: "" },
          },
        },
      ],
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const month = chartData.categories[dataPointIndex];
          const sales = series[0][dataPointIndex];
          const orders = series[1][dataPointIndex];
          return `
        <div style="background: #002140;color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
          <p style="margin: 0;">
            <span>دسته‌بندی:</span> ${month}
          </p>
          <p style="margin: 0;">
            <span>فروش:</span> ${numberToPersianPrice(sales * 10)} تومان
          </p>
          <p style="margin: 0;">
            <span>تعداد سفارش:</span> ${orders}
          </p>
        </div>
      `;
        },
      },
    };
  }, [chartData]);

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
      chartContainerClass="w-full grow h-full"
      title="فروش هر دسته‌بندی"
      loadingComponent={
        loading && (
          <div className="w-full grow h-full">
            <Skeleton.Node active className="!w-full !h-full" />
          </div>
        )
      }
      headerSecondElement={
        <div className="flex items-center gap-2">
          <Select
            style={{ width: "120px", direction: "rtl" }}
            className="!font-Regular"
            onChange={handleChangeCat}
            options={[{ label: "همه", value: 0 }, ...items]}
            placeholder="انتخاب دسته‌بندی"
            popupClassName="rtl-custom !font-Regular"
            loading={loading}
            allowClear
          />
        </div>
      }
      headerElement={
        <div className="max-w-max">
          <SalesByGenderAndCityReportConfigs
            onlyDate={true}
            getDataWithReactQuery={setDefaultPayload}
            loading={isRefetching}
          />
        </div>
      }
    />
  );
};

export default CategoriesSaleInPeriodOfTime;
