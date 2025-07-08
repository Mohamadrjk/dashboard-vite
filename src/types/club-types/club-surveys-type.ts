export interface IClubSurvey {
  Title: string;
  questionQty: number;
  point: number;
  usersGroup: string;
  registerDate: string;
  active: boolean;
}

export interface Point {
  title: string;
  pointValue: number;
}

export interface Detail {
  id: number;
  title: string;
  imageUrl: string;
}

export interface ISurvey {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  imageUrl: string;
  isActive: true;
  updatedAt: string;
  gratitudeTitle: string;
  gratitudeDescription: string;
  maxPoint: number;
  surveyDetailsCount: number;
  averagePoints: number;
}

export interface ISurveyPointGroup {
  id: number;
  title: string;
  svgIcon: string;
  fillSvgIcon: string;
  maxPoint: number;
  pointTitleValues: {
    key: string;
    value: number;
  }[];
}

export interface IGenerateSurvey {
  Title?: string;
  Description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image?: any;
  GratitudeTitle?: string;
  GratitudeDescription?: string;
  SurveyPointGroupId?: number;
  DetailImages: File[];
  DetailTitles: string[];
}
