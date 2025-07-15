"use client";

import { IGenderStatics } from "@/types/genderTypes";
import { getGenderStatistics } from "@/api/genderServices";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import GenderTopBarCardItem from "./gender-topbar-card";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react";
import Counter from "@/components/shared-components/load-numbers";

const GenderCart = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["genderStatistics"],
    queryFn: getGenderStatistics,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  if (isLoading)
    return (
      <>
        <Skeleton.Node
          active
          className="col-span-1 !w-full !h-full aspect-[16/6]"
        />
        <Skeleton.Node
          active
          className="col-span-1 !w-full !h-full aspect-[16/6]"
        />
      </>
    );

  if (isError)
    return (
      <div className="font-Regular relative">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button
          onClick={() => refetch()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );

  const genderStatistics: IGenderStatics[] =
    data?.data?.status === "success" ? data?.data?.data : [];

  return genderStatistics.map((item, index) => (
    <GenderTopBarCardItem
      key={index}
      cardClass="col-span-1 animate-fadeIn w-full aspect-[16/7] ldxl:aspect-[17/6] ldxl:p-3 bg-Highlighter rounded-[10px] flex flex-col justify-between p-2 shadow"
      cardTitle={`پرداختی ${item.gender}`}
      icon={
        item.gender === "آقا" ? (
          <Icon
            icon="fontisto:male"
            width="22"
            height="24"
            style={{ color: "#2CA4D2" }}
          />
        ) : (
          <Icon
            icon="foundation:torso-female"
            width="30"
            height="30"
            style={{ color: "#B13173" }}
          />
        )
      }
    >
      <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
        <p className="flex flex-col items-center gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-sm whitespace-nowrap font-Regular">
            تعداد کل مشتری
          </span>
          <span className="font-Medium text-lg">
            <Counter targetNumber={item.gender_count} duration={500} />
          </span>
        </p>

        <p className="flex flex-col items-center gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-sm whitespace-nowrap font-Regular">
            مبلغ کل خرید
          </span>
          <span className="font-Medium text-lg">
            {numberToPersianPrice(item.total_paid)}
            <span className="text-xs pr-1">تومان</span>
          </span>
        </p>
      </div>
    </GenderTopBarCardItem>
  ));
};

export default GenderCart;
