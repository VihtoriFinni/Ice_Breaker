# Assets Folder

Custom images and backgrounds for IceBreaker.

## Structure:

```
/assets
├── backgrounds/     # Website background images
├── card-faces/      # Card texture images
└── README.md        # This file
```

## Quick Setup:

### Add Website Background:
1. Put your image in `assets/backgrounds/`
2. Currently using: `wood-background.jpg`
3. Update `css/styles.css`:
```css
body {
  background: url('../assets/backgrounds/wood-background.jpg') center/cover no-repeat fixed;
}
```

### Add Card Face:
1. Put your image in `assets/card-faces/`
2. Currently using: `card_Front.png`
3. Update `js/three-card.js` in `createFrontTexture()`:
```javascript
return new THREE.TextureLoader().load('../assets/card-faces/card_Front.png');
```

## Image Guidelines:
- Keep file sizes under 2MB
- Use WebP for best compression
- Test on mobile devices
