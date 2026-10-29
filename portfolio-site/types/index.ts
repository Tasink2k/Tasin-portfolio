// ---------- Task Board ----------
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

// ---------- Focus Timer ----------
export type TimerMode = "focus" | "break";
export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  secondsRemaining: number;
  focusDurationSec: number;
  breakDurationSec: number;
  sessionsCompleted: number;
}

// ---------- Analytics ----------
export interface DailyFocusPoint {
  label: string; // e.g. "Mon"
  minutes: number;
}

// ---------- Car Configurator ----------
export type CarPaint = "amber" | "teal" | "graphite" | "ivory";

export interface CarHotspot {
  id: string;
  label: string;
  description: string;
  // position on the model, in local 3D space [x, y, z]
  position: [number, number, number];
}

export interface CarConfig {
  paint: CarPaint;
  wheelsSpinning: boolean;
  autoRotate: boolean;
}

// ---------- 3D loading ----------
export type SceneStatus = "loading" | "ready" | "error";
