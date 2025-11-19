// src/components/CameraControls.tsx
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CameraControls() {
  const { camera } = useThree();

  // Set a nice initial camera position & target
  useEffect(() => {
    camera.position.set(0, 260, 260);
    camera.lookAt(20, 0, 0); // roughly the center of the yard
  }, [camera]);

  return (
    <OrbitControls
      makeDefault
      // what you can do
      enableRotate
      enableZoom
      enablePan
      // how far you can zoom
      minDistance={40}
      maxDistance={400}
      // limit how far down you can look
      maxPolarAngle={Math.PI / 2.05}
      // where the camera orbits around (yard center)
      target={[20, 0, 0]}
    />
  );
}
