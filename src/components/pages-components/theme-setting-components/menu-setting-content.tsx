"use client";
import { Form, Skeleton, TabsProps } from "antd";
import useMenuSettings, { CompanyConfig } from "./useMenuSettings";
import GeneralTabPanel from "../branch-management-components/tabs-component/GeneraTabPanel";
import { UseFormReturn } from "react-hook-form";
import { dynamic } from "@/components/shared-components/dynamicImport/dynamicImport";
// Dynamic Imports
const TabsLoader = () => {
  return (
    <div className=" w-[50vw] flex flex-col gap-4  h-[60vh]">
      <div className="  w-full grid grid-cols-2 gap-4">
        {Array.from({ length: 14 }).map((_, index) => (
          <Skeleton.Node key={index} active className="!w-full !h-[40px]" />
        ))}
      </div>
      <div className=" flex justify-end">
        <Skeleton.Node active className="!w-[200px] !h-[40px]" />
      </div>
    </div>
  );
};
const ThemeTabSection = dynamic(
  () => import("./theme-contents/theme-setting-conainer"),
  { loading: () => <TabsLoader /> }
);
const CompanyTabSection = dynamic(
  () => import("./company-contents/general-panel/company-tab-container"),
  { loading: () => <TabsLoader /> }
);
export interface IMenuSettingTabProps {
  form: UseFormReturn<CompanyConfig, any, undefined>;
  fromLoading: boolean;
}
const MenuSettingContent = () => {
  const { onSubmit, ThemeForm, loading } = useMenuSettings();
  const { handleSubmit } = ThemeForm;

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      className: "!w-full",
      label: "تنظیمات ظاهری",
      children: <ThemeTabSection form={ThemeForm} fromLoading={loading} />,
    },
    {
      key: "2",
      className: "!w-full",
      label: "تنظیمات مجموعه",
      children: <CompanyTabSection form={ThemeForm} fromLoading={loading} />,
    },
  ];

  return (
    <div className=" w-full flex justify-center items-center">
      <Form id="menu-setting-form" onFinish={handleSubmit(onSubmit)}>
        <GeneralTabPanel items={tabs} />
      </Form>
    </div>
  );
};
export default MenuSettingContent;
