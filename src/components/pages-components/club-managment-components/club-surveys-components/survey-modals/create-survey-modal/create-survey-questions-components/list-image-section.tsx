import DashboardImageUploader, {
  getBase64,
} from "@/components/shared/image-uploader";
import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";

interface ListItemImageSecProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadedFile: File;
  handleDeleteImage: () => void;
  handleImageChange: (base64: string, baseBlob: Blob, file: File) => void;
}

const ListItemImageSec: React.FC<ListItemImageSecProps> = ({
  uploadedFile,
  handleDeleteImage,
  handleImageChange,
}) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      if (uploadedFile) {
        const base64Src = await getBase64(uploadedFile);
        setSrc(base64Src.toString());
      }
    };
    fetchImage();
  }, [uploadedFile]);
  return (
    <div className="w-full" onMouseDown={(e) => e.stopPropagation()}>
      {uploadedFile ? (
        <div className="w-full flex items-center justify-between p-2 border border-dashed border-gray-300 hover:border-cta rounded-lg mt-2 animate-increaseHeight">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }} // ✅ Prevents unwanted drag trigger
            onMouseUp={() => {
              handleDeleteImage();
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteImage();
            }}
            className="p-2 text-Alert text-xl"
          >
            <DeleteOutlined />
          </button>
          <div className="flex items-center gap-2">
            <span>{uploadedFile.name}</span>
            <Image
              width={70}
              height={50}
              src={src ?? ""}
              alt={uploadedFile.name}
              className="!object-contain"
            />
          </div>
        </div>
      ) : (
        <DashboardImageUploader
          onImageConvert={(base64, baseBlob, file) =>
            handleImageChange(base64, baseBlob, file)
          }
          maxHeight={1024}
          maxWidth={1024}
          info={
            <span className="font-Regular">
              بارگزاری تصویر / تصویر را اینجا کشیده و رها کنید
            </span>
          }
        />
      )}
    </div>
  );
};

export default ListItemImageSec;
