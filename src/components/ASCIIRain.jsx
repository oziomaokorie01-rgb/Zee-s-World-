import React, { useEffect, useRef } from 'react';
import { useWorldStore } from '../store/useWorldStore';

export default function ASCIIRain() {
  const canvasRef = useRef(null);
  const viewMode = useWorldStore((state) => state.viewMode);

  useEffect(() => {
    if (viewMode !== '2d') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Handle screen scaling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ASCII characters to drop (hacker/crypto-inspired)
    const chars = "01ZEIROKOZENTIMEMNET01X🜂🜄⚡/*[]{}<>-=+%".split("");
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Track vertical drop positions
    const drops = Array(columns).fill(1);

    let animationFrameId;

    const draw = () => {
      // Semi-transparent black creates the trailing fade effect
      ctx.fillStyle = 'rgba(5, 2, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deep cyberpunk purple-green tint mix
      ctx.fillStyle = '#6b21a8'; // Base purple
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomize characters in the rain sequence
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Make some characters bright terminal green/cyan for dynamic variation
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#a855f7'; // Bright neon purple
        } else if (Math.random() > 0.99) {
          ctx.fillStyle = '#14b8a6'; // Cyan data packet pulse
        } else {
          ctx.fillStyle = 'rgba(107, 33, 168, 0.45)'; // Soft background stream
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop back to the top once it hits the bottom boundary randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [viewMode]);

  if (viewMode !== '2d') return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
