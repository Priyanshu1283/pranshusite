"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function FloatingBox({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export function FloatingObjects() {
  return (
    <group>
      <FloatingSphere position={[2, 0.5, -3]} color="#22d3ee" />
      <FloatingSphere position={[-1.5, -0.3, -2]} color="#3b82f6" />
      <FloatingSphere position={[0, 1, -4]} color="#22d3ee" />
      <FloatingBox position={[-2, 0.2, -3]} />
      <FloatingBox position={[1, -0.5, -2.5]} />
    </group>
  );
}
