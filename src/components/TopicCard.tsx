import { CATEGORY_LABELS, DIFFICULTY_LABELS, type Topic } from "@/lib/topics";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <section
      aria-live="polite"
      className="w-full max-w-md rounded-3xl bg-linen p-6 text-center shadow-[0_10px_30px_rgba(63,58,51,0.12)] ring-1 ring-bone/60"
    >
      <p className="text-sm font-medium uppercase tracking-widest text-almond-silk">
        Your topic
      </p>
      <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-ink">
        {topic.prompt}
      </h2>
      <div className="mt-5 flex items-center justify-center gap-2">
        <span className="rounded-full bg-parchment px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-bone/60">
          {CATEGORY_LABELS[topic.category]}
        </span>
        <span className="rounded-full bg-parchment px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-bone/60">
          {DIFFICULTY_LABELS[topic.difficulty]}
        </span>
      </div>
    </section>
  );
}
