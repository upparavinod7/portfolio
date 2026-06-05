"use client";

import React, { useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { personalInfo } from '@/data/portfolioData';
import { Mail, ArrowRight, Download, Terminal } from 'lucide-react';

export default function Hero() {
  const { persona } = usePersona();
  const currentPersonaInfo = personalInfo.personas[persona];
  
  // Custom Typewriter Effect
  const [displayText, setDisplayText] = useState('');
  const targetText = currentPersonaInfo.tagline;

  useEffect(() => {
    let active = true;
    let index = 0;
    setDisplayText('');

    const type = () => {
      if (!active) return;
      if (index <= targetText.length) {
        setDisplayText(targetText.slice(0, index));
        index++;
        setTimeout(type, 30);
      }
    };
    
    // Start typing
    type();
    
    return () => {
      active = false;
    };
  }, [persona, targetText]);

  // Color helper functions
  const getGlowBg = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/10 shadow-cyan-500/10 border-cyan-500/20';
      case 'full-stack': return 'bg-rose-500/10 shadow-rose-500/10 border-rose-500/20';
      case 'sde': return 'bg-violet-500/10 shadow-violet-500/10 border-violet-500/20';
    }
  };

  const getAccentText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getAccentBg = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500 hover:bg-cyan-600 text-black';
      case 'full-stack': return 'bg-rose-500 hover:bg-rose-600 text-white';
      case 'sde': return 'bg-violet-500 hover:bg-violet-600 text-white';
    }
  };

  const getBorderColor = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/40 hover:border-cyan-500/70 hover:bg-cyan-500/5';
      case 'full-stack': return 'border-rose-500/40 hover:border-rose-500/70 hover:bg-rose-500/5';
      case 'sde': return 'border-violet-500/40 hover:border-violet-500/70 hover:bg-violet-500/5';
    }
  };

  const getResumeLink = () => {
    switch (persona) {
      case 'ai-ml': return '/resumes/UPPARA_VINOD_AI_ML.pdf';
      case 'full-stack': return '/resumes/UPPARA_VINOD_FULL_STACK.pdf';
      case 'sde': return '/resumes/UPPARA_VINOD_SDE.pdf';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-grid-pattern">
      {/* Decorative Blur Backgrounds */}
      <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000 animate-float-slow ${
        persona === 'ai-ml' ? 'bg-cyan-500' :
        persona === 'full-stack' ? 'bg-rose-500' :
        'bg-violet-500'
      }`}></div>
      
      <div className={`absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 transition-all duration-1000 animate-float-slower ${
        persona === 'ai-ml' ? 'bg-indigo-500' :
        persona === 'full-stack' ? 'bg-amber-500' :
        'bg-fuchsia-500'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Short Term Goal Greeting Badge */}
        <div className={`mb-6 flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider uppercase backdrop-blur-md transition-all ${getGlowBg()}`}>
          <Terminal className={`w-3.5 h-3.5 ${getAccentText()}`} />
          <span>Hello, I am {personalInfo.name}</span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white mb-6 max-w-4xl leading-tight">
          Building <span className={getAccentText()}>{currentPersonaInfo.title}</span> Solutions That{" "}
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Scale & Solve Real Problems.</span>
        </h1>

        {/* Typewriter Line */}
        <div className="h-8 mb-8 flex items-center justify-center">
          <p className="font-mono text-sm sm:text-lg text-gray-400 select-all tracking-wider font-semibold">
            {displayText}
            <span className={`inline-block w-2 h-4.5 ml-1 bg-white cursor-blink ${getAccentText()}`}></span>
          </p>
        </div>

        {/* Brand Statement Description */}
        <p className="text-base sm:text-xl text-gray-300 font-sans max-w-2xl leading-relaxed mb-10">
          {currentPersonaInfo.brandStatement}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a
            href="#projects"
            className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer ${getAccentBg()}`}
          >
            View Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a
            href={getResumeLink()}
            download
            className={`flex items-center gap-2 border px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase text-white transition-all cursor-pointer ${getBorderColor()}`}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            title="GitHub Profile"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            title="LinkedIn Profile"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            title="Send Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

      </div>

      {/* Decorative Bottom Wave / Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none"></div>
    </section>
  );
}
