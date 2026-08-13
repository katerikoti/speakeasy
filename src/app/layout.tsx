import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { auth } from "@/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speakeasy",
  description: "Daily speaking practice, one spin at a time.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
