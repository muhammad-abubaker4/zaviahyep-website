/**
 * Shared motion tokens. Reveals used to run at seven different durations and a
 * mix of eased and default curves, so sections decelerated at visibly different
 * rates as you scrolled. Everything routes through here now.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** Small controls: chips, toggles, scroll-to-top. */
  fast: 0.3,
  /** Route change - short enough not to delay the next page. */
  page: 0.28,
  /** Default for content revealing on scroll. */
  reveal: 0.55,
  /** Hero-scale entrances that need extra weight. */
  hero: 0.8,
} as const;

/** Per-item delay in a staggered list, by how many items are in it. */
export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  wide: 0.12,
} as const;

/** The standard reveal transition; pass a delay to stagger within a group. */
export const revealTransition = (delay = 0, duration: number = DURATION.reveal) => ({
  duration,
  delay,
  ease: EASE_OUT,
});
