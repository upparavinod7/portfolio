"use client";

import React, { useState, useRef } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { projectsData, Project } from '@/data/portfolioData';
import { ExternalLink, Cpu, Code, ShieldCheck, ChevronRight, X, Layers, Lightbulb, Zap, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Separate ProjectCard component for managing individual 3D mouse tilt state
function ProjectCard({ 
  project, 
  persona, 
  onDeepDive, 
  getBadgeStyle, 
  getCategoryIcon 
}: { 
  project: Project; 
  persona: string; 
  onDeepDive: () => void;
  getBadgeStyle: (cat: string) => string;
  getCategoryIcon: (cat: string) => React.ReactNode;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinate from card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    
    // Rotation constraints: max 10 degrees
    setRotateX(-mouseY * 10);
    setRotateY(mouseX * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 85, damping: 15 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={`group flex flex-col justify-between rounded-2xl border border-white/5 glass-card overflow-hidden transition-all duration-300 ${
        persona === 'ai-ml' ? 'hover:border-cyan-500/25 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.15)]' :
        persona === 'full-stack' ? 'hover:border-rose-500/25 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.15)]' :
        'hover:border-violet-500/25 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.15)]'
      }`}
    >
      {/* Top Cover / Tech Badges */}
      <div className="p-6 flex-grow flex flex-col" style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
        <div className="flex items-center justify-between mb-4" style={{ transform: 'translateZ(10px)' }}>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase ${getBadgeStyle(project.category)}`}>
            {getCategoryIcon(project.category)}
            {project.category === 'ai-ml' ? 'AI/ML' : project.category === 'full-stack' ? 'Full-Stack' : 'SDE'}
          </span>
          
          <div className="flex items-center gap-2">
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5 transition-all" 
              title="Code Repository"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a 
              href={project.liveLink} 
              className="text-gray-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/5 transition-all" 
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <h3 className="font-display font-black text-xl text-white mb-2 leading-snug" style={{ transform: 'translateZ(15px)' }}>
          {project.title}
        </h3>
        <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-4" style={{ transform: 'translateZ(10px)' }}>
          {project.subtitle}
        </p>
        
        {/* Short descriptive problem segment */}
        <div className="mb-4 bg-gray-950/80 border border-white/5 p-4 rounded-xl text-xs text-gray-300 font-sans leading-relaxed" style={{ transform: 'translateZ(5px)' }}>
          <span className="font-bold text-white block mb-1 font-mono uppercase text-[9px] tracking-wider text-gray-400">Problem:</span>
          {project.problem.slice(0, 115)}...
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto" style={{ transform: 'translateZ(15px)' }}>
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="bg-gray-950/60 text-gray-400 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[9px] text-gray-500 font-mono self-center ml-1">+{project.techStack.length - 4} more</span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6 pt-2" style={{ transform: 'translateZ(20px)' }}>
        <button 
          onClick={onDeepDive}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer shadow-inner"
        >
          Deep Dive Architecture
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { persona } = usePersona();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-ml' | 'full-stack' | 'sde'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });
  const featuredProject = filteredProjects[0] ?? projectsData[0];

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-ml': return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'full-stack': return <Code className="w-3.5 h-3.5 text-rose-400" />;
      case 'sde': return <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />;
      default: return null;
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'ai-ml': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'full-stack': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'sde': return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const getFilterStyle = (filter: typeof activeFilter) => {
    if (activeFilter !== filter) return 'bg-gray-900/40 text-gray-400 border-white/5 hover:text-white hover:bg-gray-900/80';
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-cyan-500/10 shadow-[0_0_15px_-3px]';
      case 'full-stack': return 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-rose-500/10 shadow-[0_0_15px_-3px]';
      case 'sde': return 'bg-violet-500/20 text-violet-400 border-violet-500/40 shadow-violet-500/10 shadow-[0_0_15px_-3px]';
    }
  };

  const getAccentBtn = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500 hover:bg-cyan-600 text-black shadow-cyan-500/10';
      case 'full-stack': return 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/10';
      case 'sde': return 'bg-violet-500 hover:bg-violet-600 text-white shadow-violet-500/10';
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#02040a]">
      {/* Global design layouts */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-display font-black text-white mb-4"
          >
            Featured <span className={getGlowText()}>Projects</span>
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

        {/* Filters bar */}
        <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
          {(['all', 'ai-ml', 'full-stack', 'sde'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${getFilterStyle(filter)}`}
            >
              {filter !== 'all' && getCategoryIcon(filter)}
              {filter === 'all' ? 'All Operations' : filter === 'ai-ml' ? 'AI & Machine Learning' : filter === 'full-stack' ? 'Full Stack Web' : 'SDE / Algorithmic'}
            </button>
          ))}
        </div>

        {/* Immersive featured project deck */}
        <motion.div
          key={featuredProject.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 72, damping: 17 }}
          className={`relative mb-12 overflow-hidden border bg-white/[0.035] p-5 shadow-2xl backdrop-blur-2xl sm:p-7 lg:p-8 ${
            persona === 'ai-ml' ? 'border-cyan-300/20 shadow-cyan-950/20' :
            persona === 'full-stack' ? 'border-rose-300/20 shadow-rose-950/20' :
            'border-violet-300/20 shadow-violet-950/20'
          }`}
        >
          <div className={`absolute -right-28 -top-28 h-72 w-72 opacity-20 blur-3xl ${
            persona === 'ai-ml' ? 'bg-cyan-400' :
            persona === 'full-stack' ? 'bg-rose-400' :
            'bg-violet-400'
          }`} />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          <div className="relative grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${getBadgeStyle(featuredProject.category)}`}>
                  {getCategoryIcon(featuredProject.category)}
                  Active showcase
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  Gesture layer linked to hero avatar
                </span>
              </div>

              <h3 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl">
                {featuredProject.title}
              </h3>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
                {featuredProject.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                {featuredProject.solution}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {featuredProject.techStack.slice(0, 6).map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="border border-white/10 bg-black/20 px-3 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-gray-300 backdrop-blur"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[300px] border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
              <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-white/35" />
              <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-white/35" />
              <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/35" />
              <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/35" />

              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">Architecture preview</span>
                <span className={`h-2 w-2 animate-pulse ${
                  persona === 'ai-ml' ? 'bg-cyan-300' :
                  persona === 'full-stack' ? 'bg-rose-300' :
                  'bg-violet-300'
                }`} />
              </div>

              <div className="space-y-3 font-mono text-xs text-gray-300">
                <div className="border border-white/10 bg-white/[0.03] p-3">
                  <span className={getGlowText()}>problem</span>: {featuredProject.problem.slice(0, 130)}...
                </div>
                <div className="border border-white/10 bg-white/[0.03] p-3">
                  <span className={getGlowText()}>architecture</span>: {featuredProject.architecture.slice(0, 150)}...
                </div>
                <div className="border border-white/10 bg-white/[0.03] p-3">
                  <span className={getGlowText()}>impact</span>: {featuredProject.metrics}
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(featuredProject)}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-wider transition ${
                  persona === 'ai-ml' ? 'bg-cyan-300 text-gray-950 hover:bg-cyan-200' :
                  persona === 'full-stack' ? 'bg-rose-400 text-gray-950 hover:bg-rose-300' :
                  'bg-violet-400 text-gray-950 hover:bg-violet-300'
                }`}
              >
                Open full project transmission
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              persona={persona}
              onDeepDive={() => setSelectedProject(project)}
              getBadgeStyle={getBadgeStyle}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>

        {/* Deep Dive Architecture Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl glassmorphism-hud border border-white/10 bg-gray-950 text-left p-6 sm:p-8 shadow-2xl"
              >
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase mb-3 ${getBadgeStyle(selectedProject.category)}`}>
                    {getCategoryIcon(selectedProject.category)}
                    {selectedProject.category === 'ai-ml' ? 'AI/ML Engineer' : selectedProject.category === 'full-stack' ? 'Full Stack Developer' : 'Software Development Engineer'}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">{selectedProject.title}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">{selectedProject.subtitle}</p>
                </div>

                {/* Modal content */}
                <div className="space-y-6">
                  
                  {/* Problem & Solution block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900/60 p-4 border border-white/5 rounded-xl">
                      <h4 className="font-display font-bold text-xs text-gray-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-pink-400" />
                        The Problem
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">{selectedProject.problem}</p>
                    </div>
                    <div className="bg-gray-900/60 p-4 border border-white/5 rounded-xl">
                      <h4 className="font-display font-bold text-xs text-gray-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-emerald-400" />
                        The Solution
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Key Features list */}
                  <div>
                    <h4 className="font-display font-bold text-xs text-white mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-gray-900/40 p-2.5 rounded-lg border border-white/5">
                          <span className="text-emerald-400 font-bold">•</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Architecture */}
                  <div className="bg-gray-950/80 p-4 border border-white/10 rounded-xl">
                    <h4 className="font-display font-bold text-xs text-white mb-2 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Layers className="w-4 h-4 text-blue-400" />
                      SYSTEM_ARCHITECTURE_FLOW
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed bg-black/35 p-3 rounded-lg border border-white/5">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  {/* Challenge and Metrics Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-7 bg-gray-900/40 p-4 border border-white/5 rounded-xl">
                      <h4 className="font-display font-bold text-xs text-gray-400 mb-2 uppercase tracking-wider">Engineering Challenges Solved</h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedProject.challenges}</p>
                    </div>
                    <div className="md:col-span-5 bg-gray-900/60 p-4 border border-white/5 rounded-xl flex flex-col justify-center text-center">
                      <h4 className="font-display font-bold text-[10px] text-gray-400 mb-1.5 uppercase tracking-wider">Impact Metrics</h4>
                      <p className={`font-display font-black text-2xl ${getGlowText()}`}>{selectedProject.metrics}</p>
                    </div>
                  </div>

                  {/* Modal footer links */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-gray-900 text-gray-400 px-2.5 py-1 rounded text-xs font-mono border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <a 
                        href={selectedProject.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gray-900 hover:bg-gray-800 text-white transition-colors border border-white/10"
                      >
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                        View Code
                      </a>
                      
                      <a 
                        href={selectedProject.liveLink}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${getAccentBtn()}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
