import { IClubRanks } from "@/types/club-types/club-levels-type";
import { getCompanyRanksList } from "@/utils/club-api/club-ranking-service";
import { useCallback, useEffect, useState } from "react";

const useClubRanks = () => {
  const [loadingRanks, setLoadingRanks] = useState<boolean>(false);

  const [errorRanks, setErrorRanks] = useState<boolean>(false);
  const [ranks, setRanks] = useState<IClubRanks[]>([]);
  const [currentRankId, setCurrentRankId] = useState<number | undefined>(
    undefined
  );

  const handleGetClubRanks = useCallback(async () => {
    setErrorRanks(false);

    setLoadingRanks(true);
    try {
      const response = await getCompanyRanksList();
      if (response.status) {
        setRanks(() => response.result);
      } else {
        setErrorRanks(true);
      }
    } catch (error) {
      setErrorRanks(true);
    } finally {
      setLoadingRanks(false);
    }
  }, [ranks]);

  const handleAddRank = async (payload: {
    Title: string;
    ScoreUnitTitle: string;
    Icon: string;
  }) => {
    // setLoadingAddRanks(true);
    // try {
    //   const response = await onAddCompanyRank(payload);
    //   if (response.status) {
    //     notify("success", response.statusMessage || "درخواست با موفقیت ثبت شد");
    //   } else {
    //     notify(
    //       "error",
    //       response.statusMessage || "در ثبت درخواست خطایی رخ داده است"
    //     );
    //   }
    // } catch (error) {
    //   notify("error", "در ثبت درخواست خطایی رخ داده است");
    // } finally {
    //   setLoadingAddRanks(false);
    // }
  };

  useEffect(() => {
    handleGetClubRanks();
  }, []);

  return {
    loadingRanks,
    errorRanks,
    ranks,
    currentRankId,
    handleGetClubRanks,
    setCurrentRankId,
    handleAddRank,
  };
};

export default useClubRanks;
