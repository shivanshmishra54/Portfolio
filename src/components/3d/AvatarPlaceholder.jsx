import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useQuality } from './QualityManager';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useAvatarState, AvatarState } from './AvatarContext';

export function AvatarPlaceholder({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  const quality = useQuality();
  const { avatarState } = useAvatarState();

  // Premium procedural geometry (monochrome, minimal, editorial)
  // We use an icosahedron to give it a technical, structured feel
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, quality === 'HIGH' ? 4 : (quality === 'MEDIUM' ? 2 : 1)), [quality]);

  // Map state to distortion targets to visualize emotion on the placeholder
  const getTargetDistortion = () => {
    switch (avatarState) {
      case AvatarState.HAPPY: return 0.4;
      case AvatarState.FOCUSED: return 0.1;
      case AvatarState.THINKING: return 0.3;
      case AvatarState.CURIOUS: return 0.35;
      case AvatarState.GREETING: return 0.25;
      default: return 0.2; // IDLE
    }
  };

  useFrame((state, delta) => {
    if (prefersReducedMotion || !meshRef.current) return;
    
    // Very subtle, elegant rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    
    // Subtle breathing effect on the material distortion
    if (materialRef.current && quality === 'HIGH') {
      const baseDistort = getTargetDistortion();
      materialRef.current.distort = THREE.MathUtils.lerp(
        materialRef.current.distort,
        baseDistort + Math.sin(state.clock.elapsedTime * 0.5) * 0.1,
        0.05
      );
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 
        Float creates a gentle hovering effect. 
        Speed and rotation intensity are reduced if prefersReducedMotion is true.
      */}
      <Float
        speed={prefersReducedMotion ? 0.5 : 1.5} 
        rotationIntensity={prefersReducedMotion ? 0.1 : 0.5} 
        floatIntensity={prefersReducedMotion ? 0.2 : 0.8}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh ref={meshRef} geometry={geometry} castShadow={quality === 'HIGH'} receiveShadow>
          {quality === 'HIGH' ? (
            <MeshDistortMaterial
              ref={materialRef}
              color="#ffffff"
              roughness={0.2}
              metalness={0.8}
              distort={0.2}
              speed={prefersReducedMotion ? 0 : 1}
              envMapIntensity={1}
            />
          ) : (
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.2}
              metalness={0.8}
              envMapIntensity={1}
            />
          )}
        </mesh>
      </Float>
      
      {/* Outer subtle wireframe ring for a technical aesthetic */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.5}>
        <torusGeometry args={[1, 0.005, 16, 64]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.3} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 3, 0]} scale={2.8}>
        <torusGeometry args={[1, 0.002, 16, 64]} />
        <meshBasicMaterial color="#666666" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
