import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MenuProps } from "antd";
import { ICreateLevelPayload } from "@/types/club-types/club-levels-type";
import { TempFormData } from "@/components/club-managment-components/club-create-modals/club-crete-level/club-crete-level-modal-container";

export interface NewLevelFormValues {
  Title?: string;
  Description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UnachievedImage?: any;
  RankingId?: number;
  RequiredPoints?: string;
  PrimaryColor?: string;
  SecondaryColor?: string;
}

// ✅ Validation Schema
export const validationSchema = yup.object().shape({
  Title: yup.string().required("عنوان الزامی است"),
  Description: yup.string().required("توضیحات الزامی است"),
  Image: yup.mixed().required("تصویر الزامی است"),
  UnachievedImage: yup.mixed().required("تصویر دستیابی نشده الزامی است"),
  RankingId: yup.number().required("شناسه رتبه الزامی است"),
  RequiredPoints: yup.string().required("امتیاز مورد نیاز الزامی است"),
  PrimaryColor: yup.string().optional(),
  SecondaryColor: yup.string().optional(),
});

export const useCreateClubLevel = (
  setTempFormData: Dispatch<SetStateAction<TempFormData>>
) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<NewLevelFormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  const [selectedRank, setSelectedRank] = useState<number | undefined>();

  // ✅ Handle Image Upload
  const handleImageChange = (
    base64: string,
    baseBlob: Blob,
    file: File,
    isUnachieved: boolean
  ) => {
    const formFile = new File([baseBlob], file.name, { type: file.type });
    setValue(isUnachieved ? "UnachievedImage" : "Image", formFile);
    clearErrors(isUnachieved ? "UnachievedImage" : "Image");
  };

  // ✅ Handle Menu Selection
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedRank(Number(e.key));
    setValue("RankingId", Number(e.key));
    clearErrors("RankingId");
  };

  // ✅ Submit Form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setTempFormData(data as unknown as ICreateLevelPayload);
  };

  return {
    handleSubmit,
    control,
    setValue,
    errors,
    selectedRank,
    setSelectedRank,
    handleImageChange,
    handleMenuClick,
    onSubmit,
  };
};
