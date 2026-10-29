"use client";

import { useState } from "react";
import { FocusTimer } from "@/components/focus/FocusTimer";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { PerformanceChart } from "@/components/analytics/PerformanceChart";

/**
 * These aren't mockups — the timer really counts down, the board really
 * persists tasks (localStorage), and the chart reflects sessions you've
 * actually completed. refreshKey forces the chart to re-read the log.
 */
export function ToolkitSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section id="toolkit" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-2xl text-ink">A small toolkit, live</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Try these — they&apos;re fully working, not screenshots. Complete a focus session and
        watch it show up in the chart below.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <FocusTimer onSessionComplete={() => setRefreshKey((k) => k + 1)} />
        <PerformanceChart refreshKey={refreshKey} />
      </div>

      <div className="mt-6">
        <TaskBoard />
      </div>
    </section>
  );
}
