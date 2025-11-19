// src/components/Ship.tsx
import { useState } from "react";
import { Label } from "./Label";

interface ShipProps {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
}

export function Ship({ position, rotation, label }: ShipProps) {
  const [hovered, setHovered] = useState(false);

  // World-space label position (above the center of the ship)
  const labelPosition: [number, number, number] = [
    position[0],
    position[1] + 16,
    position[2],
  ];

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
      {/* ========= HULL (UNDER WATER LINE) ========= */}
      <mesh position={[0, 1.8, 0]} castShadow>
        {/* length, height, width */}
        <boxGeometry args={[28, 3, 7]} />
        <meshStandardMaterial
          color="#020617" // very dark blue
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* RED WATERLINE STRIPE */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[28, 0.4, 7.2]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* ========= MAIN UPPER HULL ========= */}
      <mesh position={[0, 4.3, 0]} castShadow>
        <boxGeometry args={[26, 2.2, 6.4]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Tapered bow (front) */}
      <mesh position={[13, 4.0, 0]} rotation={[0, 0, -Math.PI / 10]} castShadow>
        <boxGeometry args={[8, 2.4, 5.6]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Tapered stern (back) */}
      <mesh position={[-13, 4.0, 0]} rotation={[0, 0, Math.PI / 10]} castShadow>
        <boxGeometry args={[8, 2.4, 5.6]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* ========= MAIN DECK ========= */}
      <mesh position={[0, 5.6, 0]} castShadow>
        <boxGeometry args={[25, 0.6, 6.2]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* Side rails */}
      <mesh position={[0, 6.0, 3.2]} castShadow>
        <boxGeometry args={[24.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>
      <mesh position={[0, 6.0, -3.2]} castShadow>
        <boxGeometry args={[24.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      {/* ========= BRIDGE / SUPERSTRUCTURE ========= */}
      {/* Lower bridge block */}
      <mesh position={[-5, 7.1, 0]} castShadow>
        <boxGeometry args={[9, 2.4, 5]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Upper bridge (wheelhouse) */}
      <mesh position={[-5, 8.6, 0]} castShadow>
        <boxGeometry args={[6, 1.8, 4]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      {/* Front windows */}
      <mesh position={[-8, 8.6, 0]} castShadow>
        <boxGeometry args={[0.1, 1.2, 2.8]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>

      {/* Side windows */}
      <mesh position={[-5, 8.6, 2]} castShadow>
        <boxGeometry args={[3.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
      <mesh position={[-5, 8.6, -2]} castShadow>
        <boxGeometry args={[3.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>

      {/* Funnel / smokestack */}
      <mesh position={[-2, 9.8, 0]} castShadow>
        <cylinderGeometry args={[0.7, 1.1, 3, 12]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* ========= CARGO AREA ========= */}
      {/* Main cargo block */}
      <mesh position={[6.5, 7.0, 0]} castShadow>
        <boxGeometry args={[11, 2.8, 5.4]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>

      {/* Simple container stacks for detail */}
      <mesh position={[6.5, 8.5, 1.3]} castShadow>
        <boxGeometry args={[3.4, 1.2, 2.2]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      <mesh position={[6.5, 8.5, -1.3]} castShadow>
        <boxGeometry args={[3.4, 1.2, 2.2]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>

      {/* ========= MAST ========= */}
      <mesh position={[-1, 9.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.8, 8]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      <mesh position={[-1, 10.9, 0]} castShadow>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial emissive="#facc15" color="#fef9c3" />
      </mesh>

      {/* ========= HOVER LABEL ========= */}
      {hovered && <Label position={labelPosition} text={label} />}
    </group>
  );
}
