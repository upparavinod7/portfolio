"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import AvatarCanvas from '@/components/AvatarCanvas';
import { usePersona } from '@/context/PersonaContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { persona } = usePersona();
  const [isLoading, setIsLoading] = useState(true);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hello! I am Vinod's AI Digital Twin assistant. Ask me about his GPA, active internships, skills, or certifications!" }
  ]);
  const [userInput, setUserInput] = useState('');

  // Suggestion chips questions
  const askQuestions = [
    { q: "What is Vinod's GPA?", a: "Uppara Vinod has achieved a stellar B.Tech CGPA of 9.45/10 specializing in AI & Machine Learning at Joy University!", gesture: "nod" },
    { q: "Where did he intern?", a: "He completed internships at Hyperready as a Junior Developer (React, Node, Express, MongoDB) and at Unified Mentor as a Machine Learning intern (Python, Flask, Scikit-Learn).", gesture: "point" },
    { q: "Show certifications", a: "Vinod completed clouds and analytics job simulations from Forage, including AWS Cloud Solutions Architecture, Data Analytics, and Software Engineering.", gesture: "nod" },
    { q: "Tell me about projects", a: "His featured work includes CareerOS AI (MERN job fitting platform), Smart Music Player (Emotion CNN recommendation), and vehicle price prediction apps.", gesture: "point" }
  ];

  useEffect(() => {
    const handleRecruiterToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsRecruiterMode(customEvent.detail);
    };
    window.addEventListener("recruiter-mode-toggle", handleRecruiterToggle);
    return () => {
      window.removeEventListener("recruiter-mode-toggle", handleRecruiterToggle);
    };
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);

    setTimeout(() => {
      let reply = "Vinod is specialized in AI/ML engineering, PyTorch, TensorFlow, Python, React, and Node.js. For quick answers, please select one of the suggested prompts below!";
      let gesture = "nod";

      const matched = askQuestions.find(
        item => text.toLowerCase().includes(item.q.toLowerCase()) || item.q.toLowerCase().includes(text.toLowerCase())
      );
      if (matched) {
        reply = matched.a;
        gesture = matched.gesture;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("ai-chat-response", { detail: gesture }));
      }
    }, 500);
  };

  // Dynamic decoration border color based on persona
  const getGlowBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'from-cyan-500/25 via-transparent to-indigo-500/10';
      case 'full-stack': return 'from-rose-500/25 via-transparent to-amber-500/10';
      case 'sde': return 'from-violet-500/25 via-transparent to-fuchsia-500/10';
    }
  };

  const getAccentGlow = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500/5';
      case 'full-stack': return 'bg-rose-500/5';
      case 'sde': return 'bg-violet-500/5';
    }
  };

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative min-h-screen bg-[#02040a] text-gray-100 flex flex-col font-sans overflow-x-hidden"
        >
          {/* Sticky Top Header */}
          <Navbar />

          {/* Global Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-25 z-0 pointer-events-none" />
          <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ${getAccentGlow()} bg-radial-glow`} />

          {/* Global Fixed 3D Avatar Canvas */}
          <div className="fixed inset-0 z-0 w-full h-screen pointer-events-none">
            <AvatarCanvas />
          </div>

          {/* Core Pages Components */}
          <main className="flex-grow z-10 relative">
            <Hero />
            
            {/* Dynamic transition divider line */}
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <About />
            
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <Skills />
            
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <Projects />
            
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <Experience />
            
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <Certifications />
            
            <div className={`w-full h-[1px] bg-gradient-to-r ${getGlowBorder()}`} />
            <Contact />
          </main>

          {/* Recruiter Mode Interactive HUD Dashboard Overlay */}
          <AnimatePresence>
            {isRecruiterMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              >
                <div className="relative w-full max-w-2xl rounded-2xl glassmorphism-hud border border-cyan-500/25 p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-left">
                  {/* Close button */}
                  <button 
                    onClick={() => {
                      setIsRecruiterMode(false);
                      window.dispatchEvent(new CustomEvent("recruiter-mode-toggle", { detail: false }));
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white border border-white/5 hover:border-white/15 p-2 rounded-xl cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 tracking-wider uppercase mb-2">
                      Recruiter Fast-Track Console
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">Uppara Vinod</h3>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-0.5">B.Tech CSE '27 | Joy University (9.45 CGPA)</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-950/60 p-4 border border-white/5 rounded-xl">
                      <h4 className="font-display font-bold text-xs text-cyan-400 mb-2 uppercase tracking-wider">Education & Credentials</h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        - Joy University (AI/ML) CGPA: 9.45/10<br />
                        - Narayana Junior College MPC: 96.1%<br />
                        - Narayana SSC School GPA: 10/10<br />
                        - AWS Solutions Architect Sim Certificate
                      </p>
                    </div>
                    <div className="bg-gray-950/60 p-4 border border-white/5 rounded-xl">
                      <h4 className="font-display font-bold text-xs text-rose-400 mb-2 uppercase tracking-wider">Active Internships</h4>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        - <strong>Hyperready</strong> (Junior Developer Intern)<br />
                          Built Node.js APIs, optimized MongoDB schemas.<br />
                        - <strong>Unified Mentor</strong> (ML Intern)<br />
                          Trained valuation regressions in Scikit-Learn.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-xs text-white mb-2 uppercase tracking-wider font-mono text-violet-400">Download Targeted Resumes</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <a href="/resumes/UPPARA_VINOD_AI_ML.pdf" download className="flex items-center justify-between border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 p-3 rounded-xl text-xs font-mono font-bold text-white transition-all cursor-pointer">
                        AI/ML Resume
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      </a>
                      <a href="/resumes/UPPARA_VINOD_FULL_STACK.pdf" download className="flex items-center justify-between border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 p-3 rounded-xl text-xs font-mono font-bold text-white transition-all cursor-pointer">
                        Full Stack Resume
                        <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      </a>
                      <a href="/resumes/UPPARA_VINOD_SDE.pdf" download className="flex items-center justify-between border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 p-3 rounded-xl text-xs font-mono font-bold text-white transition-all cursor-pointer">
                        SDE Resume
                        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-between items-center flex-wrap gap-4 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-mono text-gray-500">Fast contact actions enabled.</span>
                    <div className="flex items-center gap-3">
                      <a href="mailto:upparavinod7@gmail.com" className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">Email Direct</a>
                      <a href="tel:+917680841759" className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer">Call Direct</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Assistant Chat Widget */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="w-80 sm:w-96 rounded-2xl glassmorphism-hud border border-cyan-500/15 p-4 flex flex-col gap-3 shadow-2xl h-[420px]"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono">Digital_Twin_v1.0</span>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-white p-1 cursor-pointer">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 text-xs font-sans">
                    {messages.map((m, idx) => (
                      <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2.5 rounded-xl border leading-relaxed ${
                          m.sender === 'user' 
                            ? 'bg-cyan-500/10 border-cyan-500/20 text-white rounded-tr-none' 
                            : 'bg-gray-900/60 border-white/5 text-gray-200 rounded-tl-none'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-2 max-h-[80px] overflow-y-auto">
                    {askQuestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.q)}
                        className="bg-gray-950 hover:bg-gray-900 border border-white/5 hover:border-cyan-500/20 text-gray-400 hover:text-white px-2 py-1 rounded-lg text-[9px] font-mono transition-all cursor-pointer"
                      >
                        {item.q}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); setUserInput(''); }} className="flex gap-2 border-t border-white/5 pt-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask digital twin..."
                      className="flex-grow bg-gray-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/40"
                    />
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black px-3.5 py-2 rounded-xl text-xs font-bold uppercase font-mono cursor-pointer">
                      Send
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="h-12 w-12 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer relative"
              title="Open AI Assistant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <footer className="w-full py-8 border-t border-white/5 bg-gray-950 relative z-10 text-center text-xs text-gray-500 font-mono">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>Designed and engineered by Uppara Vinod.</p>
              <div className="flex items-center gap-4">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
