import React from 'react'
import ThemeColors from './theme-colors';
import ThemeCompany from './theme-company';
import { Form, TabsProps } from 'antd';
import GeneralTabPanel from '@/components/branch-management-components/tabs-component/GeneraTabPanel';
import useClubThemeSetting from '../useClubThmem';
import { UseFormReturn } from 'react-hook-form';
import { IClubCompanyInfo } from '../../../../../../types/club-types/club_theme_types';
export interface IThemePanlesContainerProps {
    form: UseFormReturn<IClubCompanyInfo>
    fromLoading: boolean
}
function ThemePanlesContainer(props: IThemePanlesContainerProps) {
    const tabs: TabsProps["items"] = [
        {
            key: "2",
            className: "!w-full",
            label: "رنگ بندی",
            children: <ThemeColors form={props.form} fromLoading={props.fromLoading} />,
        },
        {
            key: "1",
            className: "!w-full",
            label: "مجموعه",
            children: <ThemeCompany form={props.form} fromLoading={props.fromLoading} />,
        },

    ];

    return (
        <div className=' font-Regular flex flex-col gap-5 w-full h-full'>
            <GeneralTabPanel items={tabs} />
        </div >
    )
}

export default ThemePanlesContainer