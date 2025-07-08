import { IconsProps } from "./icons-props-type";

export const ExchangeRangeIcon: React.FC<IconsProps> = ({
  color,
  height,
  width,
  strokeWidth,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 161 167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M81 153L10.6797 65.0996C10.3472 64.684 10.1809 64.4762 10.1363 64.2257C10.0916 63.9752 10.1757 63.7228 10.3441 63.2178L26.8383 13.7351C27.2783 12.4151 27.4983 11.755 28.0221 11.3775C28.5459 11 29.2416 11 30.633 11H131.367C132.758 11 133.454 11 133.978 11.3775C134.502 11.755 134.722 12.4151 135.162 13.7351L151.656 63.2178C151.824 63.7228 151.908 63.9752 151.864 64.2257C151.819 64.4762 151.653 64.684 151.32 65.0996L81 153ZM81 153L112.062 55.375M81 153L49.9375 55.375M147.562 64.25L112.062 55.375M112.062 55.375L98.75 19.875M112.062 55.375H49.9375M63.25 19.875L49.9375 55.375M49.9375 55.375L14.4375 64.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
