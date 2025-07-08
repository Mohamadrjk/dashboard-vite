import React, { Dispatch, SetStateAction, useState } from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import persianLocale from "@/utils/common-methods/persian-locale";
import locale from "antd/es/locale/fa_IR";

dayjs.extend(jalaliday);
const { RangePicker } = DatePicker;

interface PersianRangePickerProps {
  setDate: Dispatch<SetStateAction<string[]>>;
}

const PersianRangePicker: React.FC<PersianRangePickerProps> = ({ setDate }) => {
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(() => [
    dayjs().subtract(7, "day").calendar("jalali"), // 7 days ago
    dayjs().calendar("jalali"), // Today
  ]);

  const handleDateChange = (values: [dayjs.Dayjs, dayjs.Dayjs] | null) => {
    if (values) {
      // Store in Jalali for display
      setDates([values[0].calendar("jalali"), values[1].calendar("jalali")]);

      // Convert to Gregorian for output
      const gregorianFormat = values.map((date) =>
        date.calendar("gregory").format("YYYY-MM-DD")
      );
      setDate(gregorianFormat);
      console.log("Gregorian Output:", gregorianFormat);
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <RangePicker
        value={dates}
        onChange={handleDateChange}
        locale={persianLocale}
        format={(value) => dayjs(value).calendar("jalali").format("YYYY/MM/DD")}
        placeholder={["تاریخ شروع", "تاریخ پایان"]}
        className="!font-Regular"
        dropdownClassName="!font-Regular"
      />
    </ConfigProvider>
  );
};

export default PersianRangePicker;
