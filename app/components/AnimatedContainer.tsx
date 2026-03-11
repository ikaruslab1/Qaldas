"use client";

import { motion, Variants } from "framer-motion";

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: keyof typeof animations;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  viewportMargin?: string;
}

export function AnimatedContainer({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.5,
  className,
  triggerOnce = true,
  viewportMargin = "-50px",
}: AnimatedContainerProps) {
  return (
    <motion.div
      variants={animations[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: viewportMargin }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
