import { auth } from "@/auth";
import { HomeClient } from "@/components/HomeClient";
import { getSettingsForUser } from "@/lib/db/users";
import { DEFAULT_SETTINGS, type PracticeSettings } from "@/lib/settings";

export default async function HomePage() {
  const session = await auth();
  let settings: PracticeSettings = DEFAULT_SETTINGS;
  if (session?.user?.id) {
    settings = (await getSettingsForUser(session.user.id)) ?? DEFAULT_SETTINGS;
  }

  return <HomeClient settings={settings} />;
}
