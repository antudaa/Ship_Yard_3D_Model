import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export function CameraControls() {
  const { camera, gl } = useThree();
  const [isRotating, setIsRotating] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0, z: 0 });
  const sphericalRef = useRef({ radius: 212, theta: 0.785, phi: 0.785 });

  const handlePointerDown = (e: PointerEvent) => {
    if (e.button === 0) {
      setIsRotating(true);
    } else if (e.button === 2) {
      setIsPanning(true);
    }
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: PointerEvent) => {
    const deltaX = e.clientX - lastMouse.current.x;
    const deltaY = e.clientY - lastMouse.current.y;

    if (isRotating) {
      sphericalRef.current.theta -= deltaX * 0.005;
      sphericalRef.current.phi -= deltaY * 0.005;
      sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2.1, sphericalRef.current.phi));
    }

    if (isPanning) {
      const panSpeed = 0.5;
      const forward = {
        x: Math.sin(sphericalRef.current.theta),
        z: Math.cos(sphericalRef.current.theta)
      };
      const right = {
        x: -forward.z,
        z: forward.x
      };
      
      targetRef.current.x += right.x * -deltaX * panSpeed;
      targetRef.current.z += right.z * -deltaX * panSpeed;
      targetRef.current.y += deltaY * panSpeed;
    }

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsRotating(false);
    setIsPanning(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    sphericalRef.current.radius = Math.max(20, Math.min(300, sphericalRef.current.radius + e.deltaY * 0.1));
  };

  useFrame(() => {
    const { radius, theta, phi } = sphericalRef.current;
    const target = targetRef.current;
    
    // Convert spherical to cartesian
    const x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    const y = target.y + radius * Math.cos(phi);
    const z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    
    camera.position.set(x, y, z);
    camera.lookAt(target.x, target.y, target.z);
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [isRotating, isPanning]);

  return null;
}
