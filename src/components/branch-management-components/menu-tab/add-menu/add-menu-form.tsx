import { Form } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import SelectDropdown from "../../branch-tab/selectDropDown";
import useBranchList from "@/hooks/branch-management-hooks/useBranchList";
import ReusableFormField from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import ReusableFormFieldTextArea from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea";
import ReusableFormCheckBox from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-checkbox";
import EditProductImageSelect from "../../product-tab/edit-product/ImageSelectComponent";
import ImageIcon from "@/components/shared/custom-icons/imagesIcon";
import DashboardImageUploader from "@/components/shared/image-uploader";

interface AddNewMenuFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AddMenuForm: UseFormReturn<IMenuItem, any, undefined>;
  FormFiledItems: Partial<
    Record<
      keyof IMenuItem,
      {
        name: string;
        isRequierd: boolean;
      }
    >
  >;
  onSubmit: (data: IMenuItem) => void;
  loading: boolean;
}

function AddNewMenuForm({
  AddMenuForm,
  FormFiledItems,
  loading,
  onSubmit,
}: AddNewMenuFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = AddMenuForm;
  const { branchOptions } = useBranchList(true);
  const watchBranch = watch("branch_id");
  const watchImage = watch("image_url");
  // watch
  const [selectedBranch, setSelectedBranch] = useState<{
    key: number;
    label: string;
  }>();
  const handleSelectCategory = (e) => {
    AddMenuForm.setValue("branch_id", +e.key);
    AddMenuForm.clearErrors("branch_id");
  };
  const handleChangeImage = (base64Url: string) =>
    setValue("image_url", base64Url);
  const initSelectBranch = useCallback(() => {
    return setSelectedBranch(
      watchBranch &&
        branchOptions &&
        branchOptions.find((i) => i.key == watchBranch)
    );
  }, [watchBranch]);

  useEffect(() => {
    initSelectBranch();
  }, [initSelectBranch]);
  return (
    <Form onFinish={handleSubmit(onSubmit)} className=" !font-Regular">
      <div className="flex flex-col  gap-5  max-h-[70vh] no-scrollbar overflow-auto">
        <div className=" pb-5 flex flex-col gap-1">
          <label className="">بارگزاری تصویر</label>
          {watchImage ? (
            <EditProductImageSelect
              image={watchImage}
              setImage={() => setValue("image_url", undefined)}
              isLoading={loading}
              className="h-[70px]"
            />
          ) : (
            <DashboardImageUploader
              onImageConvert={(base64) => handleChangeImage(base64)}
              info={
                <span className="font-Regular">
                  تصویر را اینجا کشیده و رها کنید
                </span>
              }
              maxHeight={1024}
              maxWidth={800}
              hasSizeLimit={false}
              successMessage=" "
              showUploadedImage
            />
          )}
        </div>
        <div className=" grid grid-cols-2 font-Regular gap-x-5 ">
          <div className="mb-1">
            <ReusableFormField
              control={control}
              errors={errors}
              name={"name" as keyof IMenuItem}
              label={FormFiledItems.name.name}
              placeholder=""
              requierd={FormFiledItems.name.isRequierd}
              loading={loading}
            />
          </div>
          <SelectDropdown
            onMenuClick={handleSelectCategory}
            options={branchOptions}
            title="انتخاب شعبه"
            selectedItem={selectedBranch}
          />
          <div className=" col-span-2  mb-1">
            <ReusableFormFieldTextArea
              control={control}
              errors={errors}
              name={"description" as keyof IMenuItem}
              label={FormFiledItems.description.name}
              requierd={FormFiledItems.description.isRequierd}
              placeholder=""
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <ReusableFormCheckBox
          control={control}
          name="status"
          label="ثبت به صورت فعال"
          errors={errors}
          requierd={false}
        />
        <button
          type="submit"
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
          disabled={Object.keys(errors).length > 0 || loading}
        >
          ثبت منو
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </Form>
  );
}

export default AddNewMenuForm;
