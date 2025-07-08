"use client";

import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import SalesByGenderAndCityReportConfigs from "./city-and-gender-dateFilter";
import SalesByGenderAndCity from "./gender-report-cart-item";
import { Skeleton, Empty, Typography } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface SalesByGenderAndCityReportProps {
  setCityInfo: Dispatch<SetStateAction<ISalesByGenderAndCityReport>>;
  cityInfo: ISalesByGenderAndCityReport;
  isLoading: boolean;
  setDefaultPayload: Dispatch<
    SetStateAction<{
      start_date: string;
      end_date: string;
      limit: number;
    }>
  >;
  reportData: {
    salesData: ISalesByGenderAndCityReport[];
    menData: ISalesByGenderAndCityReport[];
    womenData: ISalesByGenderAndCityReport[];
  };
}

const CitesGenderReportCarts: React.FC<SalesByGenderAndCityReportProps> = ({
  setCityInfo,
  cityInfo,
  setDefaultPayload,
  isLoading,
  reportData,
}) => {

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col gap-2 p-2 shadow bg-Highlighter h-max rounded-lg animate-fadeIn min-h-[400px]"
    >
      <h2 className="w-full text-center py-2 text-base dxl:text-lg ldxl:text-xl font-Medium">
        فروش بر اساس جنسیت و شهر
      </h2>

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
        <div className="w-full h-full grid grid-cols-2 gap-2">
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
    </div>
  );
};

export default CitesGenderReportCarts;
