import { Form } from "antd";
import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import DashboardImageUploader from "@/components/shared-components/uploader/image-uploader";
import useBranchList from "@/hooks/branch-management-hooks/useBranchList";
import SelectDropdown from "../../branch-tab/selectDropDown";
import ReusableFormField from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import { IFormFiledProps } from "../../branch-tab/add-branch-form/useAddNewBranch";
import EditProductImageSelect from "../../product-tab/edit-product/ImageSelectComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReusableFormCheckBox from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-checkbox";
import ImageIcon from "@/components/shared-components/custom-icons/imagesIcon";

interface AddNewCategoryFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AddCategoryForm: UseFormReturn<ICategoryItem, any, undefined>;
  FormFiledItems: Partial<Record<keyof ICategoryItem, IFormFiledProps>>;
  onSubmit: (data: ICategoryItem) => void;
  loading: boolean;
}

function AddNewCategoryForm({
  AddCategoryForm,
  FormFiledItems,
  loading,
  onSubmit,
}: AddNewCategoryFormProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = AddCategoryForm;
  const { branchOptions } = useBranchList(true);
  const watchBranch = watch("branch_id");
  const watchImage = watch("image_base64");
  const handleChangeImage = (base64Url) => {
    setValue("image_base64", base64Url);
  };
  const [selectedBranch, setSelectedBranch] = useState<{
    key: number;
    label: string;
  }>();
  const handleSelectCategory = (e) => {
    AddCategoryForm.setValue("branch_id", +e.key);
    AddCategoryForm.clearErrors("branch_id");
  };
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
      <div className=" grid grid-cols-2 gap-5">
        <div className=" flex flex-col  font-Regular">
          {Object.entries(FormFiledItems)
            .filter((i) => i[0] !== "menu_id")
            .map(([key, value], index) => (
              <div key={index} className="mb-1">
                <ReusableFormField
                  control={control}
                  errors={errors}
                  name={key as keyof ICategoryItem}
                  label={value.name}
                  placeholder=""
                  type={value.type}
                  endIcon={
                    key == "discount" && (
                      <Icon
                        icon={"fa-solid:percent"}
                        className=" text-Secondary"
                      />
                    )
                  }
                  requierd={value.isRequierd}
                  loading={loading}
                />
              </div>
            ))}
          <SelectDropdown
            onMenuClick={handleSelectCategory}
            options={branchOptions}
            title="انتخاب شعبه"
            selectedItem={selectedBranch}
          />
        </div>
        <div>
          {watchImage ? (
            <EditProductImageSelect
              className=" grow w-full h-full"
              image={watchImage}
              setImage={() => setValue("image_base64", undefined)}
              isLoading={loading}
            />
          ) : (
            <DashboardImageUploader
              maxHeight={1024}
              maxWidth={800}
              successMessage=" "
              hasSizeLimit={false}
              onImageConvert={handleChangeImage}
              info={
                <div className=" flex flex-col gap-4 items-center justify-center font-Regular">
                  <div className=" flex justify-center items-center">
                    {" "}
                    <ImageIcon
                      color="var(--secondary)"
                      width="80"
                      height="80"
                    />
                  </div>
                  <span>فرمت: .webp</span>
                  <span>نسبت تصویر ۱:۱</span>
                  <span>حداکثر حجم: ۵۰۰ کیلوبایت</span>
                </div>
              }
              showUploadedImage
            />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <ReusableFormCheckBox
          control={control}
          name="is_active"
          label="ثبت به صورت فعال"
          errors={errors}
          requierd={false}
        />
        <button
          type="submit"
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
          disabled={Object.keys(errors).length > 0 || loading}
        >
          ثبت دسته بندی
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </Form>
  );
}

export default AddNewCategoryForm;
