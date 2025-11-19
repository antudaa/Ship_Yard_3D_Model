// src/components/Crane.tsx
import { useState } from "react";
import { Label } from "./Label";

interface CraneProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
}

export function Crane({ position, height, color, label }: CraneProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* Base */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#52525b" />
      </mesh>

      {/* Main Tower */}
      <mesh position={[0, height / 2 + 1, 0]} castShadow>
        <boxGeometry args={[1.5, height, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Horizontal Boom */}
      <mesh position={[8, height + 1, 0]} castShadow>
        <boxGeometry args={[16, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Counter Boom */}
      <mesh position={[-4, height + 1, 0]} castShadow>
        <boxGeometry args={[8, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Cable */}
      <mesh position={[8, height / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, height, 8]} />
        <meshStandardMaterial color="#3f3f46" />
      </mesh>

      {/* Hook */}
      <mesh position={[8, 2, 0]} castShadow>
        <boxGeometry args={[1, 1.5, 1]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Hover Label */}
      {hovered && (
        <Label position={[0, height + 3, 0]} text={label} />
      )}
    </group>
  );
}
