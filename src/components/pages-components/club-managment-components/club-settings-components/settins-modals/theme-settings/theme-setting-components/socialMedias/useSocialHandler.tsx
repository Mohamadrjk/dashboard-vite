import { useMemo, useState } from 'react'
import { IClubCompanySocialMedias } from '../../../../../../../types/club-types/club_theme_types';
import { useQuery } from '@tanstack/react-query';
import { getSocialMedias } from '@/api/club-api/club-setting-service';
import { IClubHttpResult } from '@/api/club-api/club-http-result';

const useGetSocialTypes = () => {
    return useQuery<IClubHttpResult<IClubCompanySocialMedias[]>, Error, IClubHttpResult<IClubCompanySocialMedias[]>, string[]>({
        queryKey: ['socialTypes'],
        queryFn: () => getSocialMedias()
    })

}


function useSocialHandler(setValue, value) {
    const { data } = useGetSocialTypes()
    const socialTypes = useMemo(() => {
        return data?.result?.map((i) => ({ key: i.id, label: i.title })) || []
    }, [data])
    const [urlInput, setUrlInput] = useState<string>('');
    const [tempValue, setTempValue] = useState<IClubCompanySocialMedias[]>(value)
    const [selectedType, setSelectedType] = useState<number>(1);
    const selectedSocialData = useMemo(() => {
        return socialTypes?.find((i) => i.key == selectedType)
    }, [selectedType])


    const handleSelectCategory = (e) => {
        setSelectedType(e.key);
    };
    const [error, setError] = useState<boolean>(false)
    function onDeleteSocial(item: IClubCompanySocialMedias) {
        const updateValue = value.filter(i => i.socialMediaId != item.socialMediaId)
        setTempValue(updateValue)
        setValue(updateValue)
    }
    function onSocialInputChnage(value) {
        if (value.includes(' ')) return;
        const isValid = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/.test(value) || value === '';
        setError(!isValid);
        setUrlInput(value)
    }
    const handleSubmit = () => {
        const findSocialTitle = data?.result?.find(i => i.id == selectedType)
        const newSocial = {
            linkUrl: urlInput,
            socialMediaId: selectedType,
            ...findSocialTitle,
        }
        const newValue = [...tempValue, newSocial]
        setUrlInput('');
        setTempValue(newValue)
        setValue(newValue)
    }
    return {
        socialTypes,
        urlInput,
        setUrlInput,
        selectedType,
        setSelectedType,
        handleSelectCategory,
        error,
        setError,
        onDeleteSocial,
        onSocialInputChnage,
        handleSubmit,
        tempValue,
        selectedSocialData
    }
}

export default useSocialHandler