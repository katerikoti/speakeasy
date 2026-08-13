import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Returns the id of the authenticated user or redirects to the login page.
 *
 * Only for server-side use. The id always comes from the authenticated
 * session and is never trusted from the client.
 */
export async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session.user.id;
}

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}
