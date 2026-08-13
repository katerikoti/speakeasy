export interface GuestPractice {
  id: string;
  topicId: string;
  practicedAt: string;
  rating: number | null;
}

export interface GuestData {
  version: 1;
  practices: GuestPractice[];
}

const STORAGE_KEY = "speakeasy:guest:v1";

/** Fired on the window when guest data changes, so UI can resubscribe. */
export const GUEST_DATA_EVENT = "speakeasy:guest:changed";

export const EMPTY_GUEST_DATA: GuestData = { version: 1, practices: [] };

let cachedRaw: string | null = null;
let cachedData: GuestData = EMPTY_GUEST_DATA;

function parseGuestData(raw: string | null): GuestData {
  if (!raw) {
    return EMPTY_GUEST_DATA;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<GuestData>;
    if (
      parsed.version === 1 &&
      Array.isArray(parsed.practices) &&
      parsed.practices.every(
        (practice) =>
          typeof practice.id === "string" &&
          typeof practice.topicId === "string" &&
          typeof practice.practicedAt === "string",
      )
    ) {
      return { version: 1, practices: parsed.practices };
    }
  } catch {
    // fall through to empty data
  }
  return EMPTY_GUEST_DATA;
}

/**
 * Reads guest data from localStorage.
 *
 * The parsed result is cached by the raw stored string, so repeated calls
 * within the same stored value return the same object reference. This makes
 * the function safe to use as a getSnapshot for useSyncExternalStore.
 */
export function loadGuestData(): GuestData {
  if (typeof window === "undefined") {
    return EMPTY_GUEST_DATA;
  }
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY_GUEST_DATA;
  }
  if (raw === cachedRaw) {
    return cachedData;
  }
  cachedRaw = raw;
  cachedData = parseGuestData(raw);
  return cachedData;
}

export function addGuestPractice(practice: GuestPractice): GuestData {
  const current = loadGuestData();
  const next: GuestData = {
    version: 1,
    practices: [...current.practices, practice],
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  cachedRaw = JSON.stringify(next);
  cachedData = next;
  window.dispatchEvent(new Event(GUEST_DATA_EVENT));
  return next;
}

export function completedTopicIdsFrom(data: GuestData): Set<string> {
  return new Set(data.practices.map((practice) => practice.topicId));
}
