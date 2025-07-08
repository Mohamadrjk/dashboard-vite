"use client";
import React, { useState } from "react";
import { Alert, Button, Skeleton, Table, TableColumnsType } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { IClubStatusNew } from "@/types/club-types/club-levels-type";
import useClubLevels from "@/hooks/levels-hooks/useLevelsTable";
import ClubEditLevelsContainer from "../club-edit-levels-components/club-edit-levels-container";
import ClubLevelsTableHeader from "../club-level-table-header/club-level-table-header-contaier";
import ConfirmModal from "@/components/shared/confirm-modal/confirm-modal";
import ClubLevelsTable from "./club-levels-table";

const ClubManagementTableComponent: React.FC = () => {
  const {
    error,
    handleGetDefaultLevels,
    levels,
    loading,
    currentRankId,
    errorRanks,
    handleGetClubRanks,
    loadingRanks,
    ranks,
    setCurrentRankId,
    onRemoveLevelById,
    removeLoading,
    openRemoveLevelModal,
    setOpenRemoveModal,

    handleGetClubLevelsByRankId,
  } = useClubLevels();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<IClubStatusNew | null>(
    null
  );
  const [selectedLevelToRemove, setSelectedLevelToRemove] =
    useState<IClubStatusNew | null>(null);

  const handleEditLevelModal = (record: IClubStatusNew) => {
    setSelectedLevel(record);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedLevel(null);
  };

  const handleRemoveModal = (record: IClubStatusNew) => {
    setSelectedLevelToRemove(record);
    setOpenRemoveModal(true);
  };

  if (loading || loadingRanks)
    return (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    );

  if (error || errorRanks)
    return (
      <div className="font-Regular relative w-full aspect-[16/6]">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="font-Medium"
          showIcon
        />
        <Button
          onClick={() => {
            handleGetDefaultLevels();
            handleGetClubRanks();
          }}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );

  return (
    <div>
      <ClubLevelsTableHeader
        ranks={ranks}
        currentRankId={currentRankId}
        setCurrentRankId={setCurrentRankId}
        handleGetClubRanks={() => handleGetClubRanks()}
        handleGetClubLevelsByRankId={async () => handleGetClubLevelsByRankId()}
      />
      <ClubLevelsTable
        levels={levels}
        handleEditLevelModal={handleEditLevelModal}
        handleRemoveModal={handleRemoveModal}
      />
      {selectedLevel && (
        <ClubEditLevelsContainer
          handleCloseModal={handleCloseModal}
          handleGetClubLevelsByRankId={async () =>
            handleGetClubLevelsByRankId()
          }
          open={openEditModal}
          level={selectedLevel}
          title={`ویرایش سطح ${selectedLevel.title}`}
        />
      )}
      <ConfirmModal
        loading={removeLoading}
        open={openRemoveLevelModal}
        setOpen={setOpenRemoveModal}
        removeMethod={() => onRemoveLevelById(selectedLevelToRemove.id)}
        title={
          <span>
            آیا از حذف سطح {selectedLevelToRemove?.title} مطمئن هستید؟
          </span>
        }
      />
    </div>
  );
};

export default ClubManagementTableComponent;
