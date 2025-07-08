import { TimePicker } from "antd";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import jalaliday from "jalaliday";
import persianLocale from "@/utils/common-methods/persian-locale";
import { UseFormClearErrors } from "react-hook-form";

dayjs.extend(jalaliday);
// ✅ Reusable FormField Component
export interface TimeRangePickerProps {
  label: string;
  name: string;
  placeholder: string;
  setValue: any;
  control: any;
  errors: any;
  requierd?: boolean;
  clearErrors?: UseFormClearErrors<any>;
  loading: boolean;
  className?: string;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  label,
  name,
  placeholder,
  setValue,
  control,
  requierd = true,
  errors,
  clearErrors,
  loading,
  className,
}) => {
  const timeRange = control._getWatch(name); // Watch the value of the 'name' field
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);
  useEffect(() => {
    if (timeRange) {
      const [start, end] = timeRange.split(" تا ");
      setFrom(start ? dayjs(start, "HH:mm") : null);
      setTo(end ? dayjs(end, "HH:mm") : null);
    }
  }, []);

  const handleFromChange = (time: Dayjs | null) => {
    setFrom(time);
    const value = `${time?.format("HH:mm")} تا ${to?.format("HH:mm")}`;
    setValue(name, value);
  };

  const handleToChange = (time: Dayjs | null) => {
    setTo(time);
    const value = `${from?.format("HH:mm")} تا ${time?.format("HH:mm")}`;
    setValue(name, value);
  };

  const checkFileds = useCallback(() => {
    if (from && to) {
      control._updateValid(true);
    } else {
      clearErrors(name);
    }
  }, [from, to]);

  useEffect(() => checkFileds(), [checkFileds]);
  return (
    <div
      className={
        className ? className : "col-span-1 relative w-full flex flex-col pb-4"
      }
    >
      <label className="text-secondary1 mb-1">
        {label}
        {requierd && <span className="text-Alert">*</span>}
      </label>

      <div className="flex gap-2  items-center">
        {/* Start Time Field */}
        <div className="flex flex-col w-1/2">
          <TimePicker
            format="HH:mm"
            value={from}
            onChange={handleFromChange} // Updates state immediately
            onPanelChange={handleFromChange} // Also triggers on panel change
            locale={persianLocale}
            disabled={loading}
            popupClassName="!font-Medium"
            className={clsx(
              errors[name]?.message && "!border-Alert",
              "!font-Medium placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
            )}
            placeholder={placeholder}
          />
        </div>
        <span> الی</span>
        {/* End Time Field */}
        <div className="flex flex-col w-1/2">
          <TimePicker
            format="HH:mm"
            value={to}
            onChange={handleToChange}
            onPanelChange={handleToChange} // Also triggers on panel change
            disabled={loading}
            popupClassName="!font-Medium"
            className={clsx(
              errors[name]?.message && "!border-Alert",
              "!font-Medium placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
            )}
            mode="time"
            locale={persianLocale}
            placeholder={placeholder}
          />
        </div>
      </div>

      {errors[name] && (
        <span className="text-red-500 text-xs absolute translate-x-4 opacity-0 right-0 bottom-0 animate-fadeRight">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default TimeRangePicker;
