import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "./apiConfig";
import { createUrlSearchParams } from "../utils/common-methods/create-url-param";
import { IHttpResult } from "@/types/httpResult";
import {
  IAnalysisLoyaltyMonthly,
  ICustomeCLV,
  ICustomerPurchaseCategory,
  ICustomerPurchaseCount,
  IInteractionsStates,
  ILoyaltyChanges,
  ILoyaltyDistribution,
  IPurchaseDistribution,
  ITopCustomers,
  ITopProductsByGender,
} from "@/types/customers-model";

const getCustomersClvReport = async (payload: {
  start_date: string;
  end_date: string;
  limit: number;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ICustomeCLV[]>>
  >(`${controlers.customer}/analytics-predicted-clv/${params}`);
};

const getCustomerLoyaltyDistribution = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ILoyaltyDistribution[]>>
  >(`${controlers.customer}/customer-loyalty-distribution/`);
};

const getAnalysisLoyaltyMonthly = async (payload: {
  start_date: string;
  end_date: string;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IAnalysisLoyaltyMonthly[]>>
  >(`${controlers.customer}/customer-interactions/${params}`);
};

const getInteractionsStates = async (payload: { interval: string }) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IInteractionsStates[]>>
  >(`${controlers.customer}/interaction-stats/${params}`);
};

const getPurchaseDistribution = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IPurchaseDistribution[]>>
  >(`${controlers.customer}/purchase-range-stats/`);
};

const getCustomerPurchaseCount = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ICustomerPurchaseCount[]>>
  >(`${controlers.customer}/customer-purchase-counts/`);
};

const getTopCustomers = async (payload: {
  gender?: 1 | 2;
  start_date?: string;
  end_date?: string;
  limit?: number;
}) => {
  const params = createUrlSearchParams(payload);

  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITopCustomers[]>>
  >(`${controlers.customer}/top-customers/${params}`);
};

const getTopProductsByGender = async (payload: {
  start_date: string;
  end_date: string;
  limit?: number;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITopProductsByGender[]>>
  >(`${controlers.customer}/top-products-by-gender/${params}`);
};

const getCustomerPurchaseCategory = async (payload: {
  time_period: string;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<ICustomerPurchaseCategory[]>
  >(`${controlers.customer}/customer-purchase-categories/${params}`);
};

const getAnalysisLoyaltyChanges = async (payload: {
  start_date?: string;
  end_date?: string;
}) => {
  const params = createUrlSearchParams(payload);
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ILoyaltyChanges[]>>
  >(`${controlers.customer}/analysis-loyalty-monthly/${params}`);
};

export {
  getCustomersClvReport,
  getCustomerLoyaltyDistribution,
  getAnalysisLoyaltyMonthly,
  getInteractionsStates,
  getPurchaseDistribution,
  getCustomerPurchaseCount,
  getTopCustomers,
  getTopProductsByGender,
  getCustomerPurchaseCategory,
  getAnalysisLoyaltyChanges,
};
