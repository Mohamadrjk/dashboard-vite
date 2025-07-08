import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import UploadedImagePreview from "./uploaded-image-preview";
import { promises } from "dns";
import { useImageUploader } from "@/hooks/common-hooks/useImageUploader";
import clsx from "clsx";

const { Dragger } = Upload;

// Default Validation Constants
const DEFAULT_MAX_WIDTH = 500;
const DEFAULT_MAX_HEIGHT = 500;
const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 200KB

export const getBase64 = (file): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const validateImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    if (!file.type.includes("webp")) {
      message.error("لطفا فقط تصاویر WebP آپلود کنید.", 2);
      return reject(false);
    }

    if (file.size > MAX_FILE_SIZE) {
      message.error("حجم تصویر نباید بیشتر از 200 کیلوبایت باشد.", 2);
      return reject(false);
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > maxWidth || img.height > maxHeight) {
        message.error(
          `تصویر باید حداکثر ${maxWidth}x${maxHeight} پیکسل باشد.`,
          2
        );
        return reject(false);
      }
      resolve(true);
    };
    img.onerror = () => {
      message.error("فرمت تصویر نامعتبر است.", 2);
      reject(false);
    };
  });
};

interface DashboardImageUploaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImageConvert: any;
  showUploadedImage?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  hasSizeLimit?: boolean;
  successMessage?: string;
}

const DashboardImageUploader: React.FC<DashboardImageUploaderProps> = ({
  onImageConvert,
  showUploadedImage,
  info,
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  hasSizeLimit = true,
  className,
  successMessage,
}) => {
  const { deleteImage, handleFileSelect, uploadedFile, uploadedImage } =
    useImageUploader(maxWidth, maxHeight,undefined,hasSizeLimit);

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    accept: ".webp",
    beforeUpload: async (file) => {
      await handleFileSelect(file, onImageConvert, successMessage);
      return Upload.LIST_IGNORE;
    },
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ pointerEvents: "auto" }}
      className={clsx("!font-Regular w-full z-[2]", className)}
    >
      {showUploadedImage && uploadedImage ? (
        <UploadedImagePreview
          base64={uploadedImage}
          fileName={uploadedFile.name}
          handleDeleteImage={deleteImage}
        />
      ) : (
        <Dragger
          {...props}
          className="!bg-transparent [&_.ant-upload-drag]:!bg-transparent"
        >
          {info ? (
            info
          ) : (
            <>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text !font-Regular">
                برای تبدیل، تصویر WebP را کلیک کرده یا بکشید
              </p>
              <p className="ant-upload-hint !font-Regular">
                فقط فرمت WebP مجاز است. حداکثر ابعاد: {maxWidth}x{maxHeight}{" "}
                پیکسل، حداکثر حجم: 200 کیلوبایت
              </p>
            </>
          )}
        </Dragger>
      )}
    </div>
  );
};

export default DashboardImageUploader;
