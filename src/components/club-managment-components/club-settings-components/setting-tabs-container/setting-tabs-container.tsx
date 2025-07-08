"use client";
import dynamic from "next/dynamic";
import SettingCartComponent from "../setting-tabs-cart/setting-cart-component";
import style from "../club-settings-styles.module.css";
import { tabsList } from "../club-tabs-data";
import { Modal, Skeleton } from "antd";
import { useState, useMemo } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import SurveySettingContainer from "../settins-modals/survey-setting-modal-content/survey-setting-modal-content";
import useManageClubSettings from "@/hooks/club-settings-hooks/useClubSetting";
import RanksSettingContainer from "../settins-modals/rank-setting-modal-content/rank-setting-modal-content";
import ProgramSettingsContainer from "../settins-modals/program-settings-modal-content/program-settings-container";
import ExchangeRangePointsContainer from "../settins-modals/exchange-range-points/exchange-range-points-container";
import clsx from "clsx";
import RulesSetting from "../settins-modals/rules-setting/rules-setting";
const ClubThemeSettings = dynamic(
  () => import("../settins-modals/theme-settings/theme-settings"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full flex flex-col gap-1 aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-[50px]" />
        <Skeleton.Node active className="!w-full !h-[50vh]" />
      </div>
    ),
  }
);

type ModalKeys =
  | "OpinionPoll"
  | "RankingSettings"
  | "ProgramSettings"
  | "ExchangeRangePoints"
  | "RulesSetting"
  | undefined;

const SettingTabsContainer = () => {
  const { isRefetching, isLoading, refetch, error } = useManageClubSettings();

  const [openModal, setOpenModal] = useState<{ show: boolean; key: ModalKeys }>(
    {
      show: false,
      key: undefined,
    }
  );

  // Memoized modal title lookup
  const modalTitle = useMemo(
    () => tabsList.find((item) => item.key === openModal.key)?.title || "",
    [openModal.key]
  );

  // Function to open/close modals
  const toggleModal = (doRefetch: boolean, key?: ModalKeys, show = false) => {
    setOpenModal({ key, show });
    if (!show && doRefetch) refetch();
  };

  // Skeleton Loading State
  if (isLoading || isRefetching)
    return (
      <div className="w-full grid grid-cols-3    max-lg:grid-cols-1 gap-4 vdxl:gap-5 py-5 dxl:py-6 ldxl:py-8 vdxl:py-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton.Node
            key={index}
            active
            className="col-span-1 !w-full !h-auto aspect-[16/8]"
          />
        ))}
      </div>
    );

  // Error State
  // if (error)
  //   return (
  //     <div className="font-Regular relative w-full bg-Highlighter p-5 min-h-[400px] rounded-[12px]">
  //       <Alert
  //         message="خطا"
  //         description="در دریافت اطلاعات تنظیمات کسب و کار خطایی رخ داده است"
  //         type="error"
  //         className="font-Medium !w-full !h-full"
  //         showIcon
  //       />
  //       <Button
  //         onClick={() => refetch}
  //         className="!absolute left-2 top-2"
  //         icon={<RedoOutlined />}
  //       />
  //     </div>
  //   );

  return (
    <div className="w-full grid grid-cols-3   max-lg:grid-cols-1 gap-4 vdxl:gap-5 py-5 dxl:py-6 ldxl:py-8 vdxl:py-10">
      {tabsList.map((item, index) => (
        <SettingCartComponent
          cartKey={item.key}
          key={index}
          {...item}
          className={style["Cart_container"]}
          cartAction={() => toggleModal(false, item.key as ModalKeys, true)}
        />
      ))}

      {/* Modal Component */}
      <Modal
        open={openModal.show}
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">{modalTitle}</span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px]"
              role="button"
              onClick={() => toggleModal(false)}
            />
          </div>
        }
        onCancel={() => toggleModal(false)}
        destroyOnClose
        style={{
          direction: "rtl",
          width: "95% !important",
          maxWidth: "450px",
          height: "100dvh",
        }}
        className="!max-w-[95%] w-full first:[&_div]::!h-full"
        classNames={{
          wrapper: "[&_.ant-modal]:!max-h-dvh ",
          header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
          content: clsx(
            "xl:!w-[55%] ldxl:!w-1/2 !w-full max-w-full !p-6 !bg-BG !h-full !mx-auto",
            openModal.key == "ExchangeRangePoints" && "lg:!w-[50%] dxl:!w-[40%]",
            openModal.key == "RulesSetting" && "lg:!w-[50%] dxl:!w-[40%]"
          ),
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        {{
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
          )
        }[openModal.key as keyof typeof tabsList] || null}
      </Modal>
    </div>
  );
};

export default SettingTabsContainer;
