import { ICustomersListResponse } from "@/types/club-types/club-customers";
import { IClubHttpResult } from "./club-http-result";
import { clubApiInstance, ClubControllers } from "./club-api-confih";
import { createUrlSearchParams } from "../common-methods/create-url-param";

const getClubCustomersList = async (payload?: {
  page: number;
  size: number;
}) => {
  const params = createUrlSearchParams(payload);

  const response = await clubApiInstance.get<
    IClubHttpResult<ICustomersListResponse>
  >(`${ClubControllers.customers}/GetAllEndUsers${params}`);
  return response;
};

export { getClubCustomersList };
