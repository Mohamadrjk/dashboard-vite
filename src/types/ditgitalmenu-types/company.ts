export interface ICompanyItem {
  company_id?: number;
  name?: string;
  description?: string;
  mobile_number?: string;
  phone_number?: string;
  address_line?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  social_media?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
  config?: string;
}
export interface ICompanyResult {
  status: string;
  message: string;
  result: Array<ICompanyItem>;
  errors: Array<any>;
}
export interface ICompanyInfoPayload {
  name?: string;
  description?: string;
  mobile_number?: string;
  phone_number?: string;
  address_line?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  social_media?: string;
  latitude?: number;
  longitude?: number;
  config?: string;
}
