export interface IProductItem {
  product_id?: number;
  category_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  is_available?: number;
  image_url?: string;
  inventory?: number;
  description?: string;
}
export interface IProductResult {
  status: string;
  message: string;
  data: Array<IProductItem>;
  errors: Array<any>;
}
