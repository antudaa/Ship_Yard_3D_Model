import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ShipyardFacility } from "./components/ShipyardFacility";
import { CameraControls } from "./components/CameraControls";

export default function App() {
  return (
    <div className="relative w-full m-10 h-full bg-gradient-to-b from-sky-300 to-sky-100 overflow-hidden">
      {/* Controls Info */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10 max-w-sm">
        <h2 className="mb-2 font-semibold">🏭 Shipyard Facility 3D Map</h2>
        <div className="text-sm space-y-1">
          <p>
            <strong>🖱️ Left Click + Drag:</strong> Rotate view
          </p>
          <p>
            <strong>🖱️ Right Click + Drag:</strong> Pan around
          </p>
          <p>
            <strong>🖱️ Scroll:</strong> Zoom in/out
          </p>
          <p>
            <strong>💡 Tip:</strong> Click on buildings to see details
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10">
        <h3 className="mb-2 font-semibold">Legend</h3>
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-600" />
            <span>Buildings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600" />
            <span>Roads</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-500" />
            <span>Open Storage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600" />
            <span>Ships/Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600" />
            <span>Cranes</span>
          </div>
        </div>
      </div>

      {/* Full-height Canvas */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 200, 200], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[50, 100, 50]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-50, 50, -50]} intensity={0.3} />

          {/* Camera Controls */}
          <CameraControls />

          {/* Shipyard Facility */}
          <ShipyardFacility />

          {/* Ground */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.1, 0]}
            receiveShadow
          >
            <planeGeometry args={[300, 300]} />
            <meshStandardMaterial color="#8b7355" />
          </mesh>

          {/* Water on side */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-80, -0.05, 0]}>
            {/* width along X, length along Z */}
            <planeGeometry args={[60, 300]} />
            <meshStandardMaterial color="#1e40af" opacity={0.7} transparent />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
