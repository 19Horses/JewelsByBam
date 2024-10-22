export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};
