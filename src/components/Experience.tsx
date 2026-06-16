"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { experienceData } from '@/data/portfolioData';
import { Calendar, Trophy, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-900/10">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-display font-black text-white mb-4"
          >
            Professional <span className={getGlowText()}>Experience</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-1.5 mx-auto rounded-full ${
              persona === 'ai-ml' ? 'bg-cyan-500' :
              persona === 'full-stack' ? 'bg-rose-500' :
              'bg-violet-500'
            }`}
          ></motion.div>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
          
          {/* Base Background Track Line */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gray-900 rounded-full" />
          
          {/* Active Growing Timeline Progress Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className={`absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b rounded-full shadow-[0_0_12px_1px] ${
              persona === 'ai-ml' ? 'from-cyan-400 via-indigo-500 to-cyan-400 shadow-cyan-500/50' :
              persona === 'full-stack' ? 'from-rose-400 via-amber-500 to-rose-400 shadow-rose-500/50' :
              'from-violet-400 via-fuchsia-500 to-violet-400 shadow-violet-500/50'
            }`}
          />
          
          {experienceData.map((exp, idx) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: idx * 0.15 }}
              className="relative group"
            >
              
              {/* Timeline Indicator Dot */}
              <span className={`absolute -left-[31px] sm:-left-[39px] top-2 flex h-4 w-4 rounded-full border-2 border-gray-950 transition-all duration-300 group-hover:scale-125 z-10 ${getGlowDot()}`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-35 bg-white"></span>
              </span>

              {/* Card wrapper */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative bg-gray-950/60 shadow-lg">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-black text-xl text-white group-hover:text-gray-100 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-0.5 font-mono uppercase tracking-wider">{exp.company}</p>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getTimelineBorder()} self-start sm:self-auto`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                </div>

                {/* Role Details */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 mb-6 pl-1 list-none">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getGlowText()}`} />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Achievements / Outcomes highlight block */}
                {exp.outcomes && exp.outcomes.length > 0 && (
                  <div className="mb-6 bg-gray-950/80 border border-white/5 p-4 rounded-xl shadow-inner">
                    <h4 className="font-display font-bold text-[10px] text-gray-400 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
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
                      className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-colors ${
                        persona === 'ai-ml' ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-300 group-hover:border-cyan-500/20' :
                        persona === 'full-stack' ? 'bg-rose-500/5 border-rose-500/10 text-rose-300 group-hover:border-rose-500/20' :
                        'bg-violet-500/5 border-violet-500/10 text-violet-300 group-hover:border-violet-500/20'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

