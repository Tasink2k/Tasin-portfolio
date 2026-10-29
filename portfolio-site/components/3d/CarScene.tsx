"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { CarModel } from "./CarModel";
import { CarHotspots } from "./CarHotspots";
import { CarConfigurator } from "./CarConfigurator";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { prefersReducedMotion, supportsWebGL } from "@/lib/utils";
import type { CarConfig, SceneStatus } from "@/types";

function SceneLoadingFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-amber" />
      <p className="text-xs">Assembling the scene…</p>
    </div>
  );
}

function SceneErrorFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface p-8 text-center">
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <rect x="6" y="14" width="44" height="12" rx="4" fill="#E8A33D" />
        <rect x="16" y="6" width="20" height="10" rx="3" fill="#E8A33D" />
        <circle cx="16" cy="28" r="5" fill="#14181F" />
        <circle cx="40" cy="28" r="5" fill="#14181F" />
      </svg>
      <p className="font-display text-sm text-ink">3D preview unavailable</p>
      <p className="max-w-xs text-xs text-muted">
        Your browser or device couldn&apos;t render the interactive model. Everything else on this
        site still works normally.
      </p>
    </div>
  );
}

const DEFAULT_CONFIG: CarConfig = {
  paint: "amber",
  wheelsSpinning: true,
  autoRotate: true,
};

export function CarScene() {
  const [status, setStatus] = useState<SceneStatus>("loading");
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [config, setConfig] = useState<CarConfig>(DEFAULT_CONFIG);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    const ok = supportsWebGL();
    setWebglOk(ok);
    if (!ok) setStatus("error");
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setConfig((prev) => ({ ...prev, autoRotate: false, wheelsSpinning: false }));
    }
  }, [reducedMotion]);

  if (webglOk === null) {
    return (
      <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[560px]">
        <SceneLoadingFallback />
      </div>
    );
  }

  if (webglOk === false || status === "error") {
    return (
      <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[560px]">
        <SceneErrorFallback />
      </div>
    );
  }

  return (
    <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[560px]">
      <CanvasErrorBoundary fallback={<SceneErrorFallback />} onError={() => setStatus("error")}>
        <Canvas
          shadows
          camera={{ position: [4.2, 1.6, 4.2], fov: 38 }}
          onCreated={() => setStatus("ready")}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 3]} intensity={1.1} castShadow />
          <Suspense fallback={null}>
            <CarModel paint={config.paint} wheelsSpinning={config.wheelsSpinning} />
            <CarHotspots />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            autoRotate={config.autoRotate}
            autoRotateSpeed={1.4}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </CanvasErrorBoundary>

      {status === "loading" && webglOk && (
        <div className="absolute inset-0">
          <SceneLoadingFallback />
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:w-64">
        <CarConfigurator config={config} onChange={setConfig} />
      </div>
    </div>
  );
}
