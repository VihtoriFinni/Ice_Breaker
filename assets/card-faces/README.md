# Card Face Textures

Add custom textures for the card front and back!

## How to use:

### Card Front (Design Face)
Place your image here:
- `front.png` or `front.jpg`
- Recommended: 512x730 pixels
- Transparent PNG works best for glassmorphism effect

### Card Back (Question Background)
Place your image here:
- `back.png` or `back.jpg`
- Recommended: 512x730 pixels
- Use subtle patterns so text remains readable

## To enable custom textures:

Open `js/three-card.js` and modify these functions:

```javascript
// In createFrontTexture() - replace canvas with image:
const texture = new THREE.TextureLoader().load('../assets/card-faces/front.png');

// In createBackTexture() - use as background:
const bgTexture = new THREE.TextureLoader().load('../assets/card-faces/back.png');
```

## Tips:
- Keep contrast low for question side (text needs to be readable)
- Use PNG with transparency for best glassmorphism effect
- Test with both light and dark questions
