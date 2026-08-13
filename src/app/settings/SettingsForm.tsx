"use client";

import { useActionState, useState } from "react";
import { updateSettingsAction, type SettingsFormState } from "@/app/actions";
import {
  PREPARATION_OPTIONS,
  SPEAKING_OPTIONS,
  type PracticeSettings,
} from "@/lib/settings";
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  TOPIC_CATEGORIES,
  TOPIC_DIFFICULTIES,
  type TopicCategory,
  type TopicDifficulty,
} from "@/lib/topics";

function OptionPill({
  selected,
  children,
}: {
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors focus-within:ring-2 focus-within:ring-almond-silk ${
        selected
          ? "bg-ink text-parchment ring-ink"
          : "bg-linen text-ink ring-bone/60 hover:bg-almond-cream"
      }`}
    >
      {children}
    </span>
  );
}

export function SettingsForm({ initial }: { initial: PracticeSettings }) {
  const [settings, setSettings] = useState(initial);
  const [state, formAction, isPending] = useActionState<SettingsFormState, FormData>(
    updateSettingsAction,
    {},
  );

  function setPreparationDurationSeconds(value: number) {
    setSettings((previous) => ({
      ...previous,
      preparationDurationSeconds: value,
    }));
  }

  function setSpeakingDurationSeconds(value: number) {
    setSettings((previous) => ({ ...previous, speakingDurationSeconds: value }));
  }

  function toggleCategory(category: TopicCategory) {
    setSettings((previous) => {
      const has = previous.selectedCategories.includes(category);
      return {
        ...previous,
        selectedCategories: has
          ? previous.selectedCategories.filter((item) => item !== category)
          : [...previous.selectedCategories, category],
      };
    });
  }

  function toggleDifficulty(difficulty: TopicDifficulty) {
    setSettings((previous) => {
      const has = previous.selectedDifficulties.includes(difficulty);
      return {
        ...previous,
        selectedDifficulties: has
          ? previous.selectedDifficulties.filter((item) => item !== difficulty)
          : [...previous.selectedDifficulties, difficulty],
      };
    });
  }

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 pb-12"
    >
      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Preparation duration
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PREPARATION_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="preparationDurationSeconds"
                value={option}
                checked={settings.preparationDurationSeconds === option}
                onChange={() => setPreparationDurationSeconds(option)}
                className="sr-only"
              />
              <OptionPill selected={settings.preparationDurationSeconds === option}>
                {option}s
              </OptionPill>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Speaking duration
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SPEAKING_OPTIONS.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="speakingDurationSeconds"
                value={option}
                checked={settings.speakingDurationSeconds === option}
                onChange={() => setSpeakingDurationSeconds(option)}
                className="sr-only"
              />
              <OptionPill selected={settings.speakingDurationSeconds === option}>
                {option}s
              </OptionPill>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Categories
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPIC_CATEGORIES.map((category) => {
            const selected = settings.selectedCategories.includes(category);
            return (
              <label key={category}>
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  checked={selected}
                  onChange={() => toggleCategory(category)}
                  className="sr-only"
                />
                <OptionPill selected={selected}>
                  {CATEGORY_LABELS[category]}
                </OptionPill>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Difficulty
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPIC_DIFFICULTIES.map((difficulty) => {
            const selected = settings.selectedDifficulties.includes(difficulty);
            return (
              <label key={difficulty}>
                <input
                  type="checkbox"
                  name="difficulty"
                  value={difficulty}
                  checked={selected}
                  onChange={() => toggleDifficulty(difficulty)}
                  className="sr-only"
                />
                <OptionPill selected={selected}>
                  {DIFFICULTY_LABELS[difficulty]}
                </OptionPill>
              </label>
            );
          })}
        </div>
      </fieldset>

      {state.error ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      {state.settings ? (
        <p className="text-sm text-ink-soft">Settings saved.</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
