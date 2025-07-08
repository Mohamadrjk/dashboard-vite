import { Dispatch, SetStateAction, useState } from "react";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Questions } from "@/components/club-managment-components/club-surveys-components/survey-modals/create-survey-modal/create-survey-questions-components/survey-questions-list";

export function useSortingSurveyQuestionsList(
  initialItems: Questions[],
  setQuestions: Dispatch<SetStateAction<Questions[]>>
) {
  const [items, setItems] = useState(initialItems);

  // Sensors for better drag interaction
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Handle drag end event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    console.log(arrayMove(items, oldIndex, newIndex));
    setItems(arrayMove(items, oldIndex, newIndex)); // Update list order
    setQuestions(arrayMove(items, oldIndex, newIndex));
  };

  return { items, handleDragEnd, sensors, setItems };
}
