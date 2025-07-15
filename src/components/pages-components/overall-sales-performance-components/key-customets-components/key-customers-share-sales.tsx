"use client";
import { getKeyCustomerSalesShare } from "@/api/report_sale-apis/report_saleService";
import { RedoOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, InputNumber, Skeleton, Tooltip } from "antd";
import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";

const KeyCustomersShareSales = () => {
  const [config, setConfig] = useState({ limit: 10 });
  const [tempConfig, setTempConfig] = useState(config);
  const { data, isError, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["key-customers-share-sales", config],
    queryFn: () => getKeyCustomerSalesShare({ limit: config.limit }),
    refetchOnWindowFocus: false,
  });

  const handleSubmit = () => setConfig(tempConfig);

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

  const chartData = useMemo(() => {
    return !data?.data?.data
      ? []
      : data.data.data
          .slice(0, config.limit)
          .filter((item) => item.customer_sales_percentage > 0.5)
          .map((item) => ({
            customer_name: item.customer_name,
            customer_sales_percentage: item.customer_sales_percentage,
          }));
  }, [data, config.limit]);

  const chartOptions: ApexOptions = {
    series: chartData.map((item) => item.customer_sales_percentage),
    legend: {
      show: false,
    },
    colors: chartColors,
    chart: {
      type: "polarArea",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Regular",
    },
    labels: chartData.map((item) => item.customer_name),
    fill: {
      opacity: 0.9,
    },

    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 1 },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
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
      <div className="w-full flex items-center justify-between gap-2">
        <h2 className=" xl:text-lg ldxl:text-xl">سهم هر کالا از فروش کلی</h2>
        <div className="w-max  flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span>تعداد</span>
            <InputNumber
              min={1}
              max={100}
              value={config.limit}
              onChange={(value) =>
                setTempConfig({ ...tempConfig, limit: value })
              }
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
        <div className="flex items-center grow h-full animate-fadeIn">
          <ul
            dir="rtl"
            className="w-max flex flex-col gap-2 h-full overflow-y-auto max-h-[250px]"
          >
            {chartData.map((customer, index) => {
              return (
                <Tooltip
                  key={index}
                  title={
                    <span
                      dir="rtl"
                      className="line-clamp-2 w-full !font-Regular"
                    >
                      {customer.customer_name}
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
                      {customer.customer_name}
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
              type={"polarArea"}
              width="100%"
              height={"100%"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyCustomersShareSales;
