"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "Python",
  "NumPy",
  "Pandas",
  "Scikit-learn",
  "Generative AI",
  "NLP",
  "RAG",
  "API Integration",
  "TypeScript",
  "JavaScript",
  "CSS",
  "Git",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const text = "I am a B.Tech undergraduate in Artificial Intelligence and Data Science (2023–2027), focused on building practical AI-powered applications. While I am currently learning Machine Learning fundamentals, I have hands-on experience with Generative AI, NLP, and real-world AI integrations through projects.";
  const words = text.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !progressLine) return;

    // Line detection logic
    const wordEls = document.querySelectorAll(".about-word");
    const lines: Element[][] = [];
    let currentLine: Element[] = [];
    let currentY: number | null = null;

    wordEls.forEach((el) => {
      const y = Math.round(el.getBoundingClientRect().top);
      if (currentY === null) currentY = y;
      
      // If Y position changes significantly, it's a new line
      if (Math.abs(y - currentY) > 8) {
        if (currentLine.length) lines.push([...currentLine]);
        currentLine = [el];
        currentY = y;
      } else {
        currentLine.push(el);
      }
    });
    if (currentLine.length) lines.push(currentLine);

    const isDesktop = window.innerWidth > 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isDesktop ? "+=2000" : "+=800",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    });

    // 1. Progress Indicator Animation
    tl.to(
      progressLine,
      {
        scaleY: 1,
        ease: "none",
        duration: lines.length || 1,
      },
      0
    );

    // 2. Line-by-Line Word Reveal with "Ink Spreading" effect
    lines.forEach((lineWords, lineIndex) => {
      tl.to(
        lineWords,
        {
          // Step 1: Subtle warm highlight (ink spreading)
          color: "#6b6860", 
          duration: 0.2,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "none",
        },
        lineIndex * 0.6 // Each line starts after a brief pause
      ).to(
        lineWords,
        {
          // Step 2: Final dark color
          color: "#1a1a1a",
          duration: 0.3,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "none",
        },
        lineIndex * 0.6 + 0.15 // Offset slightly for overlap
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#f5f3ee] border-t border-[#d4d0c8] flex flex-col pt-32 md:pt-0 md:justify-center overflow-hidden"
    >
      {/* Progress Indicator Line */}
      <div 
        ref={progressLineRef}
        className="about-progress-line fixed left-0 top-0 w-[3px] h-screen bg-[#2563EB] origin-top scale-y-0 z-50 pointer-events-none hidden md:block"
      />

      <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 md:px-20 w-full pb-20 md:py-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase">
            ABOUT
          </span>
          <div className="h-[1px] w-16 bg-[#c0bdb7]" />
        </div>

        <div className="max-w-4xl">
          <p className="text-[clamp(1.25rem,3vw,2.5rem)] font-medium leading-[1.4] text-[#c0bdb7] flex flex-wrap">
            {words.map((word, i) => (
              <span key={i} className="about-word mr-[0.25em] inline-block">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
