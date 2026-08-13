import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const session = await getSessionUser();
  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10">
      <h1 className="font-lora text-3xl font-medium text-ink">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Your practice history can be saved and synced when you sign in.
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ink underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
