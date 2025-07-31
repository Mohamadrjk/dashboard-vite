import {
  CloseCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
interface ConfirmModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeMethod: () => void;
  title: React.JSX.Element;
  loading: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  removeMethod,
  setOpen,
  title,
  loading,
}) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular flex items-center gap-[2px]">
            {title}
          </span>
          <CloseCircleOutlined
            className="!text-Alert !text-[20px]"
            role="button"
            onClick={() => {
              handleCloseModal();
            }}
          />
        </div>
      }
      onCancel={handleCloseModal}
      destroyOnClose
      style={{
        direction: "rtl",
        width: "95% !important",
        maxWidth: "450px",
        height: "95dvh",
      }}
      className={clsx("!max-w-[95vw]")}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content: "!w-[400px] max-w-full !p-2 !bg-BG !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <div className="w-full flex flex-col gap-4 p-4">
        <h4 className="flex items-center gap-[2px] font-Regular !text-cta">
          <InfoCircleOutlined />
          <span>این عمل غیرقابل بازگشت است</span>
        </h4>
        <div className="w-full flex justify-end gap-4 items-center mt-3">
          <button
            disabled={loading}
            onClick={handleCloseModal}
            className="text-gray-900 !font-Medium"
          >
            انصراف
          </button>
          <button
            disabled={loading}
            onClick={removeMethod}
            className="rounded-[6px] shadow bg-Alert text-Highlighter font-Medium px-4 py-2 disabled:bg-gray-300"
          >
            تایید
            {loading && <LoadingOutlined />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
