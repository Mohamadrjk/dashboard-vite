import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { Controller } from "react-hook-form";
import useClubUploader, { ClubUploaderPropsProps } from "./useClubUploader";

const ThemeRowImageUploader: React.FC<ClubUploaderPropsProps> = ({
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
            className="font-Regular  !w-full border border-dashed border-Secondary gap-3 rounded-lg p-5 text-center flex justify-center items-center"
            style={{ background: "none" }}
            type="button"
        >
            <PlusOutlined />
            <div >بارگزاری</div>
        </button>
    );

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            disabled={disabled}
            render={({ field: { onChange } }) => (
                <div className=" w-full flex grow [&_.ant-upload-list]:!w-full  [&_.ant-upload]:!w-full  ">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        disabled={disabled}
                        multiple={false}
                        accept=".webp"
                        customRequest={handleFileUpload}
                        itemRender={(o) => <div className=" w-full ">
                            {React.cloneElement(o, {
                                style: {
                                    "flexGrow": 1,
                                    width: "100%"
                                }
                            })}
                        </div>}
                        className=" !w-full flex  !justify-center !flex-col !items-center"
                        onPreview={handlePreview}
                        onChange={(info) => onUploaderChange(info, onChange)}
                    >
                        <div className=" flex !flex-col justify-center items-center w-full grow">
                            {fileList.length ? null : uploadButton}
                        </div>
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
                </div>
            )}
        />
    );
};

export default ThemeRowImageUploader;
