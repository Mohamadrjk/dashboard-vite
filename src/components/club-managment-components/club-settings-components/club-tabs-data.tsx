import {
  AppSettingIcon,
  ExchangeRangeIcon,
  RankingSettingIcon,
  RulesSettingIcons,
  SurveyIcon,
} from "@/components/shared/custom-icons/index";
import { BgColorsOutlined } from "@ant-design/icons";
export interface ITabsList {
  title: string;
  icon: React.JSX.Element;
  descriptionList: string[];
  key: string;
}
export const tabsList: ITabsList[] = [
  {
    key: "OpinionPoll",
    descriptionList: ["پیشفرض فاکتور", "پیشفرض کمپانی"],
    icon: (
      <SurveyIcon
        width="100%"
        height="100%"
        className="w-full h-full"
        color="var(--Tritary)"
        strokeWidth="15"
      />
    ),
    title: "تنظیمات نظرسنجی",
  },
  {
    key: "RankingSettings",
    descriptionList: ["انتخاب پیشفرض رتبه"],
    icon: (
      <RankingSettingIcon
        width="100%"
        height="100%"
        className="w-full h-full"
        color="var(--Tritary)"
        strokeWidth="15"
      />
    ),
    title: "تنظیمات رتبه‌بندی",
  },
  {
    key: "ProgramSettings",
    descriptionList: ["تنظیمات بنر تبلیغاتی", "تنظیمات رنگ بندی"],
    icon: (
      <AppSettingIcon
        width="100%"
        height="100%"
        className="w-full h-full"
        color="var(--Tritary)"
        strokeWidth="15"
      />
    ),
    title: "تنظیمات برنامه",
  },
  {
    key: "ExchangeRangePoints",
    descriptionList: ["نرخ تبدیل خرید به امتیاز", "نرخ تبدیل خرید به سکه"],
    icon: (
      <ExchangeRangeIcon
        width="100%"
        height="100%"
        className="w-full h-full"
        color="var(--Tritary)"
        strokeWidth="15"
      />
    ),
    title: "نرخ‌های تبدیل امتیازات",
  },
  {
    key: "RulesSetting",
    descriptionList: [
      "در نظر گرفتن فاکتورهای پیشین",
      "تعداد روزهای مجاز ثبت کد دعوت",
    ],
    icon: (
      <RulesSettingIcons
        width="100%"
        height="100%"
        className="w-full h-full"
        color="var(--Tritary)"
        strokeWidth="15"
      />
    ),
    title: "تنظیمات قوانین",
  },
  {
    key: "ThemeSetting",
    descriptionList: [
      "تنظیمات رنگ بندی",
      "تنظیمات مجموعه",
    ],
    icon: (
      <BgColorsOutlined
        className="!w-full !h-full *:w-full *:h-full *:stroke-[15px] !text-Tritary "
      />
    ),
    title: "تنظیمات ظاهری",
  },
];
