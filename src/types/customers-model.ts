export interface ICustomeCLV {
  customer_id: number;
  first_name: string;
  last_name: string;
  total_orders: number;
  total_revenue: string;
  average_order_value: string;
  predicted_clv: string;
}

export interface ILoyaltyDistribution {
  customer_type: string;
  customer_count: number;
  percentage: number;
}

export interface IInteractionsStates {
  date: string;
  total_interactions: number;
  with_purchase: number;
  without_purchase: number;
}

export interface IAnalysisLoyaltyMonthly {
  interaction_date: string;
  total_interactions: number;
  interactions_with_purchases: number;
  interactions_without_purchases: number;
}

export interface IPurchaseDistribution {
  purchase_range: string;
  customer_count: number;
  total_spent: number;
}

export interface ICustomerPurchaseCount {
  purchase_count: number;
  customer_count: number;
}

export interface ITopCustomers {
  customer_name: string;
  gender: string;
  total_purchases: number;
  total_spent: number;
  avg_purchase_value: number;
  top_product: string;
}

export interface ITopProductsByGender {
  gender: string;
  product_name: string;
  total_purchases: number;
}

export interface ICustomerPurchaseCategory {
  purchase_category: string;
  customer_count: number;
}

export interface ILoyaltyChanges {
  month: string;
  loyal_customers: number;
  non_loyal_customers: number;
  total_orders: number;
  total_revenue: number;
}
