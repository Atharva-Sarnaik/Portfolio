"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsVisible(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? "py-4 bg-[#f5f3ee]/90 backdrop-blur-md border-[#d4d0c8] shadow-sm" 
            : "py-6 bg-transparent border-transparent"
        }`}
        style={{ 
          opacity: isVisible ? 1 : 0, 
          pointerEvents: isVisible ? 'auto' : 'none' 
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
              scrolled ? "text-[#1a1a1a]" : "text-[#f5f3ee]"
            }`}
          >
            PORTFOLIO<span className="text-electric-blue">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-electric-blue ${
                  scrolled ? "text-[#1a1a1a]" : "text-[#f5f3ee]/80"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? "text-[#1a1a1a]" : "text-[#f5f3ee]"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-[#1a1a1a]" : "text-[#f5f3ee]"} size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } flex flex-col items-center justify-center p-6`}
      >
        <button
          className="absolute top-8 right-8 p-2 text-[#f5f3ee] hover:text-electric-blue transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-4xl font-black uppercase tracking-tighter text-[#f5f3ee] hover:text-electric-blue transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
