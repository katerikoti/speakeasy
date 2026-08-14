"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { migrateLatestPracticeAction } from "@/app/actions";
import { latestGuestPractice } from "@/lib/guestStorage";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setPending(false);
      setError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    const signInResult = await signIn("credentials", {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      redirect: false,
    });

    setPending(false);
    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    const latest = latestGuestPractice();
    if (latest) {
      await migrateLatestPracticeAction({
        id: latest.id,
        topicId: latest.topicId,
        practicedAt: latest.practicedAt,
        rating: latest.rating,
      });
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={60}
          className="w-full rounded-2xl border border-almond-silk bg-white/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-almond-silk focus:bg-white"
          placeholder="How should we call you?"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-2xl border border-almond-silk bg-white/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-almond-silk focus:bg-white"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          className="w-full rounded-2xl border border-almond-silk bg-white/60 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-almond-silk focus:bg-white"
          placeholder="At least 8 characters"
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-almond-silk px-4 py-3 font-medium text-ink shadow-sm transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
