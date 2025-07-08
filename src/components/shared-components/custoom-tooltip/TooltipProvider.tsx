"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import TooltipOverlay from "./TooltipOverlay";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipData {
  content: string;
  position: TooltipPosition;
  targetId: string | null;
  visible: boolean;
}

interface TooltipContextType {
  tooltipData: TooltipData;
  showTooltip: (targetId: string, content: string, isVisible: boolean) => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    content: "",
    position: "top",
    targetId: null,
    visible: false,
  });

  const showTooltip = (
    targetId: string,
    content: string,
    isVisible: boolean
  ) => {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    const { width, height } = target.getBoundingClientRect();
    const x = width / 2;
    const y = height / 2;

    const isTopHalf = y < height / 2;
    const isLeftHalf = x < width / 2;

    let position: TooltipPosition = "top";
    if (isTopHalf) position = "bottom";
    if (isLeftHalf) position = "right";
    if (!isLeftHalf) position = "left";

    setTooltipData({ content, position, targetId, visible: isVisible });
  };

  return (
    <TooltipContext.Provider value={{ tooltipData, showTooltip }}>
      {children}
      <TooltipOverlay />
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};
