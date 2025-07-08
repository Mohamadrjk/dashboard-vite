import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import clsx from "clsx";
import style from "../club-levels-components/club-edit-levels-components/club-edit-levels-container.module.css";
import CreateNewClubRank from "./club-create-rank-modal";
import { useState } from "react";
import { onAddCompanyRank } from "@/utils/club-api/club-ranking-service";
import { useNotify } from "@/components/shared-components/notife/notife";
import { useMutation } from "@tanstack/react-query";

interface ClubCreateRankModalContainerProps {
  handleCloseModal: () => void;
  open: boolean;
  handleGetClubRanks: () => Promise<void>;
}

const ClubCreateRankModalContainer: React.FC<
  ClubCreateRankModalContainerProps
> = ({ handleCloseModal, open, handleGetClubRanks }) => {
  const { notify } = useNotify();
  const handleCancel = () => {
    handleCloseModal();
  };

  const { mutate: handleAddRank, isPending: loadingAddRanks } = useMutation({
    mutationFn: (payload: {
      Title: string;
      ScoreUnitTitle: string;
      Icon: File;
    }) => {
      return onAddCompanyRank(payload);
    },
    onSuccess: (response) => {
      if (response.status) {
        notify("success", response.statusMessage || "درخواست با موفقیت ثبت شد");
        handleGetClubRanks();
        handleCloseModal();
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

  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">تعریف رتبه جدید</span>
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
      <CreateNewClubRank
        handleCancel={handleCancel}
        loading={loadingAddRanks}
        handleAddRank={async (payload) => await handleAddRank(payload)}
      />
    </Modal>
  );
};

export default ClubCreateRankModalContainer;
