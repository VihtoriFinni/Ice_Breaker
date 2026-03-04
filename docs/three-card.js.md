# three-card.js Documentation

## Purpose
Handles real Three.js 3D card mesh with raycasting for tilt effect and click detection.

## Dependencies
- Three.js r128 (loaded via CDN in HTML)

## Class: ThreeCard

### Constructor

```javascript
constructor(container, onFlipToBack)
```

**Parameters:**
- `container` (HTMLElement) - The container element for Three.js canvas
- `onFlipToBack` (Function) - Callback when flipping to question side

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cardWidth` | number | 3.5 (Three.js units) |
| `cardHeight` | number | 5.0 (Three.js units) |
| `maxTilt` | number | 15° in radians (~0.262) |
| `isFlipping` | boolean | Animation lock flag |
| `isQuestionSide` | boolean | Current face state |

### Methods

#### `initScene()`
Initialize Three.js scene, camera, and WebGL renderer.

**Setup:**
- Scene with transparent background
- PerspectiveCamera (45° FOV, z=12)
- WebGLRenderer with antialiasing and alpha channel
- Resize handler

#### `initCard()`
Create the 3D card mesh.

**Geometry:** `BoxGeometry(3.5, 5, 0.05)` - thin box

**Materials:** Six materials for each face
- Front: Canvas texture (design pattern)
- Back: Canvas texture (glassmorphism)
- Sides: Solid colors

#### `createFrontTexture()`
Generate canvas texture for front face (design/pattern).

**Visual Elements:**
- Glassmorphism gradient background
- Conic gradient pattern (rotating lines)
- Large "?" symbol in center
- Border and shadow effects

**Returns:** `THREE.CanvasTexture`

#### `createBackTexture()`
Generate canvas texture for back face (question side).

**Visual Elements:**
- Glassmorphism gradient
- Border
- Clean background for text overlay

**Returns:** `THREE.CanvasTexture`

#### `initLights()`
Set up Three.js lighting.

**Lights:**
- `AmbientLight` (0.6 intensity)
- `DirectionalLight` (0.4 intensity)
- `PointLight` (gold, 0.3 intensity) for highlights

#### `initRaycaster()`
Initialize raycaster for mouse detection.

```javascript
this.raycaster = new THREE.Raycaster();
this.mouse = new THREE.Vector2();
```

#### `initEventListeners()`
Set up mouse and click handlers.

**Events:**
- `mousemove` → Calculate tilt based on mouse position
- `click` → Trigger flip

#### `onMouseMove(event)`
Handle mouse movement - calculate tilt toward cursor.

**Logic:**
1. Convert mouse to normalized coordinates (-1 to +1)
2. Raycast to check if mouse is over card
3. Calculate rotation based on position (max 15°)
4. Smooth interpolation in `animate()`

**Tilt Formula:**
```javascript
targetRotationX = mouseY * maxTilt;  // Tilt up/down
targetRotationZ = -mouseX * maxTilt; // Tilt left/right
```

#### `onClick(event)`
Handle click - flip the card if raycast hits the mesh.

#### `flip()`
Rotate card 180° (π radians).

**Logic:**
1. Add 180° to target rotation
2. Call `onFlipToBack()` if flipping to question side
3. Set animation lock for 600ms

#### `animate()`
Main render loop.

**Per Frame:**
1. Smooth interpolation for all rotations
2. Apply rotations to card mesh
3. Render scene

**Interpolation:**
```javascript
current += (target - current) * 0.1; // Smooth 10% lerp
```

#### `isShowingQuestion()`
Get current flip state.

**Returns:** `boolean`

#### `dispose()`
Clean up Three.js resources.

**Cleanup:**
- Remove resize listener
- Dispose renderer, textures

## Export

### `initCard(onFlipToBack)`
Factory function to create ThreeCard instance.

**Returns:** `ThreeCard` instance or `null` if container not found

## Technical Details

### Raycasting
- Converts mouse position to normalized device coordinates (NDC)
- Casts ray from camera through mouse position
- Checks intersection with card mesh
- Enables precise mouse-over detection

### Coordinate System
```
         +Y
          |
    -X ---+--- +X
          |
         -Y
    +Z (toward camera)
```

### Rotation Axes
- **X-axis:** Tilt up/down (pitch)
- **Y-axis:** Flip animation (yaw)
- **Z-axis:** Tilt left/right (roll)

### Tilt Behavior
- Max tilt: 15° in any direction
- Tilt follows mouse position relative to card center
- Smooth damping via lerp interpolation
- Resets to 0° when mouse leaves card

## Usage Example

```javascript
import { initCard } from './three-card.js';

const card = initCard(() => {
  console.log('Flipped to question side!');
  // Load new question here
});
```
