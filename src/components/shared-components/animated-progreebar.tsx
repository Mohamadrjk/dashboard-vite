import React, { useState, useEffect } from "react";
import { Progress } from "antd";

interface AnimatedProgressProps {
  percent: number;
  size?: number;
  duration?: number; // Animation duration in milliseconds
  className?: string;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  percent,
  size = 60,
  duration = 1000,
  className = "",
}) => {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = 1; // Approximate 60 FPS
    const animate = () => {
      start += increment;
      if (start >= percent) {
        setCurrentPercent(percent);
        return;
      }
      setCurrentPercent(start);
      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      // Cleanup
      setCurrentPercent(0);
    };
  }, [percent, duration]);

  return (
    <Progress
      type="circle"
      percent={Math.min(currentPercent, 100)}
      className={className}
      size={size}
    />
  );
};

export default AnimatedProgress;
