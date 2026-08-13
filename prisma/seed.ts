import { prisma } from "../src/lib/db";
import { TOPICS } from "../src/lib/topics";

async function main() {
  const count = await prisma.topic.count();
  if (count === TOPICS.length) {
    console.log(`Topics already seeded (${count}).`);
    return;
  }

  await prisma.topic.createMany({
    data: TOPICS,
    skipDuplicates: true,
  });

  const seeded = await prisma.topic.count();
  console.log(`Seeded ${seeded} topics.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
