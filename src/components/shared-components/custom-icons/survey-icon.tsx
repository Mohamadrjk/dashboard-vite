import { IconsProps } from "./icons-props-type";

export const SurveyIcon: React.FC<IconsProps> = ({
  color,
  height,
  width,
  strokeWidth,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className ?? ""}
      viewBox="0 0 145 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_468_569)">
        <g>
          <path
            d="M132 80V107.5C132 126.356 132 135.784 126.142 141.642C120.284 147.5 110.856 147.5 92 147.5H30.75C20.3947 147.5 12 139.105 12 128.75V128.75C12 118.395 20.3947 110 30.75 110H92C110.856 110 120.284 110 126.142 104.142C132 98.2843 132 88.8562 132 70V52.5C132 33.6438 132 24.2157 126.142 18.3579C120.284 12.5 110.856 12.5 92 12.5H52C33.1438 12.5 23.7157 12.5 17.8579 18.3579C12 24.2157 12 33.6438 12 52.5V128.75"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <path
            d="M49.5 65L57.4289 72.9289C61.3342 76.8342 67.6658 76.8342 71.5711 72.9289L94.5 50"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_468_569">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
