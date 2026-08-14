"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { upsertPractice } from "@/lib/db/practices";
import { updateUserSettings } from "@/lib/db/users";
import { validateSettings, type PracticeSettings } from "@/lib/settings";

export interface SettingsFormState {
  error?: string;
  settings?: PracticeSettings;
}

function parseSettingsForm(formData: FormData) {
  return {
    preparationDurationSeconds: Number(
      formData.get("preparationDurationSeconds"),
    ),
    speakingDurationSeconds: Number(formData.get("speakingDurationSeconds")),
    selectedCategories: formData.getAll("category").map(String),
    selectedDifficulties: formData.getAll("difficulty").map(String),
  };
}

export async function updateSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { error: "You need to be signed in to change settings." };
  }

  const validation = validateSettings(parseSettingsForm(formData));
  if (!validation.settings || validation.error) {
    return { error: validation.error };
  }

  await updateUserSettings(userId, {
    preparationDurationSeconds: validation.settings.preparationDurationSeconds,
    speakingDurationSeconds: validation.settings.speakingDurationSeconds,
    selectedCategories: [
      ...validation.settings.selectedCategories,
    ] as string[],
    selectedDifficulties: [...validation.settings.selectedDifficulties] as string[],
  });

  revalidatePath("/settings");
  return { settings: validation.settings };
}

export async function savePracticeAction(input: {
  id: string;
  topicId: string;
  rating: number | null;
}): Promise<{ ok: boolean }> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false };
  }
  if (
    typeof input.id !== "string" ||
    input.id.length === 0 ||
    typeof input.topicId !== "string"
  ) {
    return { ok: false };
  }
  if (
    input.rating !== null &&
    (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5)
  ) {
    return { ok: false };
  }

  const topicExists = await prisma.topic.findUnique({
    where: { id: input.topicId },
    select: { id: true },
  });
  if (!topicExists) {
    return { ok: false };
  }

  await upsertPractice({
    id: input.id,
    userId,
    topicId: input.topicId,
    rating: input.rating,
  });
  revalidatePath("/calendar");
  return { ok: true };
}

export async function migrateLatestPracticeAction(input: {
  id: string;
  topicId: string;
  practicedAt: string;
  rating: number | null;
}): Promise<{ ok: boolean }> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { ok: false };
  }
  if (
    typeof input.id !== "string" ||
    input.id.length === 0 ||
    typeof input.topicId !== "string"
  ) {
    return { ok: false };
  }
  const practicedAt = new Date(input.practicedAt);
  if (Number.isNaN(practicedAt.getTime())) {
    return { ok: false };
  }
  if (
    input.rating !== null &&
    (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5)
  ) {
    return { ok: false };
  }

  const topicExists = await prisma.topic.findUnique({
    where: { id: input.topicId },
    select: { id: true },
  });
  if (!topicExists) {
    return { ok: false };
  }

  await upsertPractice({
    id: input.id,
    userId,
    topicId: input.topicId,
    rating: input.rating,
    practicedAt,
  });
  revalidatePath("/calendar");
  return { ok: true };
}
