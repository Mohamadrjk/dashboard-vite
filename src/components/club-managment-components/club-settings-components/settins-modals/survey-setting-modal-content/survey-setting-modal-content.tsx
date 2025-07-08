"use client";
import { useSurveys } from "@/hooks/club-survey-hooks/useSurveysTable";
import { useMemo, useState } from "react";
import SettingModalFooter from "../setting-modals-footer";
import SettingModalsDropdown from "../setting-modals-dropdown";
import { Alert, Button, Divider, MenuProps } from "antd";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { IClubSettingPayload } from "@/types/club-types/club-setting-type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IClubSettingSlice } from "@/redux/clubSetting/clubSettingSlice";
import { useUpdateClubSettings } from "@/hooks/club-settings-hooks/useClubSetting";

interface SurveySettingContainerProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const SurveySettingContainer: React.FC<SurveySettingContainerProps> = ({
  handleCancel,
  handleOk,
}) => {
  const { settings } = useSelector<RootState, IClubSettingSlice>(
    (state) => state.clubSettingSlice
  );
  const [selectedFactorSurve, setSelectedFactorSurvey] = useState<number>();
  const [selectedCompanySurve, setSelectedCompanySurvey] = useState<number>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const { data, error, isLoading, refetch, isRefetching } = useSurveys(
    currentPage,
    pageSize
  );

  const { mutate: update, isPending: isUpdating } = useUpdateClubSettings();

  const handleUpdateDefaultSurveys = () => {
    update(
      {
        ...settings,
        defaultCompanySurveyId: selectedCompanySurve,
        defaultInvoiceSurveyId: selectedFactorSurve,
      },
      {
        onSuccess: () => {
          handleOk();
        },
      }
    ); // 🔥 Re-fetch after creation
  };

  const surveysDropdownItems: MenuProps["items"] = useMemo(() => {
    if (data) {
      return data.result.data.map((item, index) => {
        return {
          label: item.title,
          key: item.id,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  if (isLoading || isRefetching)
    return (
      <div className="w-full h-full min-h-[400px] rounded-[12px] flex justify-center items-center">
        <span className="w-max h-max">
          <LoadingOutlined className="text-3xl" />
        </span>
      </div>
    );

  if (error)
    return (
      <div className="font-Regular relative w-full bg-Highlighter p-5 min-h-[400px] rounded-[12px]">
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

  const selectedSurveyTitle = data.result.data.find(
    (item) => item.id === selectedFactorSurve
  )?.title;
  const selectedCompanySurveyTitle = data.result.data.find(
    (item) => item.id === selectedCompanySurve
  )?.title;
  return (
    <div
      dir="rtl"
      className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5"
    >
      <div className="w-full bg-Highlighter p-5 rounded-[10px] min-h-[370px]">
        <div className="w-full flex flex-col gap-5">
          <p className="font-Medium text-[18px]">نظرسنجی پیشفرض فاکتور</p>
          <SettingModalsDropdown
            selectedItem={selectedSurveyTitle}
            handleSetId={setSelectedFactorSurvey}
            dropdownItems={surveysDropdownItems}
            placeHolder="انتخاب نظرسنجی پیشفرض برای فاکتور"
          />
        </div>
        <Divider />
        <div className="w-full flex flex-col gap-5">
          <p className="font-Medium text-[18px]">نظرسنجی پیشفرض کسب و کار</p>
          <SettingModalsDropdown
            selectedItem={selectedCompanySurveyTitle}
            handleSetId={setSelectedCompanySurvey}
            dropdownItems={surveysDropdownItems}
            placeHolder="انتخاب نظرسنجی پیشفرض برای کسب و کار"
          />
        </div>
      </div>
      <SettingModalFooter
        handleOk={() => handleUpdateDefaultSurveys()}
        handleCancel={handleCancel}
        disable={isUpdating || !selectedFactorSurve || !selectedCompanySurve}
        loading={isUpdating}
      />
    </div>
  );
};

export default SurveySettingContainer;
