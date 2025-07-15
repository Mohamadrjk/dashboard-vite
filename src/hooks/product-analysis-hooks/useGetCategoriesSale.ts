import {
  getCategories,
  getCategoriesSale,
} from "@/api/product-analysis-apis/salesTrendAnalysisServise";
import { useQuery } from "@tanstack/react-query";
import { SelectProps } from "antd";
import { useMemo, useState } from "react";
import {
  ICategories,
  ICategoriesSale,
} from "@/types/product-analysis-apis-types/product-analysis-type";

const intervalOptions = {
  monthly: "ماهانه",
  quarterly: "فصلی",
  yearly: "سالانه",
} as const;

export const useCategoriesSale = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    string | undefined
  >(undefined);

  const [defaultPayload, setDefaultPayload] = useState(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return {
      start_date: sevenDaysAgo.toISOString().split("T")[0],
      end_date: today.toISOString().split("T")[0],
      limit: 10,
    };
  });

  // Categories query
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Sales data query
  const salesQuery = useQuery({
    queryKey: ["salesTrendAnalysis", defaultPayload, selectedCategories],
    queryFn: () =>
      getCategoriesSale({
        category_id: selectedCategories
          ? Number(selectedCategories)
          : undefined,
        end_date: defaultPayload.end_date,
        start_date: defaultPayload.start_date,
      }),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: true,
  });

  // Memoize category options for select
  const intervalItems: SelectProps["options"] = useMemo(() => {
    if (!categoriesQuery.data?.data?.data) return [];
    return categoriesQuery.data.data.data.map((item) => ({
      label: item.category_name,
      value: item.category_id,
    }));
  }, [categoriesQuery.data]);

  // Memoize chart data
  const chartData = useMemo(() => {
    const saleData = salesQuery.data?.data?.data;
    if (!saleData) {
      return {
        salesData: [],
        categories: [],
        ordersData: [],
        soldData: [],
      };
    }

    return {
      salesData: saleData.map((item) => Number(item.total_sales)),
      categories: saleData.map((item) => item.category_name),
      ordersData: saleData.map((item) => Number(item.total_orders)),
      soldData: saleData.map((item) => Number(item.total_quantity_sold)),
    };
  }, [salesQuery.data]);

  const handleChangeCat = (value: string | undefined) => {
    setSelectedCategories(value);
  };

  return {
    products: salesQuery.data?.data?.data ?? [],
    loading:
      salesQuery.isLoading ||
      salesQuery.isRefetching ||
      categoriesQuery.isLoading ||
      categoriesQuery.isRefetching,
    refetch: salesQuery.refetch,
    isError: salesQuery.isError || categoriesQuery.isError,
    error: salesQuery.error || categoriesQuery.error,
    items: intervalItems,
    isRefetching: salesQuery.isRefetching,
    chartData,
    refetchCats: categoriesQuery.refetch,
    intervalOptions,
    handleChangeCat,
    setDefaultPayload,
  };
};
