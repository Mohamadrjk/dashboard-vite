import { UploadFile } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { Control } from 'react-hook-form';
type FileType = NonNullable<UploadFile["originFileObj"]>;



export interface ClubUploaderPropsProps {
    control: Control<any, any>;
    name: string; // Field name for react-hook-form
    baseUploaderUrl?: string;
    uploadHandler: (file: File) => Promise<string>;
    disabled: boolean;
}

function useClubUploader(defaultValue: string, uploadHandler: (file) => void, baseUploaderUrl: string) {
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

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
            const title = defaultValue.split("/")[defaultValue.split("/").length - 1]
            setFileList([
                {
                    uid: "-1",
                    name: title,
                    status: "done",
                    url: baseUploaderUrl + defaultValue,
                },
            ]);
        }
    }, [defaultValue]);

    useEffect(() => {
        initDefaultValue();
    }, [initDefaultValue]);
    const onUploaderChange = ({ fileList: newFileList }, onChange: any) => {
        setFileList(newFileList);
        const uploadedFile = newFileList?.[0];
        if (uploadedFile?.status === "done") {
            onChange(uploadedFile.url || ""); // fallback
        }
    }
    const handleFileUpload = async (options) => {
        const { onProgress, onError, onSuccess, file } = options;
        try {
            // Simulate upload progress (you can report actual if possible)
            onProgress?.({ percent: 30 });
            const url = await uploadHandler(file as File); // 👈 call the passed prop
            onProgress?.({ percent: 100 });
            onSuccess?.({ url }, file as File);
            // Update the fileList and notify react-hook-form
            setFileList([
                {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: baseUploaderUrl + url,
                },
            ]);
        } catch (err) {
            console.error("Upload error:", err);
            onError?.(err as Error);
        }
    }
    return {
        previewOpen,
        previewImage,
        fileList,
        handlePreview,
        handleFileUpload,
        setFileList,
        setPreviewOpen,
        setPreviewImage,
        onUploaderChange
    }
}

export default useClubUploader