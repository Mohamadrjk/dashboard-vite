export interface ISalesComparison {
  current_month_sales: number;
  selected_month_sales: number;
  sales_difference: number;
  percentage_difference: number;
}
export interface ITopCitiesBySales {
  city: string;
  num_orders: number;
  total_sales: number;
}

export interface IProductSalesAnalysis {
  rank_type: "top" | "bottom";
  product_name: string;
  total_sales: number;
  total_revenue: number;
}

export interface ITopSellingProductsAnalysisAnswer {
  top_products: IProductSalesAnalysis[];
  bottom_products: IProductSalesAnalysis[];
}

export interface IRevenueShare {
  product_name: string;
  total_revenue: number;
  revenue_share_percentage: number;
}

export interface ITopCustomers {
  id_customer: number;
  customer_name: string;
  total_orders: number;
  total_value: number;
}

export interface IKeyCustomerSalesTrend {
  id_customer: number;
  customer_name: string;
  purchase_month: string;
  total_orders: number;
  total_value: number;
}

export interface IKeyCustomerSalesShare {
  id_customer: number;
  customer_name: string;
  customer_sales: number;
  customer_sales_percentage: number;
}
