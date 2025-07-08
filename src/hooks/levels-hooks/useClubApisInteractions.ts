import { useNotify } from "@/components/shared-components/notife/notife";
import {
  IClubStatusNew,
  IUpdateLevelPayload,
} from "@/types/club-types/club-levels-type";
import {
  getCompanyLevelsListByRankId,
  onDeleteLevelWithId,
  onUpdateLevel,
} from "@/utils/club-api/club-ranking-service";

import { getCompanyDefaultLevelList } from "@/utils/club-api/club-ranking-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetDefaultLevels = (levels: IClubStatusNew[]) => {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: ["defaultLevels", levels],
    queryFn: () => getCompanyDefaultLevelList(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isRefetching, error, refetch };
};

const useGetClubLevelsByRankId = (currentRankId: number) => {
  const { notify } = useNotify();
  const queryClient = useQueryClient();
  const {
    mutate: getLevels,
    isPending: isLoading,
    isError: error,
    data,
  } = useMutation({
    mutationFn: () => getCompanyLevelsListByRankId({ rankId: currentRankId }),
    onSuccess: (response) => {
      if (response.status) {
        queryClient.invalidateQueries({ queryKey: ["clubLevelsByRankId"] });
      } else {
        notify("error", response.resultMessage || "درخواست با خطا مواجه شد");
      }
    },
    onError: () => {
      notify("error", "درخواست با خطا مواجه شد");
    },
  });

  return { data, isLoading, error, getLevels };
};

const useUpdateLevel = (
  payload: IUpdateLevelPayload,
  setOpenRemoveModal: (value: boolean) => void
) => {
  const { notify } = useNotify();
  const queryClient = useQueryClient();
  const { mutate: updateLevel, isPending: isUpdating } = useMutation({
    mutationFn: (levelId: number) => onUpdateLevel(payload, levelId),
    onSuccess: (response) => {
      if (response.status) {
        notify("success", response.resultMessage || "سطح یا موفقیت حذف شد");
        setOpenRemoveModal(false);
        queryClient.invalidateQueries({ queryKey: ["clubLevelsByRankId"] });
      } else {
        notify("error", response.resultMessage || "درخواست با خطا مواجه شد");
      }
    },
    onError: () => {
      notify("error", "درخواست با خطا مواجه شد");
    },
  });
  return { updateLevel, isUpdating };
};

const useDeleteLevelById = () => {
  const { notify } = useNotify();
  const queryClient = useQueryClient();
  const { mutate: deleteLevel, isPending: isDeleting } = useMutation({
    mutationFn: (levelId: number) => onDeleteLevelWithId({ levelId }),
    onSuccess: (response) => {
      if (response.status) {
        notify("success", response.resultMessage || "سطح یا موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["clubLevelsByRankId"] });
      }
    },
    onError: () => {
      notify("error", "درخواست با خطا مواجه شد");
    },
  });
  return { deleteLevel, isDeleting };
};

export {
  useGetDefaultLevels,
  useGetClubLevelsByRankId,
  useUpdateLevel,
  useDeleteLevelById,
};
