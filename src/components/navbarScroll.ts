import type { ScrollSmoother } from "gsap-trial/ScrollSmoother";

export let smoother: ScrollSmoother | null = null;

export const setSmoother = (instance: ScrollSmoother | null) => {
  smoother = instance;
};

export const getSmoother = () => {
  if (!smoother) {
    throw new Error("Scroll smoother has not been initialized yet.");
  }

  return smoother;
};
