import React from 'react';
import { motion } from 'framer-motion';

// Smooth ease curve matching high-end modern interfaces (Apple/Linear style)
export const transitionConfig = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1]
};

/**
 * MotionFadeIn:
 * Animates into view smoothly when scrolled into the viewport.
 */
export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 28,
  className = '',
  style = {},
  viewport = { once: true, amount: 0.15 }
}) {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      case 'none': return { x: 0, y: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionStagger:
 * Container component that staggers its direct MotionItem children.
 */
export function MotionStagger({
  children,
  staggerDelay = 0.06,
  className = '',
  style = {},
  viewport = { once: true, amount: 0.1 },
  ...props
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.04
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionItem:
 * Child component designed for use inside MotionStagger.
 * Guaranteed to animate into view even when dynamically mounted after tab switch.
 */
export function MotionItem({
  children,
  className = '',
  style = {},
  distance = 18,
  ...props
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionCard:
 * Interactive card with subtle spring lift on hover and tactile tap feedback.
 */
export function MotionCard({
  children,
  className = '',
  style = {},
  onClick,
  hoverLift = -6,
  hoverScale = 1.012
}) {
  return (
    <motion.div
      whileHover={{
        y: hoverLift,
        scale: hoverScale,
        transition: { type: 'spring', stiffness: 380, damping: 24 }
      }}
      whileTap={{
        scale: 0.985,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * MotionButton:
 * Tactile micro-interactive button wrapper.
 */
export function MotionButton({
  children,
  className = '',
  style = {},
  onClick,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={onClick}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.button>
  );
}
