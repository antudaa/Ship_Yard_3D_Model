// src/components/Building.tsx
import { useState } from "react";
import { Label } from "./Label";

interface BuildingProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, height, depth]
  color: string;
  label: string;
  icon?: string;
  onClick?: () => void;
}

export function Building({
  position,
  size,
  color,
  label,
  icon,
  onClick,
}: BuildingProps) {
  const [width, height, depth] = size;
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
      {/* Main Building */}
      <mesh
        position={[0, height / 2, 0]}
        castShadow
        onClick={onClick}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <boxGeometry args={[width + 0.5, 0.6, depth + 0.5]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Optional icon on roof (simple little box, you can enhance later) */}
      {icon && (
        <mesh position={[0, height + 1.2, 0]} castShadow>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      )}

      {/* Hover Label (LOCAL position, not world) */}
      {hovered && (
        <Label position={[0, height + 2, 0]} text={label} />
      )}
    </group>
  );
}

// Helper label component you use in ShipyardFacility on custom groups
Building.Label = function BuildingLabel({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return <Label position={position} text={text} />;
};
