import { getSalesTrendAnalysis } from "@/utils/product-analysis-apis/salesTrendAnalysisServise";
import { useQuery } from "@tanstack/react-query";
import { MenuProps } from "antd";
import { useMemo, useState } from "react";
const intervalOptions = {
  monthly: "ماهانه",
  quarterly: "فصلی",
  yearly: "سالانه",
};

export const useSalesTrendAnalysis = () => {
  const [interval, setInterval] = useState<
    "monthly" | "quarterly" | "yearly" | undefined
  >("monthly");
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["salesTrendAnalysis", productId, interval], // Cache based on params
    queryFn: () =>
      getSalesTrendAnalysis({
        interval: interval,
        productId: productId,
      }),
    enabled: !!interval, // Only fetch when interval is provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry on failure
  });

  const intervalItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        label: "ماهانه",
        key: "monthly",
      },
      {
        label: "فصلی",
        key: "quarterly",
      },
      {
        label: "سالانه",
        key: "yearly",
      },
    ];
  }, [data]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setInterval(e.key as "monthly" | "quarterly" | "yearly");
  };

  const chartData = useMemo(() => {
    return {
      salesData: data?.data?.data.map((item) => Number(item.total_sales)),
      categories: data?.data?.data.map((item) => item.product_name),
    };
  }, [data]);

  return {
    products: data?.data.data ?? [],
    loading: isLoading || isRefetching,
    refetch,
    isError,
    productId,
    setInterval,
    setProductId,
    interval,
    items: intervalItems,
    handleMenuClick,
    chartData,
    intervalOptions,
  };
};
