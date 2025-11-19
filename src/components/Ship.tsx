import { Label } from './Label';

interface ShipProps {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
}

export function Ship({ position, rotation, label }: ShipProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Hull - bottom */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[25, 4, 8]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Deck */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[25, 1, 8]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Cabin/Bridge */}
      <mesh position={[-6, 7, 0]} castShadow>
        <boxGeometry args={[8, 5, 6]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Smokestack */}
      <mesh position={[-6, 10.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 3, 8]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Cargo holds */}
      <mesh position={[5, 6, 0]} castShadow>
        <boxGeometry args={[10, 3, 6]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>

      {/* Label */}
      <Label 
        position={[position[0], position[1] + 14, position[2]]} 
        text={label}
        className="bg-blue-600 text-white" 
      />
    </group>
  );
}
