"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import { usePersona } from '@/context/PersonaContext';

export default function Home() {
  const { persona } = usePersona();

  // Dynamic decoration border color based on persona
  const getGlowBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'from-cyan-500/25 via-transparent to-indigo-500/10';
      case 'full-stack': return 'from-rose-500/25 via-transparent to-amber-500/10';
      case 'sde': return 'from-violet-500/25 via-transparent to-fuchsia-500/10';
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans overflow-x-hidden">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Global Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow z-0 pointer-events-none" />

      {/* Core Pages Components */}
      <main className="flex-grow z-10 relative">
        <Hero />
        
        {/* Dynamic transition divider line */}
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <About />
        
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <Skills />
        
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <Projects />
        
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <Experience />
        
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <Certifications />
        
        <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-gray-950 relative z-10 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Designed and engineered by Uppara Vinod.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
