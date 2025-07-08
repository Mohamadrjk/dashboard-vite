import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Control, Controller } from "react-hook-form";

type FileType = NonNullable<UploadFile["originFileObj"]>;

interface ThemeImageUploaderProps {
  control: Control<any, any>;
  name: string; // Field name for react-hook-form
  defaultValue?: string;
  disabled: boolean
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ThemeImageUploader: React.FC<ThemeImageUploaderProps> = ({
  control,
  name,
  defaultValue,
  disabled
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const initDefaultValue = useCallback(() => {
    if (defaultValue) {
      setFileList([
        {
          uid: "-1",
          name: "Uploaded Image",
          status: "done",
          url: defaultValue,
        },
      ]);
    }
  }, [defaultValue]);
  useEffect(() => {
    initDefaultValue();
  }, [initDefaultValue]);
  const uploadButton = (
    <button
      className="font-Regular"
      style={{ border: 0, background: "none" }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>بارگزاری</div>
    </button>
  );

  return (
    <Controller
      name={name}
      disabled={disabled}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field: { onChange } }) => (
        <>
          <Upload
            listType="picture-circle"
            fileList={fileList}
            disabled={disabled}
            multiple={false}
            accept=".webp"
            className=" [&_.ant-upload-list]:!w-full  [&_.ant-upload-select]:!w-full "
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => {
              setFileList(newFileList);
              if (newFileList.length > 0) {
                const file = newFileList[0];
                if (file.originFileObj) {
                  getBase64(file.originFileObj).then((base64) => {
                    onChange(base64); // Update react-hook-form value
                  });
                } else {
                  onChange(file.url || ""); // Use URL if available
                }
              }
            }}
          >
            {fileList.length ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              alt="preview"
              src={previewImage}
            />
          )}
        </>
      )
      }
    />
  );
};

export default ThemeImageUploader;
