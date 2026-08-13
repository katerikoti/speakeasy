import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/passwords";
import {
  DEFAULT_SETTINGS,
  type PracticeSettings,
  type ParsedSettings,
} from "@/lib/settings";
import type { TopicCategory, TopicDifficulty } from "@/lib/topics";

export interface NewUserInput {
  email: string;
  password: string;
  name?: string;
}

/**
 * Creates a registered user together with their default practice settings.
 * Throws a Prisma known request error with code P2002 when the email exists.
 */
export async function createUserWithSettings(input: NewUserInput) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: input.email,
        passwordHash: await hashPassword(input.password),
        name: input.name?.trim() || null,
      },
    });
    await tx.userSettings.create({
      data: {
        userId: user.id,
        preparationDurationSeconds: DEFAULT_SETTINGS.preparationDurationSeconds,
        speakingDurationSeconds: DEFAULT_SETTINGS.speakingDurationSeconds,
        selectedCategories: [...DEFAULT_SETTINGS.selectedCategories],
        selectedDifficulties: [...DEFAULT_SETTINGS.selectedDifficulties],
      },
    });
    return user;
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true },
  });
}

/**
 * Reads a user's practice settings, or null when the user has none.
 */
export async function getSettingsForUser(
  userId: string,
): Promise<PracticeSettings | null> {
  const row = await prisma.userSettings.findUnique({ where: { userId } });
  if (!row) {
    return null;
  }
  return {
    preparationDurationSeconds: row.preparationDurationSeconds,
    speakingDurationSeconds: row.speakingDurationSeconds,
    selectedCategories: row.selectedCategories as TopicCategory[],
    selectedDifficulties: row.selectedDifficulties as TopicDifficulty[],
  };
}

/**
 * Persists a user's practice settings. The user's settings row is created by
 * createUserWithSettings, so it is expected to already exist.
 */
export function updateUserSettings(userId: string, input: ParsedSettings) {
  return prisma.userSettings.update({
    where: { userId },
    data: {
      preparationDurationSeconds: input.preparationDurationSeconds,
      speakingDurationSeconds: input.speakingDurationSeconds,
      selectedCategories: input.selectedCategories,
      selectedDifficulties: input.selectedDifficulties,
    },
  });
}
