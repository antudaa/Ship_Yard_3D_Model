import { useState } from "react";
import { Label } from "./Label";

interface BuildingProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Building({
  position,
  size,
  color,
  label,
  onClick,
  children,
}: BuildingProps) {
  const [hovered, setHovered] = useState(false);
  const [width, height, depth] = size;

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
      <mesh position={[0, height / 2, 0]} castShadow onClick={onClick}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height + 0.3, 0]} castShadow>
        <boxGeometry args={[width + 0.5, 0.6, depth + 0.5]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Custom children (e.g. compartments, small sub-structures) */}
      {children}

      {/* Hover Label */}
      {hovered && <Label position={[0, height + 2, 0]} text={label} />}
    </group>
  );
}

// Label component for reuse with world coordinates
Building.Label = function BuildingLabel({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return <Label position={position} text={text} />;
};
