import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `end` when scrolled into view.
 *
 * The count is written straight to the DOM node rather than held in state. The
 * previous version called setState once per animation frame, so four counters
 * meant roughly 400 React renders in under two seconds — it was the single
 * most expensive component on the homepage's main thread.
 *
 * The initial render shows the final figure, so the number is correct for
 * assistive tech and crawlers, and the element reserves its final width from
 * the start instead of growing digit by digit.
 */
const AnimatedCounter = ({
  end,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;

    const format = (value: number) => `${prefix}${value.toLocaleString()}${suffix}`;
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        let startTime: number | null = null;
        const step = (timestamp: number) => {
          startTime ??= timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = format(Math.floor(eased * end));
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        element.textContent = format(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3, rootMargin: "-40px" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration, prefix, suffix, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {end.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
