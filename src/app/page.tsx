"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import AvatarCanvas from '@/components/AvatarCanvas';
import { usePersona } from '@/context/PersonaContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { persona } = usePersona();
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic decoration border color based on persona
  const getGlowBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'from-cyan-500/25 via-transparent to-indigo-500/10';
      case 'full-stack': return 'from-rose-500/25 via-transparent to-amber-500/10';
      case 'sde': return 'from-violet-500/25 via-transparent to-fuchsia-500/10';
    }
  };

  const getAccentGlow = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/5';
      case 'full-stack': return 'bg-rose-500/5';
      case 'sde': return 'bg-violet-500/5';
    }
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative min-h-screen bg-[#02040a] text-gray-100 flex flex-col font-sans overflow-x-hidden"
        >
          {/* Sticky Top Header */}
          <Navbar />

          {/* Global Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-25 z-0 pointer-events-none" />
          <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${getAccentGlow()} bg-radial-glow`} />

          {/* Global Fixed 3D Avatar Canvas */}
          <div className="fixed inset-0 z-0 w-full h-screen pointer-events-none">
            <AvatarCanvas />
          </div>

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
        </motion.div>
      )}
    </>
  );
}
