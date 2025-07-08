import DraggableIcon from "@/components/shared-components/custom-icons/drag-icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SortableItem({
  id,
  description,
  index,
  onDeleteBenefitItem,
}: {
  id: string;
  description: string;
  index: number;
  onDeleteBenefitItem: (idToDelete: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full flex items-center p-3 border-b border-gray-300"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <span className="w-6 font-Regular ">{index + 1}</span>
      <span className="grow font-Medium text-base overflow-hidden line-clamp-2">
        {description}
      </span>
      <div className="w-[124px] flex items-center gap-2">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }} // ✅ Prevents drag from triggering
          onClick={() => console.log("Action 2")}
          className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-2"
        >
          <Icon
            icon="mage:edit"
            width="24"
            height="24"
            style={{ color: "var(--cta)" }}
          />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }} // ✅ Prevents unwanted drag trigger
          onMouseUp={() => {
            onDeleteBenefitItem(id);
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteBenefitItem(id);
          }}
          className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-2 z-[2]"
        >
          <Icon
            icon="lets-icons:trash-light"
            width="28"
            height="28"
            style={{ color: "var(--Alert)" }}
          />
        </button>
        <span>
          <DraggableIcon width="24" height="24" color="#000" />
        </span>
      </div>
    </li>
  );
}
