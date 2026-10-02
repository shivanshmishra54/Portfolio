import React from 'react';
import { useQuality } from './QualityManager';

export function SceneLighting() {
  const quality = useQuality();
  
  // Shadows are expensive, reduce/disable them on lower tiers
  const castShadows = quality === 'HIGH';

  return (
    <group>
      <ambientLight intensity={0.5} />
      
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow={castShadows}
        shadow-mapSize-width={castShadows ? 2048 : 512}
        shadow-mapSize-height={castShadows ? 2048 : 512}
        shadow-bias={-0.0001}
      />
      
      <spotLight
        position={[-10, 10, -5]}
        intensity={2}
        angle={0.3}
        penumbra={1}
        castShadow={castShadows}
        color="#a0a5b0"
      />
      
      {/* Soft fill light */}
      <rectAreaLight
        width={10}
        height={10}
        color="#ffffff"
        intensity={1}
        position={[0, 0, 10]}
        lookAt={[0, 0, 0]}
      />
    </group>
  );
}
