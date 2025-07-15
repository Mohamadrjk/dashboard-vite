import { clubApiInstance, ClubControllers } from "./club-api-confih";
import { IClubHttpResult } from "./club-http-result";
import {
  IUploadedGalerry,
  IUploadedGalerryPayload,
} from "@/types/club-types/club-gallery";

export const uploadToClubGalery = async (
  paylaod: IUploadedGalerryPayload
): Promise<IClubHttpResult<IUploadedGalerry>> => {
  try {
    const response = await clubApiInstance.postForm<
      IClubHttpResult<IUploadedGalerry>
    >(`${ClubControllers.photogallery}/Upload`, paylaod);
    return response.data; // Return only the data part of the response
  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    throw new Error("در برقراری ارتباط خطایی رخ داده است");
  }
};
