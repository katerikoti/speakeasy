import { auth } from "@/auth";
import { HomeClient } from "@/components/HomeClient";
import { getPracticesForUser } from "@/lib/db/practices";
import { getSettingsForUser } from "@/lib/db/users";
import type { GuestPractice } from "@/lib/guestStorage";
import { DEFAULT_SETTINGS, type PracticeSettings } from "@/lib/settings";

export default async function HomePage() {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  let settings: PracticeSettings = DEFAULT_SETTINGS;
  let initialPractices: GuestPractice[] = [];
  if (userId) {
    settings = (await getSettingsForUser(userId)) ?? DEFAULT_SETTINGS;
    const practices = await getPracticesForUser(userId);
    initialPractices = practices.map((practice) => ({
      id: practice.id,
      topicId: practice.topicId,
      practicedAt: practice.practicedAt.toISOString(),
      rating: practice.rating,
    }));
  }

  return <HomeClient settings={settings} initialPractices={initialPractices} />;
}
