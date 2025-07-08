import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "@/components/shared-components/notife/notife";
import {
  IBannerPayload,
  IBannerResultList,
  IUpdateBanner,
} from "@/types/club-types/club-setting-type";
import {
  addCompanyClubBanner,
  deleteCompanyClubBanners,
  updateCompanyClubBanners,
} from "@/utils/club-api/club-setting-service";
import { IBannerList } from "@/components/club-managment-components/club-settings-components/settins-modals/program-settings-modal-content/program-banner-selecting/banner-selecting-container";

const useUpdateClubBanner = () => {
  const queryClient = useQueryClient(); // 🔄 Used for cache updates
  const { notify } = useNotify();

  return useMutation({
    mutationFn: (payload: { data: any; id: number }) =>
      updateCompanyClubBanners(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["updateClubBanner"],
      }); // ✅ Correctly invalidating cache
      notify(
        "success",
        data.resultMessage || "درخواست بروزرسانی بنر با موفقیت ثبت شد"
      );
    },

    onError: (error) => {
      notify("error", error.message || "درخواست بروزرسانی بنر با خطا مواجه شد");
    },
  });
};

const useAddClubBanner = () => {
  const queryClient = useQueryClient(); // 🔄 Used for cache updates
  const { notify } = useNotify();

  return useMutation({
    mutationFn: (payload: { data: any }) => addCompanyClubBanner(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["updateClubBanner"],
      }); // ✅ Correctly invalidating cache
      notify(
        "success",
        data.resultMessage || "درخواست بروزرسانی بنر با موفقیت ثبت شد"
      );
    },

    onError: (error) => {
      notify("error", error.message || "درخواست بروزرسانی بنر با خطا مواجه شد");
    },
  });
};

const useDeleteClubBanner = () => {
  const queryClient = useQueryClient(); // 🔄 Used for cache updates
  const { notify } = useNotify();

  return useMutation({
    mutationFn: (bannerId: number) =>
      deleteCompanyClubBanners({
        bannerId,
      }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["updateClubBanner"],
      }); // ✅ Correctly invalidating cache
      notify(
        "success",
        data.resultMessage || "درخواست حذف بنر با موفقیت ثبت شد"
      );
    },

    onError: (error) => {
      notify("error", error.message || "درخواست حذف بنر با خطا مواجه شد");
    },
  });
};

const useUpdateClubBanners = (defaultBanner: IBannerList) => {
  const [image, setImage] = useState<
    { uploadedFile?: File; uploadedImage: string } | undefined
  >(
    defaultBanner.mobileImageUrl
      ? {
          uploadedImage: `https://hubapi.loyaltyhub.ir${defaultBanner.mobileImageUrl}`,
        }
      : undefined
  );
  const { notify } = useNotify();

  const [banner, setBanner] = useState<IBannerList>(defaultBanner);
  const { mutate: add, isPending: isAdding } = useAddClubBanner();
  const { mutate: update, isPending: isUpdating } = useUpdateClubBanner();
  const { mutate: remove, isPending: isDeleting } = useDeleteClubBanner();

  const handleImageChange = (base64: string, baseBlob: Blob, file: File) => {
    setImage({
      uploadedFile: new File([baseBlob], file.name, { type: file.type }),
      uploadedImage: base64,
    });
  };

  const handleUpdateBanner = (payload: IBannerResultList) => {
    image?.uploadedFile
      ? updateWithMedia(payload)
      : update({
          data: payload,
          id: payload.id,
        });
  };

  const updateWithMedia = (payload: IBannerResultList) => {
    const newPayload: IUpdateBanner = {
      ...payload,
      siteImageUrl: image?.uploadedImage,
      mobileImageUrl: image?.uploadedImage,
    };

    const formData = new FormData();
    Object.entries(newPayload).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    update({
      data: newPayload,
      id: payload.id,
    });
  };

  const handleAddBanner = (payload: IBannerPayload) => {
    if (image) {
      const newPayload: IBannerPayload = {
        ...payload,
        MobileImageFile: image?.uploadedFile,
        SiteImageFile: image?.uploadedFile,
      };

      const formData = new FormData();
      Object.entries(newPayload).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      add({
        data: newPayload,
      });
    } else {
      notify("warning", "لطفا تصویری برای بنر خود اتخاب کنید");
    }
  };

  const handleDeleteBanner = (id: number, updateList: (id: number) => void) => {
    remove(id, {
      onSuccess: () => {
        updateList(id);
      },
    });
  };

  return {
    image,
    setImage,
    handleImageChange,
    banner,
    setBanner,
    handleUpdateBanner,
    handleDeleteBanner,
    isUpdating,
    isDeleting,
    handleAddBanner,
    isAdding,
  };
};

export default useUpdateClubBanners;
