"use client";
import { getTopCustomers } from "@/api/report_sale-apis/report_saleService";
import { Alert, InputNumber, Button, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { RedoOutlined } from "@ant-design/icons";

import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import GenerateCustomChartTooltip from "@/components/shared-components/chart-card/custom-chart-tooltip";
import CartCardContainer from "@/components/shared-components/chart-card/chart-card-containetr";

const TopCustomersByers = () => {
  const [config, setConfig] = useState({ limit: 10 });
  const [tempConfig, setTempConfig] = useState(config);
  const { data, isError, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["top-customers-byers", config],
    queryFn: () => getTopCustomers({ limit: config.limit }),
    refetchOnWindowFocus: false,
  });

  const handleSubmit = () => setConfig(tempConfig);

  const chartOptions: ApexOptions = useMemo(() => {
    if (!data?.data?.data) return {};

    const chartData = data.data.data;
    return {
      series: [
        {
          name: "مجموع تعداد فروش", // Total Sales
          type: "line",
          data: chartData.map((item) => item.total_value),
          color: "#04E398",
        },
        {
          name: "تعداد سفارش", // Total Orders
          type: "column",
          data: chartData.map((item) => item.total_orders),
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
      },
      xaxis: {
        categories: chartData.map((item) => item.customer_name),
        formatter: (value: any) =>
          value.length > 10 ? value.substring(0, 10) + "..." : value,
      },
      legend: {
        show: false,
      },
      yaxis: [
        {
          title: {
            text: "ارزش خرید", // Sales Axis Label
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
        enabled: true,
        theme: "light",
        cssClass: "!bg-transparent",
        followCursor: true,
        custom: function ({ dataPointIndex }) {
          return GenerateCustomChartTooltip({
            title: {
              title: "مشتری",
              value: data.data.data[dataPointIndex].customer_name,
            },
            value: {
              title: "ارزش خرید",
              value: numberToPersianPrice(
                data.data.data[dataPointIndex].total_value * 10
              ),
              unit: "تومان",
            },
            description: {
              title: "تعداد سفارش",
              value: data.data.data[dataPointIndex].total_orders.toString(),
              unit: "عدد",
            },
          });
        },
      },
    };
  }, [data]);

  if ((!isLoading || !isRefetching) && isError)
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
      title="مشتریانی با بیشترین خرید "
      loadingComponent={
        (isLoading || isRefetching) && (
          <div className="w-full grow h-full">
            <Skeleton.Node active className="!w-full !h-full" />
          </div>
        )
      }
      headerElement={
        <div className="w-full  flex items-center gap-2 justify-end">
          <span className="flex items-center gap-1">
            <span>تعداد</span>
            <InputNumber
              min={1}
              max={100}
              value={config.limit}
              onChange={(value) => {
                if (value) setTempConfig({ ...tempConfig, limit: value });
              }}
              className="!w-12"
            />
          </span>
          <Button
            type="primary"
            onClick={handleSubmit}
            className="!font-Medium"
          >
            به روز رسانی
          </Button>
        </div>
      }
    />
  );
};

export default TopCustomersByers;
