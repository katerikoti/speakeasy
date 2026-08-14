"use client";

import { useSyncExternalStore } from "react";

type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return "ios";
  }
  if (/Android/i.test(ua)) {
    return "android";
  }
  return "desktop";
}

function subscribe(): () => void {
  return () => {};
}

const GUIDE: Record<Platform, string[]> = {
  ios: [
    "Open this page in Safari.",
    'Tap the Share button at the bottom of the screen.',
    'Choose "Add to Home Screen".',
    'Tap "Add" in the top corner.',
  ],
  android: [
    "Open this page in Chrome.",
    'Tap the ⋮ menu in the top corner.',
    'Choose "Add to Home Screen" (or "Install app").',
    "Tap Add or Install.",
  ],
  desktop: [
    "Open this page in Chrome or Edge.",
    "Click the install icon in the address bar.",
    "Confirm to install Speakeasy.",
  ],
};

export function InstallGuide() {
  const platform = useSyncExternalStore(
    subscribe,
    detectPlatform,
    (): Platform => "desktop",
  );
  const steps = GUIDE[platform];

  return (
    <ol className="flex flex-col gap-2">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linen text-xs font-semibold text-ink-soft ring-1 ring-bone/60">
            {index + 1}
          </span>
          <span className="text-ink-soft">{step}</span>
        </li>
      ))}
    </ol>
  );
}
