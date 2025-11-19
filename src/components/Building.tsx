import { Label } from './Label';

interface BuildingProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, height, depth]
  color: string;
  label: string;
  icon?: string;
  onClick?: () => void;
}

export function Building({ position, size, color, label, icon, onClick }: BuildingProps) {
  const [width, height, depth] = size;

  return (
    <group position={position}>
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

      {/* Label */}
      <Label position={[position[0], position[1] + height + 2, position[2]]} text={label} />
    </group>
  );
}

// Label component for reuse
Building.Label = function BuildingLabel({ position, text }: { position: [number, number, number]; text: string }) {
  return <Label position={position} text={text} />;
};
