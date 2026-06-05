"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { experienceData } from '@/data/portfolioData';
import { Calendar, Briefcase, Trophy, ChevronRight } from 'lucide-react';

export default function Experience() {
  const { persona } = usePersona();

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getTimelineBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400';
      case 'full-stack': return 'border-rose-500/40 bg-rose-500/10 text-rose-400';
      case 'sde': return 'border-violet-500/40 bg-violet-500/10 text-violet-400';
    }
  };

  const getGlowDot = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500 shadow-cyan-500/50';
      case 'full-stack': return 'bg-rose-500 shadow-rose-500/50';
      case 'sde': return 'bg-violet-500 shadow-violet-500/50';
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
            Professional <span className={getGlowText()}>Experience</span>
          </h2>
          <div className={`h-1.5 w-24 mx-auto rounded-full ${
            persona === 'ai-ml' ? 'bg-cyan-500' :
            persona === 'full-stack' ? 'bg-rose-500' :
            'bg-violet-500'
          }`}></div>
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-gray-800 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
          
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 rounded-full border-2 border-gray-950 transition-all group-hover:scale-125 z-10 ${getGlowDot()}`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-30 bg-white"></span>
              </span>

              {/* Card wrapper */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-gray-100 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-gray-400 mt-0.5">{exp.company}</p>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getTimelineBorder()} self-start sm:self-auto`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                </div>

                {/* Role Details */}
                <ul className="space-y-2.5 text-sm text-gray-300 mb-6 pl-1 list-none">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getGlowText()}`} />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Achievements / Outcomes highlight block */}
                {exp.outcomes && exp.outcomes.length > 0 && (
                  <div className="mb-6 bg-gray-950/60 border border-white/5 p-4 rounded-xl">
                    <h4 className="font-display font-bold text-xs text-gray-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      Key Outcomes & Impact
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {exp.outcomes.map((out, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-400 font-bold">•</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech tags list */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2.5 py-1 rounded text-xs font-mono border ${
                        persona === 'ai-ml' ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-300' :
                        persona === 'full-stack' ? 'bg-rose-500/5 border-rose-500/10 text-rose-300' :
                        'bg-violet-500/5 border-violet-500/10 text-violet-300'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
