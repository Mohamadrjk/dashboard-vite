import { useNotify } from "@/components/shared-components/notife/notife";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { editBranchItem } from "@/utils/digitalmenu-api/branchesService";
import { useState } from "react";
import useAddNewBranch from "../add-branch-form/useAddNewBranch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد نام شعبه الزامی است"),
  operating_hours: yup.string().required("فیلد ساعات کاری الزامی است"),
  contact_phone: yup
    .string()
    .matches(/^0\d{10}$/, "شماره تلفن به فرمت صحیح وارد نشده است")
    .required("شماره تلفن الزامی است")
    .test("maxLength", "شماره تلفن نباید بیشتر از حد مجاز باشد", (value) =>
      value?.startsWith("0") ? value.length <= 11 : value.length <= 10
    ),
  location: yup.string().required("فیلد آدرس الزامی است"),
  email: yup.string().required("فیلد لینک الزامی است"),
});
function useEditBranchItem() {
  const { FormFiledItems } = useAddNewBranch();
  const EditBranchForm = useForm<IBranchItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();
  const handleEdit = async (
    payload: {
      branch_id: number;
      item: IBranchItem;
    },
    relaodMethod?: () => void
  ) => {
    // Filter out null or undefined fields from payload.item
    const filteredItem = Object.fromEntries(
      Object.entries(payload.item).filter(([_, value]) => value != null)
    );
    payload = { ...payload, item: filteredItem };
    setLoading(true);
    try {
      const response = await editBranchItem(payload);
      if (response.status) {
        notify("success", "شعبه با موفقیت ویرایش شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در ویرایش شعبه");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleEdit, loading, EditBranchForm, FormFiledItems };
}

export default useEditBranchItem;
