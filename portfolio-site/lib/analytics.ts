import type { DailyFocusPoint } from "@/types";

const LOG_KEY = "portfolio-focus-log";
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface SessionEntry {
  completedAt: number; // epoch ms
  durationSec: number;
}

function readLog(): SessionEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOG_KEY);
    return raw ? (JSON.parse(raw) as SessionEntry[]) : [];
  } catch {
    return [];
  }
}

/** Records a completed focus session so the analytics chart reflects real usage. */
export function logFocusSession(durationSec: number): void {
  if (typeof window === "undefined") return;
  const log = readLog();
  log.push({ completedAt: Date.now(), durationSec });
  try {
    window.localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-500)));
  } catch {
    // Non-fatal: the session still counted in this page's in-memory timer state.
  }
}

/** Aggregates the last 7 days of logged sessions into per-day focus minutes. */
export function getWeeklyFocusMinutes(): DailyFocusPoint[] {
  const log = readLog();
  const today = new Date();
  const points: DailyFocusPoint[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const dayEnd = day.getTime() + 24 * 60 * 60 * 1000;

    const minutes = log
      .filter((entry) => entry.completedAt >= day.getTime() && entry.completedAt < dayEnd)
      .reduce((sum, entry) => sum + entry.durationSec / 60, 0);

    points.push({ label: DAY_LABELS[day.getDay()], minutes: Math.round(minutes) });
  }

  return points;
}
