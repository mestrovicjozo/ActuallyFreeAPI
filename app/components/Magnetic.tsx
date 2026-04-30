'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function Magnetic({
  children,
  className,
  strength = 0.35,
  as = 'button',
  href,
  target,
  rel,
  onClick,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const ss = useSpring(scale, { stiffness: 320, damping: 22, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleDown = () => {
    if (!reduce) scale.set(0.96);
  };
  const handleUp = () => {
    scale.set(1);
  };

  const sharedHandlers = {
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onMouseDown: handleDown,
    onMouseUp: handleUp,
    onTouchStart: handleDown,
    onTouchEnd: handleUp,
  };

  const motionStyle = { x: sx, y: sy, scale: ss };

  if (as === 'a') {
    return (
      <motion.a
        ref={ref as never}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={motionStyle}
        {...sharedHandlers}
      >
        {children}
      </motion.a>
    );
  }
  if (as === 'div') {
    return (
      <motion.div
        ref={ref as never}
        className={className}
        style={motionStyle}
        {...sharedHandlers}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.button
      ref={ref as never}
      type="button"
      className={className}
      style={motionStyle}
      {...sharedHandlers}
    >
      {children}
    </motion.button>
  );
}
