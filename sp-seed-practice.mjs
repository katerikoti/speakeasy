import { PrismaClient } from "./src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const userId = "cmssmmjv80000q00xgwpdwlca";
const topic = await prisma.topic.findFirst();
const practice = await prisma.practice.upsert({
  where: { id: "e2e-practice-1" },
  create: {
    id: "e2e-practice-1",
    userId,
    topicId: topic.id,
    practicedAt: new Date(),
    rating: 4,
  },
  update: {},
});
console.log(JSON.stringify({ practiceId: practice.id, topicId: topic.id, prompt: topic.prompt, rating: practice.rating }));
await prisma.$disconnect();
