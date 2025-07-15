import {
  ICompanyItem,
  ICompanyResult,
} from "@/types/ditgitalmenu-types/company";
import { getCompanyList } from "@/api/digitalmenu-api/companyService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useGetCompanyList = (refetchOnWindowFocus?: boolean) => {
  return useQuery<AxiosResponse<ICompanyResult>, Error>({
    queryKey: ["getCompanyList"], // ✅ Correct queryKey syntax
    queryFn: () => getCompanyList(), // ✅ Cleaner query function
    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
  });
};

const useCompanyList = (refetchOnWindowFocus?: boolean) => {
  const [CompanyList, setCompanyList] = useState<ICompanyItem[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetCompanyList(refetchOnWindowFocus);

  useEffect(() => {
    if (data && data.data.result) {
      setCompanyList(() => data.data.result);
    }
  }, [data]);

  return {
    isLoading,
    isRefetching,
    refetch,
    error,
    CompanyList,
    setCompanyList,
  };
};

export default useCompanyList;
