import { IBranchItem, IBranchResult } from "@/types/ditgitalmenu-types/branch";
import { getBranchesList } from "@/api/digitalmenu-api/branchesService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useMemo, useState } from "react";

const useGetBranchList = (refetchOnWindowFocus?: boolean) => {
  return useQuery<AxiosResponse<IBranchResult>, Error>({
    queryKey: ["getBranchesList"], // ✅ Correct queryKey syntax
    queryFn: () => getBranchesList(), // ✅ Cleaner query function
    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
    staleTime: 10 * 60,
  });
};

const useBranchList = (refetchOnWindowFocus?: boolean) => {
  const [branchList, setBranchList] = useState<IBranchItem[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetBranchList(refetchOnWindowFocus);
  const branchOptions = useMemo(() => {
    if (data && data.data.result) {
      setBranchList(() => data.data.result);
      return (
        data.data.result.map((i) => ({
          label: i.name,
          key: i.branch_id,
        })) ?? []
      );
    }
  }, [data]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPage = useMemo(() => {
    if (branchList) return branchList.length;
  }, [branchList]);

  // 🔪 Paginated list based on current page & size
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return branchList.slice(start, start + pageSize);
  }, [branchList, currentPage, pageSize]);
  return {
    isLoading: isLoading || isRefetching,
    refetch,
    branchOptions,
    error,
    branchList,
    setBranchList,
    totalPage,
    setCurrentPage,
    currentPage,
    pageSize,
    setPageSize,
    paginatedList,
  };
};

export default useBranchList;
