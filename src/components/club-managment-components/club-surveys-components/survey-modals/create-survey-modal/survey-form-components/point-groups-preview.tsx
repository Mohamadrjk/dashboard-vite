import { Rate } from "antd";

interface PointGroupsPreviewProps {
  pointTitleValues: {
    key: string;
    value: number;
  }[];
}

const PointGroupsPreview: React.FC<PointGroupsPreviewProps> = ({
  pointTitleValues,
}) => {
  return (
    <ul className="w-full flex flex-col gap-2">
      {pointTitleValues.map((item, index) => {
        return (
          <li
            key={index}
            className="w-full flex items-center gap-2 justify-center bg-gray-100 rounded-lg font-Regular p-1"
          >
            <span className="w-[80px] text-center">{item.key}</span>
            <Rate disabled defaultValue={item.value} />
          </li>
        );
      })}
    </ul>
  );
};

export default PointGroupsPreview;
