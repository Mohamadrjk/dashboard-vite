import { Tooltip } from "antd";
import clsx from "clsx";

type PieChartRightSideListProps = {
  products: { product_name: string }[];
  chartColors: string[];
  listItemClassName?: string;
  wrapperClassName?: string;
};

const PieChartRightSideList = ({
  products,
  chartColors,
  listItemClassName,
  wrapperClassName,
}: PieChartRightSideListProps) => {
  return (
    <ul
      dir="rtl"
      className={clsx(
        "w-max flex flex-col justify-center gap-2 h-full overflow-y-auto max-h-[250px]",
        wrapperClassName
      )}
    >
      {products.map((product, index) => (
        <Tooltip
          key={index}
          title={
            <span dir="rtl" className="line-clamp-2 w-full !font-Regular">
              {product.product_name}
            </span>
          }
        >
          <li
            className={`flex items-center gap-2 font-Regular ${listItemClassName}`}
          >
            <span
              style={{
                backgroundColor: chartColors[index % chartColors.length],
              }}
              className="block size-4"
            ></span>
            <span className="max-w-[190px] overflow-hidden text-ellipsis whitespace-nowrap name-item">
              {product.product_name}
            </span>
          </li>
        </Tooltip>
      ))}
    </ul>
  );
};

export default PieChartRightSideList;
