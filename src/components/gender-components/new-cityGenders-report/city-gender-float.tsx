import { Drawer, Empty, FloatButton, Skeleton, Typography } from 'antd'
import React, { useState } from 'react'
import { SalesByGenderAndCityReportProps } from './city-gender-report-carts';
import SalesByGenderAndCityReportConfigs from './city-and-gender-dateFilter';
import SalesByGenderAndCity from './gender-report-cart-item';

function CitesGenderReportCartsDrawer({ setDefaultPayload, isLoading, reportData, setCityInfo, cityInfo }: SalesByGenderAndCityReportProps) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <FloatButton onClick={showDrawer} />
            <Drawer title={
                <h2 className="w-full text-right py-2 text-base dxl:text-lg ldxl:text-xl font-Medium">
                    فروش بر اساس جنسیت و شهر
                </h2>
            } styles={{
                header: {
                    direction: "ltr"
                }
            }} onClose={onClose} open={open}>
                <SalesByGenderAndCityReportConfigs
                    getDataWithReactQuery={setDefaultPayload}
                    loading={isLoading}
                />
                {isLoading && (
                    <div className="w-full flex flex-col gap-2 p-2 max-h-[55dvh] overflow-hidden">
                        {[...Array(10)].map((_, index) => (
                            <Skeleton.Node
                                key={index}
                                active
                                className="!w-full aspect-[16/3]"
                            />
                        ))}
                    </div>
                )}

                {!isLoading && reportData.salesData.length === 0 && (
                    <div className="w-full h-[300px] flex justify-center items-center">
                        <Empty
                            description={
                                <Typography.Text className="!font-Medium">
                                    داده‌ای یافت نشد
                                </Typography.Text>
                            }
                        />
                    </div>
                )}
                {!isLoading && reportData.salesData.length > 0 && (
                    <div className="w-full h-full grid grid-cols-1 gap-2">
                        {["menData", "womenData"].map((genderKey) => (
                            <SalesByGenderAndCity
                                key={genderKey}
                                genderItem={reportData[genderKey as keyof typeof reportData]}
                                setCityInfo={setCityInfo}
                                cityInfo={cityInfo}
                            />
                        ))}
                    </div>
                )}
            </Drawer>
        </>
    )

}

export default CitesGenderReportCartsDrawer