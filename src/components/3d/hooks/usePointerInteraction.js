import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';
import * as THREE from 'three';

export function usePointerInteraction(intensity = 1) {
  const target = useRef(new THREE.Vector2(0, 0));
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (prefersReducedMotion) return;
    
    // Smoothly interpolate to pointer position
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x * intensity, 0.05);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y * intensity, 0.05);
  });

  return target;
}
