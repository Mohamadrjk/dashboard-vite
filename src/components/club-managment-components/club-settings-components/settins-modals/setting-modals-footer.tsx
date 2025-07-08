import { Button } from "antd";

interface SettingModalFooterProps {
  handleOk: () => void;
  handleCancel: () => void;
  disable: boolean;
  form?: string
  loading: boolean;
}

const SettingModalFooter: React.FC<SettingModalFooterProps> = ({
  handleCancel,
  handleOk,
  disable,
  loading,
  form
}) => {
  return (
    <div className="w-full flex justify-end gap-4 items-center">
      <button
        onClick={handleCancel}
        className="text-gray-900 !text-lg !font-Medium"
      >
        انصراف
      </button>
      <Button
        type="primary"

        form={form}
        className="rounded-[6px] !px-6 !py-4 !bg-cta !opacity-70 !text-Highlighter !font-Medium !text-lg"
        disabled={disable}
        loading={loading}
        onClick={handleOk}
        iconPosition="end"
      >
        ثبت تغییرات
      </Button>
    </div>
  );
};

export default SettingModalFooter;
