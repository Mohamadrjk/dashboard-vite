export interface IRankingPageLabels {
  levels: IRankingLevelReport[];
  newcommers: IRankingLevelReport;
}

export interface IRankingLevelReport {
  title: string;
  description: string;
  value: number;
  imageUrl: string;
  unachievedImageUrl: string;
  growthRate: number;
  primaryColor: string;
  secondaryColor: string;
  requiredPoints: number;
}

export interface IRakingPieReportResult {
  pies: IRakingPieReport[];
  piesCount: number;
}

export interface IRakingPieReport {
  title: string;
  primaryColor: string;
  cost: number;
  count: number;
}
