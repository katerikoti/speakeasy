"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { TopicCard } from "@/components/TopicCard";
import { TopicWheel } from "@/components/TopicWheel";
import { TOPICS, type Topic } from "@/lib/topics";
import { segmentIndexForTopic, selectTopic } from "@/lib/topicSelection";

export default function Home() {
  const [revealedTopic, setRevealedTopic] = useState<Topic | null>(null);
  const [spinInProgress, setSpinInProgress] = useState(false);

  function handleSpin(): number {
    const topic = selectTopic(TOPICS, new Set<string>());
    if (!topic) {
      return 0;
    }
    setRevealedTopic(topic);
    setSpinInProgress(true);
    return segmentIndexForTopic(topic.id);
  }

  function handleSpinEnd() {
    setSpinInProgress(false);
  }

  const showTopic = revealedTopic !== null && !spinInProgress;

  return (
    <div className="flex min-h-dvh flex-col">
      <Header streak={0} />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-10 px-6 pb-16">
        <h1 className="text-center font-display text-3xl font-medium text-ink">
          What will you talk about today?
        </h1>
        <TopicWheel onSpin={handleSpin} onSpinEnd={handleSpinEnd} />
        {showTopic && <TopicCard topic={revealedTopic} />}
      </main>
    </div>
  );
}
