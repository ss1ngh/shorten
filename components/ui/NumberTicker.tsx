"use client";

import { useEffect, useState } from "react";

interface NumberTickerProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function NumberTicker({ value, suffix = "", className = "", duration = 2 }: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}
