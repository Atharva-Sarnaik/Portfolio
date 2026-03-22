"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    name: "KoeScroll",
    year: "2025",
    tech: "Gemini 2.5 Flash · Web & Android · Multimodal AI",
    description: [
      "Bridges visual storytelling and audio drama by using multimodal AI to perform manga PDFs natively with distinct character voices.",
      "Features Real-time AI Dubbing (Hero/Villain/Narrator) and a custom Geometric Sorting Algorithm for intelligent script extraction.",
      "Supports Cross-Platform Sync to pause on Web and resume on Mobile, complete with a Voice Lab and local offline imports."
    ],
    image: "/images/KoeScroll.jpeg",
    githubUrl: "https://github.com/Atharva-Sarnaik/Koe-Scroll",
  },
  {
    number: "02",
    name: "Virtual Try-On",
    year: "2025",
    tech: "Computer Vision · AI Inference · Web App",
    description: [
      "Built an AI-powered virtual try-on application enabling users to preview clothing items using image-based inference.",
      "Features real-time rendering and seamless frontend AI pipeline integration.",
      "Integrated backend services for secure user authentication and image storage, delivering an end-to-end interactive fashion tech experience."
    ],
    image: "/images/Virtual Try On.webp",
    githubUrl: "https://github.com/Atharva-Sarnaik/Virtual-Try-On-System",
  },
  {
    number: "03",
    name: "Sentiment Analysis",
    year: "2024",
    tech: "Transformer Models · Analytics · Automation",
    description: [
      "Engineered an AI-powered analyzer using Transformer Models for sentiment and topic classification.",
      "Successfully classified and analyzed across over 500 pieces of complex feedback.",
      "Automated the generation of instructor-wise reports and interactive dashboards, reducing manual data processing time by an estimated 80%."
    ],
    image: "/images/Sentiment Analysis.webp",
    githubUrl: "https://github.com/Atharva-Sarnaik/Sentiment-Analysis/tree/main",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [displayProject, setDisplayProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create ScrollTriggers for each project block
      PROJECTS.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.project-block-${i}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveProject(i),
          onEnterBack: () => setActiveProject(i),
        });

        // Image reveal/scale animation as user scrolls
        gsap.fromTo(
          `.project-img-${i}`,
          { scale: 1.05 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.project-block-${i}`,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle content transition animation
  useEffect(() => {
    if (activeProject === displayProject) return;

    const tl = gsap.timeline();

    tl.to(detailsRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setDisplayProject(activeProject)
    });

    tl.fromTo(detailsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, delay: 0.15, ease: "power2.out" }
    );
  }, [activeProject, displayProject]);

  // Custom Cursor Interaction
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.getElementById("project-cursor");
    const rightPanel = document.querySelector(".projects-right-panel");
    if (!cursor || !rightPanel) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const onMouseEnter = () => {
      document.body.style.cursor = "none";
      cursor.style.opacity = "1";
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const onMouseLeave = () => {
      document.body.style.cursor = "default";
      cursor.style.opacity = "0";
      cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rightPanel.addEventListener("mouseenter", onMouseEnter);
    rightPanel.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      rightPanel.removeEventListener("mouseenter", onMouseEnter);
      rightPanel.removeEventListener("mouseleave", onMouseLeave);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#f5f3ee]"
    >
      <div className="flex flex-col md:flex-row w-full">

        {/* TOP/LEFT PANEL - Sticky on Mobile & Desktop */}
        <div className="w-full h-[45vh] md:w-[52%] md:h-screen sticky top-0 border-b md:border-b-0 md:border-r border-[#d4d0c8] bg-[#f5f3ee] z-30">
          <div className="h-full flex flex-col p-6 lg:p-16 relative">
            {/* Heading Area */}
            <div>
              <div className="flex flex-col gap-4 mb-4">
                <span className="text-[#9ca3af] text-[11px] font-bold tracking-[0.15em] uppercase">
                  ( → ) PROJECTS
                </span>
                <h2 className="text-[clamp(44px,7vw,110px)] font-[900] uppercase text-[#1a1a1a] leading-[0.9] tracking-[-2px] md:tracking-[-3px]">
                  Selected <br /> Works
                </h2>
              </div>
            </div>

            {/* Element 1: Active Project Details (Desktop & Mobile) */}
            <div
              ref={detailsRef}
              className="absolute bottom-6 left-6 right-6 lg:bottom-16 lg:left-16 lg:w-[380px] lg:right-auto"
            >
              <div className="flex justify-between items-baseline mb-3 md:mb-6">
                <h3 className="text-[14px] md:text-[15px] font-bold uppercase text-[#1a1a1a] tracking-[0.05em]">
                  {PROJECTS[displayProject].number} {PROJECTS[displayProject].name}
                </h3>
                <span className="text-[12px] md:text-[14px] text-[#9ca3af] font-normal">
                  {PROJECTS[displayProject].year}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2">
                {PROJECTS[displayProject].description.map((line, idx) => (
                  <p key={idx} className="text-[#4b5563] text-[12px] md:text-[13px] leading-[1.6] md:leading-[1.7]">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Element 2: Project Navigation (Desktop) */}
            <div className="hidden md:flex absolute lg:bottom-16 lg:right-16 flex-col gap-1 items-end">
              {PROJECTS.map((project, i) => (
                <span
                  key={project.number}
                  className={`text-[12px] uppercase tracking-wider transition-colors duration-300 ${activeProject === i ? "text-[#1a1a1a] font-bold" : "text-[#c0bdb7]"
                    }`}
                >
                  {project.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Scrollable Blocks */}
        <div className="projects-right-panel w-full md:w-[48%]">
          {PROJECTS.map((project, i) => (
            <a
              key={project.number}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-block-${i} block relative w-full h-[55vh] md:h-screen overflow-hidden group border-b border-[#d4d0c8] md:border-b-0`}
            >
              {/* Image with Parallax Scale */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className={`project-img-${i} w-full h-full object-cover will-change-transform`}
                />

                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:opacity-40 z-10" />

                {/* Project Title (Overlaid) */}
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 text-right text-white max-w-[280px] md:max-w-[400px]">
                  <h4 className="text-[clamp(22px,5vw,72px)] font-bold italic leading-tight font-playfair tracking-tight">
                    {project.name}
                  </h4>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Custom Cursor Label */}
      <div
        id="project-cursor"
        className="fixed w-20 h-20 rounded-full bg-white/92 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none z-[9999] opacity-0 transition-opacity transition-transform duration-[250ms] ease-out hidden md:flex"
        style={{ transform: "translate(-50%, -50%) scale(0.5)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <span className="text-[9px] font-bold tracking-widest text-[#1a1a1a] uppercase">GitHub</span>
      </div>
    </section>
  );
}
