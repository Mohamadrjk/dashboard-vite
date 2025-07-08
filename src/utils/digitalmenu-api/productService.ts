import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import {
  IProductItem,
  IProductResult,
} from "@/types/ditgitalmenu-types/product";
import { createUrlSearchParams } from "../common-methods/create-url-param";

const getProductsList = async (params?: { category_id?: string }) => {
  const searchParam = params && createUrlSearchParams(params);
  return await axiosInstance.get<unknown, AxiosResponse<IProductResult>>(
    `${controlers.digitalMenu}/products/${searchParam ?? ""}`
  );
};
const editProductItem = async (payload: {
  product_id: number;
  item: IProductItem;
}) => {
  return await axiosInstance.put<unknown, AxiosResponse<IProductResult>>(
    `${controlers.digitalMenu}/products/update/${payload.product_id}/`,
    payload.item
  );
};
const createProductItem = async (payload: IProductItem) => {
  return await axiosInstance.post<unknown, AxiosResponse<IProductResult>>(
    `${controlers.digitalMenu}/products/create/`,
    payload
  );
};
const deleteProductItem = async (payload: { product_id: number }) => {
  return await axiosInstance.delete<unknown, AxiosResponse<IProductResult>>(
    `${controlers.digitalMenu}/products/delete/${payload.product_id}/`
  );
};
export {
  getProductsList,
  editProductItem,
  deleteProductItem,
  createProductItem,
};
