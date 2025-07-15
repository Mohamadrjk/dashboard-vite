import { useQuery } from "@tanstack/react-query";
import { getSalesPerMonth } from "@/api/dashboardServices"; // Adjust the import path
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import moment from "jalali-moment";
const useSalesPerMonth = () => {
  return useQuery({
    queryKey: ["SalesPerMonth"], // ✅ Unique key for caching & refetching
    queryFn: async () => {
      const data = await getSalesPerMonth();

      return {
        totalSales: data.data.total_period_sales,
        totalOrders: data.data.total_period_orders,
        salesData: data.data.monthly_sales.map((item) => item.total_sales),
        ordersData: data.data.monthly_sales.map((item) => item.total_orders),
        salesYData: data.data.monthly_sales.map((item) =>
          numberToPersianPrice(item.total_sales)
        ),
        categories: data.data.monthly_sales.map((item) => item.month),
      };
    },
    staleTime: 15 * 60 * 1000, // ✅ Cache data for 5 minutes
    refetchOnWindowFocus: false, // ✅ Prevents unnecessary refetches
  });
};

export default useSalesPerMonth;
