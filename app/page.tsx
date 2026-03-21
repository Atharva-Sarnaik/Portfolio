"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import EducationAchievements from "@/components/EducationAchievements";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <CustomCursor />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <SmoothScroll>
        <div className="noise-overlay">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <EducationAchievements />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
