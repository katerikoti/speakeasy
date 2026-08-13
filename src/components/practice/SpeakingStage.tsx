"use client";

import type { Topic } from "@/lib/topics";
import { Countdown } from "./Countdown";

export function SpeakingStage({
  topic,
  remainingSeconds,
  notes,
  onFinishEarly,
}: {
  topic: Topic;
  remainingSeconds: number;
  notes: string;
  onFinishEarly: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-6 py-10">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
          Speak about
        </p>
        <p className="text-center font-display text-xl leading-snug text-ink">
          {topic.prompt}
        </p>
      </div>

      <Countdown seconds={remainingSeconds} label="Speaking" />

      {notes ? (
        <details className="w-full rounded-2xl bg-linen p-4 ring-1 ring-bone/60">
          <summary className="cursor-pointer text-sm font-medium text-ink-soft">
            Your notes
          </summary>
          <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{notes}</p>
        </details>
      ) : null}

      <button
        type="button"
        onClick={onFinishEarly}
        className="rounded-full bg-linen px-8 py-3 font-medium text-ink ring-1 ring-bone/60 transition-colors hover:bg-almond-cream"
      >
        Finish early
      </button>
    </section>
  );
}
