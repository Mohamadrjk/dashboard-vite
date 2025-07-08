import DraggableIcon from "@/components/shared-components/custom-icons/drag-icon";
import DashboardImageUploader, {
  getBase64,
} from "@/components/shared/image-uploader";
import { DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { Image } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ListItemImageSec from "./list-image-section";
import clsx from "clsx";

interface SortableItemProps {
  id: string;
  description: string;
  index: number;
  onDeleteBenefitItem: (idToDelete: string) => void;
  addImageToList: (id: number, img: File) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  deleteImageFromList: (id: number) => void;
}

export default function SortableItem({
  id,
  description,
  index,
  onDeleteBenefitItem,
  addImageToList,
  deleteImageFromList,
  image,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const handleImageChange = (base64: string, baseBlob: Blob, file: File) => {
    addImageToList(
      Number(id),
      new File([baseBlob], file.name, { type: file.type })
    );
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div
        className={clsx(
          " flex flex-col p-2 items-center rounded-md overflow-hidden border-2 border-gray-300 hover:border-cta transition-all duration-500 bg-white relative ",
          isDragging && "cursor-grabbing"
        )}
      >
        {isDragging && (
          <div className="bg-[rgb(0,0,0,0.5)] w-full h-full absolute top-0 right-0"></div>
        )}
        <div className="w-full flex items-center">
          <span className="w-6 font-Regular">{index + 1}</span>
          <span className="grow font-Medium text-base overflow-hidden line-clamp-2">
            {description}
          </span>
          <div className="w-[124px] flex items-center gap-2">
            <IconButton
              icon="mage:edit"
              onClick={() => console.log("Edit action")}
            />
            <IconButton
              icon="lets-icons:trash-light"
              onClick={() => onDeleteBenefitItem(id)}
              color="var(--Alert)"
            />
            <DraggableIcon width="24" height="24" color="#000" />
          </div>
        </div>
        <ListItemImageSec
          uploadedFile={image}
          handleDeleteImage={() => deleteImageFromList(+id)}
          handleImageChange={handleImageChange}
        />
      </div>
    </li>
  );
}

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, color }) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }} // ✅ Prevents unwanted drag trigger
    onMouseUp={() => {
      onClick();
    }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-2"
  >
    <Icon
      icon={icon}
      width={24}
      height={24}
      style={{ color: color || "var(--cta)" }}
    />
  </button>
);
