import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal, TabsProps, Tabs } from "antd";
import clsx from "clsx";
import style from "../../club-levels-components/club-edit-levels-components/club-edit-levels-container.module.css";
import { useEffect, useState } from "react";
import { onAddLevelToRanking } from "@/api/club-api/club-ranking-service";
import { useNotify } from "@/components/shared-components/notife/notife";
import { ICreateLevelPayload } from "@/types/club-types/club-levels-type";
import CreateNewClubLevel from "./create-level-form-components/club-crete-level-content";
import NewLevelBenefitsContainer from "./create-level-benefits-components/create-level-benefits-container";
import { useMutation } from "@tanstack/react-query";
import { DefaultOptionType } from "antd/es/select";

interface ClubCreateLevelModalContainerProps {
  handleCloseModal: () => void;
  open: boolean;
  handleGetClubRanks: () => void;
  items: DefaultOptionType[];
  handleGetClubLevelsByRankId: () => Promise<void>;
}

export interface TempFormData {
  Title: string;
  Description: string;
  Image: File;
  UnachievedImage: File;
  RankingId: number;
  RequiredPoints: string;
  PrimaryColor?: string;
  SecondaryColor?: string;
}

const ClubCreateLevelModalContainer: React.FC<
  ClubCreateLevelModalContainerProps
> = ({
  handleCloseModal,
  open,
  handleGetClubRanks,
  items,
  handleGetClubLevelsByRankId,
}) => {
    const [tempFormData, setTempFormData] = useState<TempFormData | undefined>(
      undefined
    );

    const [activeTab, setActiveTab] = useState<string>("1");
    const { notify } = useNotify();
    const handleCancel = () => {
      handleCloseModal();
    };
    const { mutate: addLevel, isPending: loadingAddLevel } = useMutation({
      mutationFn: (benefits: string[]) => {
        const payload: ICreateLevelPayload = {
          ...tempFormData,
          LevelBenefits: benefits,
        };
        return onAddLevelToRanking(payload);
      },
      onSuccess: (response) => {
        if (response.status) {
          notify("success", response.statusMessage || "درخواست با موفقیت ثبت شد");
          handleGetClubRanks();
          handleCloseModal();
          handleGetClubLevelsByRankId();
        } else {
          notify(
            "error",
            response.statusMessage || "در ثبت درخواست خطایی رخ داده است"
          );
        }
      },
      onError: () => {
        notify("error", "در ثبت درخواست خطایی رخ داده است");
      },
    });

    const handleAddLevel = (benefits: string[]) => {
      addLevel(benefits);
    };

    const onChange = (key: string) => {
      setActiveTab(key);
    };

    useEffect(() => {
      if (tempFormData) {
        setActiveTab("2");
      }
    }, [tempFormData]);

    const tabsItems: TabsProps["items"] = [
      {
        key: "1",
        label: "مشخصات اولیه",
        children: (
          <CreateNewClubLevel
            handleCancel={handleCancel}
            loading={loadingAddLevel}
            setTempFormData={setTempFormData}
            ranks={items}
          />
        ),
      },
      {
        key: "2",
        label: "مـزایــا",
        disabled: !tempFormData,
        children: (
          <NewLevelBenefitsContainer
            handleCancel={handleCancel}
            loading={loadingAddLevel}
            handleAddLevel={async (payload) => await handleAddLevel(payload)}
          />
        ),
      },
    ];

    return (
      <Modal
        open={!!open}
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">تعریف سطح جدید</span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px]"
              role="button"
              onClick={() => {
                handleCloseModal();
              }}
            />
          </div>
        }
        onCancel={handleCancel}
        destroyOnClose
        style={{
          direction: "rtl",
          width: "95% !important",
          maxWidth: "450px",
          height: "95dvh",
        }}
        className={clsx(style["edit-level-container"])}
        classNames={{
          header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
          content: "!w-1/2 max-w-full !p-2 !bg-BG !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        <Tabs
          defaultActiveKey="1"
          items={tabsItems}
          onChange={onChange}
          activeKey={activeTab}
          className="!min-h-[550px] [&_.ant-tabs-nav]:before:!border-Highlighter [&_.ant-tabs-nav]:before:!border-b-2 [&_.ant-tabs-nav]:!font-Regular [&_.ant-tabs-tab]:!px-2 [&_.ant-tabs-tab]:!text-gray-300 [&_.ant-tabs-tab-active]:!text-cta"
        />
      </Modal>
    );
  };

export default ClubCreateLevelModalContainer;
