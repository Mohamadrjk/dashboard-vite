import { useCallback, useEffect, useState } from "react";
import useCompanyList from "@/hooks/branch-management-hooks/useCompanyList";
import { ICompanyItem } from "@/types/ditgitalmenu-types/company";
import { updateCompanyInfo } from "@/api/digitalmenu-api/companyService";
import { useNotify } from "../shared/notife/notife";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  mainCompanyConfigs: Yup.object().shape({
    company_id: Yup.number(),
    name: Yup.string(),
    description: Yup.string(),
    address_line: Yup.string(),
    phone_number: Yup.string()
      .matches(/^\d{11}$/, "شماره تماس معتبر نیست"),
    postal_code: Yup.string()
      .matches(/^\d{10}$/, "کد پستی معتبر نیست"),
    mobile_number: Yup.string()
      .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست"),
    email: Yup.string(),
    website: Yup.string(),
    logo_url: Yup.string(),
    created_at: Yup.string(),
    updated_at: Yup.string(),
  }),
  generalConfigs: Yup.object().shape({
    vat: Yup.number(),
    hasVat: Yup.boolean(),
    hasWellcomeText: Yup.boolean(),
    wellcomeText: Yup.string(),
    wellcomeTextPos: Yup.string(),
    image_url: Yup.string(),
  }),
  themeConfigs: Yup.object().shape({
    mode: Yup.string().oneOf(["light", "dark"]),
    primaryText: Yup.string(),
    primary: Yup.string(),
    secondary: Yup.string(),
    secondaryText: Yup.string(),
    background: Yup.string(),
    text: Yup.string(),
    white: Yup.string(),
    gray: Yup.string(),
  }),
});

export interface CompanyThemeConfig {
  mode?: string;
  primaryText?: string;
  primary?: string;
  secondary?: string;
  secondaryText?: string;
  background?: string;
  text?: string;
  white?: string;
  gray?: string;
}
export interface CompanyGenenralConfig {
  vat?: number;
  hasVat?: boolean;
  hasWellcomeText?: boolean;
  wellcomeText?: string;
  wellcomeTextPos?: string;
  image_url?: string;
}
export interface CompanyConfig {
  generalConfigs?: CompanyGenenralConfig;
  themeConfigs?: CompanyThemeConfig;
  mainCompanyConfigs?: ICompanyItem;
}

function useMenuSettings() {
  const defaultThemeConfig: CompanyThemeConfig = {
    primary: "#005B4C",
    primaryText: "#ffffff",
    background: "#f0d9b1",
    mode: "light",
    secondary: "#f0d9b1",
    secondaryText: "#000000",
    gray: "#4b4b4d",
    text: "#000000",
    white: "#000000",
  };
  const { CompanyList } = useCompanyList();

  const ThemeForm = useForm<CompanyConfig>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      generalConfigs: {},
      themeConfigs: defaultThemeConfig,
    },
  });
  const { notify } = useNotify();
  const [loading, setLoading] = useState<boolean>(false);

  const initThemeFromCompany = useCallback(() => {
    if (CompanyList.length) {
      const { config, ...mainCompanyConfigs } = CompanyList[0];
      const CompanyThemeConfig =
        config &&
        (JSON.parse(config) as CompanyConfig);
      if (
        CompanyThemeConfig.themeConfigs &&
        CompanyThemeConfig.generalConfigs
      ) {
        Object.entries(CompanyThemeConfig.themeConfigs).map(([key, value]) => {
          ThemeForm.setValue(
            `themeConfigs.${key as keyof CompanyThemeConfig}` as const,
            value
          );
        });
        Object.entries(CompanyThemeConfig.generalConfigs).map(
          ([key, value]) => {
            ThemeForm.setValue(
              `generalConfigs.${key as keyof CompanyGenenralConfig}` as const,
              value
            );
          }
        );
        Object.entries(mainCompanyConfigs).map(
          ([key, value]) => {
            ThemeForm.setValue(
              `mainCompanyConfigs.${key as keyof ICompanyItem}` as const,
              value
            );
          }
        )
      }
    }
  }, [CompanyList]);

  useEffect(() => {
    initThemeFromCompany();
  }, [initThemeFromCompany]);

  const onSubmit = async (data: CompanyConfig) => {
    setLoading(true);
    const { mainCompanyConfigs, ...themeConfigPayload } = data
    const stringifyData = JSON.stringify(themeConfigPayload);
    const payload = { ...CompanyList[0], ...mainCompanyConfigs, config: stringifyData }
    try {
      const companyUpdateRes = await updateCompanyInfo({
        company_id: CompanyList[0].company_id,
        item: payload,
      });
      if (companyUpdateRes.data.status === "success") {
        notify("success", companyUpdateRes.data.message);
      } else {
        notify("error", "خطا در ویرایش تنظیمات منو");
      }
    } catch (e) {
      notify("error", e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    setValue: ThemeForm.setValue,
    ThemeForm: ThemeForm,
    loading: loading,
  };
}

export default useMenuSettings;
