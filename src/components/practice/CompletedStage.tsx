"use client";

import type { Topic } from "@/lib/topics";

export function CompletedStage({
  topic,
  rating,
  isGuest,
  onPracticeAgain,
}: {
  topic: Topic;
  rating: number | null;
  isGuest: boolean;
  onPracticeAgain: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-6 px-6 py-10 md:max-w-2xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-almond-silk shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-ink"
          aria-hidden="true"
        >
          <path d="M4.5 12.5 10 18 19.5 6.5" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
          Practice complete
        </p>
        <h2 className="font-display text-2xl font-medium text-ink">
          Nice work!
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          {topic.prompt}
        </p>
        {rating !== null ? (
          <p className="text-sm font-medium text-ink">
            You rated it {rating} of 5
          </p>
        ) : null}
      </div>

      <p className="text-xs text-ink-soft">
        {isGuest
          ? "This practice is saved on this device."
          : "This practice is saved to your account."}
      </p>

      <button
        type="button"
        onClick={onPracticeAgain}
        className="rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
      >
        Spin again
      </button>
    </section>
  );
}
