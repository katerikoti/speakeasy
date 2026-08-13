export function Countdown({
  seconds,
  label,
}: {
  seconds: number;
  label: string;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const formatted = `${minutes}:${String(remainder).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </p>
      <p
        role="timer"
        aria-label={`${label} remaining: ${formatted}`}
        className="mt-1 font-display text-6xl font-medium tabular-nums text-ink"
      >
        {formatted}
      </p>
    </div>
  );
}
