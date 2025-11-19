// src/components/Label.tsx
import { Text } from "@react-three/drei";

interface LabelProps {
  position: [number, number, number];
  text: string;
  className?: string; // kept for compatibility with old props, not used
}

export function Label({ position, text }: LabelProps) {
  return (
    <Text
      position={position}
      fontSize={2}
      color="#111827"          // dark gray
      anchorX="center"
      anchorY="bottom"
      outlineWidth={0.04}
      outlineColor="white"
    >
      {text}
    </Text>
  );
}
