import { IconsProps } from "./icons-props-type";
const DraggableIcon: React.FC<IconsProps> = ({ color, height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5.535H18M0 9H18M0 12.465H18" stroke={color} />
      <path d="M9.0006 0L11.9758 1.8H6.02539L9.0006 0Z" fill={color} />
      <path d="M8.99898 18L11.2304 16.2H6.76758L8.99898 18Z" fill={color} />
    </svg>
  );
};

export default DraggableIcon;
