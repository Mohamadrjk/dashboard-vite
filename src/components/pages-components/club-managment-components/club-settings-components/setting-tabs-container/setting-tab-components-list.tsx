

import { dynamic } from "@/components/shared-components/dynamicImport/dynamicImport";
import { Skeleton } from "antd";
import SurveySettingContainer from "../settins-modals/survey-setting-modal-content/survey-setting-modal-content";
import RanksSettingContainer from "../settins-modals/rank-setting-modal-content/rank-setting-modal-content";
import ProgramSettingsContainer from "../settins-modals/program-settings-modal-content/program-settings-container";
import ExchangeRangePointsContainer from "../settins-modals/exchange-range-points/exchange-range-points-container";
import RulesSetting from "../settins-modals/rules-setting/rules-setting";
const ClubThemeSettings = dynamic(
    () => import("../settins-modals/theme-settings/theme-settings"),
    {
        loading: () => (
            <div className="w-full flex flex-col gap-1 aspect-[16/6]">
                <Skeleton.Node active className="!w-full !h-[50px]" />
                <Skeleton.Node active className="!w-full !h-[50vh]" />
            </div>
        ),
    }
);


export const SettingTabComponents = (toggleModal: (value: boolean) => void) => (
    {
        OpinionPoll: (
            <SurveySettingContainer
                handleCancel={() => toggleModal(false)}
                handleOk={() => toggleModal(true)}
            />
        ),
        RankingSettings: (
            <RanksSettingContainer
                handleCancel={() => toggleModal(false)}
                handleOk={() => toggleModal(true)}
            />
        ),
        ProgramSettings: (
            <ProgramSettingsContainer handleOk={() => toggleModal(true)} />
        ),
        ExchangeRangePoints: (
            <ExchangeRangePointsContainer
                handleCancel={() => toggleModal(false)}
                handleOk={() => toggleModal(true)}
            />
        ),
        RulesSetting: (
            <RulesSetting
                handleCancel={() => toggleModal(false)}
                handleOk={() => toggleModal(true)}
            />
        ),
        ThemeSetting: (
            <ClubThemeSettings
                handleCancel={() => toggleModal(false)}
                handleOk={() => toggleModal(true)}
            />
        ),
    }
)