import {
  IAvailableProductsReport,
  ICustomersActivityReports,
  ITotalSalesReport,
} from "@/types/sales-per-month";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react/dist/iconify.js";
import TopBarCardItem, { TopBarCardItemProps } from "./topBarCardItem";
import { memo } from "react";

interface DashboardTopBarCardsContainerProps {
  productsData?: IAvailableProductsReport | null;
  customersData?: ICustomersActivityReports | null;
  totalSalesData?: ITotalSalesReport | null;
}

const DashboardTopBarCardsContainer: React.FC<
  DashboardTopBarCardsContainerProps
> = ({ customersData, productsData, totalSalesData }) => {
  const topBarItems: TopBarCardItemProps[] = [
    {
      cardClass:
        "col-span-1 animate-fadeIn w-[25vw] dxl:w-full xl:aspect-[16/6] dxl:aspect-[17/6] vdxl:aspect-[17/5] bg-Highlighter rounded-[10px] flex p-2 shadow",
      cardTitle: "فروش کل",
      cardValue: (
        <span>{numberToPersianPrice(totalSalesData?.total_sales ?? 0)}</span>
      ),
      cardGrowth: Number(totalSalesData?.growth_percentage.toFixed(2) || 0),
      icon: (
        <Icon
          icon="solar:sale-linear"
          width="24"
          height="24"
          className="text-gray-700"
        />
      ),
      type: "default",
      elemntIndixcator: <Icon icon="carbon:growth" width="24" height="24" />,
    },
    {
      cardClass:
        "col-span-1 animate-fadeIn w-full xl:aspect-[16/6] dxl:aspect-[17/6] vdxl:aspect-[17/5] bg-Highlighter rounded-[10px] flex p-2 shadow",
      cardTitle: "تعداد کل مشتریان",
      cardValue: <span>{customersData?.total_customers ?? 0}</span>,
      cardGrowth: customersData?.total_customers_growth ?? 0,
      icon: (
        <Icon
          icon="mdi:users"
          width="24"
          height="24"
          className="text-gray-700"
        />
      ),
      type: "default",
      elemntIndixcator: <Icon icon="carbon:growth" width="24" height="24" />,
    },
    {
      cardClass:
        "col-span-1 animate-fadeIn w-full xl:aspect-[16/6] dxl:aspect-[17/6] vdxl:aspect-[17/5] bg-Highlighter rounded-[10px] flex p-2 shadow",
      cardTitle: "تعداد مشتریان فعال",
      cardValue: <span>{customersData?.active_customers ?? 0}</span>,
      cardGrowth: customersData?.active_customers_growth ?? 0,
      icon: (
        <Icon
          icon="mdi:users"
          width="24"
          height="24"
          className="text-gray-700"
        />
      ),
      type: "default",
      elemntIndixcator: <Icon icon="carbon:growth" width="24" height="24" />,
    },
    {
      cardClass:
        "col-span-1 animate-fadeIn w-full xl:aspect-[16/6] dxl:aspect-[17/6] vdxl:aspect-[17/5] bg-Highlighter rounded-[10px] flex p-2 shadow",
      cardTitle: "تعداد کالاهای موجود",
      cardValue: <span>{productsData?.available_products}</span>,
      cardGrowth: productsData?.out_of_stock_products || 0,
      icon: (
        <Icon
          icon="ant-design:product-outlined"
          width="24"
          height="24"
          className="text-gray-700"
        />
      ),
      type: "product",
      elemntIndixcator: <span>کالا ناموجود</span>,
    },
  ];

  return topBarItems.map((item, index) => (
    <TopBarCardItem key={index} {...item} />
  ));
};

const MemoizedDashboardTopBarCardsContainer = memo(
  DashboardTopBarCardsContainer
);

export default MemoizedDashboardTopBarCardsContainer;
