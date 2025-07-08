export interface IMenuItem {
  menu_id?: number;
  branch_id?: number;
  branchname?: string;
  branch_name?:string;
  total_products_count?: number;
  total_products_price?: number;
  menu_image?: string;
  menuname?: string;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  status?: boolean;
  is_featured?: boolean;
  image_url?: string;
}
export interface IMenuResult {
  status: string;
  message: string;
  data: Array<IMenuItem>;
  errors: Array<any>;
}
export interface IMenuDetail {
  menu_id?: number;
  categories: IMenuSelectedCategoryList[];
}

export type DiscountType = "amount" | "percentage" | "time_based";

export interface IMenuSelectedCategoryList {
  category_id: number;
  category_name?: string;
  products?: IMenuSelectedProduct[];
}
export interface IMenuSelectedProduct {
  product_id: number;
  has_discount?: boolean;
  discount_type?: DiscountType;
  discount_value?: string;
  discount_start_date?: string;
  discount_end_date?: string;
}
export interface IMenuDetailResult {
  status: string;
  message: string;
  data: IMenuDetail;
  is_detail?: boolean;
  errors: Array<any>;
}
