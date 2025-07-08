export interface ISalesPerMonth {
  monthly_sales: MonthlySale[];
  total_period_sales: number;
  total_period_orders: number;
}

export interface MonthlySale {
  month: string;
  total_sales: number;
  total_orders: number;
}

export interface ICustomersActivityReports {
  total_customers: number;
  active_customers: number;
  total_customers_growth: number;
  active_customers_growth: number;
}

export interface IAvailableProductsReport {
  available_products: number;
  out_of_stock_products: number;
}

export interface ITotalSalesReport {
  total_sales: number;
  growth_percentage: number;
}

export interface ITopSellingProductResult {
  top_selling_products: ITopSellingProduct[];
}

export interface ITopSellingProduct {
  product_name: string;
  total_sales: number;
}
export interface IWeeklyIncome {
  weekly_sales: IWeeklySales[];
  total_sales: number;
  total_orders: number;
}

export interface ICityStates {
  city: string;
  total_customers: number;
}

export interface IWeeklySales {
  day: string;
  day_date: string;
  sales_count: number;
  total_sales: number;
}
