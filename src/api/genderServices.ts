import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "./apiConfig";
import { IHttpResult } from "@/types/httpResult";
import {
  IGenderStatics,
  IGenderStaticsWithPurchases,
  ISalesByGenderAndCityReport,
} from "@/types/genderTypes";
import { createUrlSearchParams } from "../utils/common-methods/create-url-param";

const getGenderStatistics = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IGenderStatics[]>>
  >(`${controlers.customer}/gender-statistics/`);
};

const getGenderStatisticsWithPurchases = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IGenderStaticsWithPurchases[]>>
  >(`${controlers.customer}/get_gender_statistics_with_purchases/`);
};

const getSalesByGenderAndCityReport = async (payload: {
  start_date: string;
  end_date: string;
  limit: number;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ISalesByGenderAndCityReport[]>>
  >(`${controlers.customer}/city-gender-sales/${params}`);
};

export {
  getGenderStatistics,
  getGenderStatisticsWithPurchases,
  getSalesByGenderAndCityReport,
};
