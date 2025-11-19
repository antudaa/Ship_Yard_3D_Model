interface RoadProps {
  position: [number, number, number];
  size: [number, number, number]; // [width, height, depth]
}

export function Road({ position, size }: RoadProps) {
  const [width, height, depth] = size;
  const isHorizontal = width >= depth;

  const edgeThickness = 0.1;
  const lineHeight = height * 1.1;

  // Number of dashes based on the long side
  const long = isHorizontal ? width : depth;
  const dashCount = Math.max(4, Math.floor(long / 10));
  const dashLength = long / (dashCount * 2); // dash + gap

  const dashIndices = Array.from({ length: dashCount }, (_, i) => i);

  return (
    <group position={position}>
      {/* Base road surface */}
      <mesh receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#4b5563" roughness={0.95} />
      </mesh>

      {/* Side edge lines */}
      {isHorizontal ? (
        <>
          {/* top side (positive Z) */}
          <mesh position={[0, lineHeight, depth / 2 - edgeThickness / 2]}>
            <boxGeometry args={[width, edgeThickness, edgeThickness]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
          {/* bottom side (negative Z) */}
          <mesh position={[0, lineHeight, -depth / 2 + edgeThickness / 2]}>
            <boxGeometry args={[width, edgeThickness, edgeThickness]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
        </>
      ) : (
        <>
          {/* right side (positive X) */}
          <mesh position={[width / 2 - edgeThickness / 2, lineHeight, 0]}>
            <boxGeometry args={[edgeThickness, edgeThickness, depth]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
          {/* left side (negative X) */}
          <mesh position={[-width / 2 + edgeThickness / 2, lineHeight, 0]}>
            <boxGeometry args={[edgeThickness, edgeThickness, depth]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
        </>
      )}

      {/* Center dashed line */}
      {dashIndices.map((i) => {
        if (isHorizontal) {
          const segment = dashLength * 2;
          const x = -width / 2 + dashLength / 2 + i * segment;

          return (
            <mesh
              key={i}
              position={[x, lineHeight + 0.01, 0]}
            >
              <boxGeometry args={[dashLength, edgeThickness, edgeThickness]} />
              <meshStandardMaterial color="#f9fafb" />
            </mesh>
          );
        } else {
          const segment = dashLength * 2;
          const z = -depth / 2 + dashLength / 2 + i * segment;

          return (
            <mesh
              key={i}
              position={[0, lineHeight + 0.01, z]}
            >
              <boxGeometry args={[edgeThickness, edgeThickness, dashLength]} />
              <meshStandardMaterial color="#f9fafb" />
            </mesh>
          );
        }
      })}
    </group>
  );
}
