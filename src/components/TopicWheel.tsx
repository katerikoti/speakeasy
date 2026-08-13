"use client";

import { useSyncExternalStore, useState } from "react";
import { WHEEL_SEGMENTS } from "@/lib/topicSelection";

const SEGMENTS = WHEEL_SEGMENTS;

const VISUAL_SLICES = 30;

const SLICE_COLORS = [
  "#F5EBE0",
  "#B3A18E",
  "#E3D5CA",
  "#9C8976",
  "#D6CCC2",
  "#C9BAA9",
];

const FULL_TURNS = 5;
const SPIN_MS = 4000;

function WheelPointer() {
  return (
    <svg
      viewBox="0 0 24 20"
      className="h-5 w-6"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M12 0 23 20H1Z"
        fill="#D5BDAF"
        stroke="#3F3A33"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const reducedMotionMedia = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function TopicWheel({
  onSpin,
  onSpinEnd,
}: {
  onSpin?: () => number;
  onSpinEnd?: () => void;
}) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const reducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    reducedMotionMedia,
    reducedMotionMedia,
  );

  function spin() {
    if (isSpinning) {
      return;
    }
    setIsSpinning(true);

    const targetSegment = onSpin
      ? onSpin()
      : Math.floor(Math.random() * SEGMENTS);
    const segmentCenter = (targetSegment + 0.5) * (360 / SEGMENTS);
    const targetModulo = (360 - segmentCenter) % 360;
    const currentModulo = ((rotation % 360) + 360) % 360;
    const delta = ((targetModulo - currentModulo) + 360) % 360;
    const nextRotation =
      rotation + delta + (reducedMotion ? 0 : FULL_TURNS * 360);

    setRotation(nextRotation);
    window.setTimeout(() => {
      setIsSpinning(false);
      onSpinEnd?.();
    }, reducedMotion ? 300 : SPIN_MS);
  }

  const gradientStops = Array.from({ length: VISUAL_SLICES }, (_, index) => {
    const start = (index / VISUAL_SLICES) * 100;
    const end = ((index + 1) / VISUAL_SLICES) * 100;
    const color = SLICE_COLORS[index % SLICE_COLORS.length];
    return `${color} ${start}% ${end}%`;
  }).join(", ");

  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80">
      <div className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2">
        <WheelPointer />
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={isSpinning}
        aria-label="Spin the wheel to pick a speaking topic"
        className="h-full w-full rounded-full shadow-[0_14px_40px_rgba(63,58,51,0.18)] transition-transform ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-almond-silk"
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: isSpinning
            ? reducedMotion
              ? "300ms"
              : `${SPIN_MS}ms`
            : "0ms",
          background: `conic-gradient(${gradientStops})`,
          transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.15, 1)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10 m-[26%] flex items-center justify-center rounded-full bg-linen shadow-[inset_0_1px_3px_rgba(63,58,51,0.1)] ring-1 ring-bone/70">
        <span className="font-display text-lg font-semibold tracking-wide text-ink">
          Spin
        </span>
      </div>
    </div>
  );
}
