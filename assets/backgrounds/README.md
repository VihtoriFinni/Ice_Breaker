# Website Backgrounds

Add your background images here!

## How to use:

1. Place your image files in this folder:
   - `background.jpg`
   - `background.png`
   - `background.webp`

2. Update the CSS variable in `css/styles.css`:

```css
body {
  background-image: url('../assets/backgrounds/your-image.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

## Recommended sizes:
- Resolution: 1920x1080 or higher
- Format: JPG, PNG, or WebP
- File size: Under 2MB for faster loading

## Default gradient:
If no image is set, the app uses a purple gradient:
`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
