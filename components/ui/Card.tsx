"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  pillar?: boolean;
}

export function Card({ children, className, hover = true, pillar = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? cardHover : undefined}
      className={cn(
        "bg-white/5 backdrop-blur-md border border-[--color-border] rounded-2xl p-6",
        pillar && "pillar-card",
        className
      )}
      style={{ transition: "box-shadow 0.2s ease" }}
    >
      {children}
    </motion.div>
  );
}
