export interface ICustomersListResponse {
  pageNumber: number;
  maxPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: IClubCustomer[];
}

export interface IClubCustomer {
  immutable: Immutable;
  mandatory: Mandatory;
  additional: Additional;
  defaultAddress: DefaultAddress;
  isActive: boolean;
  id: number;
}

export interface Additional {
  profilePhoto: null | string;
  lastNameEn: null | string;
  firstNameEn: null | string;
  email: null | string;
  nationalCode: null | string;
  marriage: boolean | null;
  jobTitle: null | string;
  educationTitle: null | string;
}

export interface DefaultAddress {
  cityId: number | null;
  provinceId: number | null;
  cityName: null | string;
  provinceName: null | string;
  id: number;
  title: null | string;
  firstName: null | string;
  lastName: null | string;
  phone: null | string;
  tel: null;
  address2: null | string;
  addressLine: null | string;
  postalCode: null | string;
  no: null | string;
  doorNo: null | string;
  latitude: null;
  longitude: null;
}

export interface Immutable {
  phone: string;
  referralCode: string;
  rankingPoints: RankingPoints;
  hubRegisterDate: string | null;
}

export interface RankingPoints {
  points: number;
}

export interface Mandatory {
  firstName: string;
  lastName: string;
  gender: boolean | null;
  birthdate: string | null;
}
