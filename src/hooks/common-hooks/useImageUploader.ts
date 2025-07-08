// useImageUploader.ts
import { useState } from "react";
import { message } from "antd";

const DEFAULT_MAX_WIDTH = 500;
const DEFAULT_MAX_HEIGHT = 500;
const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 200KB

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const validateImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  maxFileSize: number,
  hasSizeLimit?: boolean
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!file.type.includes("webp")) {
      message.error("لطفا فقط تصاویر WebP آپلود کنید.", 2);
      return reject(false);
    }
    if (hasSizeLimit && file.size > maxFileSize) {
      message.error(
        `حجم تصویر نباید بیشتر از ${maxFileSize || 200} کیلوبایت باشد.`,
        2
      );
      return reject(false);
    }
    const img = new Image();

    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (hasSizeLimit) {
        if (img.width > maxWidth || img.height > maxHeight) {
          message.error(
            `تصویر باید حداکثر ${maxWidth}x${maxHeight} پیکسل باشد.`,
            2
          );
          return reject(false);
        }
      }
    };
    resolve(true);
    img.onerror = () => {
      message.error("فرمت تصویر نامعتبر است.", 2);
      reject(false);
    };
  });
};

export const useImageUploader = (
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  maxFileSize = MAX_FILE_SIZE,
  hasSizeLimit = true
) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileSelect = async (
    file: File,
    onImageConvert: (base64: string, blob: Blob, file: File) => void,
    successMessage?: string
  ) => {
    try {
      await validateImage(file, maxWidth, maxHeight, maxFileSize, hasSizeLimit);
      const base64 = await getBase64(file);
      setUploadedImage(base64);
      setUploadedFile(file);
      const blob = new Blob([file], { type: file.type });
      setPreviewURL(URL.createObjectURL(file));
      onImageConvert(base64, blob, file);
      successMessage
        ? successMessage
        : message.success("تصویر WebP با موفقیت تبدیل شد.", 2);
    } catch (error) {
      successMessage
        ? successMessage
        : message.error("تبدیل تصویر ناموفق بود.", 2);
    }
  };

  const deleteImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setPreviewURL(null);
  };

  return {
    uploadedImage,
    uploadedFile,
    previewURL,
    handleFileSelect,
    deleteImage,
  };
};
