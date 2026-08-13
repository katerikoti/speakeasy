"use client";

import { useState } from "react";
import { localDayKey, longestStreak } from "@/lib/streak";
import { TOPICS, type Topic } from "@/lib/topics";
import { useGuestData } from "@/lib/useGuestData";

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

const TOPIC_BY_ID = new Map<string, Topic>(
  TOPICS.map((topic) => [topic.id, topic]),
);

function monthTitle(year: number, monthIndex: number): string {
  return new Date(year, monthIndex, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatDayKey(dayKey: string): string {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function PracticeCalendar() {
  const guestData = useGuestData();
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const todayKey = localDayKey(new Date());
  const [selectedKey, setSelectedKey] = useState<string | null>(
    guestData.practices.some(
      (practice) => localDayKey(new Date(practice.practicedAt)) === todayKey,
    )
      ? todayKey
      : null,
  );

  const practicesByDay = new Map<string, Topic[]>();
  for (const practice of guestData.practices) {
    const key = localDayKey(new Date(practice.practicedAt));
    const topic = TOPIC_BY_ID.get(practice.topicId);
    if (!topic) {
      continue;
    }
    const list = practicesByDay.get(key);
    if (list) {
      list.push(topic);
    } else {
      practicesByDay.set(key, [topic]);
    }
  }

  const completedKeys = new Set(practicesByDay.keys());

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const longest = longestStreak(
    guestData.practices.map((practice) => practice.practicedAt),
  );

  function goToPreviousMonth() {
    setMonth(new Date(year, monthIndex - 1, 1));
  }

  function goToNextMonth() {
    setMonth(new Date(year, monthIndex + 1, 1));
  }

  const leadingBlanks = Array.from({ length: firstWeekday }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const cells = [...leadingBlanks, ...days];

  const selectedTopics = selectedKey ? practicesByDay.get(selectedKey) : null;

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 pb-12 pt-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
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
            <path d="M15 4.5 8 12l7 7.5" />
          </svg>
        </button>
        <h1 className="font-display text-xl font-medium text-ink">
          {monthTitle(year, monthIndex)}
        </h1>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
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
            <path d="m9 4.5 7 7.5-7 7.5" />
          </svg>
        </button>
      </div>

      <div className="rounded-3xl bg-linen p-4 shadow-[0_10px_30px_rgba(63,58,51,0.1)] ring-1 ring-bone/60">
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink-soft">
          {WEEKDAY_LABELS.map((label, index) => (
            <span key={index} className="py-1">
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, index) => {
            if (day === null) {
              return <span key={`blank-${index}`} className="aspect-square" />;
            }
            const dayKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const completed = completedKeys.has(dayKey);
            const isToday = dayKey === todayKey;
            const isSelected = dayKey === selectedKey;
            if (!completed) {
              return (
                <span
                  key={dayKey}
                  className={`flex aspect-square items-center justify-center rounded-full text-sm tabular-nums text-ink-soft ${
                    isToday ? "ring-2 ring-almond-silk ring-offset-2 ring-offset-linen" : ""
                  }`}
                >
                  {day}
                </span>
              );
            }
            return (
              <button
                key={dayKey}
                type="button"
                onClick={() => setSelectedKey(dayKey)}
                aria-label={`${dayKey}, practiced, ${practicesByDay.get(dayKey)?.length ?? 0} topic${(practicesByDay.get(dayKey)?.length ?? 0) === 1 ? "" : "s"}`}
                aria-pressed={isSelected}
                className={`flex aspect-square items-center justify-center rounded-full text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-almond-silk ${
                  isSelected
                    ? "bg-ink font-medium text-parchment"
                    : "bg-almond-silk font-medium text-ink hover:bg-almond-cream"
                } ${isToday ? "ring-2 ring-almond-silk ring-offset-2 ring-offset-linen" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {selectedKey && selectedTopics ? (
        <div className="rounded-2xl bg-linen p-5 ring-1 ring-bone/60">
          <p className="text-sm font-medium text-ink-soft">
            {formatDayKey(selectedKey)}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {selectedTopics.map((topic) => (
              <li
                key={topic.id}
                className="flex items-start gap-2.5 font-display text-base leading-snug text-ink"
              >
                {selectedTopics.length > 1 ? (
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-almond-silk"
                  />
                ) : null}
                <span>{topic.prompt}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex items-center justify-between rounded-2xl bg-almond-cream/50 px-5 py-4 ring-1 ring-bone/50">
        <span className="text-sm text-ink-soft">Longest streak</span>
        <span className="font-display text-lg font-medium text-ink">
          {longest} day{longest === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
