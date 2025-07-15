import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import {
  IKeyCustomerSalesShare,
  IKeyCustomerSalesTrend,
  IRevenueShare,
  ISalesComparison,
  ITopCitiesBySales,
  ITopCustomers,
  ITopSellingProductsAnalysisAnswer,
} from "@/types/report_sale-types/report_sale-types";
import { IHttpResult } from "@/types/httpResult";

// const getReportSale = async () => {
//     const response = await axiosInstance.get<
//       unknown,
//       AxiosResponse<ICustomersActivityReports>
//     >(`/api/active-customer/`);

//     return response;
//   };

export const getTopCitiesBySales = async (payload: {
  preset_interval: "1 WEEK" | "1 MONTH" | "1 YEAR";
  limit: number;
}) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITopCitiesBySales[]>>
  >(
    `${controlers.reportSale}/OverallSales/top-cities-by-sales/?preset_interval=${payload.preset_interval}&limit=${payload.limit}`
  );

  return response;
};

export const getProductSalesAnalysis = async (payload: {
  interval: "1 MONTH" | "3 MONTH" | "6 MONTH" | "1 YEAR";
  limit: number;
}) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITopSellingProductsAnalysisAnswer>>
  >(
    `${controlers.reportSale}/ProductsServices/product-sales/?interval=${payload.interval}&limit=${payload.limit}`
  );

  return response;
};

export const getRevenueShare = async (payload: {
  interval: "1 MONTH" | "3 MONTH" | "6 MONTH" | "1 YEAR";
  limit: number;
}) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IRevenueShare[]>>
  >(
    `${controlers.reportSale}/ProductsServices/revenue-share/?interval=${payload.interval}&limit=${payload.limit}`
  );

  return response;
};

export const getSalesComparison = async (payload: {
  interval:
    | "PREVIOUS_MONTH"
    | "TWO_MONTHS_AGO"
    | "THREE_MONTHS_AGO"
    | "LAST_YEAR_SAME_MONTH";
}) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ISalesComparison>>
  >(
    `${controlers.reportSale}/OverallSales/sales-comparison/?interval=${payload.interval}`
  );

  return response;
};

export const getTopCustomers = async (payload: { limit: number }) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ITopCustomers[]>>
  >(
    `${controlers.reportSale}/KeyAccounts/top-customers/?limit=${payload.limit}`
  );

  return response;
};

export const getKeyCustomerSalesTrend = async (payload: { limit: number }) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IKeyCustomerSalesTrend[]>>
  >(
    `${controlers.reportSale}/KeyAccounts/key-customer-sales-trend/?limit=${payload.limit}`
  );

  return response;
};

export const getKeyCustomerSalesShare = async (payload: { limit: number }) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IKeyCustomerSalesShare[]>>
  >(
    `${controlers.reportSale}/KeyAccounts/key-customer-sales-share/?limit=${payload.limit}`
  );

  return response;
};
