import { Form } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import DashboardImageUploader from "@/components/shared-components/uploader/image-uploader";
import ImageIcon from "@/components/shared-components/custom-icons/imagesIcon";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import useCategoryList from "@/hooks/branch-management-hooks/useCategoryList";
import SelectDropdown from "../../branch-tab/selectDropDown";
import { IFormFiledProps } from "../../branch-tab/add-branch-form/useAddNewBranch";
import EditProductImageSelect from "../edit-product/ImageSelectComponent";
import ReusableFormFieldTextArea from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea";
import ReusableFormField from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import ReusableFormCheckBox from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-checkbox";

interface AddNewProductFormProps {
  AddProductForm: UseFormReturn<IProductItem>;
  FormFiledItems: Partial<Record<keyof IProductItem, IFormFiledProps>>;
  onSubmit: (data: IProductItem) => void;
  loading: boolean;
}

const AddNewProductForm: React.FC<AddNewProductFormProps> = ({
  AddProductForm,
  FormFiledItems,
  loading,
  onSubmit,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = AddProductForm;
  const { categoryOption, isLoading } = useCategoryList();

  const watchImage = watch("image_url");
  const watchCategory = watch("category_id");

  const [selectedCategory, setSelectedCategory] = useState<{
    key: number;
    label: string;
  }>();

  const handleChangeImage = (base64Url: string) =>
    setValue("image_url", base64Url);
  const handleSelectCategory = (e: { key: number; label: string }) => {
    setValue("category_id", e.key);
    AddProductForm.clearErrors("category_id");
  };

  const initSelectCategory = useCallback(() => {
    setSelectedCategory(categoryOption?.find((i) => i.key == watchCategory));
  }, [watchCategory, categoryOption]);

  useEffect(() => initSelectCategory(), [initSelectCategory]);

  return (
    <Form onFinish={handleSubmit(onSubmit)} className="!font-Regular">
      <div className="flex max-h-[70vh] no-scrollbar overflow-auto   flex-col gap-5">
        <div className="grid grid-cols-2 gap-x-5 font-Regular">
          {Object.entries(FormFiledItems)
            .filter(([key]) => key !== "category_id")
            .map(([key, value], index) => (
              <div
                key={index}
                className={`mb-1 ${key === "description" ? "col-span-2" : ""}`}
              >
                {key === "description" ? (
                  <ReusableFormFieldTextArea
                    placeholder=""
                    control={control}
                    errors={errors}
                    name={key as keyof IProductItem}
                    label={value.name}
                    loading={loading}
                    requierd={value.isRequierd}
                  />
                ) : (
                  <ReusableFormField
                    placeholder=""
                    control={control}
                    type={value.type}
                    errors={errors}
                    name={key as keyof IProductItem}
                    label={value.name}
                    loading={loading}
                    requierd={value.isRequierd}
                  />
                )}
              </div>
            ))}
          <SelectDropdown
            title="دسته بندی"
            isLoading={isLoading}
            onMenuClick={handleSelectCategory}
            options={categoryOption}
            selectedItem={selectedCategory}
          />
        </div>

        <div className="border-t border-Secondary pt-5">
          <div className="flex gap-1">
            <div className="flex grow  max-w-[70%] mx-auto aspect-[2/2]">
              {watchImage ? (
                <EditProductImageSelect
                  image={watchImage}
                  setImage={() => setValue("image_url", undefined)}
                  isLoading={isLoading}
                />
              ) : (
                <DashboardImageUploader
                  successMessage=" "
                  hasSizeLimit={false}
                  className=" grow w-full"
                  onImageConvert={handleChangeImage}
                  info={
                    <div className="flex flex-col gap-4 items-center justify-center font-Regular">
                      <ImageIcon
                        color="var(--secondary)"
                        width="80"
                        height="80"
                      />
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
        </div>
      </div>

      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <ReusableFormCheckBox
          control={control}
          name="is_available"
          label="ثبت به صورت فعال"
          errors={errors}
          requierd={false}
        />
        <button
          type="submit"
          className="rounded-[6px] border border-Primary text-Primary px-4 py-2"
          disabled={Object.keys(errors).length > 0 || loading}
        >
          ثبت محصول
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </Form>
  );
};

export default AddNewProductForm;
