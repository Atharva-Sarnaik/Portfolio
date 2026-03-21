"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();

    // Set initial centering securely with GSAP
    gsap.set(counterRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(nameRef.current, { xPercent: -50, yPercent: -50, y: 30 });

    // Phase 1: Count 0 → 100
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counter.value));
      },
    });

    // Phase 2: Fade out counter, show name
    tl.to(counterRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: "power3.in",
    });

    tl.to(
      nameRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.1"
    );

    // Phase 3: Wait a beat then wipe
    tl.to(
      screenRef.current,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.3,
        onComplete: () => {
          onComplete();
        },
      },
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="loading-screen"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <span 
        ref={counterRef} 
        className="loading-counter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {count}%
      </span>
      <div
        ref={nameRef}
        className="loading-name text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        PORTFOLIO.
      </div>
    </div>
  );
}
