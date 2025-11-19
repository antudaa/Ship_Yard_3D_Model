import { useState } from "react";

import { Building } from "./Building";
import { Road } from "./Road";
import { OpenStorage } from "./OpenStorage";
import { Ship } from "./Ship";
import { Crane } from "./Crane";
import { Gate } from "./Gate";
import { Barge } from "./Barge";
import { OpenBuilding } from "./OpenStorageBuilding";
import { StackingPad19, StackingPad20 } from "./StackingPads";
import { NonFerrousOpenStorage27 } from "./NonFerrousOpenStorage";

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

// === Layout helpers for the left block near the main gate ===

// 4 - Main Admin Building and the 41/40/26 vertical block share roughly the same X
const ADMIN_X = EAST_ROAD_X - 20;

// 35 / 38 / 39 sit between Heavy Parking and Admin
// const SERVICES_X = ADMIN_X - 14;

// Heavy Parking is just to the left of 35/38/39
// const HEAVY_PARKING_X = SERVICES_X - 18;

// Hazard row constants
const HAZARD_START_X = WEST_ROAD_X + 5;
const HAZARD_SCALE = 0.4;
const HAZARD_GAP_X = 2;
const HAZARD_ROW_Z = BOTTOM_ROAD_Z + 128;

// Raw hazard definitions from the plan (width × depth in plan units)
const HAZARD_RAW = [
  {
    id: "15",
    label: "15 - Hazardous Waste Storage",
    width: 80,
    depth: 10,
    height: 6,
    color: "#44403c",
  },
  {
    id: "57",
    label: "57 - Bell Press Machine Room",
    width: 10,
    depth: 10,
    height: 4,
    color: "#44403c",
  },
  {
    id: "16",
    label: "16 - Incinerator Building",
    width: 20,
    depth: 15,
    height: 5,
    color: "#f97316",
  },
  {
    id: "13",
    label: "13 - Fuel Tank",
    width: 25,
    depth: 20,
    height: 5,
    color: "#6b7280",
  },
  {
    id: "42",
    label: "42 - Waste Oil Holding Tank",
    width: 30,
    depth: 20,
    height: 4,
    color: "#6b7280",
  },
  {
    id: "34",
    label: "34 - Oxygen Plant",
    width: 20,
    depth: 20,
    height: 5,
    color: "#4b5563",
  },
  {
    id: "18",
    label: "18 - LPG Storage",
    width: 12,
    depth: 10,
    height: 4,
    color: "#7c2d12",
  },
  {
    id: "12",
    label: "12 - Firefighting Station",
    width: 20,
    depth: 40,
    height: 7,
    color: "#b91c1c",
  },
];

// Precompute scaled sizes and positions along the bottom road, left → right
const HAZARD_BUILDINGS = (() => {
  const rowZ = HAZARD_ROW_Z;
  let currentX = HAZARD_START_X;

  return HAZARD_RAW.map((item, index) => {
    const width = item.width * HAZARD_SCALE;
    const depth = item.depth * HAZARD_SCALE;
    const height = item.height;

    if (index === 0) {
      // first one: center starting from left
      currentX = HAZARD_START_X + width / 2;
    } else {
      const prev = HAZARD_RAW[index - 1];
      const prevWidth = prev.width * HAZARD_SCALE;
      currentX += prevWidth / 2 + HAZARD_GAP_X + width / 2;
    }

    return {
      id: item.id,
      label: item.label,
      color: item.color,
      size: [width, height, depth] as [number, number, number],
      position: [currentX, 0, rowZ] as [number, number, number],
    };
  });
})();

