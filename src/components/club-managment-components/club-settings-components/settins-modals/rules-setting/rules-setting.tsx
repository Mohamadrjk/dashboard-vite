import { useUpdateClubSettings } from "@/hooks/club-settings-hooks/useClubSetting";
import { IClubSettingSlice } from "@/redux/clubSetting/clubSettingSlice";
import { RootState } from "@/redux/store";
import { Input, InputNumber, InputNumberProps, Switch } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import SettingModalFooter from "../setting-modals-footer";
interface RulesSettingProps {
  handleOk: () => void;
  handleCancel: () => void;
}
const RulesSetting: React.FC<RulesSettingProps> = ({
  handleCancel,
  handleOk,
}) => {
  const { settings } = useSelector<RootState, IClubSettingSlice>(
    (state) => state.clubSettingSlice
  );
  const [rules, setRules] = useState<{
    oldPaymentsIncludedForLevel: boolean;
    acceptableDaysForReferral: number;
  }>({
    acceptableDaysForReferral: settings.acceptableDaysForReferral,
    oldPaymentsIncludedForLevel: settings.oldPaymentsIncludedForLevel,
  });
  const { mutate: update, isPending: isUpdating } = useUpdateClubSettings();

  const handleUpdateDefaultSurveys = () => {
    update(
      {
        ...settings,
        ...rules,
      },
      {
        onSuccess: () => {
          handleOk();
        },
      }
    ); // 🔥 Re-fetch after creation
  };
  const onChange = (value) => {
    setRules((prev) => {
      return {
        ...prev,
        acceptableDaysForReferral: Number(
          value.toString().replace(/[^\d]/g, "")
        ),
      };
    });
  };
  return (
    <div
      dir="rtl"
      className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5"
    >
      <p className="w-full flex items-center justify-between [&_.ant-switch.ant-switch-checked]:!bg-Tritary p-3 bg-Highlighter rounded-[10px] font-Medium">
        <span>انتقال سوابق خرید گذشته مشتری پس از ثبت نام</span>
        <Switch
          defaultChecked={!rules.oldPaymentsIncludedForLevel}
          onChange={(e) =>
            setRules((prev) => {
              return { ...prev, oldPaymentsIncludedForLevel: e };
            })
          }
        />
      </p>
      <p className="w-full flex items-center justify-between  p-3 bg-Highlighter rounded-[10px] font-Medium">
        <span>مدت اعتبار کد دعوت از دوستان</span>
        <span className="w-1/3 relative">
          <Input
            type="tel"
            value={rules.acceptableDaysForReferral}
            onChange={(e) => onChange(e.target.value)}
            pattern="\d+"
            classNames={{
              input: "!pl-8 !font-Medium",
            }}
          />
          <span className="absolute w-max h-max top-0 bottom-0 my-auto left-2">
            روز
          </span>
        </span>
      </p>
      <SettingModalFooter
        handleOk={() => handleUpdateDefaultSurveys()}
        handleCancel={handleCancel}
        disable={isUpdating}
        loading={isUpdating}
      />
    </div>
  );
};

export default RulesSetting;
