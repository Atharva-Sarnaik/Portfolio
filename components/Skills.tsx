"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = [
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "Tailwind", slug: "tailwindcss", color: "06B6D4" },
  { name: "TensorFlow", slug: "tensorflow", color: "FF6F00" },
  { name: "NumPy", slug: "numpy", color: "013243" },
];

const ROW_2 = [
  { name: "Pandas", slug: "pandas", color: "150458" },
  { name: "Scikit-learn", slug: "scikitlearn", color: "F7931E" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "FastAPI", slug: "fastapi", color: "009688" },
];

function SkillItem({ 
  name, 
  slug, 
  color 
}: { 
  name: string; 
  slug: string; 
  color: string; 
}) {
  const srcUrl = `https://cdn.simpleicons.org/${slug}/${color}`;

  return (
    <div 
      className="skill-item flex items-center gap-[10px] cursor-default group py-2 px-4 flex-shrink-0"
    >
      <div className="relative w-7 h-7 flex items-center justify-center overflow-visible pointer-events-none">
        <img
          src={srcUrl}
          alt={name}
          className="skill-icon w-7 h-7 object-contain transition-all duration-300 pointer-events-none grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100"
        />
      </div>
      <span 
        className="skill-name text-[14px] font-medium tracking-tight transition-colors duration-300 text-[#888888] group-hover:text-[#1a1a1a]"
      >
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ 
  skills, 
  direction 
}: { 
  skills: typeof ROW_1; 
  direction: "left" | "right";
}) {
  // Triple the items for extra-wide viewports to ensure seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="marquee-row">
      <div className={`marquee-track ${direction}`}>
        {duplicatedSkills.map((skill, index) => (
          <SkillItem key={`${skill.slug}-${index}`} {...skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      bodyRef.current,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-[120px] md:py-[160px] bg-[#edeae3] border-t border-[#d4d0c8]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase">
              SKILLS & TECHNOLOGIES
            </span>
            <div className="h-[1px] w-16 bg-[#c0bdb7]" />
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter text-[#1a1a1a] leading-[1.1]">
            TECHNICAL <span className="text-electric-blue">STACK</span>
          </h2>
        </div>

        {/* Marquee Body */}
        <div ref={bodyRef} className="space-y-4">
          <MarqueeRow skills={ROW_1} direction="left" />
          <MarqueeRow skills={ROW_2} direction="right" />
        </div>
      </div>
    </section>
  );
}
