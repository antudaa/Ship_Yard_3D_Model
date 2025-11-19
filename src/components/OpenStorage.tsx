// src/components/OpenStorage.tsx
import { useState } from "react";
import { Label } from "./Label";

interface OpenStorageProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, wallHeight, depth]
  label: string;
  wallHeight: number;
  rotation?: [number, number, number]; // ⬅️ NEW
}

export function OpenStorage({
  position,
  size,
  label,
  wallHeight,
  rotation = [0, 0, 0],
}: OpenStorageProps) {
  const [hovered, setHovered] = useState(false);
  const [width, , depth] = size;

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* Floor */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[width, 0.2, depth]} />
        <meshStandardMaterial color="#84cc16" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-width / 2, wallHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.5, wallHeight, depth]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[width / 2, wallHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.5, wallHeight, depth]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {/* Hover Label (local coords so rotation works) */}
      {hovered && (
        <Label position={[0, wallHeight + 2, 0]} text={label} />
      )}
    </group>
  );
}
