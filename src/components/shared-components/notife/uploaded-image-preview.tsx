import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";

interface UploadedImagePreviewProps {
  fileName: string;
  base64: string;
  handleDeleteImage: () => void;
}

const UploadedImagePreview: React.FC<UploadedImagePreviewProps> = ({
  base64,
  fileName,
  handleDeleteImage,
}) => {
  return (
    <div className="w-full flex items-center justify-between p-2 border border-dashed border-gray-300 hover:border-cta rounded-lg mt-2 h-0 overflow-hidden animate-increaseHeight">
      <button onClick={handleDeleteImage} className="p-2 text-Alert text-xl">
        <DeleteOutlined />
      </button>
      <div className="flex items-center gap-2">
        <span>{fileName}</span>
        <Image
          width={70}
          height={50}
          src={base64}
          alt={fileName}
          className="!object-contain"
        />
      </div>
    </div>
  );
};

export default UploadedImagePreview;
