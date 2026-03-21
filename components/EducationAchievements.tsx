"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EducationAchievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = window.innerWidth > 768;

    const ctx = gsap.context(() => {
      // Early reveal: headings slide in from sides
      gsap.from(".edu-heading", {
        opacity: 0,
        x: isDesktop ? -80 : -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: isDesktop ? "top 75%" : "top 85%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(".ach-heading", {
        opacity: 0,
        x: isDesktop ? 80 : 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: isDesktop ? "top 75%" : "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Scrub timeline — mobile doesn't pin but inherits the scrub behavior!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isDesktop ? "top top" : "top 70%",
          end: isDesktop ? "+=2500" : "bottom 40%",
          pin: isDesktop,
          scrub: 1,
          anticipatePin: isDesktop ? 1 : 0,
        },
      });

      // Phase 1 — Education content reveals sequentially
      tl.from(".edu-year", { y: 20, opacity: 0, duration: 0.3 }, 0);
      tl.from(".edu-accent", { scaleX: 0, transformOrigin: "left", duration: 0.25 }, 0.15);
      tl.from(".edu-degree", { y: 25, opacity: 0, duration: 0.35 }, 0.25);
      tl.from(".edu-institution", { y: 15, opacity: 0, duration: 0.3 }, 0.5);
      tl.from(".edu-description", { y: 15, opacity: 0, duration: 0.3 }, 0.7);

      // Phase 2 — Achievements reveal
      tl.from(".ach-item", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.3,
      }, 1.0);

      // Progress Line (Only visual on desktop)
      if (isDesktop) {
        tl.to(progressLineRef.current, {
          scaleY: 1,
          ease: "none",
          duration: 2,
        }, 0);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="edu-section relative min-h-screen bg-[#f5f3ee] border-t border-[#d4d0c8] overflow-hidden flex flex-col justify-center"
    >
      {/* Vertical Progress Line */}
      <div
        ref={progressLineRef}
        className="edu-progress-line fixed left-0 top-0 w-[3px] h-screen bg-[#2563EB] origin-top scale-y-0 z-50 pointer-events-none hidden md:block"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-20 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

          {/* LEFT COLUMN - EDUCATION */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#9ca3af] text-[11px] tracking-[0.15em] uppercase [font-variant:small-caps]">
                  EDU & ACHIEVEMENTS
                </span>
                <div className="h-[1px] w-8 bg-[#c0bdb7]" />
              </div>
              <h2 className="edu-heading text-[clamp(28px,5vw,72px)] font-[900] leading-[0.95] tracking-[-2px] text-[#1a1a1a] uppercase mb-4">
                EDUCATION <span className="text-blue-600">HISTORY</span>
              </h2>
            </div>

            <div className="flex flex-col">
              <div className="edu-year text-blue-600 text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
                2023 — 2027
              </div>

              <div className="edu-accent w-[32px] h-[2px] bg-blue-600 mb-5" />

              <h3 className="edu-degree text-[clamp(18px,2.5vw,34px)] font-[800] text-[#1a1a1a] leading-[1.1] tracking-[-0.5px] mb-2">
                B.Tech in Artificial Intelligence and Data Science
              </h3>
              <p className="edu-institution text-[#9ca3af] text-[13px] font-normal tracking-[0.02em] mb-5 uppercase">
                Government College of Engineering, Kolhapur
              </p>
              <p className="edu-description text-[#6b7280] text-[14px] leading-[1.7] max-w-[420px]">
                Expected Graduation: 2027. Focusing on core AI concepts, Data
                Structures, Machine Learning fundamentals and scalable system design.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - ACHIEVEMENTS */}
          <div className="flex flex-col gap-10">
            <h2 className="ach-heading text-[clamp(28px,5vw,72px)] font-[900] leading-[0.95] tracking-[-2px] text-[#1a1a1a] uppercase mb-4">
              MY <span className="text-purple-600">ACHIEVEMENTS</span>
            </h2>

            <div className="flex flex-col">
              {/* Item 1 */}
              <div className="ach-item py-6 border-t border-[#d4d0c8] relative group flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-[clamp(18px,1.8vw,22px)] font-bold text-[#1a1a1a] tracking-[-0.3px] group-hover:text-blue-600 transition-colors duration-200">
                    Hackathon 2025: Special Appreciation
                  </h3>
                  <span className="text-[11px] font-medium text-[#9ca3af] tracking-[0.1em] shrink-0 uppercase">2025</span>
                </div>
                <p className="text-[#6b7280] text-[13px] leading-[1.6] max-w-[480px]">
                  Received a Token of Appreciation for innovative implementation
                  of the AI Feedback Analysis System.
                </p>
              </div>

              {/* Item 2 */}
              <div className="ach-item py-6 border-y border-[#d4d0c8] relative group flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-[clamp(18px,1.8vw,22px)] font-bold text-[#1a1a1a] tracking-[-0.3px] group-hover:text-blue-600 transition-colors duration-200">
                    Oracle Generative AI Certification
                  </h3>
                  <span className="text-[11px] font-medium text-[#9ca3af] tracking-[0.1em] shrink-0 uppercase">2024</span>
                </div>
                <p className="text-[#6b7280] text-[13px] leading-[1.6] max-w-[480px]">
                  Completed Oracle GenAI Professional certification covering foundational concepts of LLMs, prompt engineering, and enterprise AI use cases.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
