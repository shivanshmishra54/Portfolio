import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Float } from '@react-three/drei';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useQuality } from './QualityManager';
import { useAvatarState, AvatarState } from './AvatarContext';

// Helper: Convert Latitude & Longitude to 3D Cartesian coordinates
function latLonToVector3(lat, lon, radius = 2.15) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Continents and Skills Configuration - naturally distributed across the globe
const CONTINENTS = [
  {
    id: "backend",
    name: "Backend Realm",
    tag: "Core Systems",
    color: "#ffffff",
    center: { lat: 25, lon: 35 },
    skills: [
      { name: "Java 21", dLat: 8, dLon: -14 },
      { name: "Spring Boot 3", dLat: 2, dLon: 8 },
      { name: "Microservices", dLat: -6, dLon: 16 },
      { name: "Spring Security", dLat: -5, dLon: -10 },
      { name: "REST APIs", dLat: 10, dLon: 12 },
      { name: "Hibernate / JPA", dLat: -8, dLon: 2 },
    ]
  },
  {
    id: "frontend",
    name: "Frontend Realm",
    tag: "Interactive UI",
    color: "#ffffff",
    center: { lat: 35, lon: -75 },
    skills: [
      { name: "React.js", dLat: 4, dLon: -10 },
      { name: "JavaScript", dLat: 8, dLon: 8 },
      { name: "Tailwind CSS", dLat: -6, dLon: -12 },
      { name: "Vite", dLat: -4, dLon: 12 },
      { name: "HTML5 & CSS3", dLat: 10, dLon: -2 },
    ]
  },
  {
    id: "ai-tools",
    name: "AI & LLM Workflows",
    tag: "Generative AI",
    color: "#ffffff",
    center: { lat: 20, lon: 95 },
    skills: [
      { name: "ChatGPT", dLat: 8, dLon: -14 },
      { name: "Claude", dLat: 4, dLon: 12 },
      { name: "Gemini", dLat: -6, dLon: -14 },
      { name: "Perplexity", dLat: -5, dLon: 8 },
      { name: "DeepSeek", dLat: 10, dLon: 4 },
      { name: "Grok AI", dLat: -8, dLon: -2 },
    ]
  },
  {
    id: "database",
    name: "Data & Streams",
    tag: "Distributed Storage",
    color: "#ffffff",
    center: { lat: -15, lon: -60 },
    skills: [
      { name: "MySQL", dLat: 7, dLon: -12 },
      { name: "PostgreSQL", dLat: 5, dLon: 12 },
      { name: "Redis", dLat: -6, dLon: -8 },
      { name: "Apache Kafka", dLat: -4, dLon: 14 },
      { name: "DBMS", dLat: 10, dLon: 2 },
    ]
  },
  {
    id: "tools",
    name: "DevOps & Tooling",
    tag: "Engineering Stack",
    color: "#ffffff",
    center: { lat: 52, lon: 15 },
    skills: [
      { name: "Git & GitHub", dLat: 5, dLon: -12 },
      { name: "IntelliJ IDEA", dLat: -3, dLon: 10 },
      { name: "Postman", dLat: -6, dLon: -10 },
      { name: "Maven", dLat: 8, dLon: 8 },
    ]
  },
  {
    id: "fundamentals",
    name: "Computer Science",
    tag: "Algorithmic Core",
    color: "#ffffff",
    center: { lat: -25, lon: 135 },
    skills: [
      { name: "Algorithms", dLat: 7, dLon: -10 },
      { name: "Data Structures", dLat: -5, dLon: 12 },
      { name: "OOP Concepts", dLat: 5, dLon: 10 },
      { name: "Operating Systems", dLat: -7, dLon: -8 },
    ]
  }
];

// Flat list of all skill nodes on the globe
const ALL_SKILL_NODES = [];
CONTINENTS.forEach(continent => {
  continent.skills.forEach(skill => {
    const lat = continent.center.lat + skill.dLat;
    const lon = continent.center.lon + skill.dLon;
    ALL_SKILL_NODES.push({
      id: `${continent.id}-${skill.name}`,
      name: skill.name,
      continentName: continent.name,
      tag: continent.tag,
      position: latLonToVector3(lat, lon, 2.15),
      normal: latLonToVector3(lat, lon, 1.0).normalize(),
    });
  });
});

