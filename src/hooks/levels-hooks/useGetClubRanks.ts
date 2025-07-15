import { IClubRanks } from "@/types/club-types/club-levels-type";
import { IClubHttpResult } from "@/api/club-api/club-http-result";
import { getCompanyRanksList } from "@/api/club-api/club-ranking-service";
import { useQuery } from "@tanstack/react-query";
import { MenuProps } from "antd";
import { useMemo, useState } from "react";

const useGetRanks = () => {
  return useQuery<IClubHttpResult<IClubRanks[]>, Error>({
    queryKey: ["ClubRanksList"], // ✅ Correct queryKey syntax
    queryFn: () => getCompanyRanksList(), // ✅ Cleaner query function
    staleTime: 1000 * 60 * 5, // ✅ Data is fresh for 5 minutes before refetching

    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
  });
};

const useRanksSetting = () => {
  const [selectedRank, setSelectedRank] = useState<number>();

  const { data, isLoading, isRefetching, error, refetch } = useGetRanks();
  const ranksDropdownItems: MenuProps["items"] = useMemo(() => {
    if (data) {
      return data.result.map((item, index) => {
        return {
          label: item.title,
          key: item.id,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  const selectedRankTitle = useMemo(() => {
    if (data) {
      const title = data.result.find((item) => item.id === selectedRank);
      return title ? title.title : "";
    } else {
      return "";
    }
  }, [selectedRank]);

  return {
    isLoading,
    isRefetching,
    error,
    refetch,
    ranksDropdownItems,
    selectedRank,
    setSelectedRank,
    selectedRankTitle,
  };
};

export default useRanksSetting;
