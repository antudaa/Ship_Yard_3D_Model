// src/components/Barge.tsx
import { useState } from "react";
import { Label } from "./Label";

interface BargeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
}

export function Barge({ position, rotation, label }: BargeProps) {
  const [hovered, setHovered] = useState(false);

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
      {/* Main flat platform */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[20, 3, 10]} />
        <meshStandardMaterial color="#57534e" />
      </mesh>

      {/* Deck */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[20, 1, 10]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>

      {/* Side Walls */}
      <mesh position={[0, 5, -5]} castShadow>
        <boxGeometry args={[20, 3, 0.5]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>
      <mesh position={[0, 5, 5]} castShadow>
        <boxGeometry args={[20, 3, 0.5]} />
        <meshStandardMaterial color="#78716c" />
      </mesh>

      {/* Small control cabin */}
      <mesh position={[-7, 6, 0]} castShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#d6d3d1" />
      </mesh>

      {/* Hover Label */}
      {hovered && (
        <Label position={[0, 10, 0]} text={label} />
      )}
    </group>
  );
}
