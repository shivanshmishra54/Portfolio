# 3D Strategy

> Version: 1.0  
> Last Updated: 2026-10-01  
> Status: Approved

---

## Current 3D Limitations

### Environment Constraints

| Capability | Available? | Notes |
|---|---|---|
| Image-to-3D generation | ❌ No | No tool in this environment converts photos to 3D models |
| GLB/GLTF auto-creation | ❌ No | No automated 3D model generation |
| GLB/GLTF optimization | ⚠️ Installable | `gltf-pipeline`, Draco via npm |
| Procedural 3D in code | ✅ Yes | Three.js geometry, shaders, particles |
| Importing 3D models | ✅ Yes | Load `.glb`/`.gltf` via R3F |

### Critical Statement

> **The current environment does NOT provide reliable image-to-3D generation.**
>
> An uploaded photo is a **visual reference** for an eventual custom 3D model.
>
> It is NOT an input for automatic GLB generation.
>
> The architecture must allow the final custom GLB/GLTF model to be inserted later without redesign.

---

## React Three Fiber Architecture

### Package Structure

```
@react-three/fiber     — Core R3F renderer
@react-three/drei      — Utility components (Environment, useGLTF, Float, etc.)
@react-three/postprocessing — Only where justified (e.g., subtle vignette)
three                  — Three.js peer dependency
```

### Canvas Strategy

A single `<Canvas>` is used per scene (not one global Canvas). Each page that uses 3D mounts its own scene.

```jsx
// SceneWrapper.jsx
<ErrorBoundary fallback={<WebGLFallback />}>
  <Suspense fallback={<ScenePlaceholder />}>
    <Canvas
      dpr={[1, devicePixelRatio]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      {children}
    </Canvas>
  </Suspense>
</ErrorBoundary>
```

**Rules**:

- Canvas is always wrapped in `<Suspense>` with a meaningful fallback
- Canvas is always wrapped in an Error Boundary
- Canvas is lazy-loaded at the route level
- Canvas never blocks HTML/UI from rendering
- Canvas uses `alpha: true` for transparent backgrounds

---

## PersonalAvatar Component

### Architecture

```jsx
// PersonalAvatar.jsx

/**
 * Isolated avatar component.
 * Accepts a model path prop.
 * Renders either the GLB model or a procedural placeholder.
 *
 * Props:
 *   modelPath?: string  — path to .glb/.gltf file in /public/models/
 *   scale?: number
 *   position?: [x, y, z]
 *   enableIdleAnimation?: boolean
 *   enableMouseInteraction?: boolean
 *   enableScrollInteraction?: boolean
 *   reducedMotion?: boolean
 *   qualityLevel?: 'high' | 'medium' | 'low'
 */
```

### Behavior Matrix

| Feature | With GLB Model | Placeholder Mode |
|---|---|---|
| Rendering | `useGLTF()` loaded model | Procedural abstract form |
| Idle animation | Subtle breathing/sway | Gentle rotation/float |
| Mouse interaction | Head/body subtle follow | Form responds to cursor |
| Scroll interaction | Camera orbits slightly | Parallax offset |
| Lighting | Studio-style rim + ambient | Same |
| Responsive | Scale adjusts per breakpoint | Same |
| Mobile | Lower polygon count / LOD | Simpler geometry |
| WebGL failure | Static profile photo fallback | Same |
| Reduced motion | Static pose | Static form |

### Placeholder Strategy (Development Phase)

During development (before the custom GLB is ready), use:

1. **Procedural abstract form**: A monochrome geometric composition (e.g., subtle sphere cluster, abstract humanoid silhouette from primitive shapes) that communicates "person" without pretending to be a specific human
2. **NOT a random human 3D model** — never present a generic model as Shivansh
3. **NOT empty space** — always render something visually intentional

The placeholder must:

- Match the monochrome design system (black/white/gray materials)
- Feel intentional, not broken
- Be clearly replaceable without component restructuring

### Future GLB/GLTF Integration

When the custom model is ready:

1. Place file in `public/models/avatar.glb`
2. Pass `modelPath="/models/avatar.glb"` to `<PersonalAvatar />`
3. The component loads via `useGLTF()` with Suspense
4. No other components need modification

---

## Camera Strategy

### Hero Scene

```
Position: [0, 0, 5]
FOV: 45
Near: 0.1, Far: 100
```

- **Idle**: Subtle floating drift (0.1-0.2 units oscillation)
- **Mouse**: Parallax offset mapped to cursor position (max ±0.3 units)
- **Scroll**: Gentle dolly or orbit as user scrolls past hero
- **Reduced motion**: Static position

### General Rules

- Camera movement is always slow and intentional
- No fast pans, jerks, or disorienting motion
- Maximum camera travel per interaction: 1-2 units
- Easing: always smooth (cubic bezier or spring)

