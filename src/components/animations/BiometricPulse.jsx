import React, { useEffect, useRef } from 'react';

/**
 * Zero-Lag Biometric Pulse Canvas:
 * Procedural ECG life-wave & gentle floating particles in NIMS colors.
 * Uses IntersectionObserver to freeze execution when off-screen for 0% CPU overhead.
 */
export default function BiometricPulse({ height = 280 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for networked care representation
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.4 ? '#0a2f5e' : '#c0304a'
    }));

    let step = 0;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, h);

      // Draw subtle connecting node network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#0a2f5e';
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Smooth Medical Vital Wave (Heartbeat Pulse)
      step += 0.035;
      const centerY = h * 0.65;
      ctx.beginPath();
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 2.5;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(10, 47, 94, 0.1)');
      gradient.addColorStop(0.3, 'rgba(10, 47, 94, 0.7)');
      gradient.addColorStop(0.65, '#c0304a'); // Crimson heartbeat spike
      gradient.addColorStop(1, 'rgba(244, 117, 33, 0.4)'); // Saffron trail
      ctx.strokeStyle = gradient;

      for (let x = 0; x < width; x += 3) {
        // Natural sine wave base
        let y = Math.sin(x * 0.015 + step) * 12;

        // Heartbeat QRS pulse packet moving smoothly across
        const pulsePos = ((step * 60) % (width + 200)) - 100;
        const distFromPulse = Math.abs(x - pulsePos);

        if (distFromPulse < 60) {
          const factor = (60 - distFromPulse) / 60;
          if (distFromPulse < 15) {
            y -= 48 * factor; // High R spike
          } else if (distFromPulse < 35) {
            y += 24 * factor; // S drop
          }
        }

        if (x === 0) {
          ctx.moveTo(x, centerY + y);
        } else {
          ctx.lineTo(x, centerY + y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to freeze render loop when scrolled out
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [height]);

  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: `${height}px`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
