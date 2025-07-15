import { IBannerList } from "@/components/club-managment-components/club-settings-components/settins-modals/program-settings-modal-content/program-banner-selecting/banner-selecting-container";
import { IBannerResultList } from "@/types/club-types/club-setting-type";
import { IClubHttpResult } from "@/api/club-api/club-http-result";
import { GetCompanyClubBanners } from "@/api/club-api/club-setting-service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const useGetCompanyClubBanners = () => {
  return useQuery<IClubHttpResult<IBannerResultList[]>, Error>({
    queryKey: ["GetCompanyClubBanners"], // ✅ Correct queryKey syntax
    queryFn: () => GetCompanyClubBanners(), // ✅ Cleaner query function
    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
  });
};

const useManageClubSBanners = () => {
  const [bannersList, setBannersList] = useState<IBannerList[]>([]);
  const { data, isLoading, isRefetching, error, refetch } =
    useGetCompanyClubBanners();
  useEffect(() => {
    if (data && data.result) {
      setBannersList(() =>
        data.result.map((item) => {
          return { ...item, isNew: false };
        })
      );
    }
  }, [data]);

  return {
    isLoading,
    isRefetching,
    refetch,
    error,
    bannersList,
    setBannersList,
  };
};

export default useManageClubSBanners;
