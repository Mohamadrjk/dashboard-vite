import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

type CustomChartTooltipProps = {
  title: {
    title: string;
    value: string;
  };
  value: {
    title: string;
    value: string;
    unit: string;
  };
  description: {
    title: string;
    value: string;
    unit: string;
  };
};

const GenerateCustomChartTooltip = ({
  title,
  value,
  description,
}: CustomChartTooltipProps) => {
  return `
      <div style="background: rgba(0, 21, 41, 0.8);color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px;font-family:'Medium';direction:rtl">
        <p style="margin: 0;">
          <span>${title.title} :</span> ${title.value}
        </p>
        <p style="margin: 0;">
          <span>${value.title} :</span>
          <span>${value.value} ${value.unit}</span>
        </p>
        <p style="margin: 0;">
        <span>${description.title} :</span>
          <span>${description.value} ${description.unit}</span>
        </p>
      </div>
    `;
};

export default GenerateCustomChartTooltip;
