import { ISurvey } from "@/types/club-types/club-surveys-type";
import {
  IClubHttpResult,
  ITableResult,
} from "@/api/club-api/club-http-result";
import { getCompanySurveyList } from "@/api/club-api/club-survey-service";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

const useSurveys = (currentPage: number, pageSize: number) => {
  return useQuery<IClubHttpResult<ITableResult<ISurvey[]>>, Error>({
    queryKey: ["ClubSurveysManagementPage", currentPage], // ✅ Correct queryKey syntax
    queryFn: () => getCompanySurveyList({ page: currentPage, size: pageSize }), // ✅ Cleaner query function
    staleTime: 1000 * 60 * 5, // ✅ Data is fresh for 5 minutes before refetching

    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
  });
};
const useSurveyTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: keyof ISurvey | null;
    order: "ascend" | "descend" | null;
  }>({
    columnKey: null,
    order: null,
  });

  const { data, error, isLoading, refetch, isRefetching } = useSurveys(
    currentPage,
    pageSize
  );
  const totalPage = useMemo(() => {
    if (data) {
      return data.result.maxPages;
    }
  }, [data]);

  // Sorting logic
  const sortData = (
    data: ISurvey[],
    column: keyof ISurvey,
    order: "ascend" | "descend" | null
  ): ISurvey[] => {
    if (!order) return data; // Reset if no order selected

    return [...data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (column === "createdAt") {
        return order === "ascend"
          ? new Date(valueA as string).getTime() -
              new Date(valueB as string).getTime()
          : new Date(valueB as string).getTime() -
              new Date(valueA as string).getTime();
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "ascend" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "ascend"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  };

  // Memoized sorted data to prevent unnecessary recalculations
  const sortedData = useMemo(() => {
    return data?.result?.data
      ? sortData(data.result.data, sortedInfo.columnKey!, sortedInfo.order)
      : [];
  }, [data, sortedInfo]);

  // Toggle sorting order for a column
  const toggleSortOrder = (column: keyof ISurvey) => {
    setSortedInfo((prevState) => {
      const newOrder =
        prevState.columnKey === column
          ? prevState.order === "ascend"
            ? "descend"
            : prevState.order === "descend"
            ? null
            : "ascend"
          : "ascend";

      return { columnKey: column, order: newOrder };
    });
  };

  return {
    sortedData,
    sortedInfo,
    toggleSortOrder,
    setSortedInfo,
    error,
    isLoading,
    isRefetching,
    refetch,
    setPageSize,
    pageSize,
    totalPage,
    currentPage,
    setCurrentPage,
  };
};

export { useSurveyTable, useSurveys };
