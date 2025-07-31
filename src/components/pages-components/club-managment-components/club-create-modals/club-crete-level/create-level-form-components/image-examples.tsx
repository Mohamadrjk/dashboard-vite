import example1 from "/public/images/BronzeLevel.webp";
import example2 from "/public/images/image 1372.png";
import { Image, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const MainImageExample = () => {
  const firstContent = (
    <div className="w-full flex justify-center">
      <Image
        src={example1}
        width={80}
        height={60}
        className="!object-contain"
        alt="example1"
      />
    </div>
  );
  return (
    <Popover
      className="!font-Regular"
      placement="topLeft"
      title={"تصویر سطح دستیابی نشده"}
      content={firstContent}
    >
      <InfoCircleOutlined className="!text-cta pr-2" />
    </Popover>
  );
};

const UnAchievedImageExample = () => {
  const secondContent = (
    <div className="w-full flex justify-center">
      <Image
        src={example2}
        width={80}
        height={60}
        className="!object-contain"
        alt="example1"
      />
    </div>
  );
  return (
    <Popover
      className="!font-Regular"
      placement="topLeft"
      title={"تصویر سطح دستیابی نشده"}
      content={secondContent}
    >
      <InfoCircleOutlined className="!text-cta pr-2" />
    </Popover>
  );
};

export { MainImageExample, UnAchievedImageExample };
