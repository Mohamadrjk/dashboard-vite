import { useRef, useState, useCallback } from "react";

const useDragLabels = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Adjust sensitivity
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUpOrLeave = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleSlide = useCallback(
    (direction: "next" | "prev", shift: number, speed: number) => {
      if (containerRef.current) {
        const targetScroll =
          containerRef.current.scrollLeft +
          (direction === "next" ? shift : -shift);
        smoothScroll(containerRef.current, targetScroll, speed);
      }
    },
    []
  );

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: handleMouseUpOrLeave,
    handleMouseLeave: handleMouseUpOrLeave,
    containerRef,
    isDragging,
    handleSlideNext: (shift: number, speed: number) =>
      handleSlide("next", shift, speed),
    handleSlidePrev: (shift: number, speed: number) =>
      handleSlide("prev", shift, speed),
  };
};

export default useDragLabels;

const smoothScroll = (
  element: HTMLElement,
  target: number,
  duration: number
) => {
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const start = element.scrollLeft;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    element.scrollLeft = start + (target - start) * easeOutCubic(progress);

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
