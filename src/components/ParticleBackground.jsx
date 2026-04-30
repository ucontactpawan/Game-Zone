import { useEffect, useRef } from "react";
import "./ParticleBackground.css";

const PARTICLE_COUNT = 28;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      r: rand(1, 3.5),
      dx: rand(-0.25, 0.25),
      dy: rand(-0.3, -0.08),
      alpha: rand(0.15, 0.55),
    }));

    let raf;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        // wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }
      raf = requestAnimationFrame(draw);
    }

    draw();

    function onResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-bg" aria-hidden="true" />;
}
