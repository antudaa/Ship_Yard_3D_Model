import { Billboard, Text } from "@react-three/drei";

type Vec3 = [number, number, number];

interface LabelProps {
  position: Vec3;
  text?: string;
  className?: string;
}

export function Label({ position, text }: LabelProps) {
  if (!text) return null;

  return (
    <Billboard
      position={position}
      follow
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <Text
        fontSize={1.6}
        color="#111827"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.035}
        outlineColor="#f9fafb"
        renderOrder={999}
      >
        {text}
      </Text>
    </Billboard>
  );
}
