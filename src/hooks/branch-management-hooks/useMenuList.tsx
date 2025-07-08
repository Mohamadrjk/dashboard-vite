import { IMenuItem, IMenuResult } from "@/types/ditgitalmenu-types/menu";
import { getMenuList } from "@/utils/digitalmenu-api/menuService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

const useGetMenuList = (refetchOnWindowFocus?: boolean) => {
  return useQuery<AxiosResponse<IMenuResult>, Error>({
    queryKey: ["getMenuList"], // ✅ Correct queryKey syntax
    queryFn: () => getMenuList(), // ✅ Cleaner query function
    refetchOnWindowFocus: refetchOnWindowFocus, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
  });
};

const useMenuList = (refetchOnWindowFocus?: boolean) => {
  const [MenuList, setMenuList] = useState<IMenuItem[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetMenuList(refetchOnWindowFocus);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPage = useMemo(() => {
    if (MenuList) return MenuList.length;
  }, [MenuList]);

  // 🔪 Paginated list based on current page & size
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return MenuList.slice(start, start + pageSize);
  }, [MenuList, currentPage, pageSize]);
  useEffect(() => {
    if (data && data.data) {
      setMenuList(() => data.data.data);
    }
  }, [data]);
  return {
    isLoading,
    isRefetching,
    refetch,
    error,
    MenuList,
    paginatedList,
    setCurrentPage,
    pageSize,
    currentPage,
    totalPage,
    setPageSize,
    setMenuList,
  };
};

export default useMenuList;
