import React, { useMemo } from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CompanyConfig } from '../useMenuSettings'
import { ICompanyItem } from '@/types/ditgitalmenu-types/company'
import ReusableFormFieldTextArea from '@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea'
import ReusableFormField from '@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input'
import SelectAddressMap from '@/components/branch-management-components/branch-tab/map-selection/map-selection'
import { LatLngExpression, LatLngLiteral } from 'leaflet'

function GeoSettingInfo({
    control,
    setValue,
    watch
}: {
    control: Control<CompanyConfig, any>;
    watch: UseFormWatch<CompanyConfig>;
    setValue: UseFormSetValue<CompanyConfig>
}) {
    const filedItems: Partial<Record<keyof ICompanyItem, {
        fieldType: 'text-area' | "text",
        label: string
    }>> = {
        city: { fieldType: 'text', label: "شهر" },
        state: { fieldType: 'text', label: "استان" },
        address_line: { fieldType: 'text-area', label: "آدرس" },
    }
    const handleSelectLocationFromMap = async (e: LatLngLiteral) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${e.lat}&lon=${e.lng}&format=json`
            );
            if (response.ok) {
                const data = await response.json();
                const address = data.display_name || "";
                setValue("mainCompanyConfigs.address_line", address);
                setValue("mainCompanyConfigs.latitude", Number(e.lat.toFixed(6)));
                setValue("mainCompanyConfigs.longitude", Number(e.lng.toFixed(6)));
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };
    const mapWatch = watch('mainCompanyConfigs')
    const mapValue = useMemo(() => {
        const whatchFileds = [mapWatch.latitude, mapWatch.longitude]
        return whatchFileds[0] && whatchFileds[1]
            ? (whatchFileds as LatLngExpression)
            : ([36.297972, 59.606152] as LatLngExpression);
    }, [mapWatch]);
    return (
        <div className=' grid grid-cols-2 gap-3'>
            {Object.entries(filedItems).map(
                ([key, { fieldType, label }]) => (
                    fieldType == 'text-area' ? <div key={key} className=" flex w-full col-span-2 items-center gap-2">
                        <ReusableFormFieldTextArea
                            className="!m-0 w-full"
                            name={`mainCompanyConfigs.${key}`}
                            control={control}
                            requierd={false}

                            label={label}
                        />
                    </div> : <div key={key} className=" w-full flex items-center gap-2">
                        <ReusableFormField
                            className="!m-0 w-full"
                            name={`mainCompanyConfigs.${key}`}
                            control={control}
                            requierd={false}
                            label={label}
                        />
                    </div>
                )
            )}
            <div className='col-span-2 '>
                <SelectAddressMap
                    onChange={handleSelectLocationFromMap}
                    location={mapValue}
                />
            </div>
        </div>
    )
}

export default GeoSettingInfo