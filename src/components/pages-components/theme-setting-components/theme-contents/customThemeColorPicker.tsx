import { Icon } from "@iconify/react/dist/iconify.js";
import { ColorPicker, ColorPickerProps, GetProp } from "antd";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
type Format = GetProp<ColorPickerProps, "format">;
interface HexCaseProps {
  title: string;
  control: Control<any, any>;
  lable: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const CustomThemeColorPicker: React.FC<HexCaseProps> = ({
  title,
  control,
  disabled,
  lable,
}) => {
  const [formatHex, setFormatHex] = useState<Format | undefined>("hex");

  return (
    <div className="col-span-1 h-full relative w-full flex flex-col">
      <span className="text-secondary1 mb-1">{title}</span>
      <div className="w-full h-full flex items-center justify-between py-1 px-2 gap-2 border border-[#d9d9d9] rounded-[6px] hover:border-[#1677ff]">
        <Controller
          name={lable}
          control={control}
          disabled={disabled || false}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <ColorPicker
                {...field}
                disabled={disabled || false}
                format={formatHex}
                onChange={(e) => {
                  field.onChange(e.toHexString());
                }}
                onFormatChange={setFormatHex}
                size="small"
              />
              <span>{field.value}</span>
            </div>
          )}
        />


      </div>
    </div>
  );
};

export default CustomThemeColorPicker;
