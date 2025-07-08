"use client";
import { getTopCitiesBySales } from "@/utils/report_sale-apis/report_saleService";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Alert, InputNumber, Select, Button } from "antd";
import { Skeleton } from "antd";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import CartCardContainer from "@/components/shared/chart-card/chart-card-containetr";
import GenerateCustomChartTooltip from "@/components/shared/chart-card/custom-chart-tooltip";

const TopCitiesBySales = () => {
  const [TopCitiesBySalesConfigs, setTopCitiesBySalesConfigs] = useState<{
    preset_interval: "1 WEEK" | "1 MONTH" | "1 YEAR";
    limit: number;
  }>({
    preset_interval: "1 WEEK",
    limit: 5,
  });
  const [tempTopCitiesBySalesConfigs, setTempTopCitiesBySalesConfigs] =
    useState<{
      preset_interval: "1 WEEK" | "1 MONTH" | "1 YEAR";
      limit: number;
    }>({
      preset_interval: "1 WEEK",
      limit: 5,
    });

  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["top-cities-by-sales", TopCitiesBySalesConfigs],
    queryFn: () =>
      getTopCitiesBySales({
        preset_interval: TopCitiesBySalesConfigs.preset_interval,
        limit: TopCitiesBySalesConfigs.limit,
      }),
    refetchOnWindowFocus: false,
  });

  const chartOptions: ApexOptions = useMemo(
    () =>
      data
        ? {
            series: [
              {
                data: data.data.data.map((item) => ({
                  x: item.city,
                  y: item.total_sales,
                })),
              },
            ],
            legend: {
              show: false,
            },
            chart: {
              height: 350,
              type: "treemap",
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
            colors: [
              "#3B93A5",
              "#F7B844",
              "#ADD8C7",
              "#EC3C65",
              "#CDD7B6",
              "#C1F666",
              "#D43F97",
              "#1E5D8C",
              "#421243",
              "#7F94B0",
              "#EF6537",
              "#C0ADDB",
            ],
            plotOptions: {
              treemap: {
                distributed: true,
                enableShades: false,
              },
            },
            tooltip: {
              enabled: true,
              theme: "light",
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return GenerateCustomChartTooltip({
                  title: {
                    title: "شهر",
                    value: data.data.data[dataPointIndex].city,
                  },
                  value: {
                    title: "فروش",
                    value: numberToPersianPrice(
                      data.data.data[dataPointIndex].total_sales
                    ),
                    unit: "تومان",
                  },
                  description: {
                    title: "تعداد فروش",
                    value: data.data.data[dataPointIndex].num_orders.toString(),
                    unit: "عدد",
                  },
                });
              },
            },
          }
        : {},
    [data]
  );

  const handleSubmit = () => {
    setTopCitiesBySalesConfigs(tempTopCitiesBySalesConfigs);
  };

  const handleIntervalChange = (value: string) => {
    setTempTopCitiesBySalesConfigs({
      ...tempTopCitiesBySalesConfigs,
      preset_interval: value as "1 WEEK" | "1 MONTH" | "1 YEAR",
    });
  };

  const handleLimitChange = (value: number) => {
    setTempTopCitiesBySalesConfigs({
      ...tempTopCitiesBySalesConfigs,
      limit: value,
    });
  };

  if (!isLoading && !isRefetching && isError)
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
      type="treemap"
      chartOptions={chartOptions}
      chartContainerClass="w-full grow h-full"
      containerClassName="!aspect-auto !h-full z-[2]"
      title="برترین شهرها بر اساس فروش"
      loadingComponent={
        isLoading || isRefetching ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <LoadingOutlined className="text-[100px]" />
          </div>
        ) : null
      }
      headerElement={
        <div className="flex items-center justify-end gap-4 w-full ">
          <span className="flex items-center gap-1">
            <span>تعداد</span>
            <InputNumber
              min={1}
              max={50}
              value={tempTopCitiesBySalesConfigs.limit}
              onChange={handleLimitChange}
              className="!w-12"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </span>
          <Select
            defaultValue={TopCitiesBySalesConfigs.preset_interval}
            style={{ width: 120 }}
            onChange={handleIntervalChange}
            options={[
              { value: "1 WEEK", label: "1 هفته" },
              { value: "1 MONTH", label: "1 ماه" },
              { value: "1 YEAR", label: "1 سال" },
            ]}
            className="!font-Medium"
            placeholder="انتخاب بازه زمانی"
            popupClassName="rtl-custom !font-Medium"
          />
          <Button
            type="primary"
            className="!font-Medium"
            onClick={handleSubmit}
            loading={isLoading || isRefetching}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          >
            <span>دریافت</span>
          </Button>
        </div>
      }
    />
  );
};

export default TopCitiesBySales;
