export interface IBranchItem {
  branch_id?: number;
  name?: string;
  location?: string;
  en_name?: string;
  image_url?: string;
  contact_phone?: string;
  email?: string;
  operating_hours?: string;
  status?: number;
  latitude?: string;
  longitude?: string;
  link?: string;
}
export interface IBranchResult {
  status: string;
  message: string;
  result: Array<IBranchItem>;
  errors: Array<any>;
}
