"use client";

import React, { useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { projectsData, Project } from '@/data/portfolioData';
import { ExternalLink, Cpu, Code, ShieldCheck, ChevronRight, X, Layers, Lightbulb, Zap, HelpCircle } from 'lucide-react';

export default function Projects() {
  const { persona } = usePersona();
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-ml' | 'full-stack' | 'sde'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-ml': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'full-stack': return <Code className="w-4 h-4 text-rose-400" />;
      case 'sde': return <ShieldCheck className="w-4 h-4 text-violet-400" />;
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
    if (activeFilter !== filter) return 'bg-gray-900/60 text-gray-400 border-white/5 hover:text-white hover:bg-gray-900';
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      case 'full-stack': return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'sde': return 'bg-violet-500/20 text-violet-400 border-violet-500/40';
    }
  };

  const getAccentBtn = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500 hover:bg-cyan-600 text-black';
      case 'full-stack': return 'bg-rose-500 hover:bg-rose-600 text-white';
      case 'sde': return 'bg-violet-500 hover:bg-violet-600 text-white';
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
            Featured <span className={getGlowText()}>Projects</span>
          </h2>
          <div className={`h-1.5 w-24 mx-auto rounded-full ${
            persona === 'ai-ml' ? 'bg-cyan-500' :
            persona === 'full-stack' ? 'bg-rose-500' :
            'bg-violet-500'
          }`}></div>
        </div>

        {/* Filters bar */}
        <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
          <button onClick={() => setActiveFilter('all')} className={`px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${getFilterStyle('all')}`}>
            All Projects
          </button>
          <button onClick={() => setActiveFilter('ai-ml')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${getFilterStyle('ai-ml')}`}>
            <Cpu className="w-3.5 h-3.5" />
            AI & Machine Learning
          </button>
          <button onClick={() => setActiveFilter('full-stack')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${getFilterStyle('full-stack')}`}>
            <Code className="w-3.5 h-3.5" />
            Full Stack Web
          </button>
          <button onClick={() => setActiveFilter('sde')} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer ${getFilterStyle('sde')}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            Software Engineering
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`group flex flex-col justify-between rounded-2xl border border-white/5 glass-card overflow-hidden hover:scale-[1.02] transition-transform ${
                persona === 'ai-ml' ? 'hover:border-cyan-500/20' :
                persona === 'full-stack' ? 'hover:border-rose-500/20' :
                'hover:border-violet-500/20'
              }`}
            >
              
              {/* Top Cover / Tech Badges */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase ${getBadgeStyle(project.category)}`}>
                    {getCategoryIcon(project.category)}
                    {project.category === 'ai-ml' ? 'AI/ML' : project.category === 'full-stack' ? 'Full-Stack' : 'SDE'}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-1" title="Code Repository">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                    <a href={project.liveLink} className="text-gray-400 hover:text-white p-1" title="Live Demo">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-white mb-2 leading-snug">{project.title}</h3>
                <p className="text-xs font-semibold text-gray-400 mb-4">{project.subtitle}</p>
                
                {/* Short descriptive stats */}
                <div className="mb-4 bg-gray-950/60 border border-white/5 p-3 rounded-lg text-xs text-gray-300">
                  <span className="font-semibold text-white block mb-1">Problem:</span>
                  {project.problem.slice(0, 110)}...
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="bg-gray-900/60 text-gray-400 px-2 py-0.5 rounded text-[10px] font-mono border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[9px] text-gray-500 font-mono self-center ml-1">+{project.techStack.length - 4} more</span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Deep Dive Architecture
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Deep Dive Architecture Modal Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 bg-gray-950 text-left p-6 sm:p-8 shadow-2xl">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
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
                <p className="text-sm font-semibold text-gray-400">{selectedProject.subtitle}</p>
              </div>

              {/* Modal Grid content */}
              <div className="space-y-6">
                
                {/* Problem & Solution block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/60 p-4 border border-white/5 rounded-xl">
                    <h4 className="font-display font-bold text-sm text-gray-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-pink-400" />
                      The Problem
                    </h4>
                    <p className="text-sm text-gray-300 font-sans leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div className="bg-gray-900/60 p-4 border border-white/5 rounded-xl">
                    <h4 className="font-display font-bold text-sm text-gray-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      The Solution
                    </h4>
                    <p className="text-sm text-gray-300 font-sans leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                {/* Key Features list */}
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
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
                  <h4 className="font-display font-bold text-sm text-white mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    Architecture & Data Flow
                  </h4>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Challenge and Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-7 bg-gray-900/40 p-4 border border-white/5 rounded-xl">
                    <h4 className="font-display font-bold text-sm text-gray-400 mb-1.5 uppercase tracking-wider">Engineering Challenges Solved</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                  <div className="md:col-span-5 bg-gray-900/60 p-4 border border-white/5 rounded-xl flex flex-col justify-center text-center">
                    <h4 className="font-display font-bold text-xs text-gray-400 mb-1 uppercase tracking-wider">Impact Metrics</h4>
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
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
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

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