---

## Lighting Strategy

### Primary Setup

```
Ambient Light:    intensity 0.4, color #ffffff
Directional Key:  intensity 0.8, position [5, 5, 5], color #ffffff
Rim Light:        intensity 0.3, position [-5, 2, -5], color #e0e0e0
```

- No colored lights (monochrome only)
- No harsh shadows (soft shadow map if needed)
- No dramatic contrast — editorial, not cinematic noir
- Environment map: subtle neutral HDRI for reflections (optional)

### Dark Mode Adjustment

- Reduce ambient to 0.2
- Adjust material emissive slightly
- Rim light becomes more visible

---

## Animation System (3D)

### Idle Animations

```
Avatar:     subtle breathing (scale Y ±0.5%), gentle sway (rotate Y ±2°)
            period: 4-6 seconds, easing: sine
Environment: slow particle drift, subtle geometry rotation
            period: 8-12 seconds
```

### Mouse/Cursor Interaction

```
Input:   normalized mouse position (-1 to 1)
Effect:  avatar/scene subtle rotation (max ±5° on Y, ±3° on X)
Damping: 0.05 (lerp factor per frame)
```

Implemented via `useFrame()` with smooth interpolation:

```js
useFrame(() => {
  mesh.current.rotation.y = THREE.MathUtils.lerp(
    mesh.current.rotation.y,
    targetRotY,
    0.05
  );
});
```

### Scroll Interaction

```
Input:   scroll progress (0 to 1) from Framer Motion useScroll
Effect:  camera dolly (z: 5 → 7), scene opacity (1 → 0)
Range:   hero section viewport bounds
```

---

## Responsive Quality Levels

Detected via `useDetectGPU()` from `@react-three/drei`:

| Level | Device | DPR | Geometry | Particles | Postprocessing | Shadows |
|---|---|---|---|---|---|---|
| High | Desktop GPU | 2 | Full | Full | Yes | Yes |
| Medium | Laptop / tablet | 1.5 | Reduced | Reduced | Minimal | No |
| Low | Mobile / weak GPU | 1 | Minimal | None | No | No |

### Implementation

```jsx
const gpu = useDetectGPU();
const quality = gpu.tier >= 3 ? 'high' : gpu.tier >= 2 ? 'medium' : 'low';

<PersonalAvatar qualityLevel={quality} />
```

---

## WebGL Detection & Fallback

### Detection

```js
// useWebGLSupport.js
export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
```

### Fallback Component

```jsx
// WebGLFallback.jsx
// Renders a styled static hero with:
// - Profile photo (not 3D)
// - CSS gradient background
// - Subtle CSS animation (if motion allowed)
// - Same content hierarchy as 3D version
```

The fallback must be a first-class design, not a broken-looking degradation.

---

## Reduced Motion Behavior

When `prefers-reduced-motion: reduce` is detected:

1. All `useFrame()` animations stop
2. Scene renders in a static attractive pose
3. No cursor tracking
4. No scroll-driven camera movement
5. Page still functions fully
6. Content remains identical

Detection:

```js
// useReducedMotion.js
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
```

---

## Performance Rules

1. **Never block initial render** — 3D loads inside its own Suspense boundary
2. **Lazy-load all 3D** — use `React.lazy()` for components containing Canvas
3. **Minimize draw calls** — merge geometries where possible
4. **Dispose properly** — use Drei's `useGLTF.preload()` and R3F's automatic disposal
5. **Cap particle count** — max 500 on desktop, 100 on mobile, 0 on low-tier
6. **Use `frameloop="demand"`** — only re-render when something changes (where applicable)
7. **Compress GLB models** — Draco compression, max 2MB per model
8. **Monitor with `usePerformanceMonitor()`** — drop quality tier if FPS < 30

---

## Asset Pipeline (Future)

When the custom avatar GLB is ready:

1. Optimize with `gltf-pipeline` or `gltf-transform`
2. Apply Draco compression
3. Remove unused animations/materials
4. Target: <2MB file size
5. Place in `public/models/avatar.glb`
6. Preload with `useGLTF.preload('/models/avatar.glb')`
7. Test on mobile (must load within 3 seconds on 4G)

---

## 3D Scenes Inventory

| Scene | Location | Purpose | Priority |
|---|---|---|---|
| Hero Scene | HomePage | Identity introduction | P0 |
| Personal Avatar | HomePage Hero | Shivansh's 3D representation | P0 |
| Ambient Background | Optional on other pages | Subtle depth | P2 |
| Timeline 3D Response | Developer Journey | Camera shift on milestone select | P2 |

Only the Hero Scene and Avatar are essential. Other 3D elements are progressive enhancements.
