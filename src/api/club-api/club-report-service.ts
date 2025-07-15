import {
  IRakingPieReportResult,
  IRankingPageLabels,
} from "@/types/club-types/club-reports-type";
import { clubApiInstance, ClubControllers } from "./club-api-confih";
import { IClubHttpResult } from "./club-http-result";

const getRankingPageLabels = async (): Promise<
  IClubHttpResult<IRankingPageLabels>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IRankingPageLabels>
    >(`${ClubControllers.report}/GetRankingPageLabels`);
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const getRankingPagePieReport = async (): Promise<
  IClubHttpResult<IRakingPieReportResult>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IRakingPieReportResult>
    >(`${ClubControllers.report}/GetRankingPagePieChart`);
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export { getRankingPageLabels, getRankingPagePieReport };
