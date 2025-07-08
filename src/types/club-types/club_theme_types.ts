export type IClubCompanyTheme = {
  cta?: string;
  ctaDisabled?: string;
  ctaHover?: string;
  ctaFocus?: string;
  alert?: string;
  primary?: string;
  focus?: string;
  tritary?: string;
  secondary?: string;
  cta30?: string;
  highlighter?: string;
  highlighterDisabled?: string;
  highlighterHover?: string;
  highlighterFocus?: string;
  highlighterFaded?: string;
  bg?: string;
};
export interface IClubCompanySocialMedias {
  socialMediaId?: number;
  id?: number;
  linkUrl?: string;
  logoUrl?: string;
  title?: string;
}
export interface IClubGeneralInfo {
  companyName?: string;
  logoUrlFooter?: string;
  logoUrl?: string;
  phoneNumbers?: string[];
  companyAddress?: string;
  companyEmail?: string;
  companyWebSiteAddress?: string;
  backgroundDesign?: string;
}

export interface IClubCompanyInfo extends IClubGeneralInfo {
  colors?: IClubCompanyTheme;
  companySocialMedias?: IClubCompanySocialMedias[];
}
