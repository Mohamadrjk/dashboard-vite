import React, { useEffect, useState } from "react";

interface CounterProps {
  targetNumber: number; // The number to count up to
  duration?: number; // Total duration for the count animation in milliseconds
}

const Counter: React.FC<CounterProps> = ({ targetNumber, duration = 1000 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (targetNumber <= 0) return;

    const stepTime = duration / targetNumber; // Calculate interval time per step
    const interval = setInterval(() => {
      setCurrentValue((prevValue) => {
        if (prevValue >= targetNumber) {
          clearInterval(interval);
          return prevValue; // Stop incrementing once the target is reached
        }
        return prevValue + 5;
      });
    }, stepTime);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return <div>{currentValue}</div>;
};

export default Counter;
