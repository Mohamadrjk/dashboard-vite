"use client";
import { NewLevelFormValues } from "@/hooks/levels-hooks/useCreateNewLevel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Image, Modal } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReusableFormField from "../../club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import { CloseCircleOutlined } from "@ant-design/icons";
import style from "./club-edit-levels-container.module.css";
import DashboardImageUploader from "@/components/shared/image-uploader";

// Types
interface RowItemType {
  title: string;
  value: string;
  label: keyof NewLevelFormValues;
}

interface RowImageItemType {
  base64?: string;
  url?: string;
  title: string;
  label: keyof NewLevelFormValues;
}

// Props interfaces
interface LevelOneRowInfoProps {
  items: RowItemType[];
  onEditMethod: () => void;
  setValue: UseFormSetValue<NewLevelFormValues>;
  control: any;
  errors: FieldErrors<NewLevelFormValues>;
  watch: UseFormWatch<NewLevelFormValues>;
}

interface LevelEditImageRowProps {
  imageUrls: RowImageItemType[];
  onEditMethod: () => void;
  handleImageChange: (
    base64: string,
    baseBlob: Blob,
    file: File,
    isUnachieved: boolean
  ) => void;
}

// Components
const EditButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) => (
  <span
    role="button"
    onClick={onClick}
    className="absolute left-[4px] top-[4px] hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-[2px]"
  >
    <Icon
      icon="mage:edit"
      width="20"
      height="20"
      style={{ color: "var(--cta)" }}
    />
  </span>
);

const ModalButtons = ({
  onCancel,
  onOk,
}: {
  onCancel: () => void;
  onOk: () => void;
}) => (
  <div className="col-span-1 flex justify-end gap-4 items-center mt-3 bg-Highlighter sticky bottom-0">
    <button onClick={onCancel} className="text-gray-900 !font-Medium">
      انصراف
    </button>
    <button
      onClick={onOk}
      className="rounded-[6px] shadow text-cta border border-gray-300 px-4 py-2 disabled:bg-gray-300"
    >
      ثبت تغییر
    </button>
  </div>
);

const LevelOneRowInfo: React.FC<LevelOneRowInfoProps> = ({
  items,
  setValue,
  control,
  errors,
  watch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RowItemType>(items[0]);

  const handleOk = () => {
    setIsModalOpen(false);
    setValue(selectedItem.label, watch(selectedItem.label));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue(selectedItem.label, selectedItem.value);
  };

  return (
    <div className="w-full relative border-b border-Highlighter-Faded flex">
      {items.map((item, index) => (
        <p
          key={index}
          className={clsx(
            "w-full h-full flex flex-col gap-[10px] p-[10px] relative",
            index > 0 && "border-r border-Highlighter-Faded"
          )}
        >
          <span className="text-gray-500 font-Regular">
            <span>{item.title}</span>
            <span className="text-Alert">*</span>
          </span>
          <span
            className={clsx(
              "font-Medium",
              !item.value && "text-Focus !font-Regular"
            )}
          >
            {item.value || "ثبت نشده"}
          </span>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(item);
              setIsModalOpen(true);
            }}
          />
        </p>
      ))}

      <Modal
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">
              ویرایش {selectedItem.title}
            </span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px]"
              role="button"
              onClick={handleCancel}
            />
          </div>
        }
        destroyOnClose
        open={isModalOpen}
        onCancel={handleCancel}
        style={{
          direction: "rtl",
          width: "95% !important",
          maxWidth: "450px",
          height: "95dvh",
        }}
        className={style["edit-level-container"]}
        classNames={{
          header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
          content: "!w-[600px] max-w-full !p-2 !bg-BG !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        <div className="w-full grid grid-cols-1 gap-4 bg-Highlighter rounded px-2 p-2 !font-Regular max-h-[600px] relative overflow-y-auto custome-scrool-bar-small">
          {selectedItem && (
            <ReusableFormField
              key={selectedItem.label}
              label={selectedItem.title}
              name={selectedItem.label}
              placeholder="توضیحات را وارد کنید..."
              control={control}
              errors={errors}
              loading={false}
            />
          )}
          <ModalButtons onCancel={handleCancel} onOk={handleOk} />
        </div>
      </Modal>
    </div>
  );
};

const LevelEditImageRow: React.FC<LevelEditImageRowProps> = ({
  imageUrls,
  handleImageChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<RowImageItemType[]>([]);
  const [previewOpen, setPreviewOpen] = useState({ index: 0, show: false });

  const handleConditionalyEditImages = (item: RowImageItemType) => {
    setSelectedItem((prev) =>
      prev.find((img) => img.label === item.label)
        ? prev.filter((img) => img.label !== item.label)
        : [...prev, item]
    );
  };

  return (
    <>
      <div className="w-full relative border-b border-Highlighter-Faded flex">
        {imageUrls.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "w-full h-full flex flex-col gap-[10px] p-[10px] relative",
              index > 0 && "border-r border-Highlighter-Faded"
            )}
          >
            <span className="text-gray-500 font-Regular">
              <span>{item.title}</span>
              <span className="text-Alert">*</span>
            </span>
            <div className="w-full flex justify-end">
              <div className="border-2 border-dashed border-gray-300 rounded-[6px] p-1 flex justify-center items-center">
                <Image
                  width={80}
                  height={60}
                  preview={{
                    visible: previewOpen.index === index && previewOpen.show,
                    onVisibleChange: (visible) =>
                      setPreviewOpen({ index, show: visible }),
                  }}
                  src={item.base64 || item.url}
                  alt="تصویر WebP"
                  className="!object-contain"
                />
              </div>
            </div>
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                handleConditionalyEditImages(item);
              }}
            />
          </div>
        ))}
      </div>

      {selectedItem.length > 0 && (
        <div>
          {selectedItem.map((item, index) => (
            <DashboardImageUploader
              key={index}
              onImageConvert={(base64, baseBlob, file) =>
                handleImageChange(
                  base64,
                  baseBlob,
                  file,
                  item.label === "UnachievedImage"
                )
              }
              maxHeight={500}
              maxWidth={500}
              info={
                <span className="font-Regular">
                  بارگزاری {item.title}/تصویر را اینجا کشیده و رها کنید
                </span>
              }
              showUploadedImage
            />
          ))}
        </div>
      )}
    </>
  );
};

export { LevelOneRowInfo, LevelEditImageRow };
