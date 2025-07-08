import {
  IProductItem,
  IProductResult,
} from "@/types/ditgitalmenu-types/product";
import { getProductsList } from "@/utils/digitalmenu-api/productService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

const useGetProductList = (refetchOnWindowFocus?: boolean) => {
  return useQuery<AxiosResponse<IProductResult>, Error>({
    queryKey: ["getProductsList"], // ✅ Correct queryKey syntax
    queryFn: () => getProductsList(), // ✅ Cleaner query function
    refetchOnWindowFocus, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
    staleTime: 10 * 60,
  });
};

const useProductList = (refetchOnWindowFocus?: boolean) => {
  const [ProductList, setProductList] = useState<IProductItem[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetProductList(refetchOnWindowFocus);

  useEffect(() => {
    if (data && data.data.data) {
      setProductList(() => data.data.data);
    }
  }, [data]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPage = useMemo(() => {
    if (ProductList) return ProductList.length;
  }, [ProductList]);

  // 🔪 Paginated list based on current page & size
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return ProductList.slice(start, start + pageSize);
  }, [ProductList, currentPage, pageSize]);
  return {
    isLoading,
    isRefetching,
    refetch,
    error,
    ProductList,
    setProductList,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    paginatedList,
    totalPage,
  };
};

export default useProductList;
