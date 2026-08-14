"use client";

import Image from "next/image";

export function ScrollTopLogo() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="flex shrink-0 cursor-pointer items-center gap-2"
    >
      <Image
        src="/logo.png"
        alt="Speakeasy logo"
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span className="font-display text-lg font-medium text-ink">
        Speakeasy
      </span>
    </button>
  );
}
