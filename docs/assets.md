# assets/ Folder Documentation

## Purpose
Custom images for website backgrounds and card textures.

## Structure

```
/assets
├── backgrounds/    # Website background images
├── card-faces/     # Card texture images
└── README.md       # This file
```

---

## Website Backgrounds

### Location: `assets/backgrounds/`

### How to add:
1. Place your image in this folder
2. Recommended: `background.jpg` or `background.png`
3. Size: 1920x1080 or larger
4. Format: JPG, PNG, or WebP

### Enable in CSS:
Open `css/styles.css` and uncomment:

```css
body {
  background: url('../assets/backgrounds/background.jpg') center/cover no-repeat fixed;
}
```

**Or keep the default gradient:**
```css
background: var(--bg-gradient); /* Purple gradient */
```

---

## Card Textures

### Location: `assets/card-faces/`

### Card Front (Design Face)
- **Filename:** `front.png` or `front.jpg`
- **Size:** 512x730 pixels
- **Format:** PNG with transparency recommended
- **Purpose:** Design face without question text

### Card Back (Question Background)
- **Filename:** `back.png` or `back.jpg`
- **Size:** 512x730 pixels
- **Format:** PNG or JPG
- **Purpose:** Subtle background behind question text
- **Note:** Keep it subtle so text remains readable

### Enable in Three.js:
Open `js/three-card.js` and uncomment in `createFrontTexture()`:

```javascript
// Replace canvas texture with:
return new THREE.TextureLoader().load('../assets/card-faces/front.png');
```

---

## Image Guidelines

| Purpose | Size | Format | Notes |
|---------|------|--------|-------|
| Website Background | 1920x1080+ | JPG/WebP | Keep under 2MB |
| Card Front | 512x730 | PNG+transparency | Glassmorphism effect |
| Card Back | 512x730 | PNG/JPG | Low contrast for readability |

---

## Quick Setup

### 1. Add Website Background:
```
assets/backgrounds/background.jpg  →  Drop your image here
```

Then in `css/styles.css`:
```css
/* Uncomment this line: */
/* background: url('../assets/backgrounds/background.jpg') center/cover no-repeat fixed; */
```

### 2. Add Card Face:
```
assets/card-faces/front.png  →  Drop your image here
```

Then in `js/three-card.js`:
```javascript
// Uncomment in createFrontTexture():
return new THREE.TextureLoader().load('../assets/card-faces/front.png');
```

---

## Default Behavior

If no custom images are provided:
- **Website:** Purple gradient background
- **Card Front:** Procedural canvas texture with "?" and pattern
- **Card Back:** Glassmorphism canvas texture
