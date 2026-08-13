"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { CalendarIcon, SettingsIcon, StreakIcon } from "./icons";
import { signOutAction } from "@/app/actions";

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
    >
      {children}
    </button>
  );
}

export function Header({ streak = 0 }: { streak?: number }) {
  const { data: session, status } = useSession();
  const displayName =
    session?.user?.name?.split(" ")[0] ??
    session?.user?.email ??
    "Account";

  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 py-5">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5"
          aria-label={`${streak}-day streak`}
          title={`${streak}-day streak`}
        >
          <StreakIcon className="h-4 w-4 text-ink" />
          <span className="text-base font-bold tabular-nums text-ink">
            {streak}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {status === "authenticated" && session?.user ? (
          <>
            <form action={signOutAction}>
              <button
                type="submit"
                className="max-w-28 truncate rounded-full bg-linen px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-almond-cream"
                title="Sign out"
              >
                {displayName}
              </button>
            </form>
            <Link
              href="/calendar"
              aria-label="Open calendar"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
            >
              <CalendarIcon className="h-5 w-5" />
            </Link>
            <IconButton label="Open settings">
              <SettingsIcon className="h-5 w-5" />
            </IconButton>
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
