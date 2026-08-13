import type {
  Topic,
  TopicCategory,
  TopicDifficulty,
} from "@/lib/topics";

export interface TopicPreferences {
  categories?: readonly TopicCategory[];
  difficulties?: readonly TopicDifficulty[];
}

export const WHEEL_SEGMENTS = 10;

/**
 * Maps a topic to the wheel segment it should land under.
 * Deterministic so the same topic always stops at the same slice.
 */
export function segmentIndexForTopic(topicId: string): number {
  let hash = 0;
  for (let i = 0; i < topicId.length; i++) {
    hash = (hash * 31 + topicId.charCodeAt(i)) >>> 0;
  }
  return hash % WHEEL_SEGMENTS;
}

/**
 * Selects a random topic for the user.
 *
 * The user's completed topics are excluded from the pool. When every
 * eligible topic has been completed, the pool resets and completed
 * topics become eligible again.
 */
export function selectTopic(
  topics: readonly Topic[],
  completedTopicIds: ReadonlySet<string>,
  preferences: TopicPreferences = {},
): Topic | null {
  const eligible = topics.filter((topic) =>
    matchesPreferences(topic, preferences),
  );

  const unused = eligible.filter((topic) => !completedTopicIds.has(topic.id));
  const pool = unused.length > 0 ? unused : eligible;

  if (pool.length === 0) {
    return null;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function matchesPreferences(
  topic: Topic,
  preferences: TopicPreferences,
): boolean {
  if (
    preferences.categories &&
    preferences.categories.length > 0 &&
    !preferences.categories.includes(topic.category)
  ) {
    return false;
  }
  if (
    preferences.difficulties &&
    preferences.difficulties.length > 0 &&
    !preferences.difficulties.includes(topic.difficulty)
  ) {
    return false;
  }
  return true;
}
