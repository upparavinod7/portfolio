"use client";

import React from 'react';
import { usePersona } from '@/context/PersonaContext';
import { educationData, certificationsData } from '@/data/portfolioData';
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Certifications() {
  const { persona } = usePersona();

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getBorderColor = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/20 hover:border-cyan-500/35 hover:bg-cyan-500/5 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]';
      case 'full-stack': return 'border-rose-500/20 hover:border-rose-500/35 hover:bg-rose-500/5 hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]';
      case 'sde': return 'border-violet-500/20 hover:border-violet-500/35 hover:bg-violet-500/5 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]';
    }
  };

  const getIconBg = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'full-stack': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'sde': return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    }
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Outer Grid for split content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-2 flex items-center gap-3">
                <GraduationCap className={`w-8 h-8 ${getGlowText()}`} />
                Education
              </h2>
              <div className={`h-1.5 w-20 rounded-full ${
                persona === 'ai-ml' ? 'bg-cyan-500' :
                persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
              }`}></div>
            </div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {educationData.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  className={`group relative glass-card p-6 rounded-2xl border border-white/5 transition-all ${getBorderColor()}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{edu.degree}</h3>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{edu.institution}</p>
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border border-white/5 bg-gray-900 text-gray-300 self-start sm:self-auto">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </span>
                  </div>

                  {/* Score Highlight */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      persona === 'ai-ml' ? 'bg-cyan-500/10 text-cyan-400' :
                      persona === 'full-stack' ? 'bg-rose-500/10 text-rose-400' :
                      'bg-violet-500/10 text-violet-400'
                    }`}>
                      {edu.score}
                    </span>
                  </div>

                  {/* Coursework mapping */}
                  <div>
                    <h4 className="text-[10px] font-display font-bold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span key={cIdx} className="bg-gray-950 text-gray-400 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Certifications (Job Simulations) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-2 flex items-center gap-3">
                <Award className={`w-8 h-8 ${getGlowText()}`} />
                Certifications
              </h2>
              <div className={`h-1.5 w-20 rounded-full ${
                persona === 'ai-ml' ? 'bg-cyan-500' :
                persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
              }`}></div>
            </div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {certificationsData.map((cert, idx) => (
                <motion.div 
                  key={idx} 
                  variants={cardVariants}
                  className={`group relative glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between gap-4 transition-all ${getBorderColor()}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${getIconBg()}`}>
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">{cert.title}</h3>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">Issuer: {cert.issuer}</p>
                      
                      <span className="inline-block mt-2 bg-gray-900 text-[10px] font-mono text-gray-400 border border-white/5 px-2.5 py-0.5 rounded-full">
                        {cert.type}
                      </span>
                    </div>
                  </div>

                  <a 
                    href="https://www.theforage.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-white p-2"
                    title="Verify Certification"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                </motion.div>
              ))}
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
