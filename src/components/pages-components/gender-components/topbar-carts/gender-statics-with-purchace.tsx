"use client";

import { IGenderStaticsWithPurchases } from "@/types/genderTypes";
import { getGenderStatisticsWithPurchases } from "@/utils/genderServices";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import GenderTopBarCardItem from "./gender-topbar-card";
import { Icon } from "@iconify/react";
import AnimatedProgress from "@/components/shared-components/animated-progreebar";

const GenderCartWithPurchases = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get_gender_statistics_with_purchases"],
    queryFn: getGenderStatisticsWithPurchases,
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

  const genderStatistics: IGenderStaticsWithPurchases[] =
    data?.data?.status === "success" ? data?.data?.data : [];

  return genderStatistics.map((item, index) => (
    <GenderTopBarCardItem
      key={index}
      cardClass="col-span-1 animate-fadeIn w-full aspect-[16/7] ldxl:aspect-[17/6] ldxl:p-3 bg-Highlighter rounded-[10px] flex flex-col justify-between p-2 shadow"
      cardTitle={`فراوانی داده: ${item.gender}`}
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
      <div className="w-full flex items-center font-Medium justify-center gap-8 bg-Highlighter">
        <div className="flex flex-col items-center gap-1">
          <span>نسبت به تعداد کل</span>
          <AnimatedProgress
            percent={item.gender_percentage}
            className="!font-Medium"
            size={60}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span>نسبت به خرید کل</span>
          <AnimatedProgress
            percent={item.purchased_percentage}
            className="!font-Medium"
            size={60}
          />
        </div>
      </div>
    </GenderTopBarCardItem>
  ));
};

export default GenderCartWithPurchases;
