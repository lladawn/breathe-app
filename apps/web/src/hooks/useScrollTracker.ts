import { useEffect } from "react";

type ScrollTrackerOptions = {
  ref: React.RefObject<HTMLElement>;
  steps?: number[]; // e.g. [10, 50, 100]
  onStepReached: (step: number) => void;
};

export function useScrollTracker({
  ref,
  steps = [10, 50, 100],
  onStepReached,
}: ScrollTrackerOptions) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;

      const percent = (scrollLeft / (scrollWidth - clientWidth)) * 100;

      steps.forEach((step) => {
        if (percent >= step && !fired.has(step)) {
          fired.add(step);
          onStepReached(step);
        }
      });
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => el.removeEventListener("scroll", handleScroll);
  }, [ref, steps, onStepReached]);
}
