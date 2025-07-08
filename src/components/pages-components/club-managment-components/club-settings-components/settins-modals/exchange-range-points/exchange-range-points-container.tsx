import { useState } from "react";
import ExchangeHeader from "./exchange-setting-header";
import ExchangeContents from "./exchange-contents";
import SettingModalFooter from "../setting-modals-footer";
import { useUpdateClubSettings } from "@/hooks/club-settings-hooks/useClubSetting";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IClubSettingSlice } from "@/redux/clubSetting/clubSettingSlice";
interface ExchangeRangePointsContainerProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const ExchangeRangePointsContainer: React.FC<
  ExchangeRangePointsContainerProps
> = ({ handleCancel, handleOk }) => {
  const [tab, setTab] = useState<"coinExchangeRate" | "rankExchangeRate">(
    "rankExchangeRate"
  );
  const { settings } = useSelector<RootState, IClubSettingSlice>(
    (state) => state.clubSettingSlice
  );
  const [exchangeRates, setExchangeRates] = useState<{
    rankExchangeRate: number;
    coinExchangeRate: number;
  }>({
    rankExchangeRate: settings.rankExchangeRate,
    coinExchangeRate: settings.coinExchangeRate,
  });

  const { mutate: update, isPending: isUpdating } = useUpdateClubSettings();

  const handleUpdateDefaultSurveys = () => {
    update(
      {
        ...settings,
        ...exchangeRates,
      },
      {
        onSuccess: () => {
          handleOk();
        },
      }
    );
  };

  return (
    <div
      dir="rtl"
      className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5"
    >
      <div className="w-full bg-Highlighter p-5 rounded-[10px] min-h-[370px] flex flex-col">
        <ExchangeHeader setTab={setTab} />
        <ExchangeContents
          tab={tab}
          setExchangeRates={setExchangeRates}
          exchangeRates={exchangeRates}
        />
      </div>
      <SettingModalFooter
        handleOk={() => handleUpdateDefaultSurveys()}
        handleCancel={handleCancel}
        disable={isUpdating}
        loading={isUpdating}
      />
    </div>
  );
};

export default ExchangeRangePointsContainer;
