// src/components/OpenBuilding.tsx
import { useState, type FC, type JSX, type ReactNode } from "react";
import { Label } from "./Label";

interface OpenBuildingProps {
  position: [number, number, number];
  rotation?: [number, number, number]; // allow rotation
  size: [number, number, number];      // [width (X), wall height (Y), depth (Z)]
  color: string;
  label: string;
  onClick?: () => void;
  children?: ReactNode;                // inner compartments / custom meshes
}

// Base functional component
const OpenBuildingBase: FC<OpenBuildingProps> = ({
  position,
  rotation,
  size,
  color,
  label,
  onClick,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  const [width, height, depth] = size;

  const wallThickness = 0.4;
  const floorThickness = 0.3;

  return (
    <group
      position={position}
      rotation={rotation ?? [0, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* FLOOR */}
      <mesh
        position={[0, floorThickness / 2, 0]}
        receiveShadow
        onClick={onClick}
      >
        <boxGeometry args={[width, floorThickness, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* TWO SIDE WALLS ONLY (open front & back) */}
      {/* Left wall (−X side) */}
      <mesh position={[-width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[wallThickness, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right wall (+X side) */}
      <mesh position={[width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[wallThickness, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Custom interior */}
      {children}

      {/* Hover label (local, above center) */}
      {hovered && <Label position={[0, height + 2, 0]} text={label} />}
    </group>
  );
};

// Type for the component with a static .Label helper
interface OpenBuildingComponent extends FC<OpenBuildingProps> {
  Label: (props: { position: [number, number, number]; text: string }) => JSX.Element;
}

// Export with a typed static Label (no `any`)
export const OpenBuilding: OpenBuildingComponent = Object.assign(
  OpenBuildingBase,
  {
    Label: ({ position, text }: { position: [number, number, number]; text: string }) => (
      <Label position={position} text={text} />
    ),
  }
);
