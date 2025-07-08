"use client";

import PersianRangePicker from "@/components/shared/custome-range-picker";
import {
  Button,
  Dropdown,
  InputNumber,
  InputNumberProps,
  MenuProps,
} from "antd";
import { Dispatch, SetStateAction, useState } from "react";

interface SalesByGenderAndCityReportConfigsProps {
  getData?: (payload?: {
    start_date: string;
    end_date: string;
    limit: number;
    gender?: 1 | 2;
  }) => Promise<void>;
  getDataWithReactQuery?: (payload?: {
    start_date: string;
    end_date: string;
    limit: number;
    gender?: 1 | 2;
  }) => void;
  loading: boolean;
  items?: MenuProps["items"];
  setActiveGender?: Dispatch<SetStateAction<string>>;
  activeGender?: string;
  onlyDate?: boolean;
}

const SalesByGenderAndCityReportConfigs: React.FC<
  SalesByGenderAndCityReportConfigsProps
> = ({
  getData,
  getDataWithReactQuery,
  loading,
  items,
  setActiveGender,
  activeGender,
  onlyDate,
}) => {
    const [date, setDate] = useState<string[]>(() => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      return [
        today.toISOString().split("T")[0],
        sevenDaysAgo.toISOString().split("T")[0],
      ];
    });
    const [limit, setLimit] = useState<number>(10);

    const handleLimitChange: InputNumberProps["onChange"] = (value) => {
      if (value) setLimit(Number(value));
    };

    const handleGenderSelect: MenuProps["onClick"] = ({ key }) => {
      setActiveGender?.(key);
    };

    const fetchData = () => {
      if (getDataWithReactQuery) {
        getDataWithReactQuery({
          start_date: date[0],
          end_date: date[1],
          limit,
          gender: activeGender === "آقا" ? 1 : 2,
        });
      } else if (getData) {
        getData({
          start_date: date[0],
          end_date: date[1],
          limit,
          gender: activeGender === "آقا" ? 1 : 2,
        });
      }
    };

    return (
      <div
        dir="ltr"
        className="w-full flex flex-wrap items-center gap-3 font-Regular"
      >
        <PersianRangePicker setDate={setDate} />
        {!onlyDate && (
          <span className="flex items-center gap-1">
            <span>تعداد</span>
            <InputNumber
              min={1}
              max={10}
              value={limit}
              onChange={handleLimitChange}
              className="!w-12"
            />
          </span>
        )}

        {items && (
          <Dropdown menu={{ items, onClick: handleGenderSelect }} placement="top">
            <Button className="!min-w-16 !font-Medium">
              {activeGender || "جنسیت"}
            </Button>
          </Dropdown>
        )}

        <Button
          type="primary"
          className="!font-Medium"
          disabled={loading}
          onClick={fetchData}
        >
          دریافت
        </Button>
      </div>
    );
  };

export default SalesByGenderAndCityReportConfigs;
