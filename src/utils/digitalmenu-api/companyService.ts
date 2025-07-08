import { AxiosResponse } from "axios";
import axiosInstance, { controlers } from "../apiConfig";
import { ICompanyInfoPayload, ICompanyResult } from "@/types/ditgitalmenu-types/company";

const getCompanyList = async () => {
  return await axiosInstance.get<unknown, AxiosResponse<ICompanyResult>>(
    `${controlers.digitalMenu}/Company/list/`
  );
};
// /digital-menu/Company/update/{company_id}/
const updateCompanyInfo = async (payload: { item: ICompanyInfoPayload, company_id: number }) => {
  return await axiosInstance.put<unknown, AxiosResponse<ICompanyResult>>(
    `${controlers.digitalMenu}/Company/update/${payload.company_id}/`, payload.item
  );
};
export { getCompanyList, updateCompanyInfo };
