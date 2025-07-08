import { Questions } from "@/components/club-managment-components/club-surveys-components/survey-modals/create-survey-modal/create-survey-questions-components/survey-questions-list";
import { SurveyFormModel } from "@/components/club-managment-components/club-surveys-components/survey-modals/create-survey-modal/survey-form-components/survey-form-container";

import { useNotify } from "@/components/shared-components/notife/notife";
import { GenerateSurvey } from "@/utils/club-api/club-survey-service";
import { useEffect, useState } from "react";

const useNewSurvey = (handleCloseModal: () => void) => {
  const [tempFormData, setTempFormData] = useState<SurveyFormModel | undefined>(
    undefined
  );
  const [loadingAddLevel, setLoadingAddSurvey] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");
  const { notify } = useNotify();
  const handleCancel = () => {
    handleCloseModal();
  };
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const handleAddLevel = async (details: Questions[]) => {
    setLoadingAddSurvey(true);

    try {
      const formData = new FormData();

      // Add text fields
      formData.append("Title", tempFormData.Title || "");
      formData.append("Description", tempFormData.Description || "");
      formData.append("GratitudeTitle", tempFormData.GratitudeTitle || "");
      formData.append(
        "GratitudeDescription",
        tempFormData.GratitudeDescription || ""
      );
      formData.append(
        "SurveyPointGroupId",
        String(tempFormData.SurveyPointGroupId || 1)
      );
      // Add multiple DetailImages

      // Add DetailTitles (must match how the API expects it)
      details.forEach((item) => {
        formData.append("DetailTitles", item.title || ""); // ✅ Multiple entries for array
      });
      if (tempFormData.Image instanceof File) {
        formData.append("Image", tempFormData.Image);
      } else {
        console.warn("⚠️ Image is not a File:", tempFormData.Image);
      }

      details.forEach((item) => {
        if (item.imageUrl instanceof File) {
          formData.append("DetailImages", item.imageUrl);
        } else {
          console.warn("⚠️ Skipping non-file:", item.imageUrl);
        }
      });
      const response = await GenerateSurvey(formData);
      if (response.status) {
        notify("success", response.resultMessage || "نظرسنجی با موفقیت ثبت شد");
        handleCloseModal();
      } else {
        notify("error", response.resultMessage || "نظرسنجی با خطا مواجه شد");
      }
    } catch (error) {
      notify("error", `${error}` || "نظرسنجی با خطا مواجه شد");
    } finally {
      setLoadingAddSurvey(false);
    }
  };

  useEffect(() => {
    if (!tempFormData) {
      setActiveTab("1");
    }
  }, [tempFormData]);

  return {
    tempFormData,
    setTempFormData,
    loadingAddLevel,
    activeTab,
    handleCancel,
    onChange,
    handleAddLevel,
    setActiveTab,
  };
};

export default useNewSurvey;
