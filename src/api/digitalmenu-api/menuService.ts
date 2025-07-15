import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import {
  IMenuDetail,
  IMenuDetailResult,
  IMenuItem,
  IMenuResult,
} from "@/types/ditgitalmenu-types/menu";
import { createUrlSearchParams } from "../../utils/common-methods/create-url-param";

const getMenuList = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<IMenuResult>>(
    `${controlers.digitalMenu}/menus/search/`
  );
};
const editMenuItem = async (payload: { menu_id: number; item: IMenuItem }) => {
  return await axiosInstance.put<unknown, AxiosResponse<IMenuResult>>(
    `${controlers.digitalMenu}/menus/${payload.menu_id}/`,
    payload.item
  );
};
const createMenuItem = async (payload: IMenuItem) => {
  return await axiosInstance.post<unknown, AxiosResponse<IMenuResult>>(
    `${controlers.digitalMenu}/menus/`,
    payload
  );
};
const deleteMenuItem = async (payload: { menu_id: number }) => {
  return await axiosInstance.delete<unknown, AxiosResponse<IMenuResult>>(
    `${controlers.digitalMenu}/menus/delete/${payload.menu_id}/`
  );
};

const createMenuDetail = async (payload: IMenuDetail) => {
  return await axiosInstance.post<unknown, AxiosResponse<IMenuDetailResult>>(
    `${controlers.digitalMenu}/menu-detail/create/`,
    payload
  );
};
const updateMenuDetail = async (payload: IMenuDetail) => {
  return await axiosInstance.put<unknown, AxiosResponse<IMenuDetailResult>>(
    `${controlers.digitalMenu}/menu-detail/update/`,
    payload
  );
};
const getMenuDetail = async (payload: { menu_id: number }) => {
  const searchparam = createUrlSearchParams(payload);
  return await axiosInstance.get<unknown, AxiosResponse<IMenuDetailResult>>(
    `${controlers.digitalMenu}/menu-detail/${searchparam}`
  );
};
// /digital-menu/menu-detail/
// /digital-menu/menu-detail/create/
export {
  getMenuList,
  createMenuItem,
  updateMenuDetail,
  editMenuItem,
  deleteMenuItem,
  createMenuDetail,
  getMenuDetail,
};
