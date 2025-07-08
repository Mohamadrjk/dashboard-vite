import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { useState } from "react";

export function useCursorTooltip() {
  const [tooltip, setTooltip] = useState<{
    followCursor: boolean;
    visible: boolean;
    x: number;
    y: number;
    content: {
      element: "hoveredMapInfo" | "hoveredCityInfo";
      data: ISalesByGenderAndCityReport | ISalesByGenderAndCityReport[];
    };
  }>({
    followCursor: false,
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });

  const showTooltip = (
    e,
    content,
    options = { followCursor: true, targetId: null }
  ) => {
    if (options.followCursor) {
      setTooltip({
        followCursor: true,
        visible: true,
        x: e.clientX + 10,
        y: e.clientY,
        content,
      });
    } else if (options.targetId) {
      // Tooltip on a specific element
      const target = document.getElementById(options.targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.left + rect.width / 2, // Center horizontally
        y: rect.top + rect.height / 2 - 10, // Appear above the element
        content,
        followCursor: false,
      });
    }
  };

  const hideTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  const moveTooltip = (e) => {
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX + 10, // Offset for better visibility
      y: e.clientY + 10,
    }));
  };

  return { tooltip, showTooltip, hideTooltip, moveTooltip };
}