export function ShipyardFacility() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  return (
    <group>
      {/* =======================================================
          1) WATER, SHIPS & BARGE (WEST / SEA SIDE)
         ======================================================= */}
      <Ship
        position={[-70, 0, 44]}
        rotation={[0, -Math.PI, 0]}
        label="Ship 1"
      />
      <Ship
        position={[-70, 0, -20]}
        rotation={[0, -Math.PI, 0]}
        label="Ship 2"
      />
      <Ship
        position={[-70, 0, -40]}
        rotation={[0, -Math.PI, 0]}
        label="Ship 3"
      />

      <Barge position={[-62, 0, 30]} rotation={[0, 0, 0]} label="2 - Barge" />
      <Crane
        position={[-70, 3, 30]}
        height={15}
        color="#f97316"
        label="Crane on Barge"
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* 36 - Rescue Boat */}
      <group position={[-65, 0, 22]}>
        {/* Main hull */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[9, 1.6, 2.6]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>

        {/* Bow (front wedge) */}
        <mesh
          position={[4.5, 0.9, 0]}
          rotation={[0, 0, -Math.PI / 12]}
          castShadow
        >
          <boxGeometry args={[4, 1.4, 2.4]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>

        {/* Stern (rear wedge) */}
        <mesh
          position={[-4.5, 0.9, 0]}
          rotation={[0, 0, Math.PI / 12]}
          castShadow
        >
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
          <meshStandardMaterial color="#e5e7eb" />
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
        position={[44, 0, 30]}
        size={[roadLenX / 2.8, 0.1, ROAD_W]}
      />
      <Road
        position={[8, 0, TOP_ROAD_Z]}
        size={[roadLenX / 1.2, 0.1, ROAD_W]}
      />

      {/* Vertical internal roads (south ↔ north) */}
      <Road
        position={[CENTRAL_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      />

      <Road
        position={[70, 0, 32]}
        size={[ROAD_W, 0.1, 60]}
      />

      <Road
        position={[50, 0, -30]}
        size={[ROAD_W, 0.1, 60]}
      />

      {/* <Road
        position={[CENTRAL_ROAD_X, 0, vCenterZ]}
        size={[ROAD_W, 0.1, roadLenZ]}
      /> */}

      {/* Roundabout on central road / middle horizontal road */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[CENTRAL_ROAD_X, 0.02, MID_ROAD_Z]}
      >
        {/* You can re-add ringGeometry if you like */}
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* =======================================================
          3) GATES (opposite side of the sea)
         ======================================================= */}
      <Gate
        position={[EAST_ROAD_X + 3, 0, MID_ROAD_Z]}
        rotation={[0, -Math.PI / 2, 0]}
        label="14 - Main Gate"
      />
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
      <Building
        position={[85, 0, BOTTOM_ROAD_Z + 88]}
        size={[16, 20, 40]}
        color="#1e40af"
        label="4 - Main Admin Building"
        onClick={() => setSelectedBuilding("4 - Main Admin Building")}
      />

      {/* Heavy Parking – just left of 35/38/39 */}
      <group position={[68, 0, BOTTOM_ROAD_Z + 132]}>
        <mesh>
          <boxGeometry args={[22, 0.2, 15]} />
          <meshStandardMaterial color="#84cc16" />
        </mesh>
        <Building.Label position={[0, 2, 0]} text="Heavy Parking" />
      </group>

      {/* 35 / 38 / 39 – small service rooms to the LEFT of admin */}
      <Building
        position={[82, 0, BOTTOM_ROAD_Z + 135]}
        size={[5, 5, 5]}
        color="#dc2626"
        label="38 - Substation Room (Main)"
      />

      <Building
        position={[89, 0, BOTTOM_ROAD_Z + 125]}
        size={[5, 5, 25]}
        color="#dc2626"
        label="39 - Generator Room"
      />

      <group position={[80, 0, BOTTOM_ROAD_Z + 118]}>
        <mesh>
          <boxGeometry args={[12, 0.2, 10]} />
          <meshStandardMaterial color="#84cc16" />
        </mesh>
        <Building.Label position={[0, 2, 0]} text="35 - Light Parking" />
      </group>

      {/* 15, 57, 16, 13, 42, 34, 18, 12 – row along the bottom road
          using real proportional sizes */}
      {HAZARD_BUILDINGS.map((b) =>
        b.id === "15" ? (
          <Building
            key={b.id}
            position={b.position}
            size={b.size}
            color={b.color}
            label={b.label}
          >
            {/* 8 compartments inside 15 (each 10×10 in plan → scaled here) */}
            {Array.from({ length: 8 }).map((_, idx) => {
              const compWidth = 10 * HAZARD_SCALE;
              const compDepth = 10 * HAZARD_SCALE;
              const totalWidth = b.size[0];
              const startX = -totalWidth / 2 + compWidth / 2;
              const x = startX + idx * compWidth;

              return (
                <mesh
                  key={idx}
                  position={[x, b.size[1] / 2 + 0.25, 0]}
                  castShadow
                >
                  <boxGeometry
                    args={[compWidth * 0.9, 0.5, compDepth * 0.9]}
                  />
                  <meshStandardMaterial color="#6b7280" />
                </mesh>
              );
            })}
          </Building>
        ) : (
          <Building
            key={b.id}
            position={b.position}
            size={b.size}
            color={b.color}
            label={b.label}
          />
        )
      )}

      {/* =======================================================
          5) TOP RIGHT – 23, 25, 24, 43, 29
         ======================================================= */}
      <Building
        position={[WEST_ROAD_X + 5, 0, TOP_ROAD_Z - 134]}
        size={[10, 2, 4]}
        color="#78716c"
        label="1 - Asbestos Handling Facility"
      />

      <Building
        position={[WEST_ROAD_X + 16, 0, TOP_ROAD_Z - 128]}
        size={[2, 2, 2]}
        color="#78716c"
        label="53 - Workers Resting Zone Beside Working Area"
      />

      <Building
        position={[WEST_ROAD_X + 35, 0, TOP_ROAD_Z - 135]}
        size={[24, 10, 20]}
        color="#b45309"
        label="23 - Mechanical Workshop"
      />

      <group position={[WEST_ROAD_X + 58, 0, TOP_ROAD_Z - 130]}>
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
        position={[WEST_ROAD_X + 80, 0, TOP_ROAD_Z - 130]}
        size={[25, 12, 12]}
        color="#dc2626"
        label="24 - Medical Centre"
      />

      <Building
        position={[WEST_ROAD_X + 100, 0, TOP_ROAD_Z - 128]}
        size={[10, 8, 8]}
        color="#78716c"
        label="43 - Water Treatment Plant"
      />

      <Building
        position={[WEST_ROAD_X + 125, 0, TOP_ROAD_Z - 133]}
        size={[35, 10, 18]}
        color="#a16207"
        label="29 - Workers Dining & Accommodation"
      />

      {/* =======================================================
          6) 41 / 40 / 26 BLOCK (same X as admin, higher up)
         ======================================================= */}
      <Building
        position={[60, 0, MID_ROAD_Z + -38]}
        size={[14, 14, 32]}
        color="#92400e"
        label="41 - Warehouse"
      />
      <Building
        position={[74, 0, MID_ROAD_Z + -38]}
        size={[10, 12, 32]}
        color="#b45309"
        label="40 - Training Centre"
      />
      <Building
        position={[88, 0, MID_ROAD_Z + -38]}
        size={[12, 15, 32]}
        color="#d97706"
        label="26 - Mosque"
      />

      {/* PPE room & weight bridge just below the 41/40/26 block */}
      <Building
        position={[ADMIN_X - 10, 0, MID_ROAD_Z - 10]}
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
        position={[CENTRAL_ROAD_X - 42, 0, MID_ROAD_Z - 30]}
        size={[50, 16, 52]}
        label="30 - Oily Piece Cleaning Station"
        wallHeight={12}
        rotation={[0, Math.PI / 2, 0]}
      />

      <OpenBuilding
        position={[CENTRAL_ROAD_X - 10, 0, MID_ROAD_Z - 30]}
        rotation={[0, 0, 0]}
        size={[12, 12, 50]}
        color="#FFA500"
        label="21 - Open Storage"
      >
      </OpenBuilding>

      <Building
        position={[CENTRAL_ROAD_X - 50, 0, MID_ROAD_Z - 30]}
        size={[8, 5, 8]}
        color="#64748b"
        label="32 Oily Water Separator"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - 20]}
        size={[6, 4, 6]}
        color="#64748b"
        label="48 Winch House With Foundation"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - 13]}
        size={[2, 1, 2]}
        color="#64748b"
        label="49 Wire Rope Storage"
      />

      <Building
        position={[CENTRAL_ROAD_X - 50, 0, MID_ROAD_Z - 35]}
        size={[2, 1, 2]}
        color="#64748b"
        label="58 Compressor Room"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - 40]}
        size={[6, 4, 6]}
        color="#64748b"
        label="47 Winch House With Foundation"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - 45]}
        size={[2, 1, 2]}
        color="#64748b"
        label="50 Wire Rope Storage"
      />

      <Building
        position={[CENTRAL_ROAD_X - 30, 0, MID_ROAD_Z - 40]}
        size={[2, 1, 2]}
        color="#64748b"
        label="54 Workers Resting Zone Beside Working Area"
      />

      <Crane
        position={[CENTRAL_ROAD_X - 65, 0, MID_ROAD_Z - 30]}
        height={36}
        color="#f97316"
        label="Crane on Barge"
        rotation={[0, -Math.PI / 1, 0]}
      />

      {/* Left of central road */}
      <OpenStorage
        position={[CENTRAL_ROAD_X - 42, 0, MID_ROAD_Z - -30]}
        size={[50, 16, 52]}
        label="31 - Oily Piece Cleaning Station"
        wallHeight={12}
        rotation={[0, Math.PI / 2, 0]}   // ⬅️ rotated
      />

      <OpenBuilding
        position={[CENTRAL_ROAD_X - 10, 0, MID_ROAD_Z - -30]}
        rotation={[0, 0, 0]}
        size={[12, 12, 50]}
        color="#FFA500"
        label="22 - Open Storage"
      >
      </OpenBuilding>

      <Building
        position={[CENTRAL_ROAD_X - 50, 0, MID_ROAD_Z - -30]}
        size={[8, 5, 8]}
        color="#64748b"
        label="33 Oily Water Separator"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - -20]}
        size={[6, 4, 6]}
        color="#64748b"
        label="46 Winch House With Foundation"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - -13]}
        size={[2, 1, 2]}
        color="#64748b"
        label="51 Wire Rope Storage"
      />

      <Building
        position={[CENTRAL_ROAD_X - 50, 0, MID_ROAD_Z - -35]}
        size={[2, 1, 2]}
        color="#64748b"
        label="59 Compressor Room"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - -40]}
        size={[6, 4, 6]}
        color="#64748b"
        label="45 Winch House With Foundation"
      />

      <Building
        position={[CENTRAL_ROAD_X - 40, 0, MID_ROAD_Z - -45]}
        size={[2, 1, 2]}
        color="#64748b"
        label="52 Wire Rope Storage"
      />

      <Building
        position={[CENTRAL_ROAD_X - 30, 0, MID_ROAD_Z - -40]}
        size={[2, 1, 2]}
        color="#64748b"
        label="55 Workers Resting Zone Beside Working Area"
      />

      <NonFerrousOpenStorage27
        position={[CENTRAL_ROAD_X + 15, 0, MID_ROAD_Z + -30]}
      />

      {/* <Crane
        position={[CENTRAL_ROAD_X - 16, 0, MID_ROAD_Z - 30]}
        height={24}
        color="#f97316"
        label="CR-2 - Gantry Crane (South)"
      /> */}

      <Crane
        position={[CENTRAL_ROAD_X - 65, 0, MID_ROAD_Z - -37]}
        height={24}
        color="#f97316"
        label="Crane on Barge"
        rotation={[0, -Math.PI / 1.2, 0]}
      />

      {/* 19 – Stacking pad with plate thickness bays + side emergency route */}
      <StackingPad19
        position={[CENTRAL_ROAD_X - -25, 0, BOTTOM_ROAD_Z + 75]}
      />

      {/* 20 – Stacking pad with bays + bottom emergency route + garden */}
      <StackingPad20
        position={[CENTRAL_ROAD_X - -25, 0, BOTTOM_ROAD_Z + 105]}
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
