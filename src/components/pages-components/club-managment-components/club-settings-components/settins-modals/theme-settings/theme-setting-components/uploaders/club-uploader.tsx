import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { Controller } from "react-hook-form";
import useClubUploader, { ClubUploaderPropsProps } from "./useClubUploader";

const ClubUploaderProps: React.FC<ClubUploaderPropsProps> = ({
    control,
    name,
    disabled,
    uploadHandler,
    baseUploaderUrl
}) => {
    const defaultValue = control._getWatch(name);
    const {
        fileList,
        handleFileUpload,
        handlePreview,
        previewImage,
        previewOpen,
        onUploaderChange,
        setPreviewOpen,
        setPreviewImage,
    } = useClubUploader(defaultValue, uploadHandler, baseUploaderUrl);

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
                        customRequest={handleFileUpload}
                        className=" [&_.ant-upload-list]:!w-full !min-w-[100px] [&_.ant-upload-select]:!w-full "
                        onPreview={handlePreview}
                        onChange={(info) => onUploaderChange(info, onChange)}
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
            )}
        />
    );
};

export default ClubUploaderProps;
