import { IconsProps } from "./icons-props-type";
const ImageIcon: React.FC<IconsProps> = ({ color, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="65.5"
        cy="21.5"
        r="7.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M11.6976 66H55.3024C58.5414 66 60.4373 62.3515 58.5757 59.7009L36.7733 28.6602C35.1803 26.3923 31.8197 26.3923 30.2267 28.6602L8.42435 59.7009C6.56267 62.3514 8.45861 66 11.6976 66Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M34 66H68.8279C71.9602 66 73.8771 62.5629 72.2311 59.898L58.4032 37.5099C56.8401 34.9792 53.1599 34.9792 51.5968 37.5099L48.1094 43.1562"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ImageIcon;
