import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';


interface LabelProps {
  position: [number, number, number];
  text: string;
  className?: string;
}

export function Label({ position, text, className = '' }: LabelProps) {
  const { camera, size, gl } = useThree();
  const [element] = useState(() => document.createElement('div'));
  const [root] = useState(() => createRoot(element));

  useEffect(() => {
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none';
    gl.domElement.parentElement?.appendChild(element);

    return () => {
      gl.domElement.parentElement?.removeChild(element);
      root.unmount();
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const [x, y, z] = position;
      
      // Simple projection calculation
      const widthHalf = size.width / 2;
      const heightHalf = size.height / 2;

      // Calculate vector from camera to point
      const dx = x - camera.position.x;
      const dy = y - camera.position.y;
      const dz = z - camera.position.z;
      
      // Get camera direction
      camera.updateMatrixWorld();
      
      // Simple perspective projection
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const fov = (camera as any).fov || 50;
      const fovRad = (fov * Math.PI) / 180;
      const scale = Math.tan(fovRad / 2) * distance * 2;
      
      const screenX = widthHalf + (dx / scale) * size.width;
      const screenY = heightHalf - (dy / scale) * size.height;

      element.style.transform = `translate(-50%, -50%) translate(${screenX}px,${screenY}px)`;
    };

    updatePosition();
    const interval = setInterval(updatePosition, 16);
    return () => clearInterval(interval);
  }, [position, camera, size]);

  useEffect(() => {
    root.render(
      <div className={`bg-white/90 px-2 py-1 rounded text-xs whitespace-nowrap shadow-md ${className}`}>
        {text}
      </div>
    );
  }, [text, className]);

  return null;
}