import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { QualityManager } from './QualityManager';
import { SceneLighting } from './SceneLighting';
import { SceneEnvironment } from './SceneEnvironment';
import { CameraRig } from './CameraRig';
import { WebGLFallback } from './WebGLFallback';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { PersonalAvatar } from './PersonalAvatar';
import { AvatarController } from './AvatarController';

export function ThreeScene({ 
  fallbackImage, 
  usePlaceholder = false,
  avatarProps = {},
  className = ""
}) {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Basic WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return <WebGLFallback fallbackImage={fallbackImage} />;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <QualityManager>
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 45 }}
          eventSource={document.body}
          eventPrefix="client"
          gl={{ 
            antialias: true,
            alpha: true, 
            powerPreference: "high-performance" 
          }}
          dpr={[1, 2]} // clamp DPR for performance
        >
          <Suspense fallback={null}>
            <SceneEnvironment />
            <SceneLighting />
            
            <CameraRig>
              <AvatarController>
                {usePlaceholder ? (
                  <AvatarPlaceholder />
                ) : (
                  <PersonalAvatar {...avatarProps} />
                )}
              </AvatarController>
            </CameraRig>
          </Suspense>
        </Canvas>
      </QualityManager>
    </div>
  );
}
