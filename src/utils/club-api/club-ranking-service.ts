import {
  IClubRanks,
  IClubStatusNew,
  ICreateLevelPayload,
  IUpdateLevelPayload,
} from "@/types/club-types/club-levels-type";
import { clubApiInstance, ClubControllers } from "./club-api-confih";
import { IClubHttpResult } from "./club-http-result";

const getCompanyRanksList = async (): Promise<
  IClubHttpResult<IClubRanks[]>
> => {
  try {
    const response = await clubApiInstance.get<IClubHttpResult<IClubRanks[]>>(
      `${ClubControllers.Ranking}/GetRankingList`
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const onAddCompanyRank = async (payload: {
  Title: string;
  ScoreUnitTitle: string;
  Icon: File;
}): Promise<IClubHttpResult<boolean>> => {
  try {
    const formData = new FormData();
    formData.append("Title", payload.Title);
    formData.append("ScoreUnitTitle", payload.ScoreUnitTitle);
    formData.append("Icon", payload.Icon); // ✅ Attach File correctly
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.ranking}/AddRanking`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Required for file uploads
          auth: true,
        },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const onAddLevelToRanking = async (
  payload: ICreateLevelPayload
): Promise<IClubHttpResult<boolean>> => {
  try {
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.ranking}/AddLevelToRanking`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Required for file uploads
          auth: true,
        },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const onUpdateLevel = async (
  payload: IUpdateLevelPayload,
  levelId: number
): Promise<IClubHttpResult<boolean>> => {
  try {
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.ranking}/UpdateLevel/${levelId}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Required for file uploads
          auth: true,
        },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const getCompanyDefaultLevelList = async (): Promise<
  IClubHttpResult<IClubStatusNew[]>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IClubStatusNew[]>
    >(`${ClubControllers.Level}/GetDefaultRankingLevels`);
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const getCompanyLevelsListByRankId = async (payload: {
  rankId: number;
}): Promise<IClubHttpResult<IClubStatusNew[]>> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IClubStatusNew[]>
    >(`${ClubControllers.Level}/GetLevelList/${payload.rankId}`);
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

const onDeleteLevelWithId = async (payload: {
  levelId: number;
}): Promise<IClubHttpResult<boolean>> => {
  try {
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.ranking}/DeleteLevel/${payload.levelId}`,
      {}
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export {
  getCompanyDefaultLevelList,
  getCompanyRanksList,
  getCompanyLevelsListByRankId,
  onAddCompanyRank,
  onAddLevelToRanking,
  onDeleteLevelWithId,
  onUpdateLevel,
};
