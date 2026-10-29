"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TimerState } from "@/types";

const DEFAULT_FOCUS_SEC = 25 * 60;
const DEFAULT_BREAK_SEC = 5 * 60;

interface UseFocusTimerReturn extends TimerState {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
}

/**
 * Drives a Pomodoro-style focus/break timer. Pure interval logic lives here so
 * FocusTimer.tsx only has to render state, not manage setInterval directly.
 */
export function useFocusTimer(
  focusDurationSec: number = DEFAULT_FOCUS_SEC,
  breakDurationSec: number = DEFAULT_BREAK_SEC,
  onFocusSessionComplete?: (durationSec: number) => void
): UseFocusTimerReturn {
  const [state, setState] = useState<TimerState>({
    mode: "focus",
    status: "idle",
    secondsRemaining: focusDurationSec,
    focusDurationSec,
    breakDurationSec,
    sessionsCompleted: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTick, [clearTick]);

  const switchMode = useCallback(
    (prev: TimerState): TimerState => {
      const nextMode = prev.mode === "focus" ? "break" : "focus";
      const nextDuration =
        nextMode === "focus" ? prev.focusDurationSec : prev.breakDurationSec;
      if (prev.mode === "focus") {
        onFocusSessionComplete?.(prev.focusDurationSec);
      }
      return {
        ...prev,
        mode: nextMode,
        secondsRemaining: nextDuration,
        sessionsCompleted:
          prev.mode === "focus" ? prev.sessionsCompleted + 1 : prev.sessionsCompleted,
      };
    },
    [onFocusSessionComplete]
  );

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.secondsRemaining <= 1) {
        return switchMode(prev);
      }
      return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
    });
  }, [switchMode]);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    setState((prev) => ({ ...prev, status: "running" }));
    intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const pause = useCallback(() => {
    clearTick();
    setState((prev) => ({ ...prev, status: "paused" }));
  }, [clearTick]);

  const reset = useCallback(() => {
    clearTick();
    setState((prev) => ({
      ...prev,
      status: "idle",
      mode: "focus",
      secondsRemaining: prev.focusDurationSec,
    }));
  }, [clearTick]);

  const skip = useCallback(() => {
    setState((prev) => switchMode(prev));
  }, [switchMode]);

  return { ...state, start, pause, reset, skip };
}
