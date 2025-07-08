import { useNotify } from "@/components/shared-components/notife/notife";
import useCompanyList from "@/hooks/branch-management-hooks/useCompanyList";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { createBranchItem } from "@/utils/digitalmenu-api/branchesService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
export interface IFormFiledProps {
  name: string;
  isRequierd: boolean;
  type?: string;
  length?: number;
}
function useAddNewBranch(realodMethod?: () => void) {
  const FormFiledItems: Partial<Record<keyof IBranchItem, IFormFiledProps>> = {
    name: {
      name: "نام شعبه",
      isRequierd: true,
    },
    en_name: {
      name: "نام انگلیسی شعبه",
      isRequierd: false,
    },
    contact_phone: {
      name: "تلفن",
      isRequierd: true,
      type: "number",
      length: 11,
    },
    location: {
      name: "آدرس",
      isRequierd: true,
    },
    operating_hours: {
      name: "ساعات کاری",
      isRequierd: true,
    },
    email: {
      name: "لینک",
      isRequierd: true,
    },
  };
  const { CompanyList } = useCompanyList();

  const AddBranchForm = useForm<IBranchItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      status: 1,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  async function onSubmit(data: IBranchItem) {
    setLoading(true);
    try {
      const response = await createBranchItem({
        company_id: CompanyList[0].company_id,
        item: data,
      });
      if (response.data && response.data.status == "success") {
        notify("success", "شعبه با موفقیت ایجاد شد");
        realodMethod?.();
      } else {
        notify("error", "خطا در ایجاد شعبه");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { onSubmit, AddBranchForm, loading, FormFiledItems };
}

export default useAddNewBranch;
