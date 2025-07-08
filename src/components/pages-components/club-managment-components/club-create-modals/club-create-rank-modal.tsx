import DashboardImageUploader from "@/components/shared-components/uploader/image-uploader";
import { LoadingOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface NewRankFormValues {
  Title?: string;
  ScoreUnitTitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
}

// ✅ Define Yup validation schema
const validationSchema = yup.object().shape({
  Title: yup.string().required("عنوان الزامی است"),
  ScoreUnitTitle: yup.string().required("عنوان واحد امتیاز الزامی است"),
  Icon: yup.mixed().test("fileRequired", "تصویر رتبه الزامی است", (value) => {
    return value instanceof File;
  }),
});

// ✅ Reusable FormField Component
interface FormFieldProps {
  label: string;
  name: keyof NewRankFormValues;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  length?: number;
  type?: string;
  loading: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  control,
  errors,
  loading,
  length,
  type = "text",
}) => (
  <div className="col-span-1 relative w-full flex flex-col">
    <label className="text-secondary1 mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          maxLength={length}
          type={type}
          disabled={loading}
          dir="rtl"
          placeholder={placeholder}
          className="!font-Medium placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
        />
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs mt-1">{errors[name]?.message}</span>
    )}
  </div>
);

interface CreateNewClubRankProps {
  handleCancel: () => void;
  loading: boolean;
  handleAddRank: (payload: {
    Title: string;
    ScoreUnitTitle: string;
    Icon: File;
  }) => Promise<void>;
}

// ✅ Main Form Component
const CreateNewClubRank: React.FC<CreateNewClubRankProps> = ({
  handleCancel,
  loading,
  handleAddRank,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewRankFormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const handleImageChanges = (base64: string, baseBlob: Blob, file: File) => {
    const formFile = new File([baseBlob], file.name, { type: file.type }); // Convert Blob to File

    setValue("Icon", formFile); // Store the File object in the form
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleSubmit = (data: any) => {
    handleAddRank(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="w-full grid grid-cols-2 gap-4 bg-Highlighter p-2 !font-Regular"
    >
      <FormField
        loading={loading}
        label="عنوان"
        name="Title"
        placeholder="عنوان را وارد کنید..."
        control={control}
        errors={errors}
      />
      <FormField
        loading={loading}
        label="عنوان امتیاز"
        name="ScoreUnitTitle"
        placeholder="عنوان امتیاز را وارد کنید..."
        control={control}
        errors={errors}
      />
      <div className="col-span-2">
        <DashboardImageUploader
          onImageConvert={handleImageChanges}
          maxHeight={500}
          maxWidth={500}
          showUploadedImage
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <button onClick={handleCancel} className="text-gray-900 !font-Medium">
          انصراف
        </button>
        <button
          type="submit"
          className=" rounded-[6px] shadow bg-cta text-Highlighter px-4 py-2 disabled:bg-gray-300"
          disabled={Object.keys(errors).length > 0 || loading}
        >
          ثبت رتبه جدید
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </form>
  );
};

export default CreateNewClubRank;
