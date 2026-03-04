# index.html Documentation

## Purpose
Main application page - displays the interactive 3D question card using Three.js.

## Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>IceBreaker - Interactive Question Card</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Three.js Canvas Container -->
  <div id="canvas-container"></div>

  <!-- Question Overlay (HTML for crisp text) -->
  <div id="question-overlay">
    <p id="question-text"></p>
  </div>

  <!-- Manage Link -->
  <a href="manage.html">Manage Questions</a>

  <script src="three.min.js"></script>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

## Key Elements

| Element | ID/Class | Purpose |
|---------|----------|---------|
| `#canvas-container` | `.container` | Three.js canvas is rendered here |
| `#question-overlay` | `.question-overlay` | HTML text overlay for questions |
| `#question-text` | `.question-text` | Dynamic question text content |
| `.manage-link` | - | Link to manage page |

## Dependencies
- `css/styles.css` - All styles including animations
- `js/main.js` - Application entry point
- Three.js CDN - 3D rendering engine

## Three.js Setup
- Full-screen canvas (`position: fixed`)
- Question overlay appears on flip (fades in/out)
- Click anywhere on canvas to flip card
- Mouse movement creates tilt effect

## Interaction Flow
1. Page loads → Three.js scene renders 3D card
2. Mouse hover → raycasting detects position → card tilts up to 15°
3. Click → card rotates 180° → question overlay fades in
4. Click again → card rotates back → question overlay fades out
5. Click again → NEW question on next flip
