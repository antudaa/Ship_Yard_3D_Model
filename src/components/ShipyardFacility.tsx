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

// Base road layout
const EAST_ROAD_X = 90;
const CENTRAL_ROAD_X = 20;
const WEST_ROAD_X = -50;

const BOTTOM_ROAD_Z = -60;
const MID_ROAD_Z = 0;
const TOP_ROAD_Z = 60;

// Helpers for road sizes / centers
const hCenterX = (WEST_ROAD_X + EAST_ROAD_X) / 2;
const vCenterZ = (BOTTOM_ROAD_Z + TOP_ROAD_Z) / 2;
const roadLenX = EAST_ROAD_X - WEST_ROAD_X + ROAD_W;
const roadLenZ = TOP_ROAD_Z - BOTTOM_ROAD_Z + ROAD_W;

// === NEW layout helpers for the “left” block near the main gate ===

// 4 - Main Admin Building and the 41/40/26 vertical block share roughly the same X
const ADMIN_X = EAST_ROAD_X - 20;          // ~70

// 35 / 38 / 39 sit between Heavy Parking and Admin
const SERVICES_X = ADMIN_X - 14;           // ~56

// Heavy Parking is just to the left of 35/38/39
const HEAVY_PARKING_X = SERVICES_X - 18;   // ~38

// 15, 57, 16, 13, 42, 34, 18, 12 – small boxes along the bottom road
const HAZARD_START_X = WEST_ROAD_X + 5;    // first (15)
const HAZARD_SPACING_X = 11;               // even spacing left → right

