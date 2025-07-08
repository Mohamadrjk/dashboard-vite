export interface IGoodsAnalysis {
  product_id: number;
  product_name: string;
  period: string;
  sales_count: number;
  total_sales: string;
}

export interface IGoodsPercentages {
  product_name: string;
  sales_count: number;
  total_sales: number;
  sales_percentage: number;
}

export interface ICategoriesSale {
  category_id: number;
  category_name: string;
  total_orders: number;
  total_quantity_sold: number;
  total_sales: number;
}

export interface ICategories {
  category_id: number;
  category_name: string;
}
