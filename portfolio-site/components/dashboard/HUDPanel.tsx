import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface Stat {
  label: string;
  value: string;
  hint?: string;
}

interface HUDPanelProps {
  stats: Stat[];
  children?: ReactNode;
}

/** A row of compact readouts, styled like an instrument cluster. */
export function HUDPanel({ stats, children }: HUDPanelProps) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl text-ink">{stat.value}</p>
            <p className="text-xs text-muted">{stat.label}</p>
            {stat.hint && <p className="mt-0.5 text-[11px] text-teal">{stat.hint}</p>}
          </div>
        ))}
      </div>
      {children}
    </Card>
  );
}
