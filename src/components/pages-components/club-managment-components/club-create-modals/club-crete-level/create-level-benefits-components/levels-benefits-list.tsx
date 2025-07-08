import DraggableIcon from "@/components/shared-components/custom-icons/drag-icon";
import { useSortableList } from "@/hooks/club-survey-hooks/useSortableList";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Icon } from "@iconify/react/dist/iconify.js";
import SortableItem from "./levels-benefit-item";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"; // ✅ Import modifier
import { Dispatch, SetStateAction, useEffect } from "react";

interface Benefit {
  id: string;
  description: string;
}

interface LevelsBenefitsListProps {
  benefits: {
    id: string;
    description: string;
  }[];
  onDeleteBenefitItem: (idToDelete: string) => void;
  setBenefits: Dispatch<SetStateAction<Benefit[]>>;
}

const LevelsBenefitsList: React.FC<LevelsBenefitsListProps> = ({
  benefits,
  onDeleteBenefitItem,
  setBenefits,
}) => {
  const { items, setItems, handleDragEnd, sensors } = useSortableList(
    benefits,
    setBenefits
  );

  // ✅ Update items when benefits change (adding/deleting)
  useEffect(() => {
    setItems(benefits);
  }, [benefits, setItems]);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]} // ✅ Restrict movement to Y-axis
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="w-full flex flex-col max-h-[320px] overflow-y-auto custome-scrool-bar-small  border-t border-gray-300">
          {items.map((item, index) => {
            return (
              <SortableItem
                key={index}
                index={index}
                id={item.id}
                description={item.description}
                onDeleteBenefitItem={onDeleteBenefitItem}
              />
            );
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default LevelsBenefitsList;
