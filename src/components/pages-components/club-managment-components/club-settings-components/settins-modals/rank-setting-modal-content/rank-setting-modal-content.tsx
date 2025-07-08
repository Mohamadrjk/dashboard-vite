"use client";
import { useSurveys } from "@/hooks/club-survey-hooks/useSurveysTable";
import { useMemo, useState } from "react";
import SettingModalFooter from "../setting-modals-footer";
import SettingModalsDropdown from "../setting-modals-dropdown";
import { Alert, Button, Divider, MenuProps } from "antd";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IClubSettingSlice } from "@/redux/clubSetting/clubSettingSlice";
import { useUpdateClubSettings } from "@/hooks/club-settings-hooks/useClubSetting";
import useRanksSetting from "@/hooks/levels-hooks/useGetClubRanks";

interface RanksSettingContainerProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const RanksSettingContainer: React.FC<RanksSettingContainerProps> = ({
  handleCancel,
  handleOk,
}) => {
  const { settings } = useSelector<RootState, IClubSettingSlice>(
    (state) => state.clubSettingSlice
  );
  const {
    isLoading,
    isRefetching,
    error,
    refetch,
    ranksDropdownItems,
    setSelectedRank,
    selectedRankTitle,
    selectedRank,
  } = useRanksSetting();

  const { mutate: update, isPending: isUpdating } = useUpdateClubSettings();

  const handleUpdateDefaultSurveys = () => {
    update(
      {
        ...settings,
        defaultRankingId: selectedRank,
      },
      {
        onSuccess: () => {
          handleOk();
        },
      }
    ); // 🔥 Re-fetch after creation
  };

  if (isLoading || isRefetching)
    return (
      <div className="w-full h-full min-h-[270px] rounded-[12px] flex justify-center items-center">
        <span className="w-max h-max">
          <LoadingOutlined className="text-3xl" />
        </span>
      </div>
    );

  if (error)
    return (
      <div className="font-Regular relative w-full bg-Highlighter p-5 min-h-[270px] rounded-[12px]">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="font-Medium"
          showIcon
        />
        <Button
          onClick={() => refetch()}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );

  return (
    <div
      dir="rtl"
      className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5"
    >
      <div className="w-full bg-Highlighter p-5 rounded-[10px] min-h-[250px]">
        <div className="w-full flex flex-col gap-5">
          <p className="font-Medium text-[18px]">
            لطفا تعیین کنید کدام رتبه بندی تعریف شده درحالت پیشفرض قرار گیرد.
          </p>
          <SettingModalsDropdown
            selectedItem={selectedRankTitle}
            handleSetId={setSelectedRank}
            dropdownItems={ranksDropdownItems}
            placeHolder="انتخاب رتبه پیشفرش"
          />
        </div>
      </div>
      <SettingModalFooter
        handleOk={() => handleUpdateDefaultSurveys()}
        handleCancel={handleCancel}
        disable={isUpdating || !selectedRank}
        loading={isUpdating}
      />
    </div>
  );
};

export default RanksSettingContainer;
