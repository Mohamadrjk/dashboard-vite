import { IClubStatusNew } from "@/types/club-types/club-levels-type";
import { useCallback, useEffect, useState } from "react";
import useClubRanks from "./useClubRanks";
import {
  useDeleteLevelById,
  useGetClubLevelsByRankId,
  useGetDefaultLevels,
} from "./useClubApisInteractions";

const useClubLevels = () => {
  const {
    errorRanks,
    handleGetClubRanks,
    loadingRanks,
    ranks,
    currentRankId,
    setCurrentRankId,
  } = useClubRanks();

  const [levels, setLevels] = useState<IClubStatusNew[]>([]);
  const [openRemoveLevelModal, setOpenRemoveModal] = useState<boolean>(false);

  const { deleteLevel, isDeleting: removeLoading } = useDeleteLevelById();

  const {
    getLevels,
    isLoading: loadingRankLevels,
    error: errorRankLevels,
    data: levelsData,
  } = useGetClubLevelsByRankId(currentRankId);

  const {
    data: defaultLevelsData,
    isLoading: loadingDefaultLevels,
    error: errorDefaultLevels,
    refetch: refetchDefaultLevels,
  } = useGetDefaultLevels(levels);

  useEffect(() => {
    if (!currentRankId) {
      if (defaultLevelsData?.result) {
        setLevels(defaultLevelsData.result);
      }
    } else if (levelsData?.result) {
      setLevels(levelsData.result);
    }
  }, [currentRankId, defaultLevelsData, levelsData]);

  useEffect(() => {
    if (currentRankId) {
      getLevels();
    }
  }, [currentRankId, getLevels]);

  const onRemoveLevelById = async (levelId: number) => {
    deleteLevel(levelId, {
      onSuccess: () => {
        setOpenRemoveModal(false);
        if (currentRankId) {
          getLevels();
        } else {
          refetchDefaultLevels();
        }
      },
    });
  };

  const handleGetDefaultLevels = useCallback(() => {
    refetchDefaultLevels();
  }, [refetchDefaultLevels]);

  const handleGetClubLevelsByRankId = useCallback(() => {
    if (currentRankId) {
      getLevels();
    } else {
      refetchDefaultLevels();
    }
  }, [currentRankId, getLevels, refetchDefaultLevels]);

  const loading = currentRankId ? loadingRankLevels : loadingDefaultLevels;
  const error = currentRankId ? errorRankLevels : errorDefaultLevels;

  return {
    loading,
    error,
    levels,
    handleGetDefaultLevels,

    errorRanks,
    handleGetClubRanks,
    loadingRanks,
    ranks,
    currentRankId,
    setCurrentRankId,
    onRemoveLevelById,
    removeLoading,
    openRemoveLevelModal,
    setOpenRemoveModal,
    handleGetClubLevelsByRankId,
  };
};

export default useClubLevels;
