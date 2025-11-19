// src/components/ShipyardFacility.tsx
import { useState } from "react";

import { Building } from "./Building";
import { Road } from "./Road";
import { OpenStorage } from "./OpenStorage";
import { Ship } from "./Ship";
import { Crane } from "./Crane";
import { Gate } from "./Gate";
import { Barge } from "./Barge";

const ROAD_W = 4;

// Coordinates tuned to roughly match your plan.
// You can still tweak these later.
const EAST_ROAD_X = 90; // east perimeter road center
const CENTRAL_ROAD_X = 20; // central spine
const WEST_ROAD_X = -50; // west internal road

const BOTTOM_ROAD_Z = -60;
const MID_ROAD_Z = 0;
const TOP_ROAD_Z = 60;

// Helpers
const hCenterX = (WEST_ROAD_X + EAST_ROAD_X) / 2;
const vCenterZ = (BOTTOM_ROAD_Z + TOP_ROAD_Z) / 2;
const roadLenX = EAST_ROAD_X - WEST_ROAD_X + ROAD_W;
const roadLenZ = TOP_ROAD_Z - BOTTOM_ROAD_Z + ROAD_W;

export function ShipyardFacility() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  return (
    <group>
      {/* =======================================================
          1) WATER, SHIPS & BARGE (WEST / LEFT SIDE)
         ======================================================= */}
      <Ship
        position={[-110, 0, 50]}
        rotation={[0, -Math.PI / 2, 0]}
        label="Ship 1"
      />
      <Ship
        position={[-110, 0, 10]}
        rotation={[0, -Math.PI / 2, 0]}
        label="Ship 2"
      />
      <Ship
        position={[-110, 0, -40]}
        rotation={[0, -Math.PI / 2, 0]}
        label="Ship 3"
      />

      <Barge position={[-110, 0, -15]} rotation={[0, 0, 0]} label="2 - Barge" />
      <Crane
        position={[-110, 3, -15]}
        height={15}
        color="#f97316"
        label="Crane on Barge"
      />

      <group position={[-110, 0.5, 20]}>
        <mesh castShadow>
          <boxGeometry args={[4, 1.5, 8]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
        <Building.Label position={[0, 2, 0]} text="36 - Rescue Boat" />
      </group>

      {/* =======================================================
          2) ROADS – main structure
         ======================================================= */}
      {/* Horizontal */}
      <Road
        position={[hCenterX, 0, BOTTOM_ROAD_Z]}
        size={[roadLenX, 0.1, ROAD_W]}
      />
      <Road
        position={[hCenterX, 0, MID_ROAD_Z]}
        size={[roadLenX, 0.1, ROAD_W]}
      />
      <Road
        position={[hCenterX, 0, TOP_ROAD_Z]}
        size={[roadLenX, 0.1, ROAD_W]}
      />

      {/* Vertical */}
      <Road
        position={[EAST_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />
      <Road
        position={[CENTRAL_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />
      <Road
        position={[WEST_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />

      {/* Roundabout */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[CENTRAL_ROAD_X, 0.02, MID_ROAD_Z]}
      >
        <ringGeometry args={[6, 10, 32]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* =======================================================
          3) GATES
         ======================================================= */}
      <Gate
        position={[EAST_ROAD_X + 8, 0, BOTTOM_ROAD_Z]}
        rotation={[0, Math.PI, 0]}
        label="14 - Main Gate"
      />
      <Gate
        position={[EAST_ROAD_X + 8, 0, TOP_ROAD_Z]}
        rotation={[0, Math.PI, 0]}
        label="56 - Secondary Gate"
        isSmall
      />

      {/* =======================================================
          4) EAST BLOCK – ADMIN + HEAVY PARKING + ROOMS
         ======================================================= */}
      <Building
        position={[EAST_ROAD_X - 18, 0, (BOTTOM_ROAD_Z + MID_ROAD_Z) / 2]}
        size={[16, 20, MID_ROAD_Z - BOTTOM_ROAD_Z - ROAD_W]}
        color="#1e40af"
        label="4 - Main Admin Building"
        onClick={() => setSelectedBuilding("4 - Main Admin Building")}
      />

      <group position={[EAST_ROAD_X - 25, 0, BOTTOM_ROAD_Z + 8]}>
        <mesh>
          <boxGeometry args={[26, 0.2, 18]} />
          <meshStandardMaterial color="#84cc16" />
        </mesh>
        <Building.Label position={[0, 2, 0]} text="Heavy Parking" />
      </group>

      {[
        { id: "35", z: BOTTOM_ROAD_Z + 5 },
        { id: "39", z: BOTTOM_ROAD_Z + 15 },
        { id: "38", z: BOTTOM_ROAD_Z + 25 },
      ].map((r) => (
        <Building
          key={r.id}
          position={[EAST_ROAD_X - 4, 0, r.z]}
          size={[8, 6, 7]}
          color="#57534e"
          label={r.id}
        />
      ))}

      {["15", "57", "16", "13", "42", "34", "18", "12"].map((id, i) => (
        <Building
          key={id}
          position={[WEST_ROAD_X + 10 + i * 15, 0, BOTTOM_ROAD_Z + 6]}
          size={[6, 5, 5]}
          color="#44403c"
          label={id}
        />
      ))}

      {/* =======================================================
          5) TOP RIGHT – 23, 25, 24, 43, 29 & 41/40/26
         ======================================================= */}
      <Building
        position={[WEST_ROAD_X + 35, 0, TOP_ROAD_Z - 12]}
        size={[24, 10, 20]}
        color="#b45309"
        label="23 - Mechanical Workshop"
      />

      <group position={[WEST_ROAD_X + 60, 0, TOP_ROAD_Z - 12]}>
        <mesh>
          <boxGeometry args={[14, 0.2, 12]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <mesh position={[-3, 0.3, 0]}>
          <boxGeometry args={[3, 0.5, 4]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[3, 0.3, 0]}>
          <boxGeometry args={[3, 0.5, 4]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <Building.Label position={[0, 3, 0]} text="25 - Ambulance Parking" />
      </group>

      <Building
        position={[WEST_ROAD_X + 85, 0, TOP_ROAD_Z - 12]}
        size={[14, 12, 12]}
        color="#dc2626"
        label="24 - Medical Centre"
      />

      <Building
        position={[WEST_ROAD_X + 102, 0, TOP_ROAD_Z - 12]}
        size={[6, 8, 8]}
        color="#78716c"
        label="43"
      />

      <Building
        position={[WEST_ROAD_X + 120, 0, TOP_ROAD_Z - 12]}
        size={[20, 10, 18]}
        color="#a16207"
        label="29 - Workers Dining & Accommodation"
      />

      <Building
        position={[EAST_ROAD_X - 20, 0, MID_ROAD_Z + 5]}
        size={[18, 14, 28]}
        color="#92400e"
        label="41 - Warehouse"
      />
      <Building
        position={[EAST_ROAD_X - 20, 0, MID_ROAD_Z + 32]}
        size={[14, 12, 22]}
        color="#b45309"
        label="40 - Training Centre"
      />
      <Building
        position={[EAST_ROAD_X - 20, 0, MID_ROAD_Z + 58]}
        size={[16, 15, 28]}
        color="#d97706"
        label="26 - Mosque"
      />

      <Building
        position={[EAST_ROAD_X - 38, 0, MID_ROAD_Z - 10]}
        size={[8, 5, 8]}
        color="#a8a29e"
        label="37 - PPE Room"
      />
      <group position={[EAST_ROAD_X - 15, 0, MID_ROAD_Z - 10]}>
        <mesh>
          <boxGeometry args={[14, 0.3, 16]} />
          <meshStandardMaterial color="#71717a" />
        </mesh>
        <mesh position={[-5, 3, 0]}>
          <boxGeometry args={[1, 6, 4]} />
          <meshStandardMaterial color="#52525b" />
        </mesh>
        <Building.Label position={[0, 5, 0]} text="44 - Weight Bridge" />
      </group>

      {/* =======================================================
          6) CENTRAL BLOCK – 27, 21 & CR-1
         ======================================================= */}
      <OpenStorage
        position={[CENTRAL_ROAD_X + 20, 0, MID_ROAD_Z + 30]}
        size={[30, 16, 52]}
        label="27 - Non Ferrous Open Storage"
        wallHeight={12}
      />

      <OpenStorage
        position={[CENTRAL_ROAD_X + 20, 0, MID_ROAD_Z - 30]}
        size={[36, 16, 52]}
        label="21 - Open Storage"
        wallHeight={12}
      />

      <Building
        position={[CENTRAL_ROAD_X + 10, 0, MID_ROAD_Z - 24]}
        size={[8, 5, 8]}
        color="#64748b"
        label="30 - Oily Cleaning"
      />
      <Building
        position={[CENTRAL_ROAD_X + 18, 0, MID_ROAD_Z - 24]}
        size={[6, 4, 6]}
        color="#64748b"
        label="32"
      />
      <Building
        position={[CENTRAL_ROAD_X + 25, 0, MID_ROAD_Z - 18]}
        size={[6, 4, 6]}
        color="#64748b"
        label="48"
      />
      <Building
        position={[CENTRAL_ROAD_X + 25, 0, MID_ROAD_Z - 42]}
        size={[6, 4, 6]}
        color="#64748b"
        label="49"
      />
      <Building
        position={[CENTRAL_ROAD_X + 30, 0, MID_ROAD_Z - 30]}
        size={[6, 4, 6]}
        color="#64748b"
        label="47"
      />

      <Crane
        position={[CENTRAL_ROAD_X + 24, 0, MID_ROAD_Z - 30]}
        height={30}
        color="#dc2626"
        label="CR-1 - Gantry Crane (North)"
      />

      {/* =======================================================
          7) WEST CENTRAL – 22, 31, 19, 20 & CR-2
         ======================================================= */}
      <OpenStorage
        position={[CENTRAL_ROAD_X - 20, 0, MID_ROAD_Z - 30]}
        size={[36, 16, 52]}
        label="22 - Open Storage"
        wallHeight={12}
      />

      <Building
        position={[CENTRAL_ROAD_X - 20, 0, MID_ROAD_Z - 22]}
        size={[8, 5, 8]}
        color="#64748b"
        label="31 - Oily Cleaning"
      />
      <Building
        position={[CENTRAL_ROAD_X - 30, 0, MID_ROAD_Z - 26]}
        size={[6, 4, 6]}
        color="#64748b"
        label="33"
      />
      <Building
        position={[CENTRAL_ROAD_X - 10, 0, MID_ROAD_Z - 26]}
        size={[6, 4, 6]}
        color="#64748b"
        label="46"
      />
      <Building
        position={[CENTRAL_ROAD_X - 15, 0, MID_ROAD_Z - 42]}
        size={[6, 4, 6]}
        color="#64748b"
        label="45"
      />

      <Crane
        position={[CENTRAL_ROAD_X - 16, 0, MID_ROAD_Z - 30]}
        height={24}
        color="#f97316"
        label="CR-2 - Gantry Crane (South)"
      />

      <Building
        position={[CENTRAL_ROAD_X - 20, 0, BOTTOM_ROAD_Z + 18]}
        size={[32, 6, 20]}
        color="#fbbf24"
        label="19 - Stacking Pad"
      />
      <Building
        position={[CENTRAL_ROAD_X - 20, 0, BOTTOM_ROAD_Z + 38]}
        size={[32, 6, 20]}
        color="#fbbf24"
        label="20 - Stacking Pad"
      />

      {/* Selected building placeholder */}
      {selectedBuilding && (
        <group position={[0, 40, -90]}>
          <mesh>
            <boxGeometry args={[0, 0, 0]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      )}
    </group>
  );
}
