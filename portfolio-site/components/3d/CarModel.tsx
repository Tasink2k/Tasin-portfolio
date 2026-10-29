"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CarPaint } from "@/types";

const PAINT_HEX: Record<CarPaint, string> = {
  amber: "#E8A33D",
  teal: "#3FA9A0",
  graphite: "#3A4453",
  ivory: "#E9E4D8",
};

interface WheelProps {
  position: [number, number, number];
  spinning: boolean;
}

function Wheel({ position, spinning }: WheelProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (spinning && ref.current) {
      ref.current.rotation.x += delta * 6;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.42, 0.42, 0.32, 20]} />
      <meshStandardMaterial color="#14181F" roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

interface CarModelProps {
  paint: CarPaint;
  wheelsSpinning: boolean;
}

/**
 * A stylized, low-poly roadster built entirely from primitive geometries.
 * Kept dependency-free (no .glb fetch) so the hero scene never depends on
 * an external asset load succeeding.
 */
export function CarModel({ paint, wheelsSpinning }: CarModelProps) {
  const bodyColor = useMemo(() => PAINT_HEX[paint], [paint]);

  return (
    <group position={[0, -0.2, 0]}>
      {/* lower body */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.5, 1.4]} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.4} />
      </mesh>

      {/* cabin */}
      <mesh position={[-0.2, 0.78, 0]} castShadow>
        <boxGeometry args={[1.6, 0.45, 1.2]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* windshield */}
      <mesh position={[0.55, 0.78, 0]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.08, 0.5, 1.1]} />
        <meshStandardMaterial
          color="#9FD4EF"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* nose */}
      <mesh position={[1.55, 0.35, 0]} castShadow>
        <boxGeometry args={[0.4, 0.42, 1.3]} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.4} />
      </mesh>

      {/* headlights */}
      <mesh position={[1.76, 0.4, 0.45]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#F5F7FA" emissive="#F5F7FA" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[1.76, 0.4, -0.45]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#F5F7FA" emissive="#F5F7FA" emissiveIntensity={0.6} />
      </mesh>

      {/* wheels */}
      <Wheel position={[1.05, 0.05, 0.78]} spinning={wheelsSpinning} />
      <Wheel position={[1.05, 0.05, -0.78]} spinning={wheelsSpinning} />
      <Wheel position={[-1.05, 0.05, 0.78]} spinning={wheelsSpinning} />
      <Wheel position={[-1.05, 0.05, -0.78]} spinning={wheelsSpinning} />

      {/* ground contact shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.31, 0]} receiveShadow>
        <circleGeometry args={[2.6, 32]} />
        <meshStandardMaterial color="#0B1420" roughness={1} />
      </mesh>
    </group>
  );
}
