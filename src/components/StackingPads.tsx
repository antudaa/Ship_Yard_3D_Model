// src/components/StackingPads.tsx
import { useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Label } from "./Label";

type Vec3 = [number, number, number];

interface StackingPadProps {
    position: Vec3;
}

interface StackingPadBaseProps {
    position: Vec3;
    rightStripColor: string;
    rightStripHoverLabel?: string;
    emergencyOnTop?: boolean;
    emergencyOnBottom?: boolean;
    hoverLabel: string;
}

type PointerE = ThreeEvent<PointerEvent>;

function StackingPadBase({
    position,
    rightStripColor,
    rightStripHoverLabel,
    emergencyOnTop,
    emergencyOnBottom,
    hoverLabel,
}: StackingPadBaseProps) {
    const [hoverPad, setHoverPad] = useState(false);
    const [hoverRoute, setHoverRoute] = useState(false);
    const [hoverStrip, setHoverStrip] = useState(false);

    // Overall pad size
    const width = 40; // X
    const depth = 22; // Z
    const thickness = 0.35;

    // Layout parts
    const rightStripWidth = 3.5; // walkway / garden strip
    const routeDepth = 2; // emergency route band

    const hasRoute = emergencyOnTop || emergencyOnBottom;

    const storageWidth = width - rightStripWidth;
    const storageDepth = depth - (hasRoute ? routeDepth : 0);

    const routeY = thickness + 0.02;

    // Z positions for storage vs emergency band
    const storageCenterZ = emergencyOnTop
        ? -routeDepth / 2
        : emergencyOnBottom
            ? routeDepth / 2
            : 0;

    const emergencyZ = emergencyOnTop
        ? depth / 2 - routeDepth / 2
        : emergencyOnBottom
            ? -depth / 2 + routeDepth / 2
            : 0;

    // For 5 internal compartments
    const compartmentCount = 5;
    const compWidth = storageWidth / compartmentCount;
    const leftStorageX = -width / 2;

    // ===== Hover handlers (mutually exclusive) =====
    const handlePadOver = (e: PointerE) => {
        e.stopPropagation();
        setHoverPad(true);
        setHoverRoute(false);
        setHoverStrip(false);
    };

    const handlePadOut = (e: PointerE) => {
        e.stopPropagation();
        setHoverPad(false);
    };

    const handleRouteOver = (e: PointerE) => {
        e.stopPropagation();
        setHoverRoute(true);
        setHoverPad(false);
        setHoverStrip(false);
    };

    const handleRouteOut = (e: PointerE) => {
        e.stopPropagation();
        setHoverRoute(false);
    };

    const handleStripOver = (e: PointerE) => {
        e.stopPropagation();
        setHoverStrip(true);
        setHoverPad(false);
        setHoverRoute(false);
    };

    const handleStripOut = (e: PointerE) => {
        e.stopPropagation();
        setHoverStrip(false);
    };

    return (
        <group position={position}>
            {/* Base slab (overall pad) */}
            <mesh
                position={[0, thickness / 2, 0]}
                receiveShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[width, thickness, depth]} />
                <meshStandardMaterial color="#d4d4d4" />
            </mesh>

            {/* Storage area (hatched region without emergency band) */}
            <mesh
                position={[-rightStripWidth / 2, thickness / 2 + 0.01, storageCenterZ]}
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[storageWidth, 0.02, storageDepth]} />
                <meshStandardMaterial color="#c4c4c4" />
            </mesh>

            {/* Emergency route band (top or bottom) */}
            {hasRoute && (
                <mesh
                    position={[0, routeY, emergencyZ]}
                    castShadow
                    onPointerOver={handleRouteOver}
                    onPointerOut={handleRouteOut}
                >
                    <boxGeometry args={[width, 0.08, routeDepth]} />
                    <meshStandardMaterial color="#facc15" />
                </mesh>
            )}

            {/* Right-side strip: walkway or garden */}
            <mesh
                position={[width / 2 - rightStripWidth / 2, routeY, 0]}
                castShadow
                onPointerOver={handleStripOver}
                onPointerOut={handleStripOut}
            >
                <boxGeometry args={[rightStripWidth, 0.4, depth]} />
                <meshStandardMaterial color={rightStripColor} />
            </mesh>

            {/* Divider between storage and right strip */}
            <mesh
                position={[storageWidth / 2, routeY + 0.01, 0]}
                castShadow
                onPointerOver={handlePadOver}
                onPointerOut={handlePadOut}
            >
                <boxGeometry args={[0.18, 0.06, depth]} />
                <meshStandardMaterial color="#6b7280" />
            </mesh>

            {/* Internal vertical dividers for 5 compartments */}
            {Array.from({ length: compartmentCount - 1 }).map((_, i) => {
                const x = leftStorageX + compWidth * (i + 1);
                return (
                    <mesh
                        key={i}
                        position={[x, routeY + 0.01, storageCenterZ]}
                        castShadow
                        onPointerOver={handlePadOver}
                        onPointerOut={handlePadOut}
                    >
                        <boxGeometry args={[0.15, 0.06, storageDepth]} />
                        <meshStandardMaterial color="#9ca3af" />
                    </mesh>
                );
            })}

            {/* ===== Hover labels ===== */}

            {/* Emergency Route label (only when hovering the yellow band) */}
            {hoverRoute && (
                <Label
                    position={[0, thickness + 2.2, emergencyZ > 0 ? depth / 2 + 0.5 : -depth / 2 - 0.5]}
                    text="Emergency Route"
                />
            )}

            {/* Right strip label (Walkway / Garden) */}
            {hoverStrip && rightStripHoverLabel && (
                <Label
                    position={[width / 2 + 0.5, thickness + 2.2, 0]}
                    text={rightStripHoverLabel}
                />
            )}

            {/* General pad label (only when hovering pad/storage) */}
            {hoverPad && (
                <Label
                    position={[-rightStripWidth / 2, thickness + 2.5, 0]}
                    text={hoverLabel}
                />
            )}
        </group>
    );
}

/** Pad 19 – emergency route at the BOTTOM, right strip is a walkway */
export function StackingPad19({ position }: StackingPadProps) {
    return (
        <StackingPadBase
            position={position}
            rightStripColor="#fefce8"
            rightStripHoverLabel="Walkway / Emergency Route"
            emergencyOnBottom
            hoverLabel="19 - Stacking Pad"
        />
    );
}

/** Pad 20 – emergency route at the TOP, right strip is Garden */
export function StackingPad20({ position }: StackingPadProps) {
    return (
        <StackingPadBase
            position={position}
            rightStripColor="#16a34a"
            rightStripHoverLabel="Garden"
            emergencyOnTop
            hoverLabel="20 - Stacking Pad"
        />
    );
}
