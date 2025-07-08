export interface IClubSettingPayload {
  bannerIsActive: boolean;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  highlightColor: string;
  actionColor: string;
  defaultRankingId: number;
  defaultInvoiceSurveyId: number;
  defaultCompanySurveyId: number;
  rankExchangeRate: number;
  coinExchangeRate: number;
  acceptableDaysForReferral: number;
  oldPaymentsIncludedForLevel: boolean;
  oldPaymentsIncludedForCoins: boolean;
}

export interface IBannerPayload {
  Title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SiteImageFile: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MobileImageFile: any;
  LinkUrl: string;
}

export interface IBannerResultList {
  id: number;
  title: string;
  siteImageUrl: string;
  mobileImageUrl: string;
  linkUrl: string;
}

export interface IUpdateBanner {
  id: number;

  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteImageUrl: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mobileImageUrl: any;
  linkUrl: string;
}
