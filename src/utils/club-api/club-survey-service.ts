import { ISurvey } from "@/types/club-types/club-surveys-type";
import { clubApiInstance, ClubControllers } from "./club-api-confih";
import { IClubHttpResult, ITableResult } from "./club-http-result";

export const GenerateSurvey = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
): Promise<IClubHttpResult<boolean>> => {
  try {
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.survey}/GenerateSurvey`,
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
    throw new Error("خطا در برقراری ارتباط");
  }
};

export const getCompanySurveyList = async (payload: {
  page: number;
  size: number;
}): Promise<IClubHttpResult<ITableResult<ISurvey[]>>> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<ITableResult<ISurvey[]>>
    >(
      `${ClubControllers.survey}/GetAllSurveys?page=${payload.page}&size=${payload.size}`
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export const onDeleteSurveyWithId = async (payload: {
  surveyId: number;
}): Promise<IClubHttpResult<boolean>> => {
  const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
    `${ClubControllers.survey}/DeleteSurvey/${payload.surveyId}`,
    {}
  );
  return response.data;
};
