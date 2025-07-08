import axios, { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "./apiConfig";
import {
  IAvailableProductsReport,
  ICityStates,
  ICustomersActivityReports,
  ISalesPerMonth,
  ITopSellingProductResult,
  ITotalSalesReport,
  IWeeklyIncome,
} from "@/types/sales-per-month";
import { IHttpResult } from "@/types/httpResult";

const getSalesPerMonth = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<ISalesPerMonth>>(
    `${controlers.SalesPerMonth}`
  );
};

const getActiveCustomers = async () => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<ICustomersActivityReports>
  >(`/api/active-customer/`);

  return response;
};

const getAvailableProducts = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IAvailableProductsReport>
  >(`/api/availability/`);
};

const getTotalSales = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITotalSalesReport>>
  >(`/api/total-sales/`);
};

const getTopCellingProducts = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<ITopSellingProductResult>
  >(`/api/top-selling-products/`);
};

const getWeeklyIncome = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<IWeeklyIncome>>(
    `/api/weekly-income/`
  );
};

const getCityStates = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ICityStates[]>>
  >(`/api/addresses/city-stats/?limit=5`);
};

export {
  getSalesPerMonth,
  getActiveCustomers,
  getAvailableProducts,
  getTopCellingProducts,
  getWeeklyIncome,
  getTotalSales,
  getCityStates,
};
