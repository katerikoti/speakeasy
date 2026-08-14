import type { Metadata } from "next";
import Link from "next/link";
import { InstallGuide } from "@/components/InstallGuide";
import { TopicWheel } from "@/components/TopicWheel";

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

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#how-to-install", label: "How to install" },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-bone/50 bg-parchment/90 backdrop-blur">
        <nav
          aria-label="Page sections"
          className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4"
        >
          <span className="font-display text-lg font-medium text-ink">
            Speakeasy
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-ink-soft">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 pb-16 pt-14 md:flex-row md:justify-between md:pt-20">
          <div className="flex max-w-md flex-col items-center text-center md:items-start md:text-left">
            <h1 className="font-display text-5xl font-medium text-ink md:text-6xl">
              Speakeasy
            </h1>
            <p className="mt-4 text-base text-ink-soft md:text-lg">
              Daily speaking practice, one spin at a time.
            </p>
            <Link
              href="/"
              className="mt-8 rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
            >
              Open the app
            </Link>
          </div>
          <div className="shrink-0">
            <TopicWheel />
          </div>
        </section>

        <section
          id="about"
          className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-16"
        >
          <div className="max-w-xl">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
              About
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              Speakeasy is a simple speaking workout. Each day you spin a wheel,
              get an unexpected topic, and practice speaking about it out loud
              — a few minutes of deliberate practice that builds confidence and
              fluency.
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 bg-linen py-16"
        >
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="max-w-xl">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
                How it works
              </h2>
              <ol className="mt-6 flex flex-col gap-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-parchment font-display text-base font-medium text-ink ring-1 ring-bone/60">
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
            </div>
          </div>
        </section>

        <section
          id="how-to-install"
          className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-16"
        >
          <div className="max-w-xl">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-almond-silk">
              Add it to your home screen
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              Speakeasy is a web app — install it once and it opens like any
              other app.
            </p>
            <div className="mt-6 rounded-2xl bg-linen p-5 ring-1 ring-bone/60">
              <InstallGuide />
            </div>
            <p className="mt-10 text-sm leading-relaxed text-ink-soft">
              No account needed to start. Practice as a guest, keep your
              progress on this device, and create an account later to keep your
              streak and history.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-bone/50 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-6 text-center">
          <span className="font-display text-lg font-medium text-ink">
            Speakeasy
          </span>
          <p className="text-sm text-ink-soft">
            Daily speaking practice, one spin at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
