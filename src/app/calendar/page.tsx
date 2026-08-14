import Link from "next/link";
import { PracticeCalendar } from "@/components/calendar/PracticeCalendar";
import { getPracticesForUser } from "@/lib/db/practices";
import type { GuestPractice } from "@/lib/guestStorage";
import { requireUserId } from "@/lib/session";

export default async function CalendarPage() {
  const userId = await requireUserId();
  const practices = await getPracticesForUser(userId);
  const initialPractices: GuestPractice[] = practices.map((practice) => ({
    id: practice.id,
    topicId: practice.topicId,
    practicedAt: practice.practicedAt.toISOString(),
    rating: practice.rating,
  }));

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-md items-center px-6 py-5 md:max-w-2xl">
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
      </header>
      <PracticeCalendar practices={initialPractices} />
    </div>
  );
}
