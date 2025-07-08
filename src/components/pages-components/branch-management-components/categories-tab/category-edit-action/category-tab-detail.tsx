import React, { useCallback, useEffect, useState } from "react";
import CategoryTabDetailItem from "./category-tab-detail-item";
import { UseFormReturn } from "react-hook-form";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import { IFormFiledProps } from "../../branch-tab/add-branch-form/useAddNewBranch";
import useBranchList from "@/hooks/branch-management-hooks/useBranchList";

interface CategoryTabDetailProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AddCategoryForm: UseFormReturn<ICategoryItem, any, undefined>;
  FormFiledItems: Partial<Record<keyof ICategoryItem, IFormFiledProps>>;
  onSubmit: (data: ICategoryItem) => void;
  loading: boolean;
}

function CategoryTabDetail({
  AddCategoryForm,
  FormFiledItems,
  loading,
  onSubmit,
}: CategoryTabDetailProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = AddCategoryForm;
  const { branchOptions } = useBranchList();
  const watchBranch = watch("menu_id");
  const watchImage = watch("image_base64");
  const handleChangeImage = (base64Url) => {
    setValue("image_base64", base64Url);
  };
  const [selectedBranch, setSelectedBranch] = useState<{
    key: number;
    label: string;
  }>();
  const handleSelectCategory = (e) => {
    AddCategoryForm.setValue("branch_id", e.key);
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
    <div className=" grid grid-cols-2   font-Regular">
      {Object.entries(FormFiledItems).map(([key, value], index) => {
        return (
          <CategoryTabDetailItem
            key={index}
            control={control}
            loading={loading}
            requierd={value.isRequierd}
            className={index % 2 == 0 ? "rounded-r-md " : "rounded-l-md "}
            name={key}
            label={value.name}
          />
        );
      })}
    </div>
  );
}

export default CategoryTabDetail;
