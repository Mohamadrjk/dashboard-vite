import { LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
import DashboardImageUploader from "@/components/shared-components/uploader/image-uploader";
import { MainImageExample, UnAchievedImageExample } from "./image-examples";
import CustomColorPicker from "./custom-color-picker";
import ReusableFormField from "./reusable-form-input";
import { useCreateClubLevel } from "@/hooks/levels-hooks/useCreateNewLevel";
import { Dispatch, SetStateAction } from "react";
import { TempFormData } from "../club-crete-level-modal-container";
import { DefaultOptionType } from "antd/es/select";

interface CreateNewClubLevelProps {
  handleCancel: () => void;
  loading: boolean;
  setTempFormData: Dispatch<SetStateAction<TempFormData>>;
  ranks: DefaultOptionType[];
}

const CreateNewClubLevel: React.FC<CreateNewClubLevelProps> = ({
  handleCancel,
  loading,
  setTempFormData,
  ranks,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    errors,
    selectedRank,
    setSelectedRank,
    handleImageChange,
    handleMenuClick,
    onSubmit,
  } = useCreateClubLevel(setTempFormData);

  const selectedItem =
    (
      ranks.find((item) => item?.key === selectedRank) as {
        key: string;
        label: string;
      }
    )?.label || "انتخاب رتبه بندی...";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 gap-4 bg-Highlighter px-2 pt-2 !font-Regular max-h-[600px] relative overflow-y-auto custome-scrool-bar-small"
    >
      <ReusableFormField
        loading={loading}
        label="عنوان"
        name="Title"
        placeholder="عنوان را وارد کنید..."
        control={control}
        errors={errors}
      />
      <ReusableFormField
        loading={loading}
        label="توضیحات"
        name="Description"
        placeholder="توضیحات را وارد کنید..."
        control={control}
        errors={errors}
      />
      <ReusableFormField
        loading={loading}
        label="امتیاز مورد نیاز"
        name="RequiredPoints"
        placeholder="امتیاز را وارد کنید..."
        control={control}
        errors={errors}
      />

      {/* Rank Selection Dropdown */}
      <div className="col-span-1 pb-4 flex flex-col">
        <span className="text-secondary1 mb-1">انتخاب رتبه</span>
        <Select
          defaultValue={selectedItem}
          style={{ width: "100%", height: "100%" }}
          onChange={(value) => setSelectedRank(Number(value))}
          options={ranks}
          placeholder="رتبه"
          className="!font-Medium grow !whitespace-nowrap !text-base !flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px] p-2"
          popupClassName="rtl-custom !font-Regular"
        />
      </div>

      <CustomColorPicker
        title="رنگ اولیه"
        setValue={setValue}
        lable="PrimaryColor"
      />
      <CustomColorPicker
        title="رنگ ثانویه"
        setValue={setValue}
        lable="SecondaryColor"
      />

      {/* Image Uploaders */}
      <div className="col-span-2">
        <label className="text-secondary1 mb-1">
          <span>تصویر سطح</span>
          <MainImageExample />
          {errors && errors.Image && (
            <span className="font-Regular text-xs text-Alert pr-2">
              لطفا عکس سطح خود را انتخاب کنید
            </span>
          )}
        </label>
        <DashboardImageUploader
          onImageConvert={(base64, baseBlob, file) =>
            handleImageChange(base64, baseBlob, file, false)
          }
          maxHeight={500}
          maxWidth={500}
          info={
            <span className="font-Regular">
              بارگزاری فایل / فایل را اینجا کشیده و رها کنید
            </span>
          }
          showUploadedImage
        />
      </div>

      <div className="col-span-2">
        <label className="text-secondary1 mb-1">
          تصویر سطح دستیابی نشده
          <UnAchievedImageExample />
          {errors && errors.UnachievedImage && (
            <span className="font-Regular text-xs text-Alert pr-2">
              لطفا عکس سطح خود را انتخاب کنید
            </span>
          )}
        </label>
        <DashboardImageUploader
          onImageConvert={(base64, baseBlob, file) =>
            handleImageChange(base64, baseBlob, file, true)
          }
          info={
            <span className="font-Regular">
              بارگزاری فایل / فایل را اینجا کشیده و رها کنید
            </span>
          }
          maxHeight={500}
          maxWidth={500}
          showUploadedImage
        />
      </div>

      {/* Submit & Cancel Buttons */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3 bg-Highlighter sticky bottom-0">
        <button onClick={handleCancel} className="text-gray-900 !font-Medium">
          انصراف
        </button>
        <button
          type="submit"
          className="rounded-[6px] shadow text-cta border border-gray-300 px-4 py-2 disabled:bg-gray-300"
          disabled={Object.keys(errors).length > 0}
        >
          ثبت مشخصات و بعدی
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </form>
  );
};

export default CreateNewClubLevel;
