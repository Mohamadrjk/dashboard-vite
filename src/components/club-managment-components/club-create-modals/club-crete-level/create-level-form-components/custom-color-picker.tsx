import { NewLevelFormValues } from "@/hooks/levels-hooks/useCreateNewLevel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColorPicker, ColorPickerProps, GetProp } from "antd";
import { useMemo, useState } from "react";
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
  lable: keyof NewLevelFormValues;
  className?: string;
  defaultValue?: string;
}

const CustomColorPicker: React.FC<HexCaseProps> = ({
  title,
  setValue,
  lable,
  className,
  defaultValue,
}) => {
  const [colorHex, setColorHex] = useState<Color>(
    defaultValue ? defaultValue : "#1677ff"
  );
  const [formatHex, setFormatHex] = useState<Format | undefined>("hex");

  const hexString = useMemo<string>(
    () => (typeof colorHex === "string" ? colorHex : colorHex?.toHexString()),
    [colorHex]
  );

  return (
    <div className="col-span-1 h-full relative w-full flex flex-col">
      <span className="text-secondary1 mb-1">{title}</span>
      <div className="w-full h-full flex items-center justify-between py-1 px-2 gap-2 border border-[#d9d9d9] rounded-[6px] hover:border-[#1677ff]">
        <div className="flex items-center gap-4">
          <ColorPicker
            format={formatHex}
            value={colorHex}
            onChange={(e) => {
              setColorHex(e);
              setValue(lable, hexString);
            }}
            onFormatChange={setFormatHex}
            size="small"
          />
          <span>{hexString}</span>
        </div>
        <span className="text-cta">
          <Icon icon="fluent:eyedropper-20-regular" width="20" height="20" />
        </span>
      </div>
    </div>
  );
};

export default CustomColorPicker;
