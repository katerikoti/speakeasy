import Link from "next/link";
import { SettingsForm } from "./SettingsForm";
import { getSettingsForUser } from "@/lib/db/users";
import { requireUserId } from "@/lib/session";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export default async function SettingsPage() {
  const userId = await requireUserId();
  const settings = (await getSettingsForUser(userId)) ?? DEFAULT_SETTINGS;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-md items-center px-6 py-5">
        <Link
          href="/"
          aria-label="Back to home"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-linen text-ink shadow-sm transition-colors hover:bg-almond-cream"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4.5 12h15M10 6l-6 6 6 6" />
          </svg>
        </Link>
        <h1 className="ml-3 font-display text-xl font-medium text-ink">
          Settings
        </h1>
      </header>
      <SettingsForm initial={settings} />
    </div>
  );
}
