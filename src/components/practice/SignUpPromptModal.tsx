"use client";

import Link from "next/link";

export function SignUpPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6"
    >
      <div className="w-full max-w-sm rounded-3xl bg-linen p-6 text-center shadow-xl ring-1 ring-bone/60">
        <p
          id="signup-prompt-title"
          className="font-display text-2xl font-medium text-ink"
        >
          Start your streak
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Save this practice and keep your progress across devices with a free
          account.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/register"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-parchment shadow-sm transition-colors hover:bg-ink-soft"
          >
            Create account
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-parchment px-6 py-3 text-sm font-medium text-ink ring-1 ring-bone/60 transition-colors hover:bg-almond-cream"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
