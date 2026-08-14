import { prisma } from "@/lib/db";

export interface PracticeInput {
  userId: string;
  topicId: string;
  rating: number | null;
}

export function getPracticesForUser(userId: string) {
  return prisma.practice.findMany({
    where: { userId },
    orderBy: { practicedAt: "desc" },
  });
}

export function getCompletedTopicIds(userId: string): Promise<Set<string>> {
  return prisma.practice
    .findMany({
      where: { userId },
      select: { topicId: true },
    })
    .then((practices) => new Set(practices.map((practice) => practice.topicId)));
}

export function getPracticeDatesForUser(userId: string) {
  return prisma.practice.findMany({
    where: { userId },
    select: { practicedAt: true },
    orderBy: { practicedAt: "asc" },
  });
}

export function createPractice({ userId, topicId, rating }: PracticeInput) {
  return prisma.practice.create({
    data: { userId, topicId, rating },
  });
}

export function upsertPractice({
  id,
  userId,
  topicId,
  rating,
}: PracticeInput & { id: string }) {
  return prisma.practice.upsert({
    where: { id },
    create: { id, userId, topicId, rating },
    update: {},
  });
}