export function ShipyardFacility() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  return (
    <group>
      {/* =======================================================
          1) WATER, SHIPS & BARGE (WEST / SEA SIDE)
         ======================================================= */}
      <Ship
        position={[-85, 0, 35]}
        rotation={[0, -Math.PI / 1, 0]}
        label="Ship 1"
      />
      <Ship
        position={[-85, 0, -10]}
        rotation={[0, -Math.PI / 1, 0]}
        label="Ship 2"
      />
      <Ship
        position={[-85, 0, -40]}
        rotation={[0, -Math.PI / 1, 0]}
        label="Ship 3"
      />

      <Barge position={[-75, 0, 20]} rotation={[0, 0, 0]} label="2 - Barge" />
      <Crane
        position={[-85, 3, 20]}
        height={15}
        color="#f97316"
        label="Crane on Barge"
      />

      {/* // replace your current "36 - Rescue Boat" group with this one */}
      <group position={[-75, 0, 10]}>
        {/* Main hull */}
        <mesh position={[0, 0.8, 0]} castShadow>
          {/* length, height, width */}
          <boxGeometry args={[9, 1.6, 2.6]} />
          <meshStandardMaterial color="#ea580c" /> {/* bright orange */}
        </mesh>

        {/* Bow (front wedge) */}
        <mesh position={[4.5, 0.9, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
          <boxGeometry args={[4, 1.4, 2.4]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>

        {/* Stern (rear wedge) */}
        <mesh position={[-4.5, 0.9, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
          <boxGeometry args={[4, 1.4, 2.4]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>

        {/* Deck */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[8.6, 0.3, 2.4]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>

        {/* Cabin / wheelhouse */}
        <mesh position={[-1.5, 2.5, 0]} castShadow>
          <boxGeometry args={[3, 1.4, 2]} />
          <meshStandardMaterial color="#e5e7eb" /> {/* light gray */}
        </mesh>

        {/* Front windows */}
        <mesh position={[-2.1, 2.5, 0.7]} castShadow>
          <boxGeometry args={[0.1, 0.9, 1.2]} />
          <meshStandardMaterial color="#93c5fd" />
        </mesh>
        <mesh position={[-2.1, 2.5, -0.7]} castShadow>
          <boxGeometry args={[0.1, 0.9, 1.2]} />
          <meshStandardMaterial color="#93c5fd" />
        </mesh>

        {/* Side rails */}
        <mesh position={[0, 2.1, 1.4]} castShadow>
          <boxGeometry args={[8.4, 0.15, 0.15]} />
          <meshStandardMaterial color="#fefce8" />
        </mesh>
        <mesh position={[0, 2.1, -1.4]} castShadow>
          <boxGeometry args={[8.4, 0.15, 0.15]} />
          <meshStandardMaterial color="#fefce8" />
        </mesh>

        {/* Mast / light */}
        <mesh position={[2.2, 2.9, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
        <mesh position={[2.2, 3.6, 0]} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial emissive="#fbbf24" color="#fef08a" />
        </mesh>

        {/* Label (world position so it floats above the boat) */}
        {/* <Building.Label position={[-15, 4.2, 10]} text="36 - Rescue Boat" /> */}
      </group>

      {/* =======================================================
          2) ROADS – three main roads from gates to sea
         ======================================================= */}
      {/* Horizontal roads (west ↔ east) */}
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

      {/* Vertical internal roads (south ↔ north) */}
      {/* East-most internal road is not used in the plan, so we skip it */}
      <Road
        position={[CENTRAL_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />
      <Road
        position={[WEST_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />

      {/* Roundabout on central road / middle horizontal road */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[CENTRAL_ROAD_X, 0.02, MID_ROAD_Z]}
      >
        {/* <ringGeometry args={[6, 10, 32]} /> */}
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* =======================================================
          3) GATES (opposite side of the sea)
         ======================================================= */}

      {/* 14 - Main Gate: on the middle main road */}
      <Gate
        position={[EAST_ROAD_X + 3, 0, MID_ROAD_Z]}
        rotation={[0, -Math.PI / 2, 0]}
        label="14 - Main Gate"
      />

      {/* 56 - Secondary Gate: on the bottom (left) main road */}
      <Gate
        position={[EAST_ROAD_X + 3, 0, BOTTOM_ROAD_Z]}
        rotation={[0, -Math.PI / 2, 0]}
        label="56 - Secondary Gate"
        isSmall
      />

      {/* =======================================================
          4) LEFT BLOCK INSIDE THE GATE
             4, 35/38/39, Heavy Parking, 15..12
         ======================================================= */}

      {/* 4 – Main Admin Building (bottom-right of left half) */}
      <Building
        position={[ADMIN_X, 0, BOTTOM_ROAD_Z + 18]}
        size={[16, 20, 26]}
        color="#1e40af"
        label="4 - Main Admin Building"
        onClick={() => setSelectedBuilding("4 - Main Admin Building")}
      />

      {/* 35 / 38 / 39 – small service rooms to the LEFT of admin */}
      {[
        { id: "35", z: BOTTOM_ROAD_Z + 24 },
        { id: "39", z: BOTTOM_ROAD_Z + 16 },
        { id: "38", z: BOTTOM_ROAD_Z + 8 },
      ].map((r) => (
        <Building
          key={r.id}
          position={[SERVICES_X, 0, r.z]}
          size={[8, 6, 7]}
          color="#57534e"
          label={r.id}
        />
      ))}

      {/* Heavy Parking – just left of 35/38/39, same as in the plan */}
      <group position={[HEAVY_PARKING_X, 0, BOTTOM_ROAD_Z + 8]}>
        <mesh>
          <boxGeometry args={[26, 0.2, 18]} />
          <meshStandardMaterial color="#84cc16" />
        </mesh>
        <Building.Label position={[0, 2, 0]} text="Heavy Parking" />
      </group>

      {/* 15, 57, 16, 13, 42, 34, 18, 12 – row along the bottom road */}
      {["15", "57", "16", "13", "42", "34", "18", "12"].map((id, i) => (
        <Building
          key={id}
          position={[
            HAZARD_START_X + i * HAZARD_SPACING_X,
            0,
            BOTTOM_ROAD_Z + 6,
          ]}
          size={[6, 5, 5]}
          color="#44403c"
          label={id}
        />
      ))}

      {/* =======================================================
          5) TOP RIGHT – 23, 25, 24, 43, 29
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

      {/* =======================================================
          6) 41 / 40 / 26 BLOCK (same X as admin, higher up)
         ======================================================= */}
      <Building
        position={[ADMIN_X, 0, MID_ROAD_Z + 5]}
        size={[18, 14, 28]}
        color="#92400e"
        label="41 - Warehouse"
      />
      <Building
        position={[ADMIN_X, 0, MID_ROAD_Z + 32]}
        size={[14, 12, 22]}
        color="#b45309"
        label="40 - Training Centre"
      />
      <Building
        position={[ADMIN_X, 0, MID_ROAD_Z + 58]}
        size={[16, 15, 28]}
        color="#d97706"
        label="26 - Mosque"
      />

      {/* PPE room & weight bridge just below the 41/40/26 block */}
      <Building
        position={[ADMIN_X - 18, 0, MID_ROAD_Z - 10]}
        size={[8, 5, 8]}
        color="#a8a29e"
        label="37 - PPE Room"
      />
      <group position={[ADMIN_X + 5, 0, MID_ROAD_Z - 10]}>
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
          7) CENTRAL / WEST BLOCKS – 27, 21, 22, 31, 19, 20, CR-1, CR-2
         ======================================================= */}
      {/* Right of central road */}
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

      {/* Left of central road */}
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

      {/* Placeholder if you later want an info panel for selectedBuilding */}
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
