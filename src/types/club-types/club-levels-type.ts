export interface IClubStatusNew {
  id: number;
  title: string;
  requiredPoints: number;
  description: string;
  imageUrl: string;
  unachievedImageUrl: string;
  rankingId: number;
  primaryColor?: string;
  secondaryColor?: string;
  levelBenefits: LevelBenefit[];
}

export interface LevelBenefit {
  id: number;
  description: string;
}

export interface IPreviewLevels {
  id: number;
  title: string;
  scoreUnitTitle: string;
  iconUrl: string;
}

export interface IClubRanks {
  id: number;
  title: string;
  scoreUnitTitle: string;
  iconUrl: string;
}

export interface ICreateLevelPayload {
  Title: string;
  Description: string;
  Image: File;
  UnachievedImage: File;
  RankingId: number;
  RequiredPoints: string;
  PrimaryColor?: string;
  LevelBenefits: string[];
  SecondaryColor?: string;
}

export interface IUpdateLevelPayload {
  Title: string;
  Description: string;
  Image: File;
  UnachievedImage: File;
  RankingId: number;
  RequiredPoints: string;
  PrimaryColor?: string;
  SecondaryColor?: string;
}
