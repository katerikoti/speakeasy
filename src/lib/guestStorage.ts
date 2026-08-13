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

const EMPTY_DATA: GuestData = { version: 1, practices: [] };

export function loadGuestData(): GuestData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return EMPTY_DATA;
    }
    const parsed = JSON.parse(raw) as Partial<GuestData>;
    if (
      parsed.version !== 1 ||
      !Array.isArray(parsed.practices) ||
      parsed.practices.some((p) => typeof p.id !== "string")
    ) {
      return EMPTY_DATA;
    }
    return { version: 1, practices: parsed.practices };
  } catch {
    return EMPTY_DATA;
  }
}

export function saveGuestData(data: GuestData) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addGuestPractice(practice: GuestPractice): GuestData {
  const data = loadGuestData();
  data.practices.push(practice);
  saveGuestData(data);
  return data;
}

export function completedTopicIdsFrom(data: GuestData): Set<string> {
  return new Set(data.practices.map((practice) => practice.topicId));
}
