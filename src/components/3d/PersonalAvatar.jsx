import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useQuality } from './QualityManager';

/**
 * PersonalAvatar
 * 
 * Future-ready component designed to load a custom .glb/.gltf avatar.
 * Currently accepts a model path and animation states but handles missing
 * models gracefully.
 */
export function PersonalAvatar({ 
  modelPath = "/models/avatar.glb", 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  animation = "idle" 
}) {
  const group = useRef();
  
  // NOTE: In production when the actual model exists, uncomment the loading logic.
  // const { scene, animations } = useGLTF(modelPath);
  // const { actions } = useAnimations(animations, group);
  // 
  // useEffect(() => {
  //   if (actions && actions[animation]) {
  //     actions[animation].reset().fadeIn(0.5).play();
  //     return () => actions[animation].fadeOut(0.5);
  //   }
  // }, [animation, actions]);

  const quality = useQuality();

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* 
        This is where the actual model will be injected:
        <primitive object={scene} castShadow={quality === 'HIGH'} receiveShadow /> 
      */}
    </group>
  );
}

// Preload the model if it exists to avoid stuttering
// useGLTF.preload("/models/avatar.glb");
