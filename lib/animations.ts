import type { Transition } from "motion/react";

const customEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: customEase } satisfies Transition,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 } satisfies Transition,
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: customEase } satisfies Transition,
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: customEase } satisfies Transition,
};

export const cardHover = {
  y: -6,
  borderColor: "rgba(180,215,226,0.3)",
  transition: { duration: 0.2 } satisfies Transition,
};
