// src/components/StackingPads.tsx
import { useState } from "react";
import { Label } from "./Label";

type Vec3 = [number, number, number];

interface StackingPadProps {
    position: Vec3;
}

/**
 * Common base to draw a stacking pad with:
 * - big grey pad
 * - optional top / bottom emergency route
 * - right-side strip (walkway or garden)
 * - 5 internal compartments
 */
function StackingPadBase({
    position,
    padNumber,
    rightStripColor,
    rightStripLabel,
    emergencyOnTop,
    emergencyOnBottom,
}: {
    position: Vec3;
    padNumber: string;
    rightStripColor: string;
    rightStripLabel?: string;
    emergencyOnTop?: boolean;
    emergencyOnBottom?: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    // Overall size (similar to your previous Building 19/20)
    const width = 32;  // X
    const depth = 20;  // Z
    const thickness = 0.4;

    // Layout parts
    const rightStripWidth = 4;   // walkway / garden strip
    const routeDepth = 2.5;      // emergency route band
    const storageWidth = width - rightStripWidth;
    const storageDepth = depth - routeDepth;

    const routeY = thickness + 0.02;

    // For compartment dividers inside the storage area
    const compartmentCount = 5;
    const compWidth = storageWidth / compartmentCount;
    const storageCenterZ = emergencyOnTop
        ? -(routeDepth / 2) + storageDepth / 2
        : emergencyOnBottom
            ? routeDepth / 2 - storageDepth / 2
            : 0;

    const emergencyZ = emergencyOnTop
        ? depth / 2 - routeDepth / 2
        : -depth / 2 + routeDepth / 2;

    return (
        <group
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
            }}
        >
            {/* Base slab (light hatch area) */}
            <mesh position={[0, thickness / 2, 0]} receiveShadow>
                <boxGeometry args={[width, thickness, depth]} />
                <meshStandardMaterial color="#d4d4d4" />
            </mesh>

            {/* Slightly darker storage area (without emergency route strip) */}
            <mesh position={[-rightStripWidth / 2, thickness / 2 + 0.01, storageCenterZ]}>
                <boxGeometry args={[storageWidth, 0.02, storageDepth]} />
                <meshStandardMaterial color="#c4c4c4" />
            </mesh>

            {/* Emergency route band (top or bottom) */}
            {(emergencyOnTop || emergencyOnBottom) && (
                <mesh position={[0, routeY, emergencyZ]} castShadow>
                    <boxGeometry args={[width, 0.08, routeDepth]} />
                    <meshStandardMaterial color="#facc15" />
                </mesh>
            )}

            {/* Right-side strip: walkway or garden */}
            <mesh
                position={[width / 2 - rightStripWidth / 2, routeY, 0]}
                castShadow
            >
                <boxGeometry args={[rightStripWidth, 0.08, depth]} />
                <meshStandardMaterial color={rightStripColor} />
            </mesh>

            {/* Little divider between storage and right strip */}
            <mesh
                position={[storageWidth / 2, routeY + 0.01, 0]}
                castShadow
            >
                <boxGeometry args={[0.18, 0.06, depth]} />
                <meshStandardMaterial color="#6b7280" />
            </mesh>

            {/* Internal vertical dividers for 5 compartments */}
            {Array.from({ length: compartmentCount - 1 }).map((_, i) => {
                const x =
                    -storageWidth / 2 + compWidth * (i + 1) - rightStripWidth / 2;
                return (
                    <mesh
                        key={i}
                        position={[x, routeY + 0.01, storageCenterZ]}
                        castShadow
                    >
                        <boxGeometry args={[0.15, 0.06, storageDepth]} />
                        <meshStandardMaterial color="#9ca3af" />
                    </mesh>
                );
            })}

            {/* Small plaque in the middle with the pad number */}
            <mesh position={[-rightStripWidth / 2, routeY + 0.05, 0]} castShadow>
                <boxGeometry args={[4, 0.12, 2]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>

            <Label position={[-rightStripWidth / 2, routeY + 1.2, 0]} text={padNumber} />

            {/* Optional label for the right strip (e.g. "Garden") – only on hover */}
            {hovered && rightStripLabel && (
                <Label
                    position={[width / 2 + 0.5, routeY + 1.4, 0]}
                    text={rightStripLabel}
                />
            )}

            {/* Hover label for the whole pad */}
            {hovered && (
                <Label
                    position={[-rightStripWidth / 2, thickness + 3, 0]}
                    text={`${padNumber} - Stacking Pad`}
                />
            )}
        </group>
    );
}

/** Pad 19 – emergency route at the TOP, right strip is a walkway */
export function StackingPad19({ position }: StackingPadProps) {
    return (
        <StackingPadBase
            position={position}
            padNumber="19"
            rightStripColor="#fefce8"     // pale walkway
            rightStripLabel="Walkway / Emergency Route"
            emergencyOnTop
        />
    );
}

/** Pad 20 – emergency route at the BOTTOM, right strip is Garden */
export function StackingPad20({ position }: StackingPadProps) {
    return (
        <StackingPadBase
            position={position}
            padNumber="20"
            rightStripColor="#16a34a"     // green garden
            rightStripLabel="Garden"
            emergencyOnBottom
        />
    );
}
