"use client";
import moment from "jalali-moment";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import GenerateCustomChartTooltip from "@/components/shared/chart-card/custom-chart-tooltip";
const data = [
  {
    id_customer: 8,
    customer_name: "محمد حسین امینی گازار",
    purchase_month: "2024-12",
    total_orders: 1,
    total_value: 1100.0,
  },
  {
    id_customer: 8,
    customer_name: "محمد حسین امینی گازار",
    purchase_month: "2025-03",
    total_orders: 1,
    total_value: 29500.0,
  },
  {
    id_customer: 10,
    customer_name: "مهدی مهری",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 6061499.0,
  },
  {
    id_customer: 12,
    customer_name: "مهدی طاهرزاده",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 286000.0,
  },
  {
    id_customer: 12,
    customer_name: "مهدی طاهرزاده",
    purchase_month: "2025-01",
    total_orders: 1,
    total_value: 300000.0,
  },
  {
    id_customer: 14,
    customer_name: "مینا سعید آذری ",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 374500.0,
  },
  {
    id_customer: 18,
    customer_name: "مهسا باباخانی",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 775900.0,
  },
  {
    id_customer: 19,
    customer_name: "مهسا اطمینانی",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 2175000.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 1443800.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2024-11",
    total_orders: 1,
    total_value: 1521200.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2024-12",
    total_orders: 1,
    total_value: 769950.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2025-01",
    total_orders: 1,
    total_value: 1010400.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2025-02",
    total_orders: 1,
    total_value: 588000.0,
  },
  {
    id_customer: 20,
    customer_name: "مرتضی غیاثوند",
    purchase_month: "2025-03",
    total_orders: 1,
    total_value: 950400.0,
  },
  {
    id_customer: 22,
    customer_name: "سجاد صفاری",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 494030.0,
  },
  {
    id_customer: 22,
    customer_name: "سجاد صفاری",
    purchase_month: "2024-11",
    total_orders: 2,
    total_value: 683350.0,
  },
  {
    id_customer: 22,
    customer_name: "سجاد صفاری",
    purchase_month: "2025-01",
    total_orders: 1,
    total_value: 553000.0,
  },
  {
    id_customer: 22,
    customer_name: "سجاد صفاری",
    purchase_month: "2025-03",
    total_orders: 1,
    total_value: 457500.0,
  },
  {
    id_customer: 23,
    customer_name: "Mahta Farjood",
    purchase_month: "2024-10",
    total_orders: 1,
    total_value: 312000.0,
  },
];

const CustomerPurchasingTrendsData = () => {
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["customer-purchasing-trends-data"],
  //     queryFn: () => getKeyCustomerSalesTrend({ limit: 10 }),
  //   });

  const chartData = useMemo(() => {
    const groupedData = data.reduce((acc, curr) => {
      if (!acc[curr.purchase_month]) {
        acc[curr.purchase_month] = {};
      }
      if (!acc[curr.purchase_month][curr.customer_name]) {
        acc[curr.purchase_month][curr.customer_name] = 0;
      }
      acc[curr.purchase_month][curr.customer_name] += Number(curr.total_value);
      return acc;
    }, {});

    return groupedData;
  }, [data]);

  const customerNames = useMemo(() => {
    const customersSet = new Set();
    Object.values(chartData).forEach((monthData) => {
      Object.keys(monthData).forEach((customer) => customersSet.add(customer));
    });
    return Array.from(customersSet);
  }, [chartData]);

  const chartOptions: ApexOptions = useMemo(() => {
    return {
      series: [
        ...customerNames.map((customer: string) => ({
          name: customer,
          data: Object.keys(chartData).map(
            (month) => chartData[month][customer] || 0
          ),
        })),
      ],
      chart: {
        type: "bar",

        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        fontFamily: "Regular",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3,
          borderRadiusApplication: "end", // 'around', 'end'

          dataLabels: {
            total: {
              enabled: true,
              formatter: function (val: string) {
                return numberToPersianPrice(Number(val) * 10);
              },
              style: {
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "Regular",
              },
            },
          },
        },
      },
      xaxis: {
        categories: Object.keys(chartData).map((date) =>
          moment(date).locale("fa").format("jMMMM jYYYY")
        ),
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
      ],
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },

      tooltip: {
        enabled: true,
        theme: "light",
        cssClass: "!bg-transparent",
        followCursor: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return GenerateCustomChartTooltip({
            title: {
              title: "مشتری",
              value: customerNames[seriesIndex] as string,
            },
            value: {
              title: "ارزش خرید",
              value: numberToPersianPrice(
                series[seriesIndex][dataPointIndex] * 10
              ),
              unit: "تومان",
            },
            description: {
              title: "تعداد سفارش",
              value:
                chartData[Object.keys(chartData)[dataPointIndex]][
                  customerNames[seriesIndex] as string
                ].toString(),
              unit: "عدد",
            },
          });
        },
      },
    };
  }, [chartData]);

  // console.log(chartData, [
  //   ...Object.entries(chartData).map(([date, items]: [string, any[]]) => ({
  //     name: moment(date).format("jMMMM jYYYY"),
  //     data: items.map((item) => Number(item.total_value)),
  //   })),
  // ]);

  return (
    <div className="w-full !aspect-[16/5] xl:!aspect-[16/11] dxl:!aspect-[16/5] ldxl:!aspect-[17/4] bg-Highlighter rounded-[10px] p-2 flex items-center justify-center">
      <div className="w-full h-full">
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CustomerPurchasingTrendsData;
