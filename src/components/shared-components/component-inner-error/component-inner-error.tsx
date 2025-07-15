import { RedoOutlined } from "@ant-design/icons";
import { Alert } from "antd";

type ComponentInnerErrorProps = {
  refetch: () => void;
  message?: string;
  description?: string;
};

const ComponentInnerError = ({
  refetch,
  message,
  description,
}: ComponentInnerErrorProps) => {
  return (
    <div className="font-Regular relative w-full h-full">
      <Alert
        message={message ?? "خطا"}
        description={description ?? "در بارگذاری اطلاعات خطایی رخ داده است"}
        type="error"
        className="!font-Medium"
        showIcon
      />
      <button
        onClick={() => refetch()}
        className="absolute left-2 top-2 w-max h-max"
      >
        <RedoOutlined />
      </button>
    </div>
  );
};

export default ComponentInnerError;
