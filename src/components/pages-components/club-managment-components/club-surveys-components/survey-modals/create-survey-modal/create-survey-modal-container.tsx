import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal, Tabs, TabsProps } from "antd";

import CreateSurveyFormContainer from "./survey-form-components/survey-form-container";
import NewSurveyQuestionsContainer from "./create-survey-questions-components/create-survey-questions-container";

import useNewSurvey from "@/hooks/club-survey-hooks/useNewSurvey";

interface CreateSurveyModalContainerProps {
  handleCloseModal: () => void;
  handleCancelCreate: () => void;

  open: boolean;
}

const CreateSurveyModalContainer: React.FC<CreateSurveyModalContainerProps> = ({
  handleCloseModal,
  open,
  handleCancelCreate,
}) => {
  const {
    activeTab,
    handleAddLevel,
    handleCancel,
    onChange,
    setTempFormData,
    setActiveTab,
    tempFormData,
    loadingAddLevel,
  } = useNewSurvey(handleCloseModal);
  const tabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: "مشخصات اولیه نظرسنجی",
      children: (
        <CreateSurveyFormContainer
          handleCancel={handleCancelCreate}
          setTempFormData={setTempFormData}
          setActiveIndex={setActiveTab}
          tempFormData={tempFormData}
        />
      ),
    },
    {
      key: "2",
      label: "جزئیات نظرسنجی",
      disabled: !tempFormData,
      children: (
        <NewSurveyQuestionsContainer
          handleCancel={handleCloseModal}
          loading={loadingAddLevel}
          handleAddLevel={handleAddLevel}
        />
      ),
    },
  ];
  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">تعریف نظرسنجی جدید</span>
          <CloseCircleOutlined
            className="!text-Alert !text-[20px]"
            role="button"
            onClick={() => {
              handleCancelCreate();
              setActiveTab("1");
            }}
          />
        </div>
      }
      onCancel={() => {
        handleCancelCreate();
        setActiveTab("1");
      }}
      destroyOnClose
      style={{
        direction: "rtl",
        width: "95% !important",
        maxWidth: "450px",
        height: "100dvh !important",
      }}
      className={"!max-w-[95%] first:[&_div]::!h-full"}
      classNames={{
        wrapper: "[&_.ant-modal]:!max-h-dvh ",
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
        className="!min-h-max !h-full [&_.ant-tabs-nav]:before:!border-Highlighter [&_.ant-tabs-nav]:before:!border-b-2 [&_.ant-tabs-nav]:!font-Regular [&_.ant-tabs-tab]:!px-2 [&_.ant-tabs-tab]:!text-gray-300 [&_.ant-tabs-tab-active]:!text-cta"
      />
    </Modal>
  );
};

export default CreateSurveyModalContainer;
