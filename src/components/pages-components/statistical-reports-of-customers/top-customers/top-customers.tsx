"use client";

import { RedoOutlined } from "@ant-design/icons";
import { Alert, MenuProps, Skeleton } from "antd";
import { useEffect, useState, useCallback } from "react";
import "animate.css";

import { getTopCustomers } from "@/utils/customerService";
import { ITopCustomers } from "@/types/customers-model";
import TopCustomerCardItem from "./top-customer-card";
import { Icon } from "@iconify/react";
import SalesByGenderAndCityReportConfigs from "../../gender-components/new-cityGenders-report/city-and-gender-dateFilter";

const GENDER_ICONS = {
  آقا: { icon: "fontisto:male", color: "#2CA4D2" },
  خانم: { icon: "foundation:torso-female", color: "#B13173" },
};

const TopCustomers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [customers, setCustomers] = useState<ITopCustomers[]>([]);
  const [activeGender, setActiveGender] = useState<string | undefined>();

  const fetchData = useCallback(
    async (payload?: {
      start_date: string;
      end_date: string;
      limit: number;
      gender?: 1 | 2;
    }) => {
      setLoading(true);
      setError(false);
      try {
        const response = await getTopCustomers(payload ?? {});
        setCustomers(response?.data?.data ?? []);
      } catch (err) {
        setError(true);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const menuItems: MenuProps["items"] = [
    { key: "آقا", label: <span className="font-Medium">آقا</span> },
    { key: "خانم", label: <span className="font-Medium">خانم</span> },
  ];

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => (
        <Skeleton.Node key={index} active className="!w-full aspect-[16/3]" />
      ));
    }

    if (customers.length === 0) {
      return (
        <p className="text-center text-gray-500 font-Medium">
          هیچ مشتری‌ای یافت نشد
        </p>
      );
    }

    return (
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="max-h-[420px] ldxl:max-h-[300px] overflow-y-auto custome-scrool-bar-small flex flex-col gap-2">
          {customers
            .filter((item) => item.gender == "آقا")
            .map((customer, index) => {
              const genderInfo = GENDER_ICONS[customer.gender];
              return (
                <TopCustomerCardItem
                  key={index}
                  customer={customer}
                  icon={
                    <Icon
                      icon={genderInfo.icon}
                      width={customer.gender === "آقا" ? "18" : "26"}
                      height={customer.gender === "آقا" ? "20" : "26"}
                      style={{ color: genderInfo.color }}
                    />
                  }
                  cardClass={`w-full aspect-[6/1] flex flex-col gap-2 p-1 bg-gray-100 rounded-[6px] border border-gray-300 animate__animated animate__fadeInUp animate__delay-${index * 10
                    }ms`}
                />
              );
            })}
        </div>
        <div className="max-h-[420px] ldxl:max-h-[300px] overflow-y-auto custome-scrool-bar-small flex flex-col gap-2">
          {customers
            .filter((item) => item.gender == "خانم")
            .map((customer, index) => {
              const genderInfo = GENDER_ICONS[customer.gender];
              return (
                <TopCustomerCardItem
                  key={index}
                  customer={customer}
                  icon={
                    <Icon
                      icon={genderInfo.icon}
                      width={customer.gender === "آقا" ? "18" : "26"}
                      height={customer.gender === "آقا" ? "20" : "26"}
                      style={{ color: genderInfo.color }}
                    />
                  }
                  cardClass={`w-full aspect-[6/1] flex flex-col gap-2 p-1 bg-gray-100 rounded-[6px] border border-gray-300 animate__animated animate__fadeInUp animate__delay-${index * 10
                    }ms`}
                />
              );
            })}
        </div>
      </div>
    );
  };

  if (error) {
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
          onClick={() => fetchData()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="w-full h-full max-lg:col-span-full  flex flex-col gap-2 p-2 shadow bg-Highlighter  rounded-[10px]"
    >
      <h2 className="w-full text-center py-2 text-xl font-Medium">
        10 مشتری برتر
      </h2>
      <SalesByGenderAndCityReportConfigs
        getData={fetchData}
        loading={loading}
        items={menuItems}
        activeGender={activeGender}
        setActiveGender={setActiveGender}
      />
      {renderContent()}
    </div>
  );
};

export default TopCustomers;
