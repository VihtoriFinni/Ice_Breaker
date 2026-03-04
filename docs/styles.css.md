# styles.css Documentation

## Purpose
All visual styling including glassmorphism, Three.js canvas positioning, and animations.

## File Structure

```css
/* CSS Variables */
:root { ... }              # Theme variables
[data-theme="dark"] { ... } # Dark mode overrides

/* Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { ... }

/* Main Card View (Three.js) */
#canvas-container { ... }   # Full-screen Three.js canvas
.question-overlay { ... }   # Question text overlay
.question-text { ... }      # Question styling
.manage-link { ... }        # Link to manage page

/* Manage Page */
.manage-container { ... }
.manage-header { ... }
.add-question-section { ... }
.questions-list { ... }
.question-item { ... }

/* Responsive */
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

## CSS Variables

| Variable | Default Value | Purpose |
|----------|---------------|---------|
| `--bg-gradient` | `#667eea → #764ba2` | Fallback gradient |
| `--glass-bg` | `rgba(255,255,255,0.1)` | Glass background |
| `--glass-border` | `rgba(255,255,255,0.2)` | Glass border |
| `--glass-shadow` | `0 8px 32px rgba(0,0,0,0.1)` | Drop shadow |

**Note:** Currently using wood background image instead of gradient:
```css
body {
  background: url('../assets/backgrounds/wood-background.jpg') center/cover no-repeat fixed;
}
```

## Key Elements

### Three.js Canvas Container
```css
#canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
```

### Question Overlay
```css
.question-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;  /* Let clicks pass to canvas */
  opacity: 0;
  transition: opacity 0.3s ease;
}
.question-overlay.visible {
  opacity: 1;
}
```

### Manage Link
```css
.manage-link {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* Glassmorphism styling */
}
```

## Responsive Breakpoints
- **Desktop**: Default (> 768px)
- **Tablet**: 768px and below
- **Mobile**: 480px and below

## Dependencies
None - pure CSS, no external libraries required.

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with -webkit- prefix for backdrop-filter)

## Notes
- Three.js handles all 3D rendering
- CSS only handles overlay and UI elements
- Question text uses HTML overlay for better readability than canvas text
