import Link from "next/link";
import { CalendarIcon, SettingsIcon, StreakIcon } from "./icons";

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
  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between px-6 py-5">
      <div
        className="flex items-center gap-2 rounded-full bg-linen px-4 py-2 text-sm font-medium shadow-sm"
        aria-label={`${streak}-day streak`}
      >
        <StreakIcon className="h-4 w-4 text-almond-silk" />
        <span className="tabular-nums">{streak}</span>
      </div>
      <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}
