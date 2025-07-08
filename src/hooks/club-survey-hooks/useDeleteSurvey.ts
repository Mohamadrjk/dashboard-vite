import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onDeleteSurveyWithId } from "@/utils/club-api/club-survey-service";
import { useNotify } from "@/components/shared-components/notife/notife";

export const useDeleteSurvey = () => {
  const queryClient = useQueryClient(); // 🔄 Used for cache updates
  const { notify } = useNotify();

  return useMutation({
    mutationFn: (surveyId: number) => onDeleteSurveyWithId({ surveyId }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["ClubSurveysManagementPage"],
      }); // ✅ Correctly invalidating cache
      notify(
        "success",
        data.resultMessage || "درخواست حذف نظرسنجی با خطا مواجه شد"
      );
    },

    onError: (error) => {
      notify("error", error.message || "درخواست حذف نظرسنجی با خطا مواجه شد");
    },
  });
};
