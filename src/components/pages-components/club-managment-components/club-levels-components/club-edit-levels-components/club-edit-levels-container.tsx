import {
  IClubStatusNew,
  IUpdateLevelPayload,
} from "@/types/club-types/club-levels-type";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import style from "./club-edit-levels-container.module.css";
import { LevelOneRowInfo, LevelEditImageRow } from "./club-edit-first-section";
import { useForm } from "react-hook-form";
import { NewLevelFormValues } from "@/hooks/levels-hooks/useCreateNewLevel";
import { yupResolver } from "@hookform/resolvers/yup";
import EditColorRowContainer from "./club-edit-color-row";
import { useNotify } from "@/components/shared-components/notife/notife";
import { onUpdateLevel } from "@/api/club-api/club-ranking-service";
import * as yup from "yup";
// ✅ Validation Schema
const validationSchema = yup.object().shape({
  Title: yup.string().optional(),
  Description: yup.string().optional(),
  Image: yup.mixed().optional(),
  UnachievedImage: yup.mixed().optional(),
  RankingId: yup.number().optional(),
  RequiredPoints: yup.string().optional(),
  PrimaryColor: yup.string().optional(),
  SecondaryColor: yup.string().optional(),
});

interface ClubEditLevelsContainerProps {
  handleCloseModal: () => void;
  open: boolean;
  level: IClubStatusNew;
  title: string;
  handleGetClubLevelsByRankId: () => Promise<void>;
}

const ClubEditLevelsContainer: React.FC<ClubEditLevelsContainerProps> = ({
  level,
  open,
  handleCloseModal,
  title,
  handleGetClubLevelsByRankId,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
    watch,
  } = useForm<NewLevelFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      Description: level.description,
      Image: undefined,
      PrimaryColor: level.primaryColor,
      RankingId: level.rankingId,
      RequiredPoints: level.requiredPoints.toString(),
      SecondaryColor: level.secondaryColor,
      Title: level.title,
      UnachievedImage: undefined,
    },
    mode: "onBlur",
  });

  const [loadingUpdateLevel, setLoadingUpdateLevel] = useState<boolean>(false);
  const { notify } = useNotify();
  const handleCancel = () => {
    handleCloseModal();
    reset();
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const payload: IUpdateLevelPayload = data;
    setLoadingUpdateLevel(true);
    try {
      const response = await onUpdateLevel(payload, level.id);
      if (response.status) {
        notify("success", response.statusMessage || "درخواست با موفقیت ثبت شد");
        handleGetClubLevelsByRankId();
        handleCloseModal();
      } else {
        notify(
          "error",
          response.statusMessage || "در ثبت درخواست خطایی رخ داده است"
        );
      }
    } catch (error) {
      notify("error", "در ثبت درخواست خطایی رخ داده است");
    } finally {
      setLoadingUpdateLevel(false);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (open) {
        handleCancel(); // Close the modal
        event.preventDefault(); // Prevent the default back behavior
        window.history.pushState(null, ""); // Push state to avoid exiting the page
      }
    };

    if (open) {
      window.history.pushState(null, ""); // Push a new state to the history stack
      window.addEventListener("popstate", handlePopState); // Listen for the back button
    }

    return () => {
      window.removeEventListener("popstate", handlePopState); // Cleanup the event listener
    };
  }, [open]);

  return (
    <Modal
      open={!!open}
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">{title}</span>
          <CloseCircleOutlined
            className="!text-Alert !text-[20px]"
            role="button"
            onClick={() => {
              handleCloseModal();
            }}
          />
        </div>
      }
      onCancel={handleCancel}
      style={{
        direction: "rtl",
        width: "95% !important",
        maxWidth: "450px",
        height: "95dvh",
      }}
      className={clsx(style["edit-level-container"])}
      classNames={{
        header: "w-full text-center font-Medium !bg-transparent !py-1 !m-0",
        content: "!w-1/2 max-w-full !p-2 !bg-BG !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex flex-col gap-[10px] bg-Highlighter rounded-[10px] p-[10px] ">
          <div className="w-full border-x border-t overflow-hidden border-Highlighter-Faded rounded-[10px]">
            <LevelOneRowInfo
              items={[
                {
                  title: "عنوان",
                  value: getValues("Title"),
                  label: "Title",
                },
                {
                  title: "امتیاز دستیابی",
                  value: getValues("RequiredPoints"),
                  label: "RequiredPoints",
                },
              ]}
              errors={errors}
              watch={watch}
              control={control}
              setValue={setValue}
              onEditMethod={function (): void {
                console.log("miad");
              }}
            />

            <LevelOneRowInfo
              items={[
                {
                  title: "شرح",
                  value: getValues("Description"),
                  label: "Description",
                },
              ]}
              onEditMethod={function (): void {
                console.log("miad");
              }}
              watch={watch}
              errors={errors}
              control={control}
              setValue={setValue}
            />

            <EditColorRowContainer
              items={[
                {
                  title: "رنگ اولیه",
                  value: level.primaryColor,
                  label: "PrimaryColor",
                },
                {
                  title: "رنگ ثانویه",
                  value: level.secondaryColor,
                  label: "SecondaryColor",
                },
              ]}
              onEditMethod={function (): void {
                console.log("miad");
              }}
              setValue={setValue}
            />
          </div>
          <LevelEditImageRow
            imageUrls={[
              {
                title: "تصویر پیش نمایش سطح",
                url: "https://hubapi.loyaltyhub.ir" + level.imageUrl,
                label: "Image",
              },
              {
                title: "تصویر جزئیات سطح",
                url: "https://hubapi.loyaltyhub.ir" + level.unachievedImageUrl,
                label: "UnachievedImage",
              },
            ]}
            handleImageChange={handleImageChange}
            onEditMethod={function (): void {
              console.log("miad");
            }}
          />
          <div className="col-span-2 flex justify-end gap-4 items-center mt-3 bg-Highlighter sticky bottom-0">
            <button
              onClick={handleCancel}
              className="text-gray-900 !font-Medium"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="rounded-[6px] font-Medium shadow text-cta border border-gray-300 px-4 py-2 disabled:bg-gray-300"
              disabled={Object.keys(errors).length > 0}
            >
              ثبت تغییرات
              {loadingUpdateLevel && <LoadingOutlined />}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ClubEditLevelsContainer;
