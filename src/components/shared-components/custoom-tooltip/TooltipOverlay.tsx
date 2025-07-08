"use client";
import { useEffect, useState } from "react";
import { useTooltip } from "./TooltipProvider";

const TooltipOverlay = () => {
  const { tooltipData } = useTooltip();
  const { content, position, targetId, visible } = tooltipData;
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    const { top, left, width, height } = target.getBoundingClientRect();
    const offset = 10;

    let tooltipPosition = { top: top - offset, left: left + width / 2 };

    if (position === "bottom")
      tooltipPosition = { top: top + height + offset, left: left + width / 2 };
    if (position === "left")
      tooltipPosition = { top: top + height / 2, left: left - offset };
    if (position === "right")
      tooltipPosition = { top: top + height / 2, left: left + width + offset };

    setCoords(tooltipPosition);
  }, [targetId, position]);

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out opacity-${
        visible ? "100" : "0"
      } transform ${
        visible ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
      }`}
      style={{
        top: coords.top,
        left: coords.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative bg-black text-white text-sm px-3 py-2 rounded shadow-lg">
        {content}

        {/* Triangle Pointer */}
        <div
          className={`absolute w-0 h-0 border-transparent border-solid`}
          style={{
            borderWidth: "6px",
            [position === "top" ? "borderBottomColor" : ""]: "black",
            [position === "bottom" ? "borderTopColor" : ""]: "black",
            [position === "left" ? "borderRightColor" : ""]: "black",
            [position === "right" ? "borderLeftColor" : ""]: "black",
            top:
              position === "bottom"
                ? "-12px"
                : position === "top"
                ? "100%"
                : "50%",
            left:
              position === "right"
                ? "-12px"
                : position === "left"
                ? "100%"
                : "50%",
            transform:
              position === "top" || position === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TooltipOverlay;
