import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ShipyardFacility } from "./components/ShipyardFacility";
import { CameraControls } from "./components/CameraControls";

export default function App() {
  return (
    <div
      className="relative bg-linear-to-b from-sky-300 to-sky-100 overflow-auto"
      // ⬇️ This guarantees a tall page, independent of Tailwind height utilities
      style={{ width: "100vw", minHeight: "100vh" }}
    >
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
            <strong>💡 Tip:</strong> Hover to see labels, click buildings for details
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
            <span>Ships / Sea</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600" />
            <span>Cranes</span>
          </div>
        </div>
      </div>

      {/* Full-screen Canvas */}
      <Canvas
        // Important: inline style so R3F sees exact height
        style={{
          width: "100%",
          height: "80vh",   // <- make this bigger if you want, e.g. "250vh"
          display: "block",
        }}
        camera={{ position: [0, 260, 260], fov: 55 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[80, 140, 80]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-60, 80, -80]} intensity={0.3} />

          {/* Camera Controls */}
          <CameraControls />

          {/* Shipyard Facility (roads, buildings, ships, etc.) */}
          <ShipyardFacility />

          {/*
            ENVIRONMENT LAYOUT
            - Yard ground only covers the area where roads/buildings are.
            - Sea plane only on the left side where the 3 ships + barge sit.
            - A concrete quay edge between them.
          */}

          {/* Yard ground (LAND) – only under the yard */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[20, -0.1, 0]} // center of the yard
            receiveShadow
          >
            <planeGeometry args={[170, 320]} />
            <meshStandardMaterial color="#8b7355" />
          </mesh>

          {/* Sea (WATER) – only on one side with ships & barge */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-105, -0.12, 0]}
          >
            <planeGeometry args={[80, 320]} />
            <meshStandardMaterial
              color="#1e3a8a"
              opacity={0.9}
              transparent
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
