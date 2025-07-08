export interface IClubStatusNew {
  id: number;
  title: string;
  fromPrice: number;
  toPrice: number;
  buyPriceInYear: number;
  customerLevelID: number;
  color: string;
  birthdayDiscountsDecription: string;
  birthdayMonthDiscountsDecription: string;
  weddingAnniversaryDiscountDecription: string;
  creditPercentageDecription: string;
  nextLevelPercent: number;
  levelPercent: number;
  nextLevelTitle: string;
  nextLevelRemainPrice: number;
  clubControlDays: number;
  loialityReduction: number;
  chargeFromPurchase: number;
  chargeMonthlyPercent: number;
  birthDayPercent: number;
  birthDayMonthlyReduction: number;
  customerLevelState: "Done" | "CurrentLevel" | "Next" | string;
}
