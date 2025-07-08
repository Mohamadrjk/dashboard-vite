import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import {
  ICategoryItem,
  ICategoryResult,
} from "@/types/ditgitalmenu-types/category";
import { IProductResult } from "@/types/ditgitalmenu-types/product";

const getCategoryList = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<ICategoryResult>>(
    `${controlers.digitalMenu}/categories/`
  );
};
const editCategoryItem = async (payload: {
  category_id: number;
  item: ICategoryItem;
}) => {
  return await axiosInstance.put<unknown, AxiosResponse<ICategoryResult>>(
    `${controlers.digitalMenu}/categories/update/${payload.category_id}/`,
    payload.item
  );
};
const createCategoryItem = async (payload: ICategoryItem) => {
  return await axiosInstance.post<unknown, AxiosResponse<ICategoryResult>>(
    `${controlers.digitalMenu}/categories/create/`,
    payload
  );
};
const deleteCategoryItem = async (payload: { category_id: number }) => {
  return await axiosInstance.delete<unknown, AxiosResponse<ICategoryResult>>(
    `${controlers.digitalMenu}/categories/delete/${payload.category_id}/`
  );
};
export {
  getCategoryList,
  editCategoryItem,
  createCategoryItem,
  deleteCategoryItem,
};
