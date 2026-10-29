"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { getWeeklyFocusMinutes } from "@/lib/analytics";
import type { DailyFocusPoint } from "@/types";

interface PerformanceChartProps {
  /** Bump this to force a re-read of the log (e.g. after a session completes). */
  refreshKey?: number;
}

export function PerformanceChart({ refreshKey = 0 }: PerformanceChartProps) {
  const [data, setData] = useState<DailyFocusPoint[] | null>(null);

  useEffect(() => {
    setData(getWeeklyFocusMinutes());
  }, [refreshKey]);

  const hasActivity = data?.some((point) => point.minutes > 0);

  return (
    <Card>
      <p className="mb-1 font-display text-sm text-ink">Focus minutes, last 7 days</p>
      <p className="mb-4 text-xs text-muted">
        Logged automatically from completed sessions in the timer above.
      </p>

      {!data ? (
        <div className="flex h-48 items-center justify-center text-xs text-muted">Loading…</div>
      ) : !hasActivity ? (
        <div className="flex h-48 flex-col items-center justify-center gap-1 text-center">
          <p className="text-sm text-ink">No sessions logged yet</p>
          <p className="text-xs text-muted">Complete a focus session to see it charted here.</p>
        </div>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="label"
                stroke="#8B99AC"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#22344A" }}
              />
              <YAxis stroke="#8B99AC" fontSize={12} tickLine={false} axisLine={false} width={28} />
              <Tooltip
                contentStyle={{
                  background: "#101B2D",
                  border: "1px solid #22344A",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#EDF1F5",
                }}
                cursor={{ fill: "#152540" }}
              />
              <Bar dataKey="minutes" fill="#E8A33D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
