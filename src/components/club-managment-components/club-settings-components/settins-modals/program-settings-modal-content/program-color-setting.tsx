import { ColorPickerIcon } from "@/components/shared/custom-icons/color-picker-icon";
import { useUpdateClubSettings } from "@/hooks/club-settings-hooks/useClubSetting";
import useClickOutside from "@/hooks/common-hooks/useClickOutside";
import { IClubSettingSlice } from "@/redux/clubSetting/clubSettingSlice";
import { RootState } from "@/redux/store";
import { Button, ColorPicker, ColorPickerProps, GetProp } from "antd";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  string | { cleared: any }
>;
type Format = GetProp<ColorPickerProps, "format">;

interface HexCaseProps {
  className?: string;
  defaultValue?: string;
  onEditMethod: () => void;
}

const CompanyColorSetting: React.FC<HexCaseProps> = ({
  defaultValue = "#1677ff",
  onEditMethod,
}) => {
  const [success, setsuccess] = useState<boolean | undefined>(undefined);
  const { settings } = useSelector<RootState, IClubSettingSlice>(
    (state) => state.clubSettingSlice
  );
  const { mutate: update, isPending: isUpdating } = useUpdateClubSettings();

  const ref = useRef<HTMLDivElement>(null);
  const [colorHex, setColorHex] = useState<Color>(
    settings.primaryColor ?? defaultValue
  );
  const [formatHex, setFormatHex] = useState<Format>("hex");
  const [open, setOpen] = useState(false);

  // Optimized color change handler
  const handleColorChange = useCallback(
    (color: Color) => {
      const hexString =
        typeof color === "string" ? color : color?.toHexString();
      setColorHex(color);
    },
    [onEditMethod]
  );

  // Close color picker when clicking outside
  useClickOutside(ref, () => setOpen(false));

  // Toggle ColorPicker visibility
  const toggleColorPicker = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  const handleUpdatePrimaryColors = () => {
    update(
      {
        ...settings,
        primaryColor:
          typeof colorHex === "string" ? colorHex : colorHex?.toHexString(),
      },
      {
        onSuccess: () => {
          setsuccess(true);
          onEditMethod();
        },
      }
    ); // 🔥 Re-fetch after creation
  };
  return (
    <div className="w-full h-max flex flex-col font-Regular text-lg gap-2">
      <h4 className="px-3">تعریف رنگ</h4>
      <div
        ref={ref}
        className="bg-Highlighter rounded-[10px] p-3 gap-5 flex !flex-wrap items-center"
      >
        <p className="w-max whitespace-nowrap dxl:w-3/5">
          لطفا رنگ سازمانی خود را انتخاب کنید
        </p>
        <div className="w-full h-full flex items-center  justify-between p-1 relative border border-gray-200 rounded-[10px]">
          <div className="flex items-center gap-2">
            <ColorPicker
              format={formatHex}
              value={colorHex}
              onChange={handleColorChange}
              onFormatChange={setFormatHex}
              size="small"
              open={open}
              onOpenChange={setOpen}
              disabled={isUpdating}
            />
            <span
              style={{
                color:
                  typeof colorHex === "string"
                    ? colorHex
                    : colorHex?.toHexString(),
              }}
            >
              {typeof colorHex === "string"
                ? colorHex
                : colorHex?.toHexString()}
            </span>
          </div>
          <button
            onClick={toggleColorPicker}
            disabled={isUpdating}
            className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-[5px]"
            aria-label="Pick a color"
          >
            <ColorPickerIcon width="20" height="20" color="var(--cta)" />
          </button>
        </div>
        <div>
          <Button
            onClick={handleUpdatePrimaryColors}
            className={clsx("!font-Medium")}
            type="primary"
            iconPosition="start"
            loading={isUpdating}
          >
            ثبت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyColorSetting;
