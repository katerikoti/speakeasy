"use client";

import type { Topic } from "@/lib/topics";
import { Countdown } from "./Countdown";

export function PreparationStage({
  topic,
  remainingSeconds,
  notes,
  onNotesChange,
  onStartSpeaking,
}: {
  topic: Topic;
  remainingSeconds: number;
  notes: string;
  onNotesChange: (notes: string) => void;
  onStartSpeaking: () => void;
}) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-6 py-10 md:max-w-2xl">
      <p className="text-center font-display text-xl leading-snug text-ink">
        {topic.prompt}
      </p>

      <Countdown seconds={remainingSeconds} label="Preparation" />

      <textarea
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        placeholder="Jot down a few ideas…"
        aria-label="Preparation notes"
        className="h-28 w-full resize-none rounded-2xl bg-linen p-4 text-ink ring-1 ring-bone/60 placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-almond-silk"
      />

      <button
        type="button"
        onClick={onStartSpeaking}
        className="rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
      >
        Start speaking now
      </button>
    </section>
  );
}
