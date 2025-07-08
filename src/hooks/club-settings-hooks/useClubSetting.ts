import { initClubSettings } from "@/redux/clubSetting/clubSettingSlice";
import { IClubSettingPayload } from "@/types/club-types/club-setting-type";
import { IClubHttpResult } from "@/utils/club-api/club-http-result";
import {
  GetCompanyClubSettings,
  UpdateSettings,
} from "@/utils/club-api/club-setting-service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "@/components/shared-components/notife/notife";
const useGetClubSetting = () => {
  return useQuery<IClubHttpResult<IClubSettingPayload>, Error>({
    queryKey: ["ClubSettings"], // ✅ Correct queryKey syntax
    queryFn: () => GetCompanyClubSettings(), // ✅ Cleaner query function
    staleTime: 1000 * 60 * 5, // ✅ Data is fresh for 5 minutes before refetching
    refetchOnWindowFocus: false, // ✅ Prevents automatic refetch on window focus
    refetchInterval: false,
  });
};

export const useUpdateClubSettings = () => {
  const queryClient = useQueryClient(); // 🔄 Used for cache updates
  const { notify } = useNotify();

  return useMutation({
    mutationFn: (settings: IClubSettingPayload) => UpdateSettings(settings),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["ClubSurveysManagementPage"],
      }); // ✅ Correctly invalidating cache
      notify(
        "success",
        data.resultMessage || "درخواست بروزرسانی تنظیمات با موفقیت ثبت شد"
      );
    },

    onError: (error) => {
      notify(
        "error",
        error.message || "درخواست بروزرسانی تنظیمات با خطا مواجه شد"
      );
    },
  });
};

const useManageClubSettings = () => {
  const { data, isLoading, isRefetching, error, refetch } = useGetClubSetting();

  const dispatch = useDispatch();

  const settings = useMemo(() => {
    if (data) {
      dispatch(initClubSettings(data.result));
      return data.result;
    }
  }, [data]);

  return {
    settings,
    isLoading,
    isRefetching,
    refetch,
    error,
  };
};

export default useManageClubSettings;
