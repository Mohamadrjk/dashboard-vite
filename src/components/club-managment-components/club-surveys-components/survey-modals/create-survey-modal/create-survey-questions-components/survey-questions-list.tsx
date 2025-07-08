import DraggableIcon from "@/components/shared/custom-icons/drag-icon";
import { useSortableList } from "@/hooks/club-survey-hooks/useSortableList";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Icon } from "@iconify/react/dist/iconify.js";
import SortableItem from "./survey-questions-item";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"; // ✅ Import modifier
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSortingSurveyQuestionsList } from "@/hooks/club-survey-hooks/useSortingSurveyQuestions";

export interface Questions {
  id: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageUrl: any;
}

interface SurveyQuestionsListProps {
  questions: Questions[];
  onDeleteBenefitItem: (idToDelete: string) => void;
  setQuestions: Dispatch<SetStateAction<Questions[]>>;
  addImageToList: (id: number, img: File) => void;
  deleteImageFromList: (id: number) => void;
}

const SurveyQuestionsList: React.FC<SurveyQuestionsListProps> = ({
  questions,
  onDeleteBenefitItem,
  setQuestions,
  addImageToList,
  deleteImageFromList,
}) => {
  const { items, setItems, handleDragEnd, sensors } =
    useSortingSurveyQuestionsList(questions, setQuestions);

  // ✅ Update items when benefits change (adding/deleting)
  useEffect(() => {
    setItems(questions);
    console.log(questions);
  }, [questions, setItems]);
  return (
    <div className="max-h-[380px] overflow-y-auto py-2 custome-scrool-bar-small">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]} // ✅ Restrict movement to Y-axis
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="w-full flex flex-col gap-2 h-full">
            {items.map((item, index) => {
              return (
                <SortableItem
                  key={index}
                  index={index}
                  id={item.id}
                  description={item.title}
                  onDeleteBenefitItem={onDeleteBenefitItem}
                  addImageToList={addImageToList}
                  image={item.imageUrl}
                  deleteImageFromList={deleteImageFromList}
                />
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SurveyQuestionsList;
