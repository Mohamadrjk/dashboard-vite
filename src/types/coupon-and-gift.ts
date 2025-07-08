export type ICoupon = {
  expDate: string;
  serial: string;
  reduction: number;
  minPrice: number;
  maxPrice: number;
  firstName: string;
  lastName: string;
  mobile: string;
  id: number;
  isUsed: boolean;
};

export type IGifts = {
  giftBalanceID: number;
  startDate: string;
  expDate: string;
  gcBalance: number;
  gcNum: string;
  groupName: string;
  customerID: number;
  companyID: number;
  minBuyPrice: number;
  giftTotalPrice: number;
  giftType: string;
  giftOccasion: string;
};
