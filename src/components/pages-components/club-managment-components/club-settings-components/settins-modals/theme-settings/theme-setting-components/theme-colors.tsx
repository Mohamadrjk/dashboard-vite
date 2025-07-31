/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { IThemePanlesContainerProps } from './theme-panels'
import { Collapse } from 'antd';
import { renderPlusMinusForCollapse } from './theme-expand';
import { IClubCompanyTheme } from '@/types/club-types/club_theme_types';
import CustomThemeColorPicker from '@/components/pages-components/theme-setting-components/theme-contents/customThemeColorPicker';


function ThemeColors({ form, fromLoading }: IThemePanlesContainerProps) {
    const { control } = form;
    const colorCollapsePanels = [

        {
            label: " رنگ دکمه ها",
            key: 2,
            children: (
                <ButtonsColorSection control={control} fromLoading={fromLoading} />
            ),
        },
        {
            label: "رنگ پس زمینه",
            key: 1,
            children: (
                <BGColorsSection control={control} fromLoading={fromLoading} />
            ),
        },
    ];
    return (
        <div className='  gap-5 w-full h-[60vh] overflow-auto p-2'>
            <Collapse
                bordered={false}
                expandIcon={(p) => renderPlusMinusForCollapse(p)}
                defaultActiveKey={colorCollapsePanels.map((panel) => panel.key)}
                className=" flex gap-4  w-full flex-wrap !bg-transparent [&_.ant-collapse-item]:!border-none !font-Regular"
            >
                {colorCollapsePanels.map((panel) => (
                    <Collapse.Panel
                        key={panel.key}

                        className=" w-full !duration-200 !bg-Highlighter !rounded-lg !outline !outline-1 !outline-Highlighter-Faded  [&_.ant-collapse-header]:!items-center  !h-max  "
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

        </div>
    )
}

const ButtonsColorSection = (props: any) => {
    const ButtonsColorFileds: IClubCompanyTheme = {
        cta: "رنگ دکمه اصلی",
        "ctaDisabled": " رنگ دکمه اصلی (غیرفعال)",
        "ctaHover": " رنگ دکمه اصلی (هاور)",
        "ctaFocus": " رنگ دکمه اصلی (انتخاب)",
        alert: "رنگ دکمه اخطار ",
        primary: "رنگ دکمه اولیه ",
        focus: "رنگ دکمه انتخاب ",
        tritary: 'رنگ حاشیه ثانویه',
        secondary: "رنگ حاشیه اصلی ",
    }
    return (<div className=' grid grid-cols-2  max-md:grid-cols-1  gap-5 w-full h-full'>
        {Object.keys(ButtonsColorFileds).map((i, index) => <CustomThemeColorPicker
            key={index}
            title={ButtonsColorFileds[i as keyof typeof ButtonsColorFileds] ?? ''}
            control={props.control}
            lable={`colors.${i}`}
            disabled={props.fromLoading}
        />)}
    </div>)
}
const BGColorsSection = (props: any) => {
    const BGColorsSectionFileds: IClubCompanyTheme = {
        "cta30": " رنگ باکس متنی اصلی",
        highlighter: " رنگ  پس زمینه سفید ",
        "highlighterDisabled": " رنگ پس زمینه سفید (غیرفعال)",
        "highlighterHover": "رنگ پس زمینه سفید (هاور)",
        "highlighterFocus": " رنگ پس زمینه سفید (انتخاب)",
        "highlighterFaded": "  رنگ پس زمینه سفید (روشن)",
        bg: " رنگ پس زمینه اصلی",
    }
    return (<div className=' grid grid-cols-2   max-md:grid-cols-1 gap-5 w-full h-full'>
        {Object.keys(BGColorsSectionFileds).map((i, index) => <CustomThemeColorPicker
            key={index}
            title={BGColorsSectionFileds[i as keyof typeof BGColorsSectionFileds] ?? ''}
            control={props.control}
            lable={`colors.${i}`}
            disabled={props.fromLoading}
        />)}
    </div>)
}
export default ThemeColors