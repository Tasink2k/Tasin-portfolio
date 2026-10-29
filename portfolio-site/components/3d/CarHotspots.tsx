"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";
import type { CarHotspot } from "@/types";

const HOTSPOTS: CarHotspot[] = [
  {
    id: "shell",
    label: "Body shell",
    description: "Every panel is a Three.js primitive — no external .glb file to fetch or fail.",
    position: [0, 0.9, 0.75],
  },
  {
    id: "cabin",
    label: "Render loop",
    description: "React Three Fiber drives the scene graph; state changes re-render only what moved.",
    position: [-0.2, 1.15, 0],
  },
  {
    id: "wheel",
    label: "Wheel animation",
    description: "Rotation runs on useFrame with a delta-time step, and respects reduced-motion.",
    position: [1.05, 0.4, 0.95],
  },
];

export function CarHotspots() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      {HOTSPOTS.map((spot) => {
        const isActive = activeId === spot.id;
        return (
          <Html key={spot.id} position={spot.position} center distanceFactor={8} zIndexRange={[10, 0]}>
            <button
              type="button"
              onClick={() => setActiveId(isActive ? null : spot.id)}
              aria-expanded={isActive}
              aria-label={`${spot.label} details`}
              className="group relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-amber bg-base/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {isActive && (
                <span className="absolute left-1/2 top-5 w-48 -translate-x-1/2 rounded-md border border-border bg-surface p-3 text-left shadow-lg">
                  <span className="block font-display text-xs font-medium text-ink">{spot.label}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted">{spot.description}</span>
                </span>
              )}
            </button>
          </Html>
        );
      })}
    </>
  );
}
