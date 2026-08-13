"use client";

import { useSyncExternalStore } from "react";
import {
  EMPTY_GUEST_DATA,
  GUEST_DATA_EVENT,
  loadGuestData,
  type GuestData,
} from "@/lib/guestStorage";

function subscribeGuestData(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(GUEST_DATA_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(GUEST_DATA_EVENT, onStoreChange);
  };
}

/**
 * Reactive access to guest data. Safe for server rendering: the server
 * snapshot is always empty, and the client snapshot updates whenever guest
 * data changes (including writes from the same tab).
 */
export function useGuestData(): GuestData {
  return useSyncExternalStore(
    subscribeGuestData,
    loadGuestData,
    () => EMPTY_GUEST_DATA,
  );
}
