"use client";

import type { CarConfig, CarPaint } from "@/types";
import { cn } from "@/lib/utils";

const PAINT_OPTIONS: { id: CarPaint; label: string; swatch: string }[] = [
  { id: "amber", label: "Amber", swatch: "#E8A33D" },
  { id: "teal", label: "Teal", swatch: "#3FA9A0" },
  { id: "graphite", label: "Graphite", swatch: "#3A4453" },
  { id: "ivory", label: "Ivory", swatch: "#E9E4D8" },
];

interface CarConfiguratorProps {
  config: CarConfig;
  onChange: (config: CarConfig) => void;
}

/** Presentation-only controls; all state lives with the caller (CarScene). */
export function CarConfigurator({ config, onChange }: CarConfiguratorProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface/90 p-4 backdrop-blur">
      <div>
        <p className="mb-2 text-xs text-muted">Paint</p>
        <div className="flex gap-2">
          {PAINT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange({ ...config, paint: option.id })}
              aria-label={`${option.label} paint`}
              aria-pressed={config.paint === option.id}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                config.paint === option.id ? "border-ink scale-110" : "border-border"
              )}
              style={{ backgroundColor: option.swatch }}
            />
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between text-xs text-muted">
        Spin wheels
        <input
          type="checkbox"
          checked={config.wheelsSpinning}
          onChange={(e) => onChange({ ...config, wheelsSpinning: e.target.checked })}
          className="h-4 w-4 accent-amber"
        />
      </label>

      <label className="flex items-center justify-between text-xs text-muted">
        Auto-rotate view
        <input
          type="checkbox"
          checked={config.autoRotate}
          onChange={(e) => onChange({ ...config, autoRotate: e.target.checked })}
          className="h-4 w-4 accent-amber"
        />
      </label>
    </div>
  );
}
