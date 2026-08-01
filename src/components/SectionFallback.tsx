const SectionFallback = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center bg-background"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-3 px-4">
      <div className="h-9 w-9 animate-pulse rounded-full bg-primary/15" />
      <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      <span className="sr-only">Loading page</span>
    </div>
  </div>
);

export default SectionFallback;
