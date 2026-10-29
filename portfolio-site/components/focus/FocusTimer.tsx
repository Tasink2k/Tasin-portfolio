"use client";

import { useFocusTimer } from "@/hooks/useFocusTimer";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatSeconds } from "@/lib/utils";
import { logFocusSession } from "@/lib/analytics";

interface FocusTimerProps {
  onSessionComplete?: () => void;
}

export function FocusTimer({ onSessionComplete }: FocusTimerProps = {}) {
  const timer = useFocusTimer(undefined, undefined, (durationSec) => {
    logFocusSession(durationSec);
    onSessionComplete?.();
  });

  const totalForMode =
    timer.mode === "focus" ? timer.focusDurationSec : timer.breakDurationSec;
  const progress = 1 - timer.secondsRemaining / totalForMode;

  return (
    <Card className="flex flex-col items-center gap-5 text-center">
      <div>
        <p className="font-display text-sm uppercase tracking-wide text-teal">
          {timer.mode === "focus" ? "Focus session" : "Short break"}
        </p>
        <p className="text-xs text-muted">
          {timer.sessionsCompleted} session{timer.sessionsCompleted === 1 ? "" : "s"} completed
        </p>
      </div>

      <div className="relative">
        <ProgressRing
          progress={progress}
          size={168}
          strokeWidth={10}
          color={timer.mode === "focus" ? "#E8A33D" : "#3FA9A0"}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl text-ink">
            {formatSeconds(timer.secondsRemaining)}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {timer.status === "running" ? (
          <Button onClick={timer.pause}>Pause</Button>
        ) : (
          <Button onClick={timer.start}>
            {timer.status === "paused" ? "Resume" : "Start"}
          </Button>
        )}
        <Button variant="secondary" onClick={timer.skip}>
          Skip
        </Button>
        <Button variant="ghost" onClick={timer.reset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
