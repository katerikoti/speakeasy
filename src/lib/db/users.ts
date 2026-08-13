import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/passwords";
import { DEFAULT_SETTINGS } from "@/lib/settings";

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
