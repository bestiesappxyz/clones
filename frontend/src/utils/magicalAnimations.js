/**
 * Magical Animation Utilities for Besties Onboarding
 * Physics-based animations, particle systems, and smooth transitions
 */

// ==================== PARTICLE SYSTEM ====================

export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      particleCount: options.particleCount || 50,
      colors: options.colors || ['#FF69B4', '#9370DB', '#FFB6C1', '#DDA0DD', '#FF1493'],
      maxSize: options.maxSize || 8,
      minSize: options.minSize || 3,
      speed: options.speed || 2,
      gravity: options.gravity || 0.05,
      ...options
    };
    this.animationFrame = null;
  }

  createParticle(x, y, type = 'heart') {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * this.options.speed * 2,
      vy: -Math.random() * this.options.speed * 3,
      size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
      color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      type,
      life: 1,
      decay: 0.01 + Math.random() * 0.02
    };
  }

  burst(x, y, count = 30, type = 'heart') {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y, type));
    }
  }

  drawHeart(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Left curve
    ctx.bezierCurveTo(
      -size / 2, -topCurveHeight,
      -size, topCurveHeight / 2,
      0, size
    );
    // Right curve
    ctx.bezierCurveTo(
      size, topCurveHeight / 2,
      size / 2, -topCurveHeight,
      0, topCurveHeight
    );
    ctx.fill();

    ctx.restore();
  }

  drawStar(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  drawCircle(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Draw cross
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);

    // Draw diagonal cross
    const offset = size * 0.7;
    ctx.moveTo(-offset, -offset);
    ctx.lineTo(offset, offset);
    ctx.moveTo(offset, -offset);
    ctx.lineTo(-offset, offset);

    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.particles = this.particles.filter(p => {
      // Update position
      p.vy += this.options.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Update life
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      return p.life > 0 && p.y < this.canvas.height + 50;
    });
  }

  draw() {
    this.particles.forEach(p => {
      switch (p.type) {
        case 'heart':
          this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          break;
        case 'star':
          this.drawStar(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          break;
        case 'circle':
          this.drawCircle(this.ctx, p.x, p.y, p.size, p.color, p.alpha);
          break;
        case 'sparkle':
          this.drawSparkle(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
          break;
        default:
          this.drawCircle(this.ctx, p.x, p.y, p.size, p.color, p.alpha);
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    if (this.animationFrame) return;
    this.animate();
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.particles = [];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// ==================== FLYING ICON ANIMATION ====================

export class FlyingIcon {
  static async flyTo(element, targetX, targetY, options = {}) {
    const {
      duration = 1000,
      easing = 'spring',
      onComplete = () => {},
      rotation = 360,
      scale = 1.5,
      trail = true
    } = options;

    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Create clone for animation
    const clone = element.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${startX}px`;
    clone.style.top = `${startY}px`;
    clone.style.transform = 'translate(-50%, -50%)';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'none';
    document.body.appendChild(clone);

    // Create trail effect if enabled
    let trailInterval;
    if (trail) {
      trailInterval = setInterval(() => {
        const trailClone = clone.cloneNode(true);
        trailClone.style.opacity = '0.3';
        trailClone.style.transform = clone.style.transform;
        document.body.appendChild(trailClone);

        setTimeout(() => {
          trailClone.style.transition = 'opacity 300ms';
          trailClone.style.opacity = '0';
          setTimeout(() => trailClone.remove(), 300);
        }, 50);
      }, 100);
    }

    // Animate
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      let easedProgress;
      if (easing === 'spring') {
        easedProgress = this.springEasing(progress);
      } else if (easing === 'bounce') {
        easedProgress = this.bounceEasing(progress);
      } else {
        easedProgress = this.easeOutCubic(progress);
      }

      // Calculate position
      const currentX = startX + (targetX - startX) * easedProgress;
      const currentY = startY + (targetY - startY) * easedProgress;

      // Calculate arc for more natural movement
      const arcHeight = -100; // Peak of the arc
      const arcY = currentY + Math.sin(easedProgress * Math.PI) * arcHeight;

      // Apply transforms
      const currentRotation = rotation * easedProgress;
      const currentScale = 1 + (scale - 1) * Math.sin(easedProgress * Math.PI);

      clone.style.left = `${currentX}px`;
      clone.style.top = `${arcY}px`;
      clone.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${currentScale})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (trailInterval) clearInterval(trailInterval);
        clone.style.transition = 'opacity 200ms';
        clone.style.opacity = '0';
        setTimeout(() => {
          clone.remove();
          onComplete();
        }, 200);
      }
    };

    animate();
  }

  static springEasing(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }

  static bounceEasing(t) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

  static easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// ==================== MORPHING ANIMATIONS ====================

export const morphAnimations = {
  // Morph between two SVG paths
  morphPath(path, fromD, toD, duration = 1000) {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Simple interpolation (for production, use library like flubber)
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  },

  // Pulse animation
  pulse(element, options = {}) {
    const { scale = 1.1, duration = 600, iterations = 3 } = options;

    element.style.animation = `pulse ${duration}ms ease-in-out ${iterations}`;

    return new Promise(resolve => {
      setTimeout(() => {
        element.style.animation = '';
        resolve();
      }, duration * iterations);
    });
  },

  // Shake animation
  shake(element, intensity = 10) {
    const duration = 500;
    const startTime = Date.now();
    const originalTransform = element.style.transform || '';

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        const offset = Math.sin(progress * Math.PI * 4) * intensity * (1 - progress);
        element.style.transform = `${originalTransform} translateX(${offset}px)`;
        requestAnimationFrame(animate);
      } else {
        element.style.transform = originalTransform;
      }
    };

    animate();
  },

  // Float animation
  float(element, options = {}) {
    const { distance = 20, duration = 2000 } = options;
    const startTime = Date.now();
    const originalTransform = element.style.transform || '';

    const animate = () => {
      const elapsed = (Date.now() - startTime) % duration;
      const progress = elapsed / duration;
      const offset = Math.sin(progress * Math.PI * 2) * distance;

      element.style.transform = `${originalTransform} translateY(${offset}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }
};

// ==================== TRANSITION EFFECTS ====================

export const transitionEffects = {
  // Slide transition with element flying
  async slideWithFlyingElement(currentSlide, nextSlide, flyingElement, direction = 'right') {
    const container = currentSlide.parentElement;
    const containerRect = container.getBoundingClientRect();

    // Calculate target position (center of next slide)
    const targetX = containerRect.width / 2;
    const targetY = containerRect.height / 2;

    // Start flying animation
    const flyPromise = FlyingIcon.flyTo(flyingElement, targetX, targetY, {
      duration: 800,
      easing: 'spring',
      rotation: 360,
      trail: true
    });

    // Slide transition
    await new Promise(resolve => {
      setTimeout(() => {
        currentSlide.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms';
        nextSlide.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms';

        const slideDistance = direction === 'right' ? -100 : 100;
        currentSlide.style.transform = `translateX(${slideDistance}%)`;
        currentSlide.style.opacity = '0';

        nextSlide.style.transform = 'translateX(0)';
        nextSlide.style.opacity = '1';

        setTimeout(resolve, 600);
      }, 400); // Wait for flying element to start
    });

    await flyPromise;
  },

  // 3D flip transition
  async flip3D(currentSlide, nextSlide, axis = 'y') {
    currentSlide.style.transition = 'transform 600ms';
    currentSlide.style.transformStyle = 'preserve-3d';
    nextSlide.style.transformStyle = 'preserve-3d';

    const rotation = axis === 'y' ? 'rotateY(90deg)' : 'rotateX(90deg)';
    const reverseRotation = axis === 'y' ? 'rotateY(-90deg)' : 'rotateX(-90deg)';

    currentSlide.style.transform = rotation;

    await new Promise(resolve => setTimeout(resolve, 300));

    currentSlide.style.display = 'none';
    nextSlide.style.display = 'flex';
    nextSlide.style.transform = reverseRotation;

    await new Promise(resolve => setTimeout(resolve, 50));

    nextSlide.style.transition = 'transform 600ms';
    nextSlide.style.transform = 'rotateY(0deg) rotateX(0deg)';

    await new Promise(resolve => setTimeout(resolve, 600));
  },

  // Explosion transition
  async explode(currentSlide, nextSlide, particleSystem) {
    const rect = currentSlide.getBoundingClientRect();

    // Create explosion at center
    particleSystem.burst(
      rect.width / 2,
      rect.height / 2,
      100,
      'star'
    );

    particleSystem.start();

    // Fade out current, fade in next
    currentSlide.style.transition = 'opacity 400ms, transform 400ms';
    currentSlide.style.opacity = '0';
    currentSlide.style.transform = 'scale(0.8)';

    await new Promise(resolve => setTimeout(resolve, 200));

    currentSlide.style.display = 'none';
    nextSlide.style.display = 'flex';
    nextSlide.style.opacity = '0';
    nextSlide.style.transform = 'scale(1.2)';

    await new Promise(resolve => setTimeout(resolve, 50));

    nextSlide.style.transition = 'opacity 400ms, transform 400ms';
    nextSlide.style.opacity = '1';
    nextSlide.style.transform = 'scale(1)';

    await new Promise(resolve => setTimeout(resolve, 400));
  }
};

// ==================== CONFETTI EFFECTS ====================

export const confettiEffects = {
  celebration(x, y, particleSystem) {
    const types = ['heart', 'star', 'circle', 'sparkle'];
    types.forEach(type => {
      particleSystem.burst(x, y, 25, type);
    });
    particleSystem.start();
  },

  continuous(particleSystem, duration = 3000) {
    const interval = setInterval(() => {
      const x = Math.random() * particleSystem.canvas.width;
      const types = ['heart', 'star', 'sparkle'];
      const type = types[Math.floor(Math.random() * types.length)];
      particleSystem.burst(x, 0, 5, type);
    }, 100);

    particleSystem.start();

    setTimeout(() => {
      clearInterval(interval);
    }, duration);
  }
};

// ==================== TEXT ANIMATIONS ====================

export const textAnimations = {
  // Typewriter effect
  async typewriter(element, text, speed = 50) {
    element.textContent = '';

    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  },

  // Glitch effect
  glitch(element, duration = 2000) {
    const originalText = element.textContent;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()';
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        const glitched = originalText
          .split('')
          .map((char, i) => {
            if (Math.random() < 0.1) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
            return char;
          })
          .join('');

        element.textContent = glitched;
        requestAnimationFrame(animate);
      } else {
        element.textContent = originalText;
      }
    };

    animate();
  },

  // Shimmer effect
  shimmer(element) {
    element.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)';
    element.style.backgroundSize = '200% 100%';
    element.style.animation = 'shimmer 2s infinite';
    element.style.backgroundClip = 'text';
    element.style.webkitBackgroundClip = 'text';
    element.style.color = 'transparent';
  }
};

// ==================== UTILITY FUNCTIONS ====================

export const utils = {
  // Wait for specified duration
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Generate random color from palette
  randomColor(palette = ['#FF69B4', '#9370DB', '#FFB6C1']) {
    return palette[Math.floor(Math.random() * palette.length)];
  },

  // Interpolate between two values
  lerp(start, end, progress) {
    return start + (end - start) * progress;
  },

  // Clamp value between min and max
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
};
