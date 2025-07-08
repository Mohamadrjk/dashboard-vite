import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import { ISalesPerMonth } from "@/types/sales-per-month";
import { IBranchItem, IBranchResult } from "@/types/ditgitalmenu-types/branch";

const getBranchesList = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<IBranchResult>>(
    `${controlers.digitalMenu}/branches`
  );
};

const editBranchItem = async (payload: {
  branch_id: number;
  item: IBranchItem;
}) => {
  return await axiosInstance.put<unknown, AxiosResponse<IBranchResult>>(
    `${controlers.digitalMenu}/branches/${payload.branch_id}/`,
    payload.item
  );
};
const createBranchItem = async (payload: {
  company_id: number;
  item: IBranchItem;
}) => {
  return await axiosInstance.post<unknown, AxiosResponse<IBranchResult>>(
    `${controlers.digitalMenu}/branches/create/`,
    { company_id: payload.company_id, ...payload.item }
  );
};
const deleteBranchItem = async (payload: { branch_id: number }) => {
  return await axiosInstance.delete<unknown, AxiosResponse<IBranchResult>>(
    `${controlers.digitalMenu}/branches/${payload.branch_id}/delete/`
  );
};
export { getBranchesList, editBranchItem, createBranchItem, deleteBranchItem };
