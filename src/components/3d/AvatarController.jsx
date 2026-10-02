import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAvatarState, AvatarState } from './AvatarContext';
import { useReducedMotion } from './hooks/useReducedMotion';

export const AvatarController = forwardRef(({ children }, ref) => {
  const { avatarState, activeCloud } = useAvatarState();
  const prefersReducedMotion = useReducedMotion();

  // These refs will be mapped to the actual GLB bone nodes later
  const headRef = useRef();
  const neckRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const rootRef = useRef(); // Fallback for the placeholder

  // Expose these refs to the child (PersonalAvatar or Placeholder)
  useImperativeHandle(ref, () => ({
    head: headRef.current,
    neck: neckRef.current,
    leftEye: leftEyeRef.current,
    rightEye: rightEyeRef.current,
    root: rootRef.current,
  }));

  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const currentRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    // 1. Determine pointer target based on state
    // state.pointer.x: -1 (left) to 1 (right)
    // state.pointer.y: -1 (bottom) to 1 (top)
    let targetX = state.pointer.x;
    let targetY = state.pointer.y;

    // Cloud interaction gaze:
    // Sync the R3F time exactly with the DOM Framer Motion time via performance.now()
    if (activeCloud) {
      const timeInSeconds = performance.now() / 1000;
      const speed = 0.4;
      const phase = activeCloud === 'freelancer' ? 0 : Math.PI;
      const angle = timeInSeconds * speed + phase;
      
      // Calculate normalized X and Y for the cloud position
      const cloudX = Math.cos(angle);
      const cloudY = -Math.sin(angle) * 0.5; // slight height depth
      
      // Combine mouse pointer + cloud direction
      targetX = targetX * 0.4 + cloudX * 0.6;
      targetY = targetY * 0.4 + cloudY * 0.6;
    }

    // Limit the maximum target values to prevent extreme rotations
    // Math.PI / 12 is approx 15 degrees
    // Math.PI / 18 is approx 10 degrees
    const maxYaw = Math.PI / 12; 
    const maxPitch = Math.PI / 18;

    targetRotation.current.x = THREE.MathUtils.clamp(targetX * maxYaw, -maxYaw, maxYaw);
    targetRotation.current.y = THREE.MathUtils.clamp(targetY * maxPitch, -maxPitch, maxPitch);

    // 2. Smooth interpolation (damping) for head
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x, 5 * delta);
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y, 5 * delta);

    // 3. Apply to available rig nodes 
    // Mixamo/Avaturn typically uses rotation.y for Yaw (Left/Right) and rotation.x for Pitch (Up/Down).
    // For standard Mixamo rigs: +X is bending forward (down). So we want -X for looking up.
    // Thus: rotation.x = -currentRotation.current.y
    const yaw = currentRotation.current.x;
    const pitch = -currentRotation.current.y;

    if (headRef.current) {
      headRef.current.rotation.y = yaw * 0.6;
      headRef.current.rotation.x = pitch * 0.6;
    }
    
    if (neckRef.current) {
      // Neck takes some of the rotation for a natural curve
      neckRef.current.rotation.y = yaw * 0.4;
      neckRef.current.rotation.x = pitch * 0.4;
    }

    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y = yaw * 0.2;
      leftEyeRef.current.rotation.x = pitch * 0.2;
    }

    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = yaw * 0.2;
      rightEyeRef.current.rotation.x = pitch * 0.2;
    }

    // Fallback: If no rig (Placeholder)
    if (!headRef.current && rootRef.current) {
      rootRef.current.rotation.y = yaw;
      rootRef.current.rotation.x = pitch;
    }
  });

  const childWithRefs = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        headRef,
        neckRef,
        leftEyeRef,
        rightEyeRef
      });
    }
    return child;
  });

  return <group ref={rootRef}>{childWithRefs}</group>;
});

AvatarController.displayName = 'AvatarController';
