"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        top: -4,
        left: -4,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#1a1a1a',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        top: -16,
        left: -16,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: '1.5px solid rgba(26,26,26,0.4)',
        pointerEvents: 'none',
        zIndex: 99998,
        willChange: 'transform',
      }} />
    </>
  );
}
