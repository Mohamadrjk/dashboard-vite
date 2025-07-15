import { getSalesPercentages } from "@/api/product-analysis-apis/salesTrendAnalysisServise";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGoodsSalesPercentages = () => {
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["GoodsSalesPercentages"], // Cache based on params
    queryFn: () => getSalesPercentages(),

    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry on failure
  });

  const chartData = useMemo(() => {
    return {
      salesData: data?.data?.data
        .filter((item) => item.sales_percentage > 1)
        .map((item) => Number(item.sales_percentage) * 100),
      categories: data?.data?.data
        .filter((item) => item.sales_percentage > 1)
        .map((item) => item.product_name),
    };
  }, [data]);

  return {
    products: data?.data.data.filter((item) => item.sales_percentage > 1) ?? [],
    loading: isLoading || isRefetching,
    refetch,
    isError,

    chartData,
  };
};
