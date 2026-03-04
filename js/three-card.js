/**
 * IceBreaker - Three-Card Module
 *
 * Real Three.js 3D mesh with raycasting for tilt effect.
 */

/**
 * ThreeCard class - Manages 3D card with Three.js
 */
class ThreeCard {
  /**
   * Initialize the ThreeCard instance
   * @param {HTMLElement} container - The container element
   * @param {Function} onFlipToBack - Callback when flipping to question side
   */
  constructor(container, onFlipToBack) {
    this.container = container;
    this.onFlipToBack = onFlipToBack;

    // Card dimensions
    this.cardWidth = 3.5;  // Scaled for Three.js
    this.cardHeight = 5;

    // Flip state
    this.isFlipping = false;
    this.isQuestionSide = false;
    this.targetRotationY = 0;
    this.currentRotationY = 0;

    // Tilt state (max 15 degrees in radians)
    this.maxTilt = 15 * (Math.PI / 180); // 15 degrees in radians
    this.targetRotationX = 0;
    this.targetRotationZ = 0;
    this.currentRotationX = 0;
    this.currentRotationZ = 0;

    // Initialize
    this.initScene();
    this.initCard();
    this.initLights();
    this.initRaycaster();
    this.initEventListeners();
    this.animate();
  }

  /**
   * Initialize Three.js scene, camera, and renderer
   */
  initScene() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 12;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // Transparent
    this.container.appendChild(this.renderer.domElement);

    // Handle window resize
    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * Create the 3D card mesh
   */
  initCard() {
    // Create canvas texture for front (design/pattern)
    this.frontTexture = this.createFrontTexture();
    this.backTexture = this.createBackTexture();

    // Card geometry (thin box)
    const geometry = new THREE.BoxGeometry(
      this.cardWidth,
      this.cardHeight,
      0.05
    );

    // Materials for each face
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x667eea }), // right
      new THREE.MeshBasicMaterial({ color: 0x667eea }), // left
      new THREE.MeshBasicMaterial({ color: 0x764ba2 }), // top
      new THREE.MeshBasicMaterial({ color: 0x764ba2 }), // bottom
      new THREE.MeshBasicMaterial({ map: this.frontTexture }), // front
      new THREE.MeshBasicMaterial({ map: this.backTexture })  // back
    ];

    // Create mesh
    this.card = new THREE.Mesh(geometry, materials);
    this.scene.add(this.card);
  }

  /**
   * Create front texture (design/pattern)
   */
  createFrontTexture() {
    // Try to load custom image, with fallback to procedural texture
    const loader = new THREE.TextureLoader();

    // Try loading from assets
    const texture = loader.load(
      'assets/card-faces/card_Front.png',
      undefined,  // onLoad
      undefined,  // onProgress
      () => {      // onError - fallback to procedural texture
        console.warn('Could not load card-front.png, using procedural texture');
      }
    );

    return texture;
  }

  /**
   * Create back texture (question face)
   * @param {string} text - The question text to display
   */
  createBackTexture(text = '') {
    // To use a custom background image, uncomment below (will draw text on top):
    // const bgTexture = new THREE.TextureLoader().load('../assets/card-faces/back.png');
    // ...then draw bgTexture onto canvas before adding text

    // Otherwise, create procedural canvas texture:
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 730;
    const ctx = canvas.getContext('2d');

    // Solid color background (#541212 - dark red/brown)
    ctx.fillStyle = '#541212';
    ctx.fillRect(0, 0, 512, 730);

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 492, 710);

    // Draw text if provided
    if (text) {
      // Text shadow for readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Word wrap the text
      this.wrapText(ctx, text, 256, 365, 440, 40);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Wrap text to fit within canvas width
   */
  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw each line centered
    const totalHeight = lines.length * lineHeight;
    let currentY = y - (totalHeight / 2) + (lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, currentY);
      currentY += lineHeight;
    }
  }

  /**
   * Update the back texture with new question text
   * @param {string} text - The new question text
   */
  updateBackTexture(text) {
    // Dispose old texture
    if (this.backTexture) {
      this.backTexture.dispose();
    }

    // Create new texture with text
    this.backTexture = this.createBackTexture(text);

    // Update the card's back material (index 5)
    this.card.material[5].map = this.backTexture;
    this.card.material[5].needsUpdate = true;
  }

  /**
   * Initialize lights
   */
  initLights() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    // Directional light
    const directional = new THREE.DirectionalLight(0xffffff, 0.4);
    directional.position.set(5, 5, 10);
    this.scene.add(directional);

    // Point light for highlights
    const point = new THREE.PointLight(0xffd700, 0.3, 20);
    point.position.set(0, 0, 5);
    this.scene.add(point);
  }

  /**
   * Initialize raycaster for mouse detection
   */
  initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Mouse move for tilt effect
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Click for flip
    this.renderer.domElement.addEventListener('click', (e) => this.onClick(e));
  }

  /**
   * Handle mouse move - calculate tilt based on mouse position
   */
  onMouseMove(event) {
    // Update mouse coordinates for raycaster (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Store mouse position for click detection
    this.currentMouseX = this.mouse.x;
    this.currentMouseY = this.mouse.y;

    // Card ONLY tilts up/down (X rotation), NOT left/right
    // mouseY determines up/down tilt
    const mouseY = this.mouse.y; // -1 (bottom) to +1 (top)

    // Tilt toward mouse (max 15 degrees) - only up/down
    this.targetRotationX = mouseY * this.maxTilt;
    this.targetRotationZ = 0; // NO left/right tilt

    // Check if mouse is over the card for cursor style
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.card);

    if (intersects.length > 0) {
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  /**
   * Handle click - flip the card
   */
  onClick(event) {
    // Check if click is on the card
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.card);

    if (intersects.length > 0 && !this.isFlipping) {
      this.flip();
    }
  }

  /**
   * Flip the card 180 degrees
   */
  flip() {
    this.isFlipping = true;
    this.targetRotationY += Math.PI; // Add 180 degrees (PI radians)

    if (!this.isQuestionSide) {
      // Flipping TO question side
      this.isQuestionSide = true;
      // Pass the updateBackTexture function to the callback
      this.onFlipToBack((text) => this.updateBackTexture(text));
    } else {
      // Flipping back to design side
      this.isQuestionSide = false;
    }

    // Reset flipping flag after animation (600ms)
    setTimeout(() => {
      this.isFlipping = false;
    }, 600);
  }

  /**
   * Handle window resize
   */
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth interpolation for flip (Y rotation)
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.1;

    // Smooth interpolation for tilt (X and Z rotation)
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.1;
    this.currentRotationZ += (this.targetRotationZ - this.currentRotationZ) * 0.1;

    // Apply rotations
    this.card.rotation.y = this.currentRotationY;
    this.card.rotation.x = this.currentRotationX;
    this.card.rotation.z = this.currentRotationZ;

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Get current flip state
   * @returns {boolean} True if showing question side
   */
  isShowingQuestion() {
    return this.isQuestionSide;
  }

  /**
   * Clean up resources
   */
  dispose() {
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
    this.frontTexture.dispose();
    this.backTexture.dispose();
  }
}

/**
 * Initialize the card on the main page
 * @param {Function} onFlipToBack - Callback when flipping to question side
 * @returns {ThreeCard|null} The ThreeCard instance or null if container not found
 */
export function initCard(onFlipToBack) {
  const container = document.getElementById('canvas-container');
  if (!container) return null;

  return new ThreeCard(container, onFlipToBack);
}

export default ThreeCard;
