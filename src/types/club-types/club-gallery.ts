export interface IUploadedGalerry {
  id: number;
  url: string;
  expiresIn: number;
}
export interface IUploadedGalerryPayload {
  Photo: File;
  Title?: string;
  Description?: number;
  Permanent?: boolean;
  Favorite?: boolean;
}
