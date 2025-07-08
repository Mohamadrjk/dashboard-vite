import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import clsx from "clsx";

interface CartCardContainerProps {
  chartOptions: ApexOptions;
  title: string;
  headerElement?: React.JSX.Element;
  headerSecondElement?: React.JSX.Element;
  type?:
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap";
  chartContainerClass: string;
  loadingComponent?: React.JSX.Element;
  containerClassName?: string;
}

const CartCardContainer: React.FC<CartCardContainerProps> = ({
  chartOptions,
  title,
  headerElement,
  headerSecondElement,
  type,
  chartContainerClass,
  loadingComponent,
  containerClassName,
}) => {
  return (
    <div
      className={clsx(
        "bg-white w-full flex flex-col justify-between aspect-[16/9] dxl:aspect-[16/7] rounded-[10px] shadow p-2 animate-fadeIn",
        containerClassName
      )}
    >
      <div className="w-full flex items-center gap-4 flex-wrap font-Medium">
        <h2 className="w-max xl:text-base ldxl:text-[18px]">{title}</h2>
        <div className="grow flex flex-wrap items-center justify-between">
          {headerElement ?? null}
          {headerSecondElement ?? null}
        </div>
      </div>
      {loadingComponent ? (
        loadingComponent
      ) : (
        <div className={chartContainerClass}>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type={type}
            width="100%"
            height={"100%"}
          />
        </div>
      )}
    </div>
  );
};

export default CartCardContainer;
