"use client";
import { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [position, setPosition] = useState("top");
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = (e) => {
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const isTopHalf = y < height / 2;
    const isLeftHalf = x < width / 2;

    if (isTopHalf) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }

    if (isLeftHalf) {
      setPosition((prev) => (prev === "top" ? "right" : "left"));
    } else {
      setPosition((prev) => (prev === "top" ? "left" : "right"));
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute px-2 py-1 bg-black text-white text-sm rounded shadow-lg whitespace-nowrap
          ${
            position === "top"
              ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
              : ""
          }
          ${
            position === "bottom"
              ? "top-full left-1/2 -translate-x-1/2 mt-2"
              : ""
          }
          ${
            position === "left"
              ? "right-full top-1/2 -translate-y-1/2 mr-2"
              : ""
          }
          ${
            position === "right"
              ? "left-full top-1/2 -translate-y-1/2 ml-2"
              : ""
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
