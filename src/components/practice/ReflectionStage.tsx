"use client";

const RATING_LABELS = ["Tough", "Meh", "Okay", "Good", "Great"] as const;

export function ReflectionStage({
  rating,
  onRate,
  onComplete,
}: {
  rating: number | null;
  onRate: (value: number) => void;
  onComplete: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-10 px-6 py-10 md:max-w-2xl">
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
          Reflection
        </p>
        <h2 className="text-center font-display text-2xl font-medium text-ink">
          How did that feel?
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {RATING_LABELS.map((label, index) => {
          const value = index + 1;
          const selected = rating === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onRate(value)}
              aria-label={`${value} of 5: ${label}`}
              aria-pressed={selected}
              className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-lg shadow-sm transition-colors ${
                selected
                  ? "bg-almond-silk text-ink ring-2 ring-almond-silk"
                  : "bg-linen text-ink-soft ring-1 ring-bone/60 hover:bg-almond-cream"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      <p className="h-5 text-sm font-medium text-almond-silk" aria-live="polite">
        {rating !== null ? RATING_LABELS[rating - 1] : ""}
      </p>

      <button
        type="button"
        onClick={onComplete}
        className="rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
      >
        Complete practice
      </button>
    </section>
  );
}
