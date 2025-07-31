/* eslint-disable @typescript-eslint/no-explicit-any */
import { Questions } from "@/components/club-managment-components/club-surveys-components/survey-modals/create-survey-modal/create-survey-questions-components/survey-questions-list";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useSurveyQuestions = () => {
  const [questions, setQuestions] = useState<Questions[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({ mode: "onBlur" });

  // ✅ Add Benefit Item
  const onAddQuestion = ({
    title,
    imageUrl,
  }: {
    title: string;
    imageUrl?: any;
  }) => {
    setQuestions((prev) => {
      const nextId = String(prev.length + 1);
      return [{ id: nextId, title, imageUrl }, ...prev];
    });

    reset(); // ✅ Clear input field after adding
  };

  const addImageToList = (id: number, img: File) => {
    setQuestions((prev) =>
      prev.map((item) =>
        +item.id === id
          ? { ...item, imageUrl: img } // ✅ Correctly updating only the `imageUrl`
          : item
      )
    );
  };

  const deleteImageFromList = (id: number) => {
    setQuestions((prev) =>
      prev.map((item) =>
        +item.id === id
          ? { ...item, imageUrl: null } // ✅ Correctly setting `imageUrl` to null to delete the image
          : item
      )
    );
  };

  // ✅ Delete Benefit Item & Reorder IDs
  const onDeleteBenefitItem = (idToDelete: string) => {
    setQuestions((prev) =>
      prev
        .filter((item) => item.id !== idToDelete)
        .map((item, index) => ({ ...item, id: String(index + 1) }))
    );
  };

  return {
    handleSubmit,
    control,
    errors,
    onAddQuestion,
    addImageToList,
    deleteImageFromList,
    onDeleteBenefitItem,
    questions,
    setQuestions,
  };
};

export default useSurveyQuestions;
