import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await getSessionUser();
  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10 md:max-w-2xl">
      <h1 className="font-lora text-3xl font-medium text-ink md:text-4xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Sign in to keep your practice streak synced across devices.
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-ink-soft">
        No account yet?{" "}
        <Link href="/register" className="font-medium text-ink underline underline-offset-4">
          Create one
        </Link>
      </p>
    </div>
  );
}
