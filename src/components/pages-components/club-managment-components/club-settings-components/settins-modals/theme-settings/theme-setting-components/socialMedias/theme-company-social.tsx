/* eslint-disable @typescript-eslint/no-explicit-any */
import CurrentSocialList from './currentSocialList';
import useSocialHandler from './useSocialHandler';
import SocialInput from './socialInput';
import SelectDropdown from '@/components/pages-components/branch-management-components/branch-tab/selectDropDown';
import { IClubCompanySocialMedias } from '@/types/club-types/club_theme_types';

export interface ThemeCompanySocialProps { label?: string, value?: IClubCompanySocialMedias[], setValue?: any, disabled?: boolean }
export default function ThemeCompanySocial({ disabled, label, setValue, value }: ThemeCompanySocialProps) {
    const { handleSubmit, socialTypes, error, handleSelectCategory, onDeleteSocial, selectedType, onSocialInputChnage, urlInput, tempValue, selectedSocialData } = useSocialHandler(setValue, value);
    return (
        <div className=' flex flex-col gap-2'>
            <div className=" relative flex   items-end flex-wrap  gap-1 ">
                <SocialInput disabled={!!disabled} error={error} label={label ?? ""} urlInput={urlInput} onSocialInputChnage={onSocialInputChnage} />
                <div className=' max-md:w-full  grow'>
                    <SelectDropdown
                        onMenuClick={handleSelectCategory}
                        disabled={disabled}
                        options={socialTypes}
                        title="نوع شبکه اجتماعی "
                        selectedItem={selectedSocialData}
                    />
                </div>
                <button onClick={handleSubmit} disabled={disabled || error || !urlInput.length || selectedType == 0} className="rounded-[6px] !px-4 !py-1 disabled:!bg-slate-400 !bg-cta !opacity-70 !text-Highlighter !font-Regular !text-base">ثبت </button>
            </div>
            <CurrentSocialList disabled={!!disabled} onDeleteSocial={onDeleteSocial} socialList={tempValue} />
        </div >
    )
}
