import { getClubCustomersList } from "@/utils/club-api/club-customers-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export interface IMapCustomer {
  id: number;
  fullName: string;
  number: string;
  sex: boolean;
  signDate: string;
  score: number;
  usedScore: number;
  levelName: string;
  province: string;
  city: string;
}

const useGetCustomersList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["clubCostomersList", currentPage, pageSize],
    queryFn: () => getClubCustomersList({ page: currentPage, size: pageSize }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    select: (data) => data.data,
  });

  const totalPage = useMemo(() => {
    if (data) return data.result.totalCount;
  }, [data]);

  const customers = useMemo(() => {
    const newData = data?.result.data.map((customer) => {
      return {
        id: customer.id ?? null,
        fullName: `${customer.mandatory?.firstName ?? ""} ${
          customer.mandatory?.lastName ?? ""
        }`.trim(),
        number: customer.immutable?.phone ?? null,
        sex: customer.mandatory?.gender ?? null,
        signDate: customer.immutable?.hubRegisterDate ?? null,
        score: customer.immutable?.rankingPoints?.points ?? 0,
        usedScore: customer.immutable?.rankingPoints?.points ?? 0,
        levelName: "نقره ای", // Assuming this is static
        province: customer.defaultAddress?.provinceName ?? null,
        city: customer.defaultAddress?.cityName ?? null,
      };
    });
    return newData ?? [];
  }, [data]);

  return {
    customers,
    isFetching,
    isError,
    refetch,
    totalPage,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };
};

export default useGetCustomersList;
