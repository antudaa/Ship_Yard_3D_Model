import { Label } from './Label';

interface GateProps {
  position: [number, number, number];
  label: string;
  rotation: [number, number, number];
  isSmall?: boolean;
}

export function Gate({ position, label, rotation, isSmall = false }: GateProps) {
  const width = isSmall ? 6 : 12;
  const height = isSmall ? 5 : 8;

  return (
    <group position={position} rotation={rotation}>
      {/* Gate Posts */}
      <mesh position={[-width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} castShadow>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>

      {/* Top Bar */}
      <mesh position={[0, height, 0]} castShadow>
        <boxGeometry args={[width + 1, 0.6, 0.6]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>

      {/* Gate Doors */}
      <mesh position={[-width / 4, height / 2, 0]} castShadow>
        <boxGeometry args={[width / 2 - 0.5, height - 1, 0.3]} />
        <meshStandardMaterial color="#78716c" metalness={0.6} />
      </mesh>
      <mesh position={[width / 4, height / 2, 0]} castShadow>
        <boxGeometry args={[width / 2 - 0.5, height - 1, 0.3]} />
        <meshStandardMaterial color="#78716c" metalness={0.6} />
      </mesh>

      {/* Label */}
      <Label 
        position={[position[0], position[1] + height + 2, position[2]]} 
        text={label}
        className="bg-gray-800 text-white"
      />
    </group>
  );
}
