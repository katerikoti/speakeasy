import {
  TOPIC_CATEGORIES,
  TOPIC_DIFFICULTIES,
  type TopicCategory,
  type TopicDifficulty,
} from "@/lib/topics";

export interface PracticeSettings {
  preparationDurationSeconds: number;
  speakingDurationSeconds: number;
  selectedCategories: readonly TopicCategory[];
  selectedDifficulties: readonly TopicDifficulty[];
}

export const DEFAULT_SETTINGS: PracticeSettings = {
  preparationDurationSeconds: 60,
  speakingDurationSeconds: 120,
  selectedCategories: TOPIC_CATEGORIES,
  selectedDifficulties: TOPIC_DIFFICULTIES,
};

export const PREPARATION_OPTIONS_MINUTES = [0.5, 1, 2, 3];

export const SPEAKING_OPTIONS_MINUTES = [0.5, 1, 2, 3, 5];

export function minutesToSeconds(minutes: number): number {
  return Math.round(minutes * 60);
}

const PREPARATION_SECONDS = new Set(
  PREPARATION_OPTIONS_MINUTES.map(minutesToSeconds),
);

const SPEAKING_SECONDS = new Set(
  SPEAKING_OPTIONS_MINUTES.map(minutesToSeconds),
);

export interface ParsedSettings {
  preparationDurationSeconds: number;
  speakingDurationSeconds: number;
  selectedCategories: string[];
  selectedDifficulties: string[];
}

export interface SettingsValidation {
  settings?: PracticeSettings;
  error?: string;
}

function isInSet(value: unknown, set: Set<number>): value is number {
  return typeof value === "number" && Number.isInteger(value) && set.has(value);
}

function isCategory(value: string): value is TopicCategory {
  return TOPIC_CATEGORIES.includes(value as TopicCategory);
}

function isDifficulty(value: string): value is TopicDifficulty {
  return TOPIC_DIFFICULTIES.includes(value as TopicDifficulty);
}

/**
 * Validates parsed settings input. Returns a validated settings object or a
 * user-facing error message.
 */
export function validateSettings(input: ParsedSettings): SettingsValidation {
  if (!isInSet(input.preparationDurationSeconds, PREPARATION_SECONDS)) {
    return { error: "Choose a valid preparation duration." };
  }
  if (!isInSet(input.speakingDurationSeconds, SPEAKING_SECONDS)) {
    return { error: "Choose a valid speaking duration." };
  }
  if (input.selectedCategories.length === 0) {
    return { error: "Select at least one category." };
  }
  if (!input.selectedCategories.every(isCategory)) {
    return { error: "Select valid categories." };
  }
  if (input.selectedDifficulties.length === 0) {
    return { error: "Select at least one difficulty." };
  }
  if (!input.selectedDifficulties.every(isDifficulty)) {
    return { error: "Select valid difficulties." };
  }
  return {
    settings: {
      preparationDurationSeconds: input.preparationDurationSeconds,
      speakingDurationSeconds: input.speakingDurationSeconds,
      selectedCategories: [...input.selectedCategories] as TopicCategory[],
      selectedDifficulties: [...input.selectedDifficulties] as TopicDifficulty[],
    },
  };
}
