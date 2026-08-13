"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
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
