"use client";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { IMenuSettingTabProps } from "../../menu-setting-content";
import CompanyMainInfo from "../company-main-info";
import { Collapse } from "antd";
import GeoSettingInfo from "../geo-setting-info";
import { renderPlusMinusForCollapse } from "@/components/club-managment-components/club-settings-components/settins-modals/theme-settings/theme-setting-components/theme-expand";



const CompanyTabSettingContainer = ({ form, fromLoading }: IMenuSettingTabProps) => {
    const { control, watch, setValue, formState: { errors } } = form;
    const SettingPanels = [
        {
            label: " تنظیمات اصلی",
            key: 2,
            children: (
                <CompanyMainInfo
                    errors={errors}
                    control={control} />
            ),
        },
        {
            label: "تنظیمات موقعیت مکانی",
            key: 1,
            children: (
                <GeoSettingInfo
                    control={control}
                    watch={watch}
                    setValue={setValue}
                />
            ),
        },

    ];
    return (
        <div
            className=" !mt-5 bg-Highlighter !p-5 rounded-lg w-full  md:w-1/2 md:min-w-[600px] mx-auto !font-Regular flex flex-col gap-2"
        >

            <Collapse
                bordered={false}

                defaultActiveKey={SettingPanels.map((panel) => panel.key)}
                className=" flex gap-4  w-full flex-wrap !bg-transparent [&_.ant-collapse-item]:!border-none !font-Regular"
            >
                {SettingPanels.map((panel) => (
                    <Collapse.Panel
                        key={panel.key}
                        className=" w-full !duration-200 !rounded-lg !outline !outline-1 !outline-Highlighter-Faded  [&_.ant-collapse-header]:!items-center  !h-max  "
                        header={
                            <div className="flex relative  items-center  justify-between ">
                                <div className=" flex gap-1 items-center">
                                    <span className=" text-lg w-max text-ellipsis text-nowrap">
                                        {panel.label}
                                    </span>
                                </div>
                            </div>
                        }
                    >
                        {panel.children}
                    </Collapse.Panel>
                ))}
            </Collapse>

            <div className=" flex justify-end w-full">
                <button
                    type="submit"
                    form="menu-setting-form"
                    disabled={fromLoading}
                    className={`w-max  items-center flex py-2 px-4 rounded-md text-gray-100 text-base gap-2 font-Regular disabled:opacity-70 bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all `}
                >
                    <span>ثبت تغییرات</span>
                    {fromLoading && <LoadingOutlined />}
                </button>
            </div>
        </div>
    );
};
export default CompanyTabSettingContainer;
