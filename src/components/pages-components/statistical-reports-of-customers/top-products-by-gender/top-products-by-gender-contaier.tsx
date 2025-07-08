"use client";
import { ITopProductsByGender } from "@/types/customers-model";
import { useCallback, useEffect, useState } from "react";
import TopProductsByGenderList from "./top-products-by-gender-list";
import { getTopProductsByGender } from "@/utils/customerService";
import { Alert, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import SalesByGenderAndCityReportConfigs from "../../gender-components/new-cityGenders-report/city-and-gender-dateFilter";

const TopProductsByGenderContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [womenPurchases, seyWomenPurchases] =
    useState<ITopProductsByGender[]>();
  const [menPurchases, seyMenPurchases] = useState<ITopProductsByGender[]>();
  const fetchData = useCallback(
    async (payload?: {
      start_date: string;
      end_date: string;
      limit?: number;
    }) => {
      setLoading(true);
      setError(false);
      try {
        const response = await getTopProductsByGender(payload);
        if (response?.data?.data) {
          const res = response?.data?.data;
          seyWomenPurchases(res.filter((item) => item.gender == "خانم"));
          seyMenPurchases(res.filter((item) => item.gender == "آقا"));
        } else {
          throw new Error("No data returned");
        }
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
    fetchData({
      start_date: "2024-01-01",
      end_date: "2025-01-01",
    });
  }, [fetchData]);

  if (loading)
    return (
      <div className="w-full grid grid-cols-2 gap-8">
        <div className="col-span-1 w-full relative bg-Highlighter rounded-[10px] p-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Node
              key={index}
              active
              className="!w-full aspect-[16/4]"
            />
          ))}
        </div>
        <div className="col-span-1 w-full relative bg-Highlighter rounded-[10px] p-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Node
              key={index}
              active
              className="!w-full aspect-[16/4]"
            />
          ))}
        </div>
      </div>
    );

  if (error)
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

  if (womenPurchases && menPurchases)
    return (
      <div className="w-full bg-Highlighter rounded-[10px] max-lg:gap-3 max-lg:col-span-full  animate-fadeIn flex flex-col justify-between h-full p-2">
        <h2 className="w-max whitespace-nowrap text-center py-2 text-xl  max-lg:text-base font-Medium">
          گزارش بهترین کالاهای خریداری‌شده بر اساس جنسیت
        </h2>
        <SalesByGenderAndCityReportConfigs
          getData={fetchData}
          loading={loading}
        />
        <div className="w-full flex items-start gap-2">
          <div className="col-span-1 w-full relative max-h-[420px] ldxl:max-h-[300px] overflow-y-auto custome-scrool-bar-small">
            <TopProductsByGenderList items={womenPurchases} />
          </div>
          <div className="col-span-1 w-full relative max-h-[420px] ldxl:max-h-[300px] overflow-y-auto custome-scrool-bar-small">
            <TopProductsByGenderList items={menPurchases} />
          </div>
        </div>
      </div>
    );
};

export default TopProductsByGenderContainer;
