"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { skillsData } from '@/data/portfolioData';
import SkillSpheres from './SkillSpheres';
import { motion } from 'framer-motion';

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
    <section id="skills" className="py-24 relative overflow-hidden bg-gray-900/10">
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
            Technical <span className={getGlowText()}>Skills</span>
          </motion.h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto font-mono uppercase tracking-wider">
            Filtered: {persona === 'ai-ml' ? 'AI / ML Matrices' : persona === 'full-stack' ? 'Full Stack Pipelines' : 'Software Architecture'}
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-1.5 mx-auto rounded-full mt-4 ${
              persona === 'ai-ml' ? 'bg-cyan-500' :
              persona === 'full-stack' ? 'bg-rose-500' :
              'bg-violet-500'
            }`}
          ></motion.div>
        </div>

        {/* Grid layout with 3D Orbiting Cloud + Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: 3D skill orbit cloud (Columns: 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center glass-panel p-6 rounded-2xl border border-white/5 relative bg-gray-950/60 shadow-2xl min-h-[380px] lg:min-h-[460px]">
            {/* Holographic scanner frames */}
            <div className="absolute top-3 left-3 text-[8px] font-mono text-gray-500 tracking-widest">3D_SKILL_MATRIX</div>
            <div className="absolute top-3 right-3 text-[8px] font-mono text-gray-500 tracking-widest">ROTATION_ACTIVE</div>
            
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/25" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/25" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/25" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/25" />

            <SkillSpheres />
            
            <p className="text-[10px] text-gray-500 font-mono text-center mt-2 max-w-xs leading-relaxed uppercase">
              Hold cursor to pivot & inspect floating technology nodes.
            </p>
          </div>

          {/* RIGHT: Structured Skill Meters (Columns: 7) */}
          <div className="lg:col-span-7 space-y-6">
            {activeCategories.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: i * 0.1 }}
                className={`glass-card p-6 rounded-2xl border border-white/5 transition-all ${getCardBorder()}`}
              >
                <h3 className="text-base sm:text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getProgressBg()} shadow-md`} />
                  {category.title}
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                        <span className="text-gray-300 font-sans tracking-wide">{skill.name}</span>
                        <span className={`font-mono text-xs ${getGlowText()}`}>{skill.level}%</span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-gray-950/80 overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-full ${getProgressBg()}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
