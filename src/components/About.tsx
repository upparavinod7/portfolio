"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { personalInfo } from '@/data/portfolioData';
import { Award, FolderKanban, Briefcase, GraduationCap, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const getGlowBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/30 shadow-cyan-500/5 hover:border-cyan-500/65';
      case 'full-stack': return 'border-rose-500/30 shadow-rose-500/5 hover:border-rose-500/65';
      case 'sde': return 'border-violet-500/30 shadow-violet-500/5 hover:border-violet-500/65';
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Decorative background grid element */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-display font-black text-white mb-4"
          >
            About <span className={getGlowText()}>Me</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Avatar Hologram HUD Card (Columns: 5) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, rotateY: -15, x: -30 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
              className="relative group perspective"
            >
              {/* Glow backdrop layer */}
              <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-1000 ${
                persona === 'ai-ml' ? 'bg-cyan-500' :
                persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
              }`}></div>
              
              {/* Inner Cyber HUD Card with transparent background */}
              <div className={`relative w-72 h-[380px] sm:w-80 sm:h-[420px] rounded-2xl glassmorphism-hud !bg-transparent p-6 flex flex-col items-center justify-between border transition-all duration-500 ${getGlowBorder()} cyber-scan-overlay`}>
                
                {/* HUD Top bar coordinates */}
                <div className="w-full flex justify-between items-center text-[9px] font-mono text-gray-500 border-b border-white/5 pb-2">
                  <span>SECURE_ID: #00997</span>
                  <span>SYSTEM_LOAD: 0.12%</span>
                </div>

                {/* 3D Holographic view spacer box */}
                <div className="relative w-full flex-grow flex items-center justify-center my-4 min-h-[160px]">
                  {/* Holographic scanner frames */}
                  <div className={`absolute inset-4 border border-dashed rounded-xl animate-pulse opacity-30 ${
                    persona === 'ai-ml' ? 'border-cyan-400' :
                    persona === 'full-stack' ? 'border-rose-400' :
                    'border-violet-400'
                  }`} />
                  <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase animate-pulse">
                    TRACKING_TARGET_3D
                  </span>
                </div>
                
                {/* Meta details */}
                <div className="text-center w-full">
                  <h3 className="font-display font-black text-xl text-white tracking-wide mb-1">{personalInfo.name}</h3>
                  <p className="text-[10px] font-mono text-gray-400 mb-4 tracking-wider uppercase">{currentPersonaInfo.tagline}</p>
                  
                  {/* Digital status badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono border ${
                    persona === 'ai-ml' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                    persona === 'full-stack' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                    'bg-violet-500/10 border-violet-500/30 text-violet-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Joy University CSE student (9.45 CGPA)
                  </div>
                </div>

                {/* HUD Bottom telemetry */}
                <div className="w-full flex justify-between items-center text-[8px] font-mono text-gray-600 border-t border-white/5 pt-2">
                  <span>COORD: 15.68 N / 77.28 E</span>
                  <span>B.TECH CSE '27</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Narrative Journey & Stats (Columns: 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-display font-black text-white mb-6 tracking-wide text-center lg:text-left"
            >
              My Journey & Core Philosophy
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-300 font-sans leading-relaxed text-sm sm:text-base mb-10 text-center lg:text-left"
            >
              {currentPersonaInfo.bio}
            </motion.p>

            {/* Quick Metrics Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 gap-4"
            >
              {currentPersonaInfo.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={cardVariants}
                  className={`group relative glass-card p-5 rounded-xl border flex flex-col gap-3 transition-all ${
                    persona === 'ai-ml' ? 'hover:shadow-cyan-950/20 hover:border-cyan-500/35 hover:bg-cyan-500/5' :
                    persona === 'full-stack' ? 'hover:shadow-rose-950/20 hover:border-rose-500/35 hover:bg-rose-500/5' :
                    'hover:shadow-violet-950/20 hover:border-violet-500/35 hover:bg-violet-500/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${getAccentBorder()}`}>
                    {getIcon(stat.label)}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">{stat.value}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1 font-mono tracking-wider uppercase">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

