import { IClubRanks } from "@/types/club-types/club-levels-type";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import ClubCreateRankModalContainer from "../../club-create-modals/club-create-rank-modal-container";
import ClubCreateLevelModalContainer from "../../club-create-modals/club-crete-level/club-crete-level-modal-container";
import { DefaultOptionType } from "antd/es/select";
import { ItemType } from "antd/es/menu/interface";

interface ClubLevelsTableHeaderProps {
  ranks: IClubRanks[];
  currentRankId: number;
  setCurrentRankId: Dispatch<SetStateAction<number>>;
  handleGetClubRanks: () => Promise<void>;
  handleGetClubLevelsByRankId: () => Promise<void>;
}

const ClubLevelsTableHeader: React.FC<ClubLevelsTableHeaderProps> = ({
  ranks,
  currentRankId,
  setCurrentRankId,
  handleGetClubRanks,
  handleGetClubLevelsByRankId,
}) => {
  const [openAddRankModal, setOpenAddRankModal] = useState<boolean>(false);
  const [openAddLevelModal, setOpenAddLevelModal] = useState<boolean>(false);

  const selectedItem =
    ranks.find((item) => item.id === currentRankId)?.title || "رتبه بندی";

  const handleChange = (value: string) => {
    setCurrentRankId(Number(value));
  };
  const items: DefaultOptionType[] = ranks.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  const handleAddRankModal = () => {
    setOpenAddRankModal(!openAddRankModal);
  };

  const handleAddLevelModal = () => {
    setOpenAddLevelModal(!openAddLevelModal);
  };

  return (
    <div className="w-full flex justify-between items-center p-2">
      <div className="flex items-center gap-2 ">
        <span className="font-Regular">نمایش سطوح در رتبه:</span>

        <Select
          defaultValue={selectedItem}
          style={{ width: 150 }}
          onChange={handleChange}
          options={items}
          placeholder="رتبه"
          className="!font-Medium !whitespace-nowrap !text-base !flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px] p-2"
          popupClassName="rtl-custom !font-Regular"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddRankModal}
          className="p-2 font-Regular flex items-center justify-center gap-2 rounded-[6px]  shadow text-cta border border-cta hover:shadow-xl hover:-translate-y-[2px] transition-all"
        >
          <span>تعریف رتبه </span>
          <PlusCircleOutlined className="" />
        </button>
        <button
          onClick={handleAddLevelModal}
          className="p-2 font-Regular flex items-center justify-center gap-2 rounded-[6px] shadow bg-cta text-Highlighter hover:shadow-xl hover:-translate-y-[2px] transition-all"
        >
          <span>تعریف سطح </span>
          <PlusCircleOutlined className="" />
        </button>
      </div>
      {openAddRankModal && (
        <ClubCreateRankModalContainer
          handleCloseModal={handleAddRankModal}
          handleGetClubRanks={handleGetClubRanks}
          open={openAddRankModal}
        />
      )}
      <ClubCreateLevelModalContainer
        handleCloseModal={handleAddLevelModal}
        handleGetClubLevelsByRankId={handleGetClubLevelsByRankId}
        open={openAddLevelModal}
        handleGetClubRanks={() => console.log("")}
        items={items}
      />
    </div>
  );
};

export default ClubLevelsTableHeader;
