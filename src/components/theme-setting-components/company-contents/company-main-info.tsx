import React from 'react'
import ReusableFormField from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import ReusableFormFieldTextArea from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea";
import { CompanyConfig } from "../useMenuSettings";
import { Control, FieldErrors } from 'react-hook-form';
import { ICompanyItem } from '@/types/ditgitalmenu-types/company';

const CompanyMainInfo = ({
    control,
    errors
}: {
    errors: FieldErrors<CompanyConfig>,
    control: Control<CompanyConfig, any>
}) => {
    const filedItems: Partial<Record<keyof ICompanyItem, {
        fieldType: 'text-area' | "text",
        label: string
    }>> = {
        name: {
            fieldType: 'text',
            label: 'نام مجموعه'
        },
        mobile_number: { fieldType: "text", label: "شماره همراه" },
        description: { label: 'بیوگرافی (توضیحات)', fieldType: 'text-area', },
        phone_number: { fieldType: 'text', label: "شماره تلفن" },
        postal_code: { fieldType: 'text', label: "کد پستی" },
    }




    return (
        <div className=" grid grid-cols-2 gap-3">
            {Object.entries(filedItems).map(
                ([key, { fieldType, label }]) => (
                    fieldType == 'text-area' ? <div key={key} className=" flex w-full col-span-2 items-center gap-2">
                        <ReusableFormFieldTextArea
                            className="!m-0 w-full relative pb-4"
                            name={`mainCompanyConfigs.${key}`}
                            control={control}
                            requierd={false}
                            label={label}
                        />
                    </div> : <div key={key} className=" w-full  flex items-center gap-2">
                        <ReusableFormField
                            className="!m-0 w-full relative  pb-4"
                            name={`mainCompanyConfigs.${key}`}
                            control={control}
                            customeError={errors && errors['mainCompanyConfigs']?.[key]}
                            requierd={false}
                            label={label}
                        />
                    </div>
                )
            )}

        </div>
    );
};




export default CompanyMainInfo