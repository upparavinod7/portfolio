"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { personalInfo } from '@/data/portfolioData';
import { Award, FolderKanban, Briefcase, GraduationCap } from 'lucide-react';

export default function About() {
  const { persona } = usePersona();
  const currentPersonaInfo = personalInfo.personas[persona];

  const getIcon = (label: string) => {
    const lowercase = label.toLowerCase();
    if (lowercase.includes('cgpa') || lowercase.includes('gpa')) return <GraduationCap className="w-5 h-5" />;
    if (lowercase.includes('projects')) return <FolderKanban className="w-5 h-5" />;
    if (lowercase.includes('internships') || lowercase.includes('experience')) return <Briefcase className="w-5 h-5" />;
    return <Award className="w-5 h-5" />;
  };

  const getAccentBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/20 group-hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/10';
      case 'full-stack': return 'border-rose-500/20 group-hover:border-rose-500/40 text-rose-400 bg-rose-500/10';
      case 'sde': return 'border-violet-500/20 group-hover:border-violet-500/40 text-violet-400 bg-violet-500/10';
    }
  };

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
            About <span className={getGlowText()}>Me</span>
          </h2>
          <div className={`h-1.5 w-24 mx-auto rounded-full ${
            persona === 'ai-ml' ? 'bg-cyan-500' :
            persona === 'full-stack' ? 'bg-rose-500' :
            'bg-violet-500'
          }`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Avatar Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Glow backdrop */}
              <div className={`absolute -inset-1 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-50 ${
                persona === 'ai-ml' ? 'bg-cyan-500' :
                persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
              }`}></div>
              
              {/* Inner Card */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl glass-panel overflow-hidden border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                {/* Stylized SVG Avatar */}
                <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 mb-6 ${
                  persona === 'ai-ml' ? 'border-cyan-500/50 bg-cyan-500/5' :
                  persona === 'full-stack' ? 'border-rose-500/50 bg-rose-500/5' :
                  'border-violet-500/50 bg-violet-500/5'
                }`}>
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <h3 className="font-display font-bold text-xl text-white mb-2">{personalInfo.name}</h3>
                <p className="text-xs font-mono text-gray-400 mb-4">{currentPersonaInfo.tagline}</p>
                <div className={`px-3 py-1 rounded-full text-[10px] font-mono border ${
                  persona === 'ai-ml' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                  persona === 'full-stack' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                  'bg-violet-500/10 border-violet-500/30 text-violet-400'
                }`}>
                  Joy University CSE student
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Journey & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
              My Journey & Core Philosophy
            </h3>
            
            <p className="text-gray-300 font-sans leading-relaxed text-base sm:text-lg mb-8">
              {currentPersonaInfo.bio}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {currentPersonaInfo.stats.map((stat, i) => (
                <div 
                  key={i} 
                  className={`group relative glass-card p-5 rounded-xl border flex flex-col gap-3 transition-all ${
                    persona === 'ai-ml' ? 'hover:shadow-cyan-950/20 hover:border-cyan-500/35 hover:bg-cyan-500/5' :
                    persona === 'full-stack' ? 'hover:shadow-rose-950/20 hover:border-rose-500/35 hover:bg-rose-500/5' :
                    'hover:shadow-violet-950/20 hover:border-violet-500/35 hover:bg-violet-500/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getAccentBorder()}`}>
                    {getIcon(stat.label)}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-2xl text-white tracking-tight">{stat.value}</h4>
                    <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
