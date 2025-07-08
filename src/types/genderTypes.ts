export interface IGenderStatics {
  gender: string;
  gender_count: number;
  total_paid: number;
}

export interface IGenderStaticsWithPurchases {
  gender: string;
  gender_count: number;
  gender_percentage: number;
  purchased_percentage: number;
}

export interface ISalesByGenderAndCityReport {
  city_name: string;
  gender: Gender;
  purchase_count: number;
  total_sales: number;
  state_id: number;
}

export enum Gender {
  آقا = "آقا",
  خانم = "خانم",
}
