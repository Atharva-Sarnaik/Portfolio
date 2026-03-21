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

    const xDot = gsap.quickTo(dot, "left", { duration: 0.15, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "top", { duration: 0.15, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "left", { duration: 0.5, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "top", { duration: 0.5, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
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

    window.addEventListener("mousemove", onMouseMove);

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
