import {
  IBannerResultList,
  IClubSettingPayload,
} from "@/types/club-types/club-setting-type";
import { IClubHttpResult } from "./club-http-result";
import { clubApiInstance, ClubControllers } from "./club-api-confih";
import {
  IClubCompanyInfo,
  IClubCompanySocialMedias,
} from "@/types/club-types/club_theme_types";

export const GetCompanyClubSettings = async (): Promise<
  IClubHttpResult<IClubSettingPayload>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IClubSettingPayload>
    >(`${ClubControllers.Setting}/GetSettings`, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

// test api for club theme settings
export const GetClubCompanyInfo = async (): Promise<
  IClubHttpResult<IClubCompanyInfo>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IClubCompanyInfo>
    >(`/api/Setting/GetThemeSettings`, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};
export const updateClubCompanyInfo = async (payload: IClubCompanyInfo) => {
  try {
    const response = await clubApiInstance.put<IClubCompanyInfo>(
      `/api/admin/config/UpdateThemeSettings`,
      payload,
      {
        headers: {
          auth: true,
        },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};
export const GetCompanyClubBanners = async (): Promise<
  IClubHttpResult<IBannerResultList[]>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IBannerResultList[]>
    >(`${ClubControllers.Banner}/GetBannerList`, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export const UpdateSettings = async (
  payload: IClubSettingPayload
): Promise<IClubHttpResult<boolean>> => {
  try {
    const response = await clubApiInstance.post<IClubHttpResult<boolean>>(
      `${ClubControllers.config}/UpdateSettings`,
      payload,
      {
        headers: {
          auth: true,
        },
      }
    );
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("خطا در ثبت تغییرات");
  }
};

export const addCompanyClubBanner = async (payload: {
  data: any;
}): Promise<IClubHttpResult<IBannerResultList>> => {
  try {
    const response = await clubApiInstance.post<
      IClubHttpResult<IBannerResultList>
    >(`${ClubControllers.banner}/AddBanner/`, payload.data, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Required for file uploads
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export const updateCompanyClubBanners = async (payload: {
  data: any;
  id: number;
}): Promise<IClubHttpResult<IBannerResultList>> => {
  try {
    const response = await clubApiInstance.post<
      IClubHttpResult<IBannerResultList>
    >(`${ClubControllers.banner}/UpdateBanner/${payload.id}`, payload.data, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};

export const deleteCompanyClubBanners = async (payload: {
  bannerId: number;
}): Promise<IClubHttpResult<IBannerResultList>> => {
  try {
    const response = await clubApiInstance.post<
      IClubHttpResult<IBannerResultList>
    >(`${ClubControllers.banner}/DeleteBanner/${payload.bannerId}`, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};
export const getSocialMedias = async (): Promise<
  IClubHttpResult<IClubCompanySocialMedias[]>
> => {
  try {
    const response = await clubApiInstance.get<
      IClubHttpResult<IClubCompanySocialMedias[]>
    >(`${ClubControllers.config}/GetAllSocialMedias`, {
      headers: {
        auth: true,
      },
    });
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};
