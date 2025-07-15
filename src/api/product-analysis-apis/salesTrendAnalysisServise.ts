import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import { IHttpResult } from "@/types/httpResult";
import {
  ICategories,
  ICategoriesSale,
  IGoodsAnalysis,
  IGoodsPercentages,
} from "@/types/product-analysis-apis-types/product-analysis-type";

export const getSalesTrendAnalysis = async (payload: {
  productId?: number;
  interval: "monthly" | "quarterly" | "yearly";
}) => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IGoodsAnalysis[]>>
  >(
    `${controlers.product}/sales-trend-analysis/?interval=${
      payload.interval
    }&product_id=${payload.productId ?? ""}`
  );
};

export const getSalesPercentages = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<IGoodsPercentages[]>>
  >(`${controlers.product}/sales-percentage/`);
};

export const getCategoriesSale = async (payload: {
  start_date?: string;
  end_date?: string;
  category_id?: number;
}) => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ICategoriesSale[]>>
  >(
    `${controlers.product}/categories/sales/?start_date=${
      payload.start_date
    }&end_date=${payload.end_date}&category_id=${payload.category_id ?? ""}`
  );
};

export const getCategories = async () => {
  return await axiosInstance.get<
    unknown,
    AxiosResponse<IHttpResult<ICategories[]>>
  >(`${controlers.product}/categories/`);
};
