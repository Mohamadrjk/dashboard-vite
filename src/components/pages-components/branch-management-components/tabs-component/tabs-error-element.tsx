import { RedoOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";

function TabsErrorElement({ reloadMethod }: { reloadMethod?: () => void }) {
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
          reloadMethod?.();
        }}
        className="absolute left-2 top-2"
        icon={<RedoOutlined />}
      />
    </div>
  );
}

export default TabsErrorElement;
