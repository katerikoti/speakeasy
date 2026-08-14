import type { Metadata } from "next";
import Link from "next/link";
import { InstallGuide } from "@/components/InstallGuide";

export const metadata: Metadata = {
  title: "Speakeasy — About",
  description: "Daily speaking practice, one spin at a time.",
};

const STEPS = [
  {
    title: "Spin",
    text: "A random topic from your unused pool.",
  },
  {
    title: "Prepare",
    text: "Jot down a few notes while the timer runs.",
  },
  {
    title: "Speak",
    text: "Talk out loud until the timer ends.",
  },
  {
    title: "Reflect",
    text: "Rate how it felt and watch your streak grow.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-12">
      <p className="font-display text-3xl font-medium text-ink">Speakeasy</p>
      <p className="mt-2 text-sm text-ink-soft">
        Daily speaking practice, one spin at a time.
      </p>

      <section className="mt-10 flex flex-col gap-3">
        <p className="text-base leading-relaxed text-ink">
          Speakeasy is a simple speaking workout. Each day you spin a wheel, get
          an unexpected topic, and practice speaking about it out loud — a few
          minutes of deliberate practice that builds confidence and fluency.
        </p>
      </section>

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
          How it works
        </h2>
        <ol className="flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linen font-display text-base font-medium text-ink ring-1 ring-bone/60">
                {index + 1}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-ink">
                  {step.title}
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Link
        href="/"
        className="mt-10 rounded-full bg-ink px-8 py-3 text-center font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
      >
        Open the app
      </Link>

      <section className="mt-10 flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
          Add it to your home screen
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          Speakeasy is a web app — install it once and it opens like any other
          app.
        </p>
        <div className="mt-1 rounded-2xl bg-linen p-5 ring-1 ring-bone/60">
          <InstallGuide />
        </div>
      </section>

      <p className="mt-10 text-sm leading-relaxed text-ink-soft">
        No account needed to start. Practice as a guest, keep your progress on
        this device, and create an account later to keep your streak and history.
      </p>
    </div>
  );
}
