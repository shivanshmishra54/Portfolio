import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePointerInteraction } from './hooks/usePointerInteraction';
import { useReducedMotion } from './hooks/useReducedMotion';
import * as THREE from 'three';

export function CameraRig({ children }) {
  const group = useRef();
  const pointerTarget = usePointerInteraction(0.5); // reduced intensity
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (prefersReducedMotion || !group.current) return;

    // Apply subtle parallax to the group containing the camera/scene
    const targetX = pointerTarget.current.x * 0.2;
    const targetY = pointerTarget.current.y * 0.2;
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
  });

  return <group ref={group}>{children}</group>;
}
