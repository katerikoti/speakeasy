"use client";

export function CountdownStage({
  remainingSeconds,
}: {
  remainingSeconds: number;
}) {
  const display = Math.max(1, Math.ceil(remainingSeconds));

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-6 py-10 md:max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-almond-silk">
        Get ready to speak
      </p>
      <p
        role="timer"
        aria-label={`Speaking starts in ${display}`}
        className="font-display text-8xl font-medium tabular-nums text-ink"
      >
        {display}
      </p>
    </section>
  );
}
