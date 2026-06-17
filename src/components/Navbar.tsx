"use client";

import React, { useState, useEffect } from 'react';
import { usePersona, Persona } from '@/context/PersonaContext';
import { Menu, X, Download, ShieldCheck, Sparkles, Code, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { persona, setPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);

  const [recruiterActive, setRecruiterActive] = useState(false);

  const toggleRecruiter = () => {
    const nextVal = !recruiterActive;
    setRecruiterActive(nextVal);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("recruiter-mode-toggle", { detail: nextVal }));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleRecruiterToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setRecruiterActive(customEvent.detail);
    };
    window.addEventListener("recruiter-mode-toggle", handleRecruiterToggle);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("recruiter-mode-toggle", handleRecruiterToggle);
    };
  }, [recruiterActive]);

  const getPersonaColor = (active: Persona) => {
    switch (active) {
      case 'ai-ml': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20';
      case 'full-stack': return 'text-rose-400 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20';
      case 'sde': return 'text-violet-400 border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20';
    }
  };

  const getActiveTabStyle = (active: Persona, current: Persona) => {
    if (active !== current) return 'text-gray-400 hover:text-white border-transparent';
    switch (current) {
      case 'ai-ml': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/40';
      case 'full-stack': return 'text-rose-400 bg-rose-500/10 border-rose-500/40';
      case 'sde': return 'text-violet-400 bg-violet-500/10 border-violet-500/40';
    }
  };

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const resumeLinks = [
    { label: 'AI/ML Resume', file: '/resumes/AI_ML.pdf' },
    { label: 'Full Stack Resume', file: '/resumes/FULL_STACK.pdf' },
    { label: 'SDE Resume', file: '/resumes/SDE.pdf' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-panel py-3 shadow-lg border-b border-white/5' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-display font-bold text-2xl tracking-wider text-white flex items-center gap-2">
              <span className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                persona === 'ai-ml' ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400' :
                persona === 'full-stack' ? 'border-rose-500/40 bg-rose-500/10 text-rose-400' :
                'border-violet-500/40 bg-violet-500/10 text-violet-400'
              }`}>
                {persona === 'ai-ml' ? <Cpu className="w-4.5 h-4.5" /> :
                 persona === 'full-stack' ? <Code className="w-4.5 h-4.5" /> :
                 <ShieldCheck className="w-4.5 h-4.5" />}
              </span>
              UV<span className={
                persona === 'ai-ml' ? 'text-cyan-400' :
                persona === 'full-stack' ? 'text-rose-400' :
                'text-violet-400'
              }>.</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Persona Switcher widget */}
          <div className="hidden lg:flex items-center bg-gray-900/60 p-1 border border-white/5 rounded-full relative">
            {(['ai-ml', 'full-stack', 'sde'] as Persona[]).map((p) => {
              const isActive = persona === p;
              const label = p === 'ai-ml' ? 'AI/ML' : p === 'full-stack' ? 'Full Stack' : 'SDE';
              const Icon = p === 'ai-ml' ? Cpu : p === 'full-stack' ? Code : ShieldCheck;
              
              const activeTextColor = 
                p === 'ai-ml' ? 'text-cyan-400 font-bold' :
                p === 'full-stack' ? 'text-rose-400 font-bold' :
                'text-violet-400 font-bold';

              const glowBgColor = 
                p === 'ai-ml' ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]' :
                p === 'full-stack' ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(251,113,133,0.15)]' :
                'bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_rgba(167,139,250,0.15)]';

              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 cursor-pointer ${
                    isActive ? `${activeTextColor}` : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activePersonaGlow"
                      className={`absolute inset-0 rounded-full border ${glowBgColor} z-0`}
                      transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Recruiter Mode Toggle */}
          <div className="hidden md:block">
            <button
              onClick={toggleRecruiter}
              className={`flex items-center gap-1.5 border px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                recruiterActive
                  ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] animate-pulse'
                  : 'text-gray-400 border-white/10 hover:text-white hover:border-white/25'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Recruiter Mode
            </button>
          </div>

          {/* Resume Download Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setResumeDropdown(!resumeDropdown)}
              onBlur={() => setTimeout(() => setResumeDropdown(false), 200)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${getPersonaColor(persona)}`}
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </button>
            
            {resumeDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl p-1 z-50">
                {resumeLinks.map((r) => (
                  <a
                    key={r.label}
                    href={r.file}
                    download
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-lg transition-colors"
                  >
                    {r.label}
                    <Download className="w-3 h-3 text-gray-500" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Small screen persona toggler icon */}
            <div className="flex bg-gray-900/60 p-0.5 border border-white/5 rounded-full relative">
              {(['ai-ml', 'full-stack', 'sde'] as Persona[]).map((p) => {
                const isActive = persona === p;
                const Icon = p === 'ai-ml' ? Cpu : p === 'full-stack' ? Code : ShieldCheck;
                const activeColor = 
                  p === 'ai-ml' ? 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20' :
                  p === 'full-stack' ? 'text-rose-400 bg-rose-500/15 border-rose-500/20' :
                  'text-violet-400 bg-violet-500/15 border-violet-500/20';

                return (
                  <button
                    key={p}
                    onClick={() => setPersona(p)}
                    className={`relative p-1.5 rounded-full transition-colors duration-300 z-10 ${
                      isActive ? activeColor.split(' ')[0] : 'text-gray-500 hover:text-gray-300'
                    }`}
                    title={`${p.toUpperCase()} Profile`}
                  >
                    <Icon className="w-3.5 h-3.5 relative z-20" />
                    {isActive && (
                      <motion.span
                        layoutId="activePersonaGlowMobile"
                        className={`absolute inset-0 rounded-full border ${activeColor.split(' ').slice(1).join(' ')} z-0`}
                        transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-b border-white/5 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {item.label}
            </a>
          ))}
          {/* Mobile Recruiter Mode Toggle */}
          <div className="pt-2 pb-2 border-t border-white/5">
            <button
              onClick={() => { toggleRecruiter(); setIsOpen(false); }}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                recruiterActive
                  ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Recruiter Mode
            </button>
          </div>

          <div className="pt-4 pb-2 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 px-3 mb-2">Download Resume Options</p>
            {resumeLinks.map((r) => (
              <a
                key={r.label}
                href={r.file}
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800"
              >
                <Download className="w-4 h-4 text-gray-500" />
                {r.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
