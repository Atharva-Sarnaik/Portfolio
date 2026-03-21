"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "About", href: "#about", script: "about me" },
  { label: "Projects", href: "#projects", script: "my work" },
  { label: "Skills", href: "#skills", script: "my stack" },
  { label: "Get in touch", href: "#contact", script: "let's talk" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLAnchorElement[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Entrance animations
  useEffect(() => {
    const photo = photoRef.current;
    const name = nameRef.current;
    const role = roleRef.current;
    const divider = dividerRef.current;
    const bio = bioRef.current;
    const social = socialRef.current;
    const navLinks = navLinksRef.current;

    if (!photo) return;

    const tl = gsap.timeline({ delay: 3.2 });

    // Photo fade in
    tl.fromTo(
      photo,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
    );

    // Name text: fade up
    if (name) {
      tl.fromTo(
        name,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power4.out" },
        "-=0.6"
      );
    }

    // Right panel text blocks: stagger fade up
    const rightElements = [role, divider, bio, social].filter(Boolean);
    if (rightElements.length) {
      tl.fromTo(
        rightElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.5"
      );
    }

    // Nav links
    if (navLinks.length && !isMobile) {
      tl.fromTo(
        navLinks,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.07 },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col md:flex-row bg-[#f0ede8] overflow-hidden"
    >
      {/* LEFT PANEL — Photo + Name */}
      <div className="relative w-full md:w-[60%] h-[60vh] md:h-screen flex flex-col justify-end bg-[#0d0d0d] flex-shrink-0 z-0 overflow-hidden">
        {/* Photo Background */}
        <img
          ref={photoRef}
          src="/images/atharva.png"
          alt="Atharva Sarnaik"
          className="absolute inset-0 w-full h-full object-cover opacity-0 z-0"
          style={{ objectPosition: "center 80%" }}
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/atharvareal/800/1200";
          }}
        />

        {/* ATHARVA SARNAIK */}
        <h1
          ref={nameRef}
          className="absolute z-20 w-full opacity-0 mix-blend-difference"
          style={{
            top: "3%",
            left: 0,
            fontSize: "clamp(28px, 8vw, 80px)",
            fontWeight: 900,
            letterSpacing: "8px",
            lineHeight: 0.98,
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0 16px",
            margin: 0,
            color: "#ffffff",
          }}
        >
          ATHARVA<br />SARNAIK
        </h1>

        {/* Desktop Nav — bottom-right of photo panel */}
        <div className="hidden md:flex absolute bottom-12 right-12 flex-col items-end gap-3 z-30">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) navLinksRef.current[i] = el;
              }}
              className="nav-link opacity-0 flex flex-col items-end"
            >
              <span className="nav-normal text-[14px] font-semibold tracking-[0.1em]">{link.label}</span>
              <span className="nav-script text-[28px]">{link.script}</span>
            </a>
          ))}
        </div>

        {/* Bottom Label */}
        <div className="absolute bottom-[24px] left-[24px] md:left-[32px] z-10">
          <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">
            KOLHAPUR, INDIA &middot; 2026
          </span>
        </div>
      </div>

      {/* RIGHT PANEL — Role, Bio, Social */}
      <div className="relative w-full md:w-[40%] bg-[#f0ede8] flex flex-col justify-start pt-6 md:pt-10 pb-24 md:pb-0 z-10 overflow-visible">

        {/* Role heading — AI / INTEGRATION / DEVELOPER / & ENGINEER */}
        <h1
          ref={roleRef}
          className="opacity-0"
          style={{
            fontSize: "clamp(26px, 5.0vw, 70px)",
            fontWeight: 900,
            color: "#1a1a1a",
            letterSpacing: "1px",
            lineHeight: 0.9,
            textAlign: "left",
            paddingRight: "clamp(16px, 4vw, 48px)",
            paddingLeft: "clamp(16px, 4vw, 24px)",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          AI<br />
          INTEGRATION<br />
          DEVELOPER<br />
          & ENGINEER
        </h1>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="opacity-0"
          style={{
            width: "100%",
            height: "1px",
            background: "#d4d0c8",
            margin: "28px 0",
            marginRight: "48px",
          }}
        />

        {/* Bio */}
        <p
          ref={bioRef}
          className="opacity-0"
          style={{
            fontSize: "14px",
            color: "#4b5563",
            lineHeight: 1.7,
            maxWidth: "340px",
            paddingLeft: "clamp(16px, 4vw, 0px)",
            paddingRight: "clamp(16px, 4vw, 48px)",
            fontWeight: 400,
          }}
        >
          Building intelligent AI-powered apps,
          exploring Machine Learning &amp; Generative AI.
        </p>

        {/* Social / CTA row — absolute on desktop, static flow on mobile */}
        <div
          ref={socialRef}
          className="md:absolute flex flex-wrap items-center gap-4 opacity-0 mt-6 px-4 md:px-0"
          style={{ bottom: "48px", right: "48px" }}
        >
          <a
            href="/Atharva_Sarnaik_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a1a] text-[#f5f3ee] px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#2563EB] transition-colors duration-300 flex items-center gap-2"
          >
            Resume <span className="text-[14px] leading-none">↗</span>
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Atharva-Sarnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#9ca3af] hover:text-[#1a1a1a] transition-colors duration-300 tracking-wide"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/atharvasarnaik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#9ca3af] hover:text-[#1a1a1a] transition-colors duration-300 tracking-wide"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
