"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { savePracticeAction } from "@/app/actions";
import { Header } from "@/components/Header";
import { SignUpPromptModal } from "@/components/practice/SignUpPromptModal";
import { TopicCard } from "@/components/TopicCard";
import { TopicWheel } from "@/components/TopicWheel";
import { CompletedStage } from "@/components/practice/CompletedStage";
import { CountdownStage } from "@/components/practice/CountdownStage";
import { PreparationStage } from "@/components/practice/PreparationStage";
import { ReflectionStage } from "@/components/practice/ReflectionStage";
import { SpeakingStage } from "@/components/practice/SpeakingStage";
import { usePracticeSession } from "@/components/practice/usePracticeSession";
import {
  addGuestPractice,
  completedTopicIdsFrom,
  type GuestPractice,
} from "@/lib/guestStorage";
import type { PracticeSettings } from "@/lib/settings";
import { currentStreak } from "@/lib/streak";
import { TOPICS } from "@/lib/topics";
import { segmentIndexForTopic, selectTopic } from "@/lib/topicSelection";
import { useGuestData } from "@/lib/useGuestData";

export function HomeClient({
  settings,
  initialPractices = [],
}: {
  settings: PracticeSettings;
  initialPractices?: GuestPractice[];
}) {
  const session = usePracticeSession(settings);
  const guestData = useGuestData();
  const { status } = useSession();
  const [accountPractices, setAccountPractices] =
    useState<GuestPractice[]>(initialPractices);
  const [spinInProgress, setSpinInProgress] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(true);
  const [signUpPromptDismissed, setSignUpPromptDismissed] = useState(false);

  const isAuthenticated = status === "authenticated";
  const practices = isAuthenticated ? accountPractices : guestData.practices;

  const streak = currentStreak(
    practices.map((practice) => practice.practicedAt),
  );

  function handlePersistPractice(practice: GuestPractice) {
    if (isAuthenticated) {
      setAccountPractices((previous) => [...previous, practice]);
      void savePracticeAction({
        id: practice.id,
        topicId: practice.topicId,
        rating: practice.rating,
      });
    } else {
      addGuestPractice(practice);
    }
  }

  function handleSpin(): number {
    const topic = selectTopic(
      TOPICS,
      completedTopicIdsFrom({ version: 1, practices }),
      {
        categories: settings.selectedCategories,
        difficulties: settings.selectedDifficulties,
      },
    );
    if (!topic) {
      return 0;
    }
    session.revealTopic(topic);
    setSpinInProgress(true);
    return segmentIndexForTopic(topic.id);
  }

  function handlePracticeAgain() {
    session.reset();
    setWheelOpen(true);
  }

  const { stage, topic } = session;

  const showSignUpPrompt =
    !isAuthenticated &&
    !signUpPromptDismissed &&
    guestData.practices.length === 1;

  if (stage === "preparing" && topic) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header streak={streak} />
        <PreparationStage
          topic={topic}
          remainingSeconds={session.preparationRemaining ?? 0}
          notes={session.notes}
          onNotesChange={session.setNotes}
          onStartSpeaking={session.startSpeaking}
        />
      </div>
    );
  }

  if (stage === "countdown" && topic) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header streak={streak} />
        <CountdownStage remainingSeconds={session.countdownRemaining ?? 3} />
      </div>
    );
  }

  if (stage === "speaking" && topic) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header streak={streak} />
        <SpeakingStage
          topic={topic}
          remainingSeconds={session.speakingRemaining ?? 0}
          notes={session.notes}
          onFinishEarly={session.finishSpeaking}
        />
      </div>
    );
  }

  if (stage === "reflection" && topic) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header streak={streak} />
        <ReflectionStage
          rating={session.rating}
          onRate={session.setRating}
          onComplete={() => session.complete(handlePersistPractice)}
        />
      </div>
    );
  }

  if (stage === "completed" && topic) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Header streak={streak} />
        <CompletedStage
          topic={topic}
          rating={session.rating}
          isGuest={!isAuthenticated}
          onPracticeAgain={handlePracticeAgain}
        />
        {showSignUpPrompt ? (
          <SignUpPromptModal
            onClose={() => setSignUpPromptDismissed(true)}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Header streak={streak} />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-10 px-6 pb-16 md:max-w-2xl">
        <h1 className="text-center font-display text-3xl font-medium text-ink md:text-4xl">
          What will you talk about today?
        </h1>
        {wheelOpen ? (
          <TopicWheel
            onSpin={handleSpin}
            onSpinEnd={() => {
              setSpinInProgress(false);
              setWheelOpen(false);
            }}
          />
        ) : null}
        {stage === "topic" && topic && !spinInProgress ? (
          <div className="flex flex-col items-center gap-5">
            <TopicCard topic={topic} />
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={session.beginPreparation}
                className="rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft"
              >
                Start preparing
              </button>
              <button
                type="button"
                onClick={() => setWheelOpen(true)}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Spin again
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
