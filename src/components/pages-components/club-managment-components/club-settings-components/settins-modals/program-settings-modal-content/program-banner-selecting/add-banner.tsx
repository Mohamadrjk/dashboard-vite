import { numberToFarsiText } from "@/utils/common-methods/number-to-price";
import { PlusSquareOutlined } from "@ant-design/icons";

interface AddBannerProps {
  onAddBAnner: () => void;
  lenght: number;
}

const AddBanner: React.FC<AddBannerProps> = ({ onAddBAnner, lenght }) => {
  return (
    <button
      onClick={onAddBAnner}
      className="w-full h-full flex flex-col gap-3 items-center justify-center border border-cta text-cta text-base rounded-[10px] cursor-pointer hover:bg-[rgb(96,165,250,0.1)]"
    >
      <span>بنر {numberToFarsiText[lenght]}</span>
      <PlusSquareOutlined className="text-xl" />
    </button>
  );
};

export default AddBanner;
