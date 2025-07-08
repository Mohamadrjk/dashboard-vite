import React from 'react'
import { IThemePanlesContainerProps } from './theme-panels'
import ReusableFormField from '@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input'
import ThemeRowImageUploader from './uploaders/theme-setting-uploader';
import ReusableFormFieldTextArea from '@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea';
import ThemeCompanyPhoneInput from './theme-company-phonenumber';
import ClubUploaderProps from './uploaders/club-uploader';
import { uploadToClubGalery } from '@/utils/club-api/club-gallery-service';
import ThemeCompanySocial from './socialMedias/theme-company-social';
const baseUploaderUrl = process.env.NEXT_PUBLIC_CLUB_MANAGEMENT
function ThemeCompany({ form, fromLoading }: IThemePanlesContainerProps) {
    const { control, getValues, setValue } = form;
    const fieldsForCompany = {
        companyName: 'نام مجموعه',
        companyWebSiteAddress: "آدرس وب سایت",
        companyEmail: "ایمیل مجموعه",
    }


    const uploadhandler = async (file) => {
        try {
            const res = await uploadToClubGalery({
                Photo: file
            })
            return res.result.url
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='   max-h-[60vh] overflow-auto  p-1 grid grid-cols-2 max-md:grid-cols-1 gap-4 '>
            <div className=' col-span-full'>
                <div>بارگزاری لوگو </div>
                <div className=" w-max mx-auto">
                    <ClubUploaderProps
                        baseUploaderUrl={baseUploaderUrl}
                        uploadHandler={uploadhandler}
                        name="logoUrl"
                        control={control}
                        disabled={fromLoading}
                    />
                </div>
            </div>
            {Object.keys(fieldsForCompany).map((i, index) => (
                <div key={index}>
                    <span>{fieldsForCompany[i]}</span>
                    <ReusableFormField
                        className="!m-0"
                        name={i}
                        control={control}
                        disabled={fromLoading}
                        requierd={false}
                    />
                </div>
            ))}
            <div className='col-span-full'>
                <span>آدرس</span>
                <ReusableFormFieldTextArea
                    className="!m-0"
                    name={"companyAddress"}
                    control={control}
                    disabled={fromLoading}
                    requierd={false}
                />
            </div>
            <div className=' col-span-full flex flex-col gap-2 w-full' >
                <div>بارگزاری لوگوی فوتر </div>
                <div className=" w-full">
                    <ThemeRowImageUploader
                        baseUploaderUrl={baseUploaderUrl}
                        name="logoUrlFooter"
                        disabled={fromLoading}
                        control={control}
                        uploadHandler={uploadhandler}
                    />
                </div>
            </div>
            <div className=' col-span-full flex flex-col gap-2 w-full' >
                <div>بارگزاری تصویر پس زمینه  </div>
                <div className=" w-full">
                    <ThemeRowImageUploader
                        baseUploaderUrl={baseUploaderUrl}
                        disabled={fromLoading}
                        name="backgroundDesign"
                        control={control}
                        uploadHandler={uploadhandler}
                    />
                </div>
            </div>
            <div className=' col-span-full flex flex-col gap-2 w-full' >
                <div>شماره تلفن   </div>
                <div className=" w-full">
                    <ThemeCompanyPhoneInput disabled={fromLoading} setValue={(value) => setValue("phoneNumbers", value)} value={getValues('phoneNumbers')} />
                </div>
            </div>
            <div className=' col-span-full flex flex-col gap-2 w-full' >
                <div className=" w-full">
                    <ThemeCompanySocial label='شبکه های اجتماعی ' disabled={fromLoading} setValue={(value) => setValue("companySocialMedias", value)} value={getValues('companySocialMedias')} />
                </div>
            </div>
        </div>
    )
}

export default ThemeCompany