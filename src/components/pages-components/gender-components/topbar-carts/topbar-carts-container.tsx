"use client";
import useDragLabels from "@/hooks/dragg-hook/useDraggLabels";
import GenderCart from "./gender-statics";
import GenderCartWithPurchases from "./gender-statics-with-purchace";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

const GenderTopbarContainer = () => {
  const {
    containerRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    handleSlideNext,
    handleSlidePrev,
  } = useDragLabels();
  return (
    <div className="w-full relative overflow-hidden max-ldxl:[&_.prev-button]:hover:!opacity-100 max-ldxl:[&_.next-button]:hover:!opacity-100">
      <button
        onClick={() => handleSlideNext(150, 600)}
        style={{
          background:
            "linear-gradient(to left, var(--highlighter), transparent)",
        }}
        className="absolute prev-button opacity-0 transition-all flex justify-center items-center z-[10] right-0 top-0 h-full w-10"
      >
        <Icon icon="mingcute:right-line" width="30" height="30" />
      </button>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        className={clsx(
          "w-full overflow-x-auto h-max no-scrollbar hover:cursor-grab relative transition-all overflow-y-hidden ",
          isDragging && "!cursor-grabbing"
        )}
      >
        <div className="w-max dxl:w-full grid grid-cols-4 gap-4">
          <GenderCart />
          <GenderCartWithPurchases />
        </div>
      </div>
      <button
        onClick={() => handleSlidePrev(150, 600)}
        style={{
          background:
            "linear-gradient(to right, var(--highlighter), transparent)",
        }}
        className="absolute next-button opacity-0 transition-all  flex justify-center items-center z-[10] left-0 top-0 h-full w-10"
      >
        <Icon icon="mingcute:left-line" width="30" height="30" />
      </button>
    </div>
  );
};

export default GenderTopbarContainer;
