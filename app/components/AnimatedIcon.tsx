"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedIcon({
  children,
  delay = 0,
  duration = 0.4,
  className,
}: AnimatedIconProps) {
  const iconVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: -15 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration,
        delay,
      }
    },
    hover: { 
      scale: 1.15,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    },
    tap: { 
      scale: 0.9,
      rotate: -5
    }
  };

  return (
    <motion.div
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-20px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
