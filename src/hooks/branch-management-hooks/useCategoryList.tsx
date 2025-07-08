import {
  ICategoryItem,
  ICategoryResult,
} from "@/types/ditgitalmenu-types/category";
import { getCategoryList } from "@/utils/digitalmenu-api/categoryService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

const useGetCategoryList = (refetchOnWindowFocus?: boolean) => {
  return useQuery<AxiosResponse<ICategoryResult>, Error>({
    queryKey: ["getCategoryList"], // ✅ Correct queryKey syntax
    queryFn: () => getCategoryList(), // ✅ Cleaner query function
    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
    staleTime: 10 * 60,
  });
};

const useCategoryList = (refetchOnWindowFocus?: boolean) => {
  const [CategoryList, setCategoryList] = useState<ICategoryItem[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetCategoryList(refetchOnWindowFocus);
  const categoryOption = useMemo(() => {
    if (data && data.data.result) {
      setCategoryList(() => data.data.result);
      return (
        data.data.result.map((i) => ({
          label: i.name,
          key: i.category_id,
        })) ?? []
      );
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPage = useMemo(() => {
    if (CategoryList) return CategoryList.length;
  }, [CategoryList]);

  // 🔪 Paginated list based on current page & size
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return CategoryList.slice(start, start + pageSize);
  }, [CategoryList, currentPage, pageSize]);

  return {
    categoryOption,
    isLoading,
    isRefetching,
    refetch,
    error,
    CategoryList,
    setCategoryList,
    paginatedList,
    currentPage,
    setCurrentPage,
    totalPage,
    setPageSize,
    pageSize,
  };
};

export default useCategoryList;
