import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { createUserWithSettings } from "@/lib/db/users";
import { validateCredentials } from "@/lib/validators";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof (body as { email?: unknown })?.email === "string"
      ? ((body as { email: string }).email.trim().toLowerCase())
      : "";
  const password =
    typeof (body as { password?: unknown })?.password === "string"
      ? (body as { password: string }).password
      : "";
  const name =
    typeof (body as { name?: unknown })?.name === "string"
      ? (body as { name: string }).name.trim()
      : undefined;

  const error = validateCredentials({ email, password, name });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    const user = await createUserWithSettings({ email, password, name });
    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 },
    );
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }
    console.error("Registration failed:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
