// anime.js v4 ready
// Reusable animation configurations for consistent motion design

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Stagger container for sequential animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Designer: tweak delay between children
      delayChildren: 0.1
    }
  }
};

// Button hover states with spring physics
export const buttonHover = {
  scale: 1.02,
  y: -2,
  transition: {
    type: "spring",
    stiffness: 400, // Designer: higher = snappier
    damping: 25 // Designer: higher = less bounce
  }
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.1
  }
};

// Card hover with slight rotation
export const cardHover = {
  y: -3,
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

// Spring scale animation for numbers/counters
export const springScale = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 15,
    delay: 0.2
  }
};

// Viewport animations (use with whileInView)
export const viewportFadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Utility function to get animation with custom delay
export const withDelay = (animation: any, delay: number) => ({
  ...animation,
  transition: {
    ...animation.transition,
    delay
  }
});

// Utility function for staggered items
export const staggerItem = (index: number, baseDelay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.3,
    delay: baseDelay + index * 0.05, // Designer: adjust multiplier for speed
    ease: "easeOut"
  }
});
