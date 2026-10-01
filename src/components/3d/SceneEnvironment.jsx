import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import { useQuality } from './QualityManager';

export function SceneEnvironment() {
  const quality = useQuality();
  
  return (
    <group>
      {/* Minimal studio environment map for accurate PBR lighting without complex backgrounds */}
      <Environment preset="studio" />
      
      {/* Soft contact shadow on the floor */}
      {quality !== 'LOW' && (
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
          resolution={quality === 'HIGH' ? 512 : 256}
          color="#000000"
        />
      )}
    </group>
  );
}
