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
