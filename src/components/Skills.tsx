"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { skillsData } from '@/data/portfolioData';

export default function Skills() {
  const { persona } = usePersona();
  const activeCategories = skillsData[persona];

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getProgressBg = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500';
      case 'full-stack': return 'bg-rose-500';
      case 'sde': return 'bg-violet-500';
    }
  };

  const getCardBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'hover:border-cyan-500/30';
      case 'full-stack': return 'hover:border-rose-500/30';
      case 'sde': return 'hover:border-violet-500/30';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gray-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
            Technical <span className={getGlowText()}>Skills</span>
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto font-mono">
            Dynamically filtered for {persona === 'ai-ml' ? 'Artificial Intelligence & ML' : persona === 'full-stack' ? 'Full Stack Engineering' : 'Software Engineering (SDE)'} requirements.
          </p>
          <div className={`h-1.5 w-24 mx-auto rounded-full mt-4 ${persona === 'ai-ml' ? 'bg-cyan-500' :
              persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
            }`}></div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeCategories.map((category, i) => (
            <div
              key={i}
              className={`glass-card p-6 rounded-2xl border border-white/5 transition-all ${getCardBorder()}`}
            >
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getProgressBg()}`}></span>
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, j) => (
                  <div key={j} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-gray-300 font-sans">{skill.name}</span>
                      <span className={`font-mono text-xs ${getGlowText()}`}>{skill.level}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 rounded-full bg-gray-900 overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${getProgressBg()}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
