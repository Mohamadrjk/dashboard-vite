import {
  getActiveCustomers,
  getAvailableProducts,
  getTotalSales,
} from "@/utils/dashboardServices";
import { useQueries } from "@tanstack/react-query";

const useDashboardCardsData = () => {
  const [customersQuery, productsQuery, totalSalesQuery] = useQueries({
    queries: [
      {
        queryKey: ["ActiveCustomers"],
        queryFn: () => getActiveCustomers(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["AvailableProducts"],
        queryFn: () => getAvailableProducts(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["TotalSales"],
        queryFn: () => getTotalSales(),
        refetchOnWindowFocus: false,
      },
    ],
  });

  return {
    totalSalesData: totalSalesQuery.data?.data?.data || null,
    customersData: customersQuery.data?.data || null,
    productsData: productsQuery.data?.data || null,
    isLoading:
      customersQuery.isLoading ||
      productsQuery.isLoading ||
      totalSalesQuery.isLoading,
    isRefetching:
      customersQuery.isRefetching ||
      productsQuery.isRefetching ||
      totalSalesQuery.isRefetching,
    isError:
      customersQuery.isError ||
      productsQuery.isError ||
      totalSalesQuery.isError,
    refetch: () => {
      customersQuery.refetch();
      productsQuery.refetch();
      totalSalesQuery.refetch();
    },
  };
};

export default useDashboardCardsData;
