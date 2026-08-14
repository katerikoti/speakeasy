"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CalendarIcon, LogOutIcon, SettingsIcon, StreakIcon } from "./icons";

export function Header({ streak = 0 }: { streak?: number }) {
  const { data: session, status } = useSession();
  const displayName =
    session?.user?.name?.split(" ")[0] ??
    session?.user?.email ??
    "Account";

  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 py-5 md:max-w-2xl">
      <div className="flex items-center gap-2">
        {status === "authenticated" ? (
          <div
            className="flex items-center gap-1.5"
            aria-label={`${streak}-day streak`}
            title={`${streak}-day streak`}
          >
            <StreakIcon className="h-5 w-5 text-ink" />
            <span className="text-base font-bold tabular-nums text-ink">
              {streak}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {status === "authenticated" && session?.user ? (
          <>
            <span
              className="max-w-24 truncate text-sm font-medium text-ink"
              title={session.user.name ?? session.user.email ?? "Account"}
            >
              {displayName}
            </span>
            <Link
              href="/calendar"
              aria-label="Open calendar"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
            >
              <CalendarIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/settings"
              aria-label="Open settings"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
            >
              <SettingsIcon className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              aria-label="Sign out"
              title="Sign out"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
            >
              <LogOutIcon className="h-5 w-5" />
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-parchment shadow-sm transition-colors hover:bg-ink-soft"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
