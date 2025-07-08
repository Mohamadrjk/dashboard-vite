import { NewLevelFormValues } from "@/hooks/levels-hooks/useCreateNewLevel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColorPicker, ColorPickerProps, GetProp } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  string | { cleared: any }
>;
type Format = GetProp<ColorPickerProps, "format">;

interface HexCaseProps {
  title: string;
  setValue: UseFormSetValue<NewLevelFormValues>;
  label: keyof NewLevelFormValues;
  className?: string;
  defaultValue?: string;
  onEditMethod: () => void;
  index: number;
}

const EditColor: React.FC<HexCaseProps> = ({
  label,
  setValue,
  title,
  defaultValue = "#1677ff",
  onEditMethod,
  index,
}) => {
  const [colorHex, setColorHex] = useState<Color>(defaultValue);
  const [formatHex, setFormatHex] = useState<Format>("hex");
  const [open, setOpen] = useState<boolean>(false);

  const handleColorChange = (color: Color) => {
    const hexString = typeof color === "string" ? color : color?.toHexString();
    setColorHex(color);
    setValue(label, hexString);
  };

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col gap-2 p-2 relative",
        index > 0 && "border-r border-Highlighter-Faded"
      )}
    >
      <span className="text-gray-500 font-Regular">
        {title} <span className="text-Alert">*</span>
      </span>
      <div className="flex items-center gap-2">
        <ColorPicker
          format={formatHex}
          value={colorHex}
          onChange={handleColorChange}
          onFormatChange={setFormatHex}
          size="small"
          open={open} // ✅ Controls visibility
          onOpenChange={(e) => {
            if (!e) {
              return;
            }
            setOpen(!e);
          }} // ✅ Updates open state
        />
        <span>
          {typeof colorHex === "string" ? colorHex : colorHex?.toHexString()}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev); // ✅ Toggle visibility
        }}
        className="absolute left-1 top-1 hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-1"
      >
        <Icon
          icon="mage:edit"
          width="20"
          height="20"
          style={{ color: "var(--cta)" }}
        />
      </button>
    </div>
  );
};

interface LevelOneRowInfoProps {
  items: {
    title: string;
    value: string;
    label: keyof NewLevelFormValues;
  }[];
  onEditMethod: () => void;
  setValue: UseFormSetValue<NewLevelFormValues>;
}

const EditColorRowContainer: React.FC<LevelOneRowInfoProps> = ({
  items,
  onEditMethod,

  setValue,
}) => {
  return (
    <div className="w-full relative border-b border-Highlighter-Faded flex ">
      {items.map((item, index) => {
        return (
          <EditColor
            key={index}
            title={item.title}
            setValue={setValue}
            label={item.label}
            onEditMethod={onEditMethod}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default EditColorRowContainer;
