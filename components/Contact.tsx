"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Copy, Check } from "lucide-react";

const NeuralNetwork = dynamic(() => import("./NeuralNetwork"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const REQUIREMENTS = [
  "AI/ML Project",
  "Web App",
  "API Integration",
  "Data Analysis",
];

const EMAIL = "sarnaikatharva13@gmail.com";
const PHONE = "+91 7722027367";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [activeRequirement, setActiveRequirement] = useState("AI/ML Project");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // GSAP Scroll Entrance
    gsap.fromTo(
      leftColRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      rightColRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Info Section Animation
    gsap.fromTo(
      infoRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (!accessKey || accessKey === "your_access_key_here") {
        alert("Please set NEXT_PUBLIC_WEB3FORMS_KEY in your .env.local file to activate email forwarding.");
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message || "No message provided",
          requirement: activeRequirement,
          subject: `Portfolio Contact from ${formData.firstName} - ${activeRequirement}`,
        }),
      }).then((res) => res.json());

      if (res.success) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        console.error("Web3Forms Error:", res);
        alert(`Failed to send message: ${res.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setSubmitStatus("error");
      alert("Network error, could not send the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#edeae3] border-t border-[#d4d0c8]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-[64px] py-[48px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-5">
          {/* LEFT COLUMN - Form Card */}
          <div
            ref={leftColRef}
            className="w-full lg:w-[55%] bg-[#f5f3ee] border border-[#d4d0c8] rounded-[16px] p-8 flex flex-col"
          >
            <span className="text-[#9ca3af] text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block">
              GET IN TOUCH
            </span>

            <h2 className="text-[clamp(24px,3vw,36px)] font-bold text-[#1a1a1a] leading-tight mb-5">
              Connect with me
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    className="contact-input"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="contact-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="contact-input"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 000 000 0000"
                    className="contact-input"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                  Your Requirement
                </label>
                <div className="flex flex-wrap gap-2">
                  {REQUIREMENTS.map((req) => (
                    <button
                      key={req}
                      type="button"
                      onClick={() => setActiveRequirement(req)}
                      className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${activeRequirement === req
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-transparent text-[#4b5563] border-[#c0bdb7] hover:border-[#1a1a1a]"
                        }`}
                    >
                      {req}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-[0.08em] color-[#6b7280] uppercase">
                  How can I help?
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Feel free to outline your ideas or needs..."
                  className="contact-input resize-none h-[100px]"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full py-3.5 rounded-lg text-[16px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform ${submitStatus === "success"
                  ? "bg-green-600 text-white"
                  : submitStatus === "error"
                    ? "bg-red-600 text-white"
                    : "bg-[#1a1a1a] text-[#f5f3ee] hover:bg-[#2563EB] active:scale-[0.98]"
                  } disabled:opacity-80 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : submitStatus === "success" ? (
                  <>Message Sent <Check className="w-5 h-5" /></>
                ) : submitStatus === "error" ? (
                  "Error! Try Again ↗"
                ) : (
                  <>Send Message <span className="text-[18px]">↗</span></>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN - Neural Card */}
          <div
            ref={rightColRef}
            className="w-full lg:flex-1 bg-[#e8e4dc] border border-[#d4d0c8] rounded-[16px] overflow-hidden flex flex-col relative"
          >
            <div className="absolute inset-0 w-full h-full">
              <NeuralNetwork />
            </div>
            <span className="absolute bottom-[20px] w-full text-center text-[10px] text-[#c0bdb7] tracking-[0.2em] pointer-events-none z-10 uppercase">
              neural pathways
            </span>
          </div>
        </div>
      </div>

      {/* ADDITIONAL CONTACT INFO - Matching Image Reference */}
      <div
        ref={infoRef}
        className="max-w-[1440px] mx-auto py-[120px] px-6 text-center border-t border-[#d4d0c8]"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-[#c0bdb7]" />
          <span className="text-[#1a1a1a] text-[11px] font-bold tracking-[0.15em] uppercase">
            CONTACT
          </span>
          <div className="h-[1px] w-12 bg-[#c0bdb7]" />
        </div>

        <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter text-[#1a1a1a] leading-[0.9] mb-16 uppercase">
          Let&apos;s Build <br />
          <span className="text-blue-600">Something</span>
        </h2>

        <div className="flex flex-col items-center gap-10">
          {/* Email with copy functionality */}
          <div className="flex flex-col items-center gap-6">
            <a
              href={`mailto:${EMAIL}`}
              className="text-2xl md:text-5xl font-bold text-[#1a1a1a] hover:text-blue-600 transition-colors duration-300 tracking-tight text-center"
            >
              {EMAIL}
            </a>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#c0bdb7] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 text-sm font-bold uppercase tracking-wider"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <a
            href={`tel:${PHONE.replace(/\s+/g, '')}`}
            className="text-xl md:text-3xl font-bold text-[#1a1a1a] hover:text-blue-600 transition-colors duration-300 tracking-tight"
          >
            {PHONE}
          </a>

          {/* Social Links Icons */}
          <div className="flex items-center gap-6 pt-4">
            <a
              href="https://github.com/Atharva-Sarnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-[#c0bdb7] flex items-center justify-center text-[#1a1a1a] hover:border-blue-600 hover:text-blue-600 hover:bg-white transition-all duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/atharva-sarnaik-b9a2b627b/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-[#c0bdb7] flex items-center justify-center text-[#1a1a1a] hover:border-blue-600 hover:text-blue-600 hover:bg-white transition-all duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://x.com/atharva_sarnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full border border-[#c0bdb7] flex items-center justify-center text-[#1a1a1a] hover:border-blue-600 hover:text-blue-600 hover:bg-white transition-all duration-300"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-input {
          background: #f5f3ee;
          border: 1px solid #d4d0c8;
          border-radius: 8px;
          height: 40px;
          padding: 0 16px;
          font-size: 14px;
          color: #1a1a1a;
          width: 100%;
          transition: all 0.3s ease;
        }
        textarea.contact-input {
          height: 100px;
          padding: 12px 16px;
        }
        .contact-input:focus {
          outline: none;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .contact-input::placeholder {
          color: #9ca3af;
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
