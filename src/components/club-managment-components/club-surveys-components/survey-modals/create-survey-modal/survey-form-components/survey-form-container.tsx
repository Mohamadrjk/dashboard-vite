import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReusableFormField from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import { Dispatch, SetStateAction, useState } from "react";
import { surveyPointGroup, surveyUsersGroup } from "../../../survey-data";
import DashboardImageUploader from "@/components/shared/image-uploader";
import ReusableFormFieldTextArea from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea";
import {
  PointGroupsDropDown,
  UsersGroupsDropDown,
} from "./survey-form-dropdowns";

export interface SurveyFormModel {
  Title?: string;
  Description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image?: any;
  GratitudeTitle?: string;
  GratitudeDescription?: string;
  SurveyPointGroupId?: number;
}

export const validationSchema = yup.object().shape({
  Title: yup.string().required("عنوان الزامی است"),
  Description: yup.string().required("توضیحات الزامی است"),
  Image: yup.mixed().required("تصویر الزامی است"),
  GratitudeDescription: yup.string().required("شرح تشکر از کاربر الزامی است"),
  GratitudeTitle: yup.string().required("عنوان تشکر الزامی است"),
  SurveyPointGroupId: yup.number().required("کاربران هدف الزامی اشت"),
});

interface CreateSurveyFormContainerProps {
  setActiveIndex: Dispatch<SetStateAction<string>>;
  handleCancel: () => void;
  setTempFormData: Dispatch<SetStateAction<SurveyFormModel>>;
  tempFormData: SurveyFormModel;
}

const CreateSurveyFormContainer: React.FC<CreateSurveyFormContainerProps> = ({
  setActiveIndex,
  handleCancel,
  setTempFormData,
  tempFormData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<SurveyFormModel>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: tempFormData,
  });

  const onSubmitNewSurveyForm = (data: SurveyFormModel) => {
    console.log(data);
    setTempFormData(() => data);
    setActiveIndex("2");
  };

  const handleImageChange = (
    base64: string,
    baseBlob: Blob,
    file: File,
    isUnachieved: boolean
  ) => {
    const formFile = new File([baseBlob], file.name, { type: file.type });
    setValue("Image", formFile);
    clearErrors("Image");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitNewSurveyForm)}
      className="w-full grid grid-cols-2 gap-x-[6px] bg-Highlighter px-2 pt-2 !font-Regular max-h-[619px] relative overflow-y-auto custome-scrool-bar-small"
    >
      <div className="col-span-2 w-full grid grid-cols-5 gap-[6px]">
        <ReusableFormField
          loading={loading}
          label="عنوان"
          name="Title"
          placeholder="عنوان را وارد کنید..."
          control={control}
          errors={errors}
          className="col-span-3 relative w-full flex flex-col pb-4"
        />
        <PointGroupsDropDown
          surveyPointGroup={surveyPointGroup}
          error={!!errors.SurveyPointGroupId}
          handleSetId={(id: number) => setValue("SurveyPointGroupId", id)}
        />
      </div>
      <ReusableFormField
        loading={loading}
        label="عنوان تشکر"
        name="GratitudeTitle"
        placeholder="عنوان تشکر از کاربر را وارد کنید..."
        control={control}
        errors={errors}
        className="col-span-2 relative w-full flex flex-col pb-4"
      />
      <ReusableFormFieldTextArea
        loading={loading}
        label="شرح نطرسنجی"
        name="Description"
        placeholder="شرح نطرسنجی را وارد کنید..."
        control={control}
        errors={errors}
        className="col-span-1 relative w-full flex flex-col pb-4"
      />
      <ReusableFormFieldTextArea
        loading={loading}
        label="شرح پیام تشکر از کاربر"
        name="GratitudeDescription"
        placeholder="شرح پیام تشکر از کاربر را وارد کنید..."
        control={control}
        errors={errors}
        className="col-span-1 relative w-full flex flex-col pb-4"
      />

      {/* Image Uploaders */}
      <div className="col-span-2">
        <label className="text-secondary1 mb-1 relative">
          <span>تصویر نظرسنجی</span>

          {errors && errors.Image && (
            <span className="font-Regular whitespace-nowrap text-xs text-Alert pr-2 absolute translate-x-4 opacity-0 right-full bottom-0 top-0 animate-fadeRight">
              لطفا عکس سطح خود را انتخاب کنید
            </span>
          )}
        </label>
        <DashboardImageUploader
          onImageConvert={(base64, baseBlob, file) =>
            handleImageChange(base64, baseBlob, file, false)
          }
          showUploadedImage
          maxHeight={500}
          maxWidth={500}
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
        </button>
      </div>
    </form>
  );
};

export default CreateSurveyFormContainer;
