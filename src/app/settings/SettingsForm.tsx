"use client";

import { useActionState, useState } from "react";
import { updateSettingsAction, type SettingsFormState } from "@/app/actions";
import {
  PREPARATION_OPTIONS_MINUTES,
  SPEAKING_OPTIONS_MINUTES,
  minutesToSeconds,
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

function OptionRow({
  name,
  value,
  selected,
  onSelect,
  children,
}: {
  name: string;
  value: string;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ink ${
        selected
          ? "bg-ink text-parchment ring-ink"
          : "bg-linen text-ink ring-bone/60 hover:bg-almond-cream"
      }`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="text-sm font-medium leading-snug">{children}</span>
    </label>
  );
}

function DurationRow({
  name,
  value,
  selected,
  onSelect,
  children,
}: {
  name: string;
  value: number;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ink ${
        selected
          ? "bg-ink text-parchment ring-ink"
          : "bg-linen text-ink ring-bone/60 hover:bg-almond-cream"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="text-sm font-medium leading-snug">{children}</span>
    </label>
  );
}

export function SettingsForm({ initial }: { initial: PracticeSettings }) {
  const [settings, setSettings] = useState(initial);
  const [state, formAction, isPending] = useActionState<SettingsFormState, FormData>(
    updateSettingsAction,
    {},
  );

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
      className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-6 pb-12 md:max-w-2xl"
    >
      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Preparation duration
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {PREPARATION_OPTIONS_MINUTES.map((option) => {
            const seconds = minutesToSeconds(option);
            return (
              <DurationRow
                key={option}
                name="preparationDurationSeconds"
                value={seconds}
                selected={settings.preparationDurationSeconds === seconds}
                onSelect={() =>
                  setSettings((previous) => ({
                    ...previous,
                    preparationDurationSeconds: seconds,
                  }))
                }
              >
                {option} min
              </DurationRow>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Speaking duration
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {SPEAKING_OPTIONS_MINUTES.map((option) => {
            const seconds = minutesToSeconds(option);
            return (
              <DurationRow
                key={option}
                name="speakingDurationSeconds"
                value={seconds}
                selected={settings.speakingDurationSeconds === seconds}
                onSelect={() =>
                  setSettings((previous) => ({
                    ...previous,
                    speakingDurationSeconds: seconds,
                  }))
                }
              >
                {option} min
              </DurationRow>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Categories
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {TOPIC_CATEGORIES.map((category) => {
            const selected = settings.selectedCategories.includes(category);
            return (
              <OptionRow
                key={category}
                name="category"
                value={category}
                selected={selected}
                onSelect={() => toggleCategory(category)}
              >
                {CATEGORY_LABELS[category]}
              </OptionRow>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink-soft">
          Difficulty
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {TOPIC_DIFFICULTIES.map((difficulty) => {
            const selected = settings.selectedDifficulties.includes(difficulty);
            return (
              <OptionRow
                key={difficulty}
                name="difficulty"
                value={difficulty}
                selected={selected}
                onSelect={() => toggleDifficulty(difficulty)}
              >
                {DIFFICULTY_LABELS[difficulty]}
              </OptionRow>
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
        className="cursor-pointer rounded-full bg-ink px-8 py-3 font-medium text-parchment shadow-sm transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
