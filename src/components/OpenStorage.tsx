import { Label } from './Label';

interface OpenStorageProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, wallHeight, depth]
  label: string;
  wallHeight: number;
}

export function OpenStorage({ position, size, label, wallHeight }: OpenStorageProps) {
  const [width, _, depth] = size;
  
  return (
    <group position={position}>
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

      {/* Label */}
      <Label position={[position[0], position[1] + wallHeight + 2, position[2]]} text={label} />
    </group>
  );
}
