/**
 * Local calendar-day key (YYYY-MM-DD) for a date.
 */
export function localDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
}

function practicedDayKeys(practicedAt: readonly string[]): Set<string> {
  return new Set(
    practicedAt.map((iso) => localDayKey(new Date(iso))),
  );
}

/**
 * Current streak: consecutive completed days ending today, or yesterday if
 * today has not been completed yet. Multiple practices on one day count once.
 */
export function currentStreak(
  practicedAt: readonly string[],
  now: Date = new Date(),
): number {
  const practiced = practicedDayKeys(practicedAt);
  const anchor = practiced.has(localDayKey(now)) ? now : addDays(now, -1);
  if (!practiced.has(localDayKey(anchor))) {
    return 0;
  }

  let streak = 0;
  let cursor = new Date(
    anchor.getFullYear(),
    anchor.getMonth(),
    anchor.getDate(),
    12,
  );
  while (practiced.has(localDayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/**
 * Longest streak ever achieved, derived from all completed days.
 */
export function longestStreak(practicedAt: readonly string[]): number {
  const keys = [...practicedDayKeys(practicedAt)].sort();

  let longest = 0;
  let run = 0;
  let previous: Date | null = null;

  for (const key of keys) {
    const day = parseLocalKey(key);
    if (
      previous !== null &&
      Math.round((day.getTime() - previous.getTime()) / 86_400_000) === 1
    ) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) {
      longest = run;
    }
    previous = day;
  }
  return longest;
}

/**
 * Whether a given local calendar-day key has at least one completed practice.
 */
export function isDayCompleted(
  practicedAt: readonly string[],
  dayKey: string,
): boolean {
  return practicedDayKeys(practicedAt).has(dayKey);
}
