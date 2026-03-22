"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check for touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.85;
      cursorY += (mouseY - cursorY) * 0.85;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dot) {
        dot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterHoverable = () => {
      dot.style.width = "60px";
      dot.style.height = "60px";
      dot.style.background = "rgba(37, 99, 235, 0.15)";
      dot.style.mixBlendMode = "difference";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "#2563EB";
    };

    const onMouseLeaveHoverable = () => {
      dot.style.width = "8px";
      dot.style.height = "8px";
      dot.style.background = "#2563EB";
      dot.style.mixBlendMode = "normal";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(37, 99, 235, 0.5)";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll(
      'a, button, [data-cursor="hover"], .project-card, .social-icon, .magnetic-wrap'
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHoverable);
      el.addEventListener("mouseleave", onMouseLeaveHoverable);
    });

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const newHoverables = document.querySelectorAll(
        'a, button, [data-cursor="hover"], .project-card, .social-icon, .magnetic-wrap'
      );
      newHoverables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterHoverable);
        el.addEventListener("mouseleave", onMouseLeaveHoverable);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHoverable);
        el.removeEventListener("mouseleave", onMouseLeaveHoverable);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ backgroundColor: "#1a1a1a" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ borderColor: "rgba(26, 26, 26, 0.3)" }}
      />
    </>
  );
}
