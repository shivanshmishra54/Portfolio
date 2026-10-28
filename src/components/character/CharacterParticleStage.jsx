'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Scroll-Synchronized Character Particle Stage
 * 
 * Inspired by Sarthak Sharma's reference WebGL particle architecture (from chunk 379-61xj1idep.js):
 * - Harmonic wave dynamics: wave = sin(length(p.xy) * 9.0 - uTime * 2.5)
 * - Restrained chromatic blending: mix(vec3(0.68, 0.65, 0.59), vec3(1.0, 0.48, 0.22), smoothstep(0.45, 0.9, vGlow))
 * - Interactive pointer proximity ripples: sin(d * 7.0 - uTime * 4.0) * exp(-d * 1.5)
 * - Additive / Screen luminous blending for energetic particle clusters
 * - Refined fine particle scale (40-60% of original visual radius)
 * - Strict restriction to transparent character cutouts (zero rectangular background dissolution)
 * - Deterministic, bidirectional scroll synchronization (scroll up reconstructs previous pose/portrait)
 * - Dual Mode: 'disperse' (Overview hero single-portrait dispersal) & 'morph' (7-scene In Motion odyssey)
 */
export function CharacterParticleStage({
  scenes,
  imageSrc,
  mode = 'auto', // 'morph' | 'disperse' | 'auto'
  activeSceneIndex = 0,
  scrollProgress = 0, // float: 0 to 1 for disperse, or 0 to scenes.length - 1 for morph (or Framer MotionValue)
  className = '',
  width = 380,
  height = 480,
  prefersReducedMotion = false
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const pointCloudsRef = useRef([]);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const animFrameRef = useRef(null);
  
  // Normalized pointer state [-2, 2] to match reference shader coordinate frame
  const pointerRef = useRef({ x: 4, y: 4, active: false });
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Normalize scenes list
  const scenesList = React.useMemo(() => {
    if (scenes && scenes.length > 0) return scenes;
    if (imageSrc) {
      return [{
        id: 'hero-portrait',
        cutoutImage: imageSrc,
        characterImage: imageSrc,
        title: 'Hero Portrait'
      }];
    }
    return [];
  }, [scenes, imageSrc]);

  const effectiveMode = mode === 'auto' 
    ? (scenesList.length === 1 || Boolean(imageSrc) ? 'disperse' : 'morph')
    : mode;

  // Load cutouts and extract particle point clouds strictly from transparent character silhouettes
  useEffect(() => {
    if (!scenesList || scenesList.length === 0) return;
    let isMounted = true;
    const loadedImages = [];
    const pointClouds = [];
    let loadedCount = 0;

    // Refined sampling: sampleStep = 5 at 260px width yields ~3,200 fine, dense points
    const sampleImageParticles = (img, sampleStep = 5) => {
      const offCanvas = document.createElement('canvas');
      const sampleW = 260;
      const sampleH = Math.round((sampleW / img.width) * img.height);
      offCanvas.width = sampleW;
      offCanvas.height = sampleH;
      const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return [];

      ctx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
      const data = imgData.data;

      const particles = [];
      for (let y = 0; y < sampleH; y += sampleStep) {
        for (let x = 0; x < sampleW; x += sampleStep) {
          const idx = (y * sampleW + x) * 4;
          const a = data[idx + 3];
          if (a > 110) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Edge detection via 4-neighbor alpha threshold
            const leftA = x > 0 ? data[idx - 4 + 3] : 0;
            const rightA = x < sampleW - 1 ? data[idx + 4 + 3] : 0;
            const topA = y > 0 ? data[idx - sampleW * 4 + 3] : 0;
            const bottomA = y < sampleH - 1 ? data[idx + sampleW * 4 + 3] : 0;
            const isEdge = leftA < 70 || rightA < 70 || topA < 70 || bottomA < 70;

            // Normalized position [0, 1]
            const normX = x / sampleW;
            const normY = y / sampleH;

            // Dispersal vector: outward from silhouette center plus curl noise
            const angle = Math.atan2(normY - 0.5, normX - 0.5) + (Math.random() - 0.5) * 0.9;
            const dist = 0.32 + Math.random() * 0.48;
            const scatterX = Math.cos(angle) * dist;
            const scatterY = Math.sin(angle) * dist;

            // Task 2: Substantially smaller core radius (~45% of previous size: 0.8px to 1.3px)
            const baseSize = isEdge ? 1.25 : 0.85 + Math.random() * 0.45;

            particles.push({
              x: normX,
              y: normY,
              scatterX,
              scatterY,
              r,
              g,
              b,
              isEdge,
              baseSize,
              phase: Math.random() * Math.PI * 2,
              amberWeight: isEdge ? 0.9 : Math.random() < 0.28 ? 0.75 : 0.08
            });
          }
        }
      }
      return particles;
    };

    scenesList.forEach((scene, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = scene.cutoutImage || scene.characterImage;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        pointClouds[index] = sampleImageParticles(img);
        loadedCount++;
        if (loadedCount === scenesList.length) {
          imagesRef.current = loadedImages;
          pointCloudsRef.current = pointClouds;
          setAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        if (img.src !== scene.characterImage && scene.characterImage) {
          img.src = scene.characterImage;
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [scenesList]);

  // Track pointer coordinates relative to canvas center
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 4 - 2;
    const ny = 2 - ((e.clientY - rect.top) / rect.height) * 4;
    pointerRef.current = { x: nx, y: ny, active: true };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 4, y: 4, active: false };
  };

  // Helper to resolve current scroll value whether number or MotionValue
  const getRawProgress = useCallback(() => {
    if (typeof scrollProgress === 'number') return scrollProgress;
    if (scrollProgress && typeof scrollProgress.get === 'function') {
      return scrollProgress.get();
    }
    return 0;
  }, [scrollProgress]);

  // Render loop incorporating Sarthak's harmonic wave shaders & additive blending
  const renderLoop = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas || !assetsLoaded) {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) * 0.001;
    lastTimeRef.current = timestamp;
    timeRef.current += delta;
    const uTime = timeRef.current;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const displayW = width;
    const displayH = height;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, displayW, displayH);

    const fitBounds = (img) => {
      if (!img || !img.width) return { x: 0, y: 0, w: displayW, h: displayH };
      const aspect = img.width / img.height;
      let w = displayW;
      let h = displayW / aspect;
      if (h > displayH) {
        h = displayH;
        w = displayH * aspect;
      }
      const x = (displayW - w) / 2;
      const y = (displayH - h) / 2;
      return { x, y, w, h };
    };

    const rawProgress = getRawProgress();

    // ========================================================
    // A. ACCESSIBILITY / PREFERS REDUCED MOTION
    // ========================================================
    if (prefersReducedMotion) {
      const img = imagesRef.current[0];
      if (img) {
        const bounds = fitBounds(img);
        ctx.globalAlpha = Math.max(0, 1 - rawProgress * 1.4);
        ctx.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);
      }
      animFrameRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // ========================================================
    // B. MODE 1: DISPERSE (Overview Hero Single-Image Dispersal)
    // ========================================================
    if (effectiveMode === 'disperse') {
      const img = imagesRef.current[0];
      const cloud = pointCloudsRef.current[0] || [];
      const bounds = fitBounds(img);
      const progress = Math.max(0, Math.min(1, rawProgress));

      if (progress <= 0.05) {
        // Solid resting portrait
        if (img) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);

          // Subtle living harmonic edge shimmer in warm amber
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          const shimmerAlpha = 0.08 + 0.06 * Math.sin(uTime * 2.0);
          ctx.strokeStyle = `rgba(249, 115, 22, ${shimmerAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(bounds.x + 1, bounds.y + 1, bounds.w - 2, bounds.h - 2);
          ctx.restore();
        }
      } else {
        // Dispersal transition synchronized with scroll
        // Fade out underlying solid cutout
        if (progress < 0.32 && img) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, 1 - (progress - 0.05) / 0.25);
          ctx.drawImage(img, bounds.x, bounds.y, bounds.w, bounds.h);
          ctx.restore();
        }

        const t = Math.min(1, Math.max(0, (progress - 0.05) / 0.85));
        const scatterIntensity = Math.sin(Math.min(1, t * 1.3) * Math.PI * 0.5);
        const pAlpha = Math.max(0, (1 - t * 0.90)) * (0.85 + 0.15 * Math.sin(t * Math.PI));

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const ptr = pointerRef.current;
        const numParticles = cloud.length;

        for (let i = 0; i < numParticles; i++) {
          const p = cloud[i];
          if (!p) continue;

          const startX = bounds.x + p.x * bounds.w;
          const startY = bounds.y + p.y * bounds.h;

          // Sarthak Harmonic wave
          const normPx = p.x * 2 - 1;
          const normPy = p.y * 2 - 1;
          const pLen = Math.sqrt(normPx * normPx + normPy * normPy);
          const wave = Math.sin(pLen * 9.0 - uTime * 2.5 + p.phase);

          // Pointer proximity repulsion
          let ptrRepelX = 0;
          let ptrRepelY = 0;
          let ptrDist = 999;
          if (ptr.active) {
            const dx = normPx * 2 - ptr.x;
            const dy = normPy * 2 - ptr.y;
            ptrDist = Math.sqrt(dx * dx + dy * dy);
            const repel = Math.exp(-ptrDist * 1.5) * Math.sin(ptrDist * 7.0 - uTime * 4.0) * 0.22;
            ptrRepelX = (dx / (ptrDist + 0.001)) * repel * displayW * 0.2;
            ptrRepelY = (dy / (ptrDist + 0.001)) * repel * displayH * 0.2;
          }

          // Dispersal trajectory: energetic expansion upward/outward
          const targetX = startX + p.scatterX * displayW * 0.78 * t + wave * 16 * t + ptrRepelX;
          const targetY = startY + (p.scatterY * displayH * 0.65 - displayH * 0.24 * t) + wave * 16 * t + ptrRepelY;

          // Direct deterministic scroll-driven position: scroll up exactly retraces
          const px = (1 - t) * startX + t * targetX;
          const py = (1 - t) * startY + t * targetY;

          // Sarthak Color Blending (Champagne #b4ac9c -> Amber #ff7a38)
          const vGlow = 0.5 + 0.5 * Math.exp(-ptrDist * 2.0) + 0.25 * wave + scatterIntensity * 0.45;
          const glowFactor = Math.min(1, Math.max(0, (vGlow - 0.4) / 0.5));

          const baseR = p.r * 0.35 + 180 * 0.65;
          const baseG = p.g * 0.35 + 172 * 0.65;
          const baseB = p.b * 0.35 + 156 * 0.65;

          const finalR = Math.round(baseR * (1 - glowFactor) + 255 * glowFactor);
          const finalG = Math.round(baseG * (1 - glowFactor) + 125 * glowFactor);
          const finalB = Math.round(baseB * (1 - glowFactor) + 40 * glowFactor);

          // Task 2: Refined particle scale (40-60% smaller, delicate points)
          const radius = p.baseSize * (1 + 0.35 * scatterIntensity + 0.1 * wave);

          // 1. Delicate outer glow (refined radius * 1.55, reduced opacity to prevent blobbing)
          if (p.isEdge || scatterIntensity > 0.15) {
            ctx.fillStyle = `rgba(255, 140, 60, ${pAlpha * 0.18})`;
            ctx.beginPath();
            ctx.arc(px, py, radius * 1.55, 0, Math.PI * 2);
            ctx.fill();
          }

          // 2. Crisp luminous particle core
          ctx.fillStyle = `rgba(${finalR}, ${finalG}, ${finalB}, ${pAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.75, radius), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    // ========================================================
    // C. MODE 2: MORPH (In Motion 7-Scene Narrative Journey)
    // ========================================================
    const maxIdx = scenesList.length - 1;
    const progress = Math.max(0, Math.min(maxIdx, rawProgress));
    const currIdx = Math.floor(progress);
    const nextIdx = Math.min(maxIdx, currIdx + 1);
    const fraction = progress - currIdx; // 0.0 to 1.0

    const currImg = imagesRef.current[currIdx];
    const nextImg = imagesRef.current[nextIdx];
    const currCloud = pointCloudsRef.current[currIdx] || [];
    const nextCloud = pointCloudsRef.current[nextIdx] || [];

    if (fraction <= 0.10 || currIdx === nextIdx) {
      // Solid resting pose
      if (currImg) {
        const bounds = fitBounds(currImg);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(currImg, bounds.x, bounds.y, bounds.w, bounds.h);

        // Subtle edge shimmer
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const shimmerAlpha = 0.08 + 0.06 * Math.sin(uTime * 2.0);
        ctx.strokeStyle = `rgba(249, 115, 22, ${shimmerAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(bounds.x + 1, bounds.y + 1, bounds.w - 2, bounds.h - 2);
        ctx.restore();
      }
    } else if (fraction >= 0.90) {
      // Next solid resting pose
      if (nextImg) {
        const bounds = fitBounds(nextImg);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(nextImg, bounds.x, bounds.y, bounds.w, bounds.h);
      }
    } else {
      // Active scroll particle transition
      const currBounds = fitBounds(currImg);
      const nextBounds = fitBounds(nextImg);

      if (fraction < 0.32 && currImg) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - (fraction - 0.10) / 0.22);
        ctx.drawImage(currImg, currBounds.x, currBounds.y, currBounds.w, currBounds.h);
        ctx.restore();
      } else if (fraction > 0.68 && nextImg) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, (fraction - 0.68) / 0.22);
        ctx.drawImage(nextImg, nextBounds.x, nextBounds.y, nextBounds.w, nextBounds.h);
        ctx.restore();
      }

      const t = (fraction - 0.10) / 0.80;
      const scatterIntensity = Math.sin(t * Math.PI);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const numParticles = Math.max(currCloud.length, nextCloud.length);
      const ptr = pointerRef.current;

      for (let i = 0; i < numParticles; i++) {
        const pCurrent = currCloud[i % currCloud.length];
        const pNext = nextCloud[i % nextCloud.length];
        if (!pCurrent || !pNext) continue;

        const startX = currBounds.x + pCurrent.x * currBounds.w;
        const startY = currBounds.y + pCurrent.y * currBounds.h;
        const endX = nextBounds.x + pNext.x * nextBounds.w;
        const endY = nextBounds.y + pNext.y * nextBounds.h;

        const normPx = pCurrent.x * 2 - 1;
        const normPy = pCurrent.y * 2 - 1;
        const pLen = Math.sqrt(normPx * normPx + normPy * normPy);
        const wave = Math.sin(pLen * 9.0 - uTime * 2.5 + pCurrent.phase);

        let ptrRepelX = 0;
        let ptrRepelY = 0;
        let ptrDist = 999;
        if (ptr.active) {
          const dx = normPx * 2 - ptr.x;
          const dy = normPy * 2 - ptr.y;
          ptrDist = Math.sqrt(dx * dx + dy * dy);
          const repel = Math.exp(-ptrDist * 1.5) * Math.sin(ptrDist * 7.0 - uTime * 4.0) * 0.22;
          ptrRepelX = (dx / (ptrDist + 0.001)) * repel * displayW * 0.2;
          ptrRepelY = (dy / (ptrDist + 0.001)) * repel * displayH * 0.2;
        }

        const midX = (startX + endX) / 2 + pCurrent.scatterX * displayW * 0.44 * scatterIntensity + wave * 14 * scatterIntensity + ptrRepelX;
        const midY = (startY + endY) / 2 + pCurrent.scatterY * displayH * 0.44 * scatterIntensity + wave * 14 * scatterIntensity + ptrRepelY;

        const oneMinusT = 1 - t;
        const px = oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * midX + t * t * endX;
        const py = oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * midY + t * t * endY;

        const vGlow = 0.5 + 0.5 * Math.exp(-ptrDist * 2.0) + 0.25 * wave + scatterIntensity * 0.45;
        const glowFactor = Math.min(1, Math.max(0, (vGlow - 0.4) / 0.5));

        const baseR = pCurrent.r * 0.35 + 180 * 0.65;
        const baseG = pCurrent.g * 0.35 + 172 * 0.65;
        const baseB = pCurrent.b * 0.35 + 156 * 0.65;

        const finalR = Math.round(baseR * (1 - glowFactor) + 255 * glowFactor);
        const finalG = Math.round(baseG * (1 - glowFactor) + 125 * glowFactor);
        const finalB = Math.round(baseB * (1 - glowFactor) + 40 * glowFactor);

        const pAlpha = (0.75 + 0.25 * Math.sin(t * Math.PI)) * (pCurrent.isEdge ? 1.0 : 0.88);
        
        // Task 2: Refined particle scale (40-60% smaller)
        const radius = pCurrent.baseSize * (1 + 0.35 * scatterIntensity + 0.1 * wave);

        // 1. Refined corona (radius * 1.55, opacity * 0.18 to prevent blobbing)
        if (pCurrent.isEdge || scatterIntensity > 0.15) {
          ctx.fillStyle = `rgba(255, 140, 60, ${pAlpha * 0.18})`;
          ctx.beginPath();
          ctx.arc(px, py, radius * 1.55, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Crisp luminous particle core
        ctx.fillStyle = `rgba(${finalR}, ${finalG}, ${finalB}, ${pAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.75, radius), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(renderLoop);
  }, [assetsLoaded, scenesList, effectiveMode, getRawProgress, prefersReducedMotion, width, height]);

  // Run render loop
  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [renderLoop]);

  const fallbackScene = scenesList[activeSceneIndex] || scenesList[0] || {};
  const fallbackSrc = fallbackScene.cutoutImage || fallbackScene.characterImage || imageSrc;

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Background radial glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none rounded-3xl blur-[45px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,122,56,0.18)_0%,transparent_70%)]"
      />

      {/* Main Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="relative z-10 select-none object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] cursor-crosshair"
      />

      {/* Fallback image while loading assets */}
      {!assetsLoaded && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={fallbackScene.title || "Portrait"}
          className="absolute inset-0 w-full h-full object-contain filter contrast-[1.05] p-4 select-none"
        />
      )}
    </div>
  );
}
