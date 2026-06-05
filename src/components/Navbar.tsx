"use client";

import React, { useState, useEffect } from 'react';
import { usePersona, Persona } from '@/context/PersonaContext';
import { Menu, X, Download, ShieldCheck, Sparkles, Code, Cpu } from 'lucide-react';

export default function Navbar() {
  const { persona, setPersona } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeDropdown, setResumeDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'AI/ML Resume', file: '/resumes/UPPARA_VINOD_AI_ML.pdf' },
    { label: 'Full Stack Resume', file: '/resumes/UPPARA_VINOD_FULL_STACK.pdf' },
    { label: 'SDE Resume', file: '/resumes/UPPARA_VINOD_SDE.pdf' },
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
          <div className="hidden lg:flex items-center bg-gray-900/60 p-1 border border-white/5 rounded-full">
            <button
              onClick={() => setPersona('ai-ml')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${getActiveTabStyle('ai-ml', persona)}`}
            >
              <Cpu className="w-3.5 h-3.5" />
              AI/ML
            </button>
            <button
              onClick={() => setPersona('full-stack')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${getActiveTabStyle('full-stack', persona)}`}
            >
              <Code className="w-3.5 h-3.5" />
              Full Stack
            </button>
            <button
              onClick={() => setPersona('sde')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${getActiveTabStyle('sde', persona)}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              SDE
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
            <div className="flex bg-gray-900/60 p-0.5 border border-white/5 rounded-full">
              <button
                onClick={() => setPersona('ai-ml')}
                className={`p-1.5 rounded-full transition-all ${persona === 'ai-ml' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/20' : 'text-gray-500 border border-transparent'}`}
                title="AI/ML Engineer Profile"
              >
                <Cpu className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPersona('full-stack')}
                className={`p-1.5 rounded-full transition-all ${persona === 'full-stack' ? 'bg-rose-500/20 text-rose-400 border-rose-500/20' : 'text-gray-500 border border-transparent'}`}
                title="Full Stack Developer Profile"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPersona('sde')}
                className={`p-1.5 rounded-full transition-all ${persona === 'sde' ? 'bg-violet-500/20 text-violet-400 border-violet-500/20' : 'text-gray-500 border border-transparent'}`}
                title="Software Engineer Profile"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
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
