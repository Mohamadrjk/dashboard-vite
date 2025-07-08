import { useQuery } from "@tanstack/react-query";
import { getWeeklyIncome } from "@/utils/dashboardServices"; // Adjust the import path
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import moment from "jalali-moment";

const useWeeklyIncome = () => {
  return useQuery({
    queryKey: ["WeeklyIncome"], // ✅ Unique key for caching & refetching
    queryFn: async () => {
      const data = await getWeeklyIncome();

      return {
        totalSales: data.data.total_sales,
        totalOrders: data.data.total_orders,
        salesData: data.data.weekly_sales.map((item) => item.total_sales),
        ordersData: data.data.weekly_sales.map((item) => item.sales_count),
        salesYData: data.data.weekly_sales.map((item) =>
          numberToPersianPrice(item.total_sales)
        ),
        categories: data.data.weekly_sales.map((item) =>
          moment(item.day_date).locale("fa").format("YYYY/MM/DD")
        ),
      };
    },
    staleTime: 15 * 60 * 1000, // ✅ Cache data for 5 minutes
    refetchOnWindowFocus: false, // ✅ Prevents unnecessary refetches
  });
};

export default useWeeklyIncome;
