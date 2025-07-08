import { Dispatch, SetStateAction, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
interface Benefit {
  id: string;
  description: string;
}
export function useSortableList(
  initialItems: Benefit[],
  setBenefits: Dispatch<SetStateAction<Benefit[]>>
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

    setItems(arrayMove(items, oldIndex, newIndex)); // Update list order
    setBenefits(arrayMove(items, oldIndex, newIndex));
  };

  return { items, handleDragEnd, sensors, setItems };
}
