import { useState } from "react";
import { Label } from "./Label";

type Vec3 = [number, number, number];

interface NonFerrousOpenStorage27Props {
    position: Vec3;
    /** X width and Z depth, if you ever want to tweak */
    size?: [number, number];
}

export function NonFerrousOpenStorage27({
    position,
    size = [24, 52], // similar to your previous OpenStorage size
}: NonFerrousOpenStorage27Props) {
    const [hoverPad, setHoverPad] = useState(false);
    const [hoverRoute, setHoverRoute] = useState(false);

    const [width, depth] = size;
    const padThickness = 0.35;

    const routeBand = 2.2; // width of the yellow emergency band
    const wallHeight = 1.4;
    const wallThickness = 0.25;

    // Helpers so we don't duplicate logic
    const handlePadOver = (e: any) => {
        e.stopPropagation();
        setHoverPad(true);
        setHoverRoute(false);
    };

    const handlePadOut = (e: any) => {
        e.stopPropagation();
        setHoverPad(false);
    };

    const handleRouteOver = (e: any) => {
        e.stopPropagation();
        setHoverRoute(true);
        setHoverPad(false);
    };

    const handleRouteOut = (e: any) => {
        e.stopPropagation();
        setHoverRoute(false);
    };

    return (
        <group position={position}>
            {/* Base pad – white area */}
            <mesh
                position={[0, padThickness / 2, 0]}
                receiveShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[width, padThickness, depth]} />
                <meshStandardMaterial color="#fdfdfd" />
            </mesh>

            {/* Low perimeter wall / curb (very thin) */}
            {/* North wall */}
            <mesh
                position={[0, wallHeight / 2, depth / 2]}
                castShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[width, wallHeight, wallThickness]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>
            {/* South wall */}
            <mesh
                position={[0, wallHeight / 2, -depth / 2]}
                castShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[width, wallHeight, wallThickness]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>
            {/* West wall */}
            <mesh
                position={[-width / 2, wallHeight / 2, 0]}
                castShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[wallThickness, wallHeight, depth]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>
            {/* East wall */}
            <mesh
                position={[width / 2, wallHeight / 2, 0]}
                castShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[wallThickness, wallHeight, depth]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>

            {/* BOTTOM emergency route band (horizontal) */}
            <mesh
                position={[0, padThickness + 0.04, -depth / 2 + routeBand / 2]}
                castShadow
                onPointerOver={handleRouteOver}
                onPointerOut={handleRouteOut}
            >
                <boxGeometry args={[width, 0.08, routeBand]} />
                <meshStandardMaterial color="#facc15" />
            </mesh>

            {/* RIGHT emergency route band (vertical) */}
            <mesh
                position={[width / 2 - routeBand / 2, padThickness + 0.04, 0]}
                castShadow
                onPointerOver={handleRouteOver}
                onPointerOut={handleRouteOut}
            >
                <boxGeometry args={[routeBand, 0.08, depth]} />
                <meshStandardMaterial color="#facc15" />
            </mesh>

            {/* Hover labels */}
            {hoverPad && (
                <Label
                    position={[0, padThickness + 3, 0]}
                    text="27 - Non Ferrous Open Storage"
                />
            )}

            {hoverRoute && (
                <>
                    {/* Label near bottom band */}
                    <Label
                        position={[0, padThickness + 1.6, -depth / 2 - 0.5]}
                        text="Emergency Route"
                    />
                    {/* Label near right band */}
                    <Label
                        position={[width / 2 + 0.5, padThickness + 1.6, 0]}
                        text="Emergency Route"
                    />
                </>
            )}
        </group>
    );
}