// Single Skill Pin with Camera-facing prominence zoom
function SkillPin({ skill, globeRef, distanceFactor = 12 }) {
  const pinRef = useRef();
  const labelRef = useRef();
  const tagRef = useRef();
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const worldNormal = useMemo(() => new THREE.Vector3(), []);
  const toCam = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (!pinRef.current || !labelRef.current) return;

    // Get current world coordinates of this pin
    pinRef.current.getWorldPosition(worldPos);

    // Get normal in world coordinates
    worldNormal.copy(skill.normal);
    if (globeRef.current) {
      worldNormal.applyQuaternion(globeRef.current.quaternion);
    }

    // Direction vector towards camera
    toCam.copy(camera.position).sub(worldPos).normalize();

    // Dot product determines if facing camera
    const dot = worldNormal.dot(toCam);

    if (dot > 0.12) {
      labelRef.current.style.display = 'flex';
      
      const frontFactor = Math.max(0, Math.min(1, (dot - 0.25) / 0.7));

      // Scale: small subtle label (0.6x) -> compact badge (0.95x max so it stays clean and never huge)
      const scale = THREE.MathUtils.lerp(0.6, 0.95, frontFactor);
      const opacity = THREE.MathUtils.lerp(0.35, 0.95, frontFactor);
      
      labelRef.current.style.opacity = opacity;
      labelRef.current.style.transform = `scale(${scale})`;
      labelRef.current.style.zIndex = Math.round(frontFactor * 30);

      if (frontFactor > 0.65) {
        labelRef.current.style.boxShadow = '0 0 16px rgba(255, 255, 255, 0.25)';
      } else {
        labelRef.current.style.boxShadow = 'none';
      }
    } else {
      labelRef.current.style.display = 'none';
    }
  });

  return (
    <group ref={pinRef} position={skill.position}>
      {/* 3D Surface Beacon Dot */}
      <mesh>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* HTML Floating Label with camera orientation */}
      <Html
        center
        distanceFactor={distanceFactor}
        zIndexRange={[80, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={labelRef}
          className="flex flex-col items-center select-none pointer-events-none transition-all duration-150"
        >
          {/* Badge Container: sleek, compact typography */}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-gray-300/50 dark:border-neutral-700/70 bg-white/85 dark:bg-black/90 backdrop-blur-sm text-gray-800 dark:text-neutral-200 shadow-md text-[8px] sm:text-[9px] font-mono tracking-wider uppercase whitespace-nowrap">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">{skill.name}</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

// Ocean Marker representing future unexplored technologies
function OceanMarker({ lat, lon, name, globeRef, distanceFactor = 12 }) {
  const pinRef = useRef();
  const labelRef = useRef();
  const pos = useMemo(() => latLonToVector3(lat, lon, 2.15), [lat, lon]);
  const normal = useMemo(() => latLonToVector3(lat, lon, 1.0).normalize(), [lat, lon]);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const worldNormal = useMemo(() => new THREE.Vector3(), []);
  const toCam = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    if (!pinRef.current || !labelRef.current) return;
    pinRef.current.getWorldPosition(worldPos);
    worldNormal.copy(normal);
    if (globeRef.current) worldNormal.applyQuaternion(globeRef.current.quaternion);
    toCam.copy(camera.position).sub(worldPos).normalize();
    const dot = worldNormal.dot(toCam);

    if (dot > 0.15) {
      labelRef.current.style.display = 'block';
      const frontFactor = Math.max(0, Math.min(1, (dot - 0.25) / 0.7));
      labelRef.current.style.opacity = THREE.MathUtils.lerp(0.3, 0.85, frontFactor);
      labelRef.current.style.transform = `scale(${THREE.MathUtils.lerp(0.65, 0.9, frontFactor)})`;
    } else {
      labelRef.current.style.display = 'none';
    }
  });

  return (
    <group ref={pinRef} position={pos}>
      <Html center distanceFactor={distanceFactor} style={{ pointerEvents: 'none' }}>
        <div
          ref={labelRef}
          className="px-2 py-0.5 rounded-full border border-dashed border-gray-300 dark:border-neutral-700 bg-white/60 dark:bg-black/60 backdrop-blur-sm text-[8px] font-mono tracking-widest uppercase text-gray-500 dark:text-neutral-400 whitespace-nowrap"
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

// Procedural Continent Landmass Patches
function ContinentLandmass({ continent }) {
  const pos = useMemo(() => latLonToVector3(continent.center.lat, continent.center.lon, 2.13), [continent]);
  const normal = useMemo(() => latLonToVector3(continent.center.lat, continent.center.lon, 1.0).normalize(), [continent]);
  
  const orientation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  return (
    <group position={pos} quaternion={orientation}>
      {/* Landmass Plate (Territory) */}
      <mesh>
        <circleGeometry args={[0.65, 32]} />
        <meshStandardMaterial
          color="#1e1e1e"
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Territorial Border Line */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.64, 0.655, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function AvatarPlaceholder({ position, scale = 1 }) {
  const globeRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  const quality = useQuality();
  const { size } = useThree();

  // Responsive scale down for mobile screens so globe fits comfortably
  const isSmallMobile = size.width < 500;
  const isTablet = size.width < 768;
  const dynamicScale = isSmallMobile ? scale * 0.44 : (isTablet ? scale * 0.58 : scale * 0.78);
  const distanceFactor = isSmallMobile ? 4.8 : (isTablet ? 5.8 : 6.8);

  // Position globe in the upper area to leave ample open space below for name and path actions
  const globeY = isSmallMobile ? 0.95 : (isTablet ? 0.85 : 0.72);
  const finalPosition = position || [0, globeY, 0];

  // Phone motion (Gyroscope / Tilt) detection
  const gyroRef = useRef({ gamma: 0, beta: 0, active: false });
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);

  useEffect(() => {
    // Gyroscope orientation listener for mobile phone tilt
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        gyroRef.current.active = true;
        gyroRef.current.gamma = e.gamma;
        gyroRef.current.beta = e.beta;
      }
    };

    // iOS 13+ permission helper on first user touch
    const enableOrientationPermission = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(res => {
            if (res === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, { passive: true });
            }
          })
          .catch(() => {});
      }
    };

    // Touch swipe/drag listener for mobile interaction
    const handleTouchStart = (e) => {
      enableOrientationPermission();
      if (e.touches && e.touches.length === 1) {
        touchStartRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartRef.current;
        touchStartRef.current = e.touches[0].clientX;
        touchDeltaRef.current += dx * 0.005;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (prefersReducedMotion || !globeRef.current) return;

    // Base constant elegant spin
    let rotY = delta * 0.09;

    // Phone Gyro Tilt Physics:
    // Tilting phone left (gamma < 0) rotates globe left; tilting right (gamma > 0) rotates right
    if (gyroRef.current.active) {
      const tiltX = THREE.MathUtils.clamp(gyroRef.current.gamma / 25, -2, 2);
      rotY += tiltX * delta * 0.5;

      // Pitch when tilting phone up/down (resting angle is ~45deg)
      const tiltY = THREE.MathUtils.clamp((gyroRef.current.beta - 45) / 25, -1, 1);
      globeRef.current.rotation.x = THREE.MathUtils.lerp(
        globeRef.current.rotation.x,
        tiltY * 0.4,
        delta * 3
      );
    }

    // Touch swipe decay inertia
    if (Math.abs(touchDeltaRef.current) > 0.0001) {
      globeRef.current.rotation.y += touchDeltaRef.current;
      touchDeltaRef.current *= 0.92;
    }

    globeRef.current.rotation.y += rotY;
  });

  return (
    <group position={finalPosition} scale={dynamicScale}>
      <Float
        speed={prefersReducedMotion ? 0.3 : 1.2}
        rotationIntensity={prefersReducedMotion ? 0.05 : 0.25}
        floatIntensity={prefersReducedMotion ? 0.15 : 0.6}
        floatingRange={[-0.08, 0.08]}
      >
        <group ref={globeRef}>
          {/* Base Ocean Sphere (The Global Waters) */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[2.1, 64, 64]} />
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={0.65}
              metalness={0.35}
              envMapIntensity={0.8}
            />
          </mesh>

          {/* Latitude & Longitude Geodesic Rings (Ocean Coordinates) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.102, 0.003, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[2.102, 0.003, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[2.102, 0.003, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.102, 0.002, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.102, 0.002, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>

          {/* Continent Landmass Plates */}
          {CONTINENTS.map(continent => (
            <ContinentLandmass key={continent.id} continent={continent} />
          ))}

          {/* Individual Skill City Pins */}
          {ALL_SKILL_NODES.map(skill => (
            <SkillPin key={skill.id} skill={skill} globeRef={globeRef} distanceFactor={distanceFactor} />
          ))}

          {/* Ocean of Emerging Tech (Uncharted Waters to be Conquered) */}
          <OceanMarker
            lat={-5}
            lon={-145}
            name="✦ Emerging Tech"
            globeRef={globeRef}
            distanceFactor={distanceFactor}
          />
          <OceanMarker
            lat={-55}
            lon={20}
            name="✦ Continuous Learning"
            globeRef={globeRef}
            distanceFactor={distanceFactor}
          />
        </group>
      </Float>

      {/* External Technical Planetary Rings */}
      <mesh rotation={[Math.PI / 2.8, 0, 0]} scale={3.1}>
        <torusGeometry args={[1, 0.003, 16, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 3.2, 0, 0]} scale={3.4}>
        <torusGeometry args={[1, 0.002, 16, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}
