import {
  ISurvey,
  ISurveyPointGroup,
} from "@/types/club-types/club-surveys-type";

export const survetTopCartsData = {
  allSurveys: {
    title: "تعداد نظرسنجی ثبت شده",
    value: 10,
    growthRate: 15,
  },
  surveysStates: [
    {
      title: "تعداد نظرسنجی انجام شده",
      state: "done",
      value: 10,
      growthRate: 15,
    },
    {
      title: "تعداد نظرسنجی نیمه انجام شده",
      state: "undone",
      value: 10,
      growthRate: 15,
    },
    {
      title: "تعداد نظرسنجی دارای امتیاز",
      state: "withPoint",
      value: 10,
      growthRate: 15,
    },
  ],
};

export const surveyPointGroup: ISurveyPointGroup[] = [
  {
    title: "گروه امتیازی 1",
    svgIcon: "very-bad-icon.svg",
    fillSvgIcon: "very-bad-icon-filled.svg",
    maxPoint: 1,
    pointTitleValues: [
      { key: "خیلی ضعیف", value: 1 },
      { key: "ضعیف", value: 2 },
      { key: "معمولی", value: 3 },
      { key: "خوب", value: 4 },
      { key: "عالی", value: 5 },
    ],
    id: 1,
  },
  {
    title: "گروه امتیازی 2",
    svgIcon: "bad-icon.svg",
    fillSvgIcon: "bad-icon-filled.svg",
    maxPoint: 1,
    pointTitleValues: [
      { key: "بد", value: 1 },
      { key: "متوسط", value: 2 },
      { key: "خوب", value: 3 },
      { key: "خوب", value: 3 },
      { key: "بسیار خوب", value: 4 },
      { key: "عالی", value: 5 },
    ],
    id: 2,
  },
];

export const surveyUsersGroup = [
  {
    id: 1,
    title: "نظرسنجی فاکتور",
    key: "factor",
  },
  {
    id: 2,
    title: "نظرسنجی مجموعه",
    key: "company",
  },
];
