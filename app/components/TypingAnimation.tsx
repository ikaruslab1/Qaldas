"use client";

import { motion } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  delay?: number;
  duration?: number; // Delay between characters
  className?: string;
}

export function TypingAnimation({
  text,
  delay = 0,
  duration = 0.05,
  className,
}: TypingAnimationProps) {
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
