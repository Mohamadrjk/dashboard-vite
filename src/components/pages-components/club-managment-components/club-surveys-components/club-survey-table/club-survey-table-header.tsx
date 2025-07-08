import { PlusCircleOutlined } from "@ant-design/icons";
import CreateSurveyModalContainer from "../survey-modals/create-survey-modal/create-survey-modal-container";
import { useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  IClubHttpResult,
  ITableResult,
} from "@/utils/club-api/club-http-result";
import { ISurvey } from "@/types/club-types/club-surveys-type";

interface ClubSurveyTAbleHeaderProps {
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<IClubHttpResult<ITableResult<ISurvey[]>>, Error>
  >;
}

const ClubSurveyTAbleHeader: React.FC<ClubSurveyTAbleHeaderProps> = ({
  refetch,
}) => {
  const [openNewSurveyModal, setOpenNewSurveyModal] = useState(false);
  const handleCloseModal = () => {
    refetch();
    setOpenNewSurveyModal(false);
  };

  return (
    <div className="w-full flex justify-end">
      <button
        onClick={() => setOpenNewSurveyModal(!openNewSurveyModal)}
        className="p-2 font-Regular flex items-center justify-center gap-2 rounded-[6px] shadow bg-cta text-Highlighter hover:shadow-xl hover:-translate-y-[2px] transition-all"
      >
        <span>تعریف نظرسنجی</span>
        <PlusCircleOutlined />
      </button>
      {/* 🟢 New Survey Modal */}
      <CreateSurveyModalContainer
        open={openNewSurveyModal}
        handleCloseModal={handleCloseModal}
        handleCancelCreate={() => setOpenNewSurveyModal(false)}
      />
    </div>
  );
};

export default ClubSurveyTAbleHeader;
