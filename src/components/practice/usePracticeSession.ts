"use client";

import { useCallback, useEffect, useState } from "react";
import { addGuestPractice } from "@/lib/guestStorage";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import type { Topic } from "@/lib/topics";

export type PracticeStage =
  | "idle"
  | "topic"
  | "preparing"
  | "speaking"
  | "reflection"
  | "completed";

/**
 * Runs a short interval while `endsAt` is set and calls `onTick` from the
 * interval callback. The countdown value itself is stored in state so it
 * can be derived from wall-clock time inside callbacks, never during render.
 */
function useTickInterval(endsAt: number | null, onTick: () => void) {
  useEffect(() => {
    if (endsAt === null) {
      return;
    }
    const interval = window.setInterval(onTick, 250);
    return () => window.clearInterval(interval);
  }, [endsAt, onTick]);
}

function remainingSeconds(endsAt: number | null, fallback: number | null) {
  if (endsAt === null) {
    return fallback;
  }
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

export function usePracticeSession() {
  const [stage, setStage] = useState<PracticeStage>("idle");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [preparationEndsAt, setPreparationEndsAt] = useState<number | null>(
    null,
  );
  const [preparationRemaining, setPreparationRemaining] = useState<
    number | null
  >(null);
  const [speakingEndsAt, setSpeakingEndsAt] = useState<number | null>(null);
  const [speakingRemaining, setSpeakingRemaining] = useState<number | null>(
    null,
  );
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [completedPracticeId, setCompletedPracticeId] = useState<string | null>(
    null,
  );

  const startSpeaking = useCallback(() => {
    const endsAt = Date.now() + DEFAULT_SETTINGS.speakingDurationSeconds * 1000;
    setPreparationEndsAt(null);
    setPreparationRemaining(null);
    setSpeakingEndsAt(endsAt);
    setSpeakingRemaining(DEFAULT_SETTINGS.speakingDurationSeconds);
    setStage("speaking");
  }, []);

  const finishSpeaking = useCallback(() => {
    setSpeakingEndsAt(null);
    setSpeakingRemaining(null);
    setStage("reflection");
  }, []);

  const tickPreparation = useCallback(() => {
    if (preparationEndsAt === null) {
      return;
    }
    const next = remainingSeconds(preparationEndsAt, null);
    setPreparationRemaining(next);
    if (next !== null && next <= 0) {
      startSpeaking();
    }
  }, [preparationEndsAt, startSpeaking]);

  const tickSpeaking = useCallback(() => {
    if (speakingEndsAt === null) {
      return;
    }
    const next = remainingSeconds(speakingEndsAt, null);
    setSpeakingRemaining(next);
    if (next !== null && next <= 0) {
      finishSpeaking();
    }
  }, [speakingEndsAt, finishSpeaking]);

  useTickInterval(preparationEndsAt, tickPreparation);
  useTickInterval(speakingEndsAt, tickSpeaking);

  const revealTopic = useCallback((selected: Topic) => {
    setTopic(selected);
    setStage("topic");
    setPreparationEndsAt(null);
    setPreparationRemaining(null);
    setSpeakingEndsAt(null);
    setSpeakingRemaining(null);
    setNotes("");
    setRating(null);
    setCompletedPracticeId(null);
  }, []);

  const beginPreparation = useCallback(() => {
    const endsAt =
      Date.now() + DEFAULT_SETTINGS.preparationDurationSeconds * 1000;
    setPreparationEndsAt(endsAt);
    setPreparationRemaining(DEFAULT_SETTINGS.preparationDurationSeconds);
    setStage("preparing");
  }, []);

  const complete = useCallback(() => {
    if (topic === null) {
      return;
    }
    const id = crypto.randomUUID();
    addGuestPractice({
      id,
      topicId: topic.id,
      practicedAt: new Date().toISOString(),
      rating,
    });
    setCompletedPracticeId(id);
    setNotes("");
    setStage("completed");
  }, [topic, rating]);

  const reset = useCallback(() => {
    setStage("idle");
    setTopic(null);
    setPreparationEndsAt(null);
    setPreparationRemaining(null);
    setSpeakingEndsAt(null);
    setSpeakingRemaining(null);
    setNotes("");
    setRating(null);
    setCompletedPracticeId(null);
  }, []);

  return {
    stage,
    topic,
    notes,
    rating,
    preparationRemaining,
    speakingRemaining,
    completedPracticeId,
    revealTopic,
    beginPreparation,
    startSpeaking,
    finishSpeaking,
    setNotes,
    setRating,
    complete,
    reset,
  };
}
