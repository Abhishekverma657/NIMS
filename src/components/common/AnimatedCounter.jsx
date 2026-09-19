import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * AnimatedCounter:
 * Smoothly counts up from 0 to target when scrolled into view.
 * Formats numbers with localized commas (e.g., 3,400).
 */
export default function AnimatedCounter({
  target,
  duration = 1.6,
  prefix = '',
  suffix = '+',
  staticText = null, // for non-numeric like '24×7'
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || staticText) return;

    let startTime = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Smooth easeOutExpo for a premium mathematical feel
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeOut * target);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration, staticText]);

  if (staticText) {
    return (
      <span ref={ref} className={className} style={style}>
        {prefix}{staticText}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
