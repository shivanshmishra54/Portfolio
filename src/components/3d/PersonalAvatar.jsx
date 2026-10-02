import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useQuality } from './QualityManager';
import { useAvatarState, AvatarState } from './AvatarContext';
import { useReducedMotion } from './hooks/useReducedMotion';

export function PersonalAvatar({ 
  modelPath = "/models/avatar.glb", 
  scale = 3.6, 
  position = [0, -4.5, 0], 
  rotation = [0, 0, 0],
  headRef,
  neckRef,
  leftEyeRef,
  rightEyeRef,
  spineRef,
  rightArmRef,
  rightForeArmRef
}) {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  const { nodes } = useGraph(scene);
  const quality = useQuality();

  useEffect(() => {
    // Link GLB bones to the controller refs
    // ONLY head and neck are used now, but we keep the refs assigned just in case
    if (headRef && nodes.Head) headRef.current = nodes.Head;
    if (neckRef && nodes.Neck) neckRef.current = nodes.Neck;
    if (leftEyeRef && nodes.LeftEye) leftEyeRef.current = nodes.LeftEye;
    if (rightEyeRef && nodes.RightEye) rightEyeRef.current = nodes.RightEye;
    if (spineRef && nodes.Spine2) spineRef.current = nodes.Spine2;
    if (rightArmRef && nodes.RightArm) rightArmRef.current = nodes.RightArm;
    if (rightForeArmRef && nodes.RightForeArm) rightForeArmRef.current = nodes.RightForeArm;
    
    if (headRef && !nodes.Head && nodes.Neck) headRef.current = nodes.Neck;
    if (spineRef && !nodes.Spine2 && nodes.Spine) spineRef.current = nodes.Spine;
  }, [nodes, headRef, neckRef, leftEyeRef, rightEyeRef, spineRef, rightArmRef, rightForeArmRef]);

  useEffect(() => {
    // Enforce static natural resting pose to fix the default T-pose
    // These values bring the arms down naturally for Avaturn/Mixamo rigs
    
    // Drop shoulders slightly for relaxed posture
    if (nodes.LeftShoulder) nodes.LeftShoulder.rotation.z = -0.05;
    if (nodes.RightShoulder) nodes.RightShoulder.rotation.z = 0.05;

    if (nodes.LeftArm) {
      nodes.LeftArm.rotation.z = -1.25; // Bring left arm down
      nodes.LeftArm.rotation.x = 0.1;   // Slightly forward
    }
    if (nodes.RightArm) {
      nodes.RightArm.rotation.z = 1.25; // Bring right arm down
      nodes.RightArm.rotation.x = 0.1;  // Slightly forward
    }
    
    // Slight relaxed bend in elbows
    if (nodes.LeftForeArm) nodes.LeftForeArm.rotation.x = 0.1;
    if (nodes.RightForeArm) nodes.RightForeArm.rotation.x = 0.1;

    // Slight relaxed rotation for hands
    if (nodes.LeftHand) nodes.LeftHand.rotation.y = -0.1;
    if (nodes.RightHand) nodes.RightHand.rotation.y = 0.1;

  }, [nodes]);

  // Adjust material to respond to our lighting properly (monochrome friendly)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = quality === 'HIGH';
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 0.8;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, quality]);

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/avatar.glb");


