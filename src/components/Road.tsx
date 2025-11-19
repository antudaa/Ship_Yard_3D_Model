interface RoadProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, height, depth]
}

export function Road({ position, size }: RoadProps) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#4b5563" roughness={0.9} />
    </mesh>
  );
}
