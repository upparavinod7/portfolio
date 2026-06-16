"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Shield } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const statusMessages = [
  "INITIALIZING VIRTUAL GRID...",
  "CONNECTING HUD RECONCILERS...",
  "COMPILING SHADERS & MATRICES...",
  "SPAWNING HOLOGRAPHIC VERTICES...",
  "DEPLOYING PORTFOLIO AGENTS...",
  "PORTAL SECURED. ACCESS GRANTED."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Increment progress dynamically
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Allow exit animation to finish
          }, 600);
          return 100;
        }
        
        // Dynamic increments for realistic cinematic look
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Cycle status messages based on progress
    const messageIndex = Math.min(
      Math.floor((progress / 100) * statusMessages.length),
      statusMessages.length - 1
    );
    setStatusIdx(messageIndex);
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02040a] text-gray-100 overflow-hidden"
        >
          {/* Cyber grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          {/* Subtle neon radial lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none animate-pulse" />

          {/* Loading Container */}
          <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
            
            {/* Pulsing Core Icon */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 90, 180, 270, 360] 
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" } 
              }}
              className="w-16 h-16 rounded-xl border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center mb-8 text-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
            >
              <Cpu className="w-8 h-8" />
            </motion.div>

            {/* Title */}
            <h1 className="font-display font-black text-2xl tracking-[0.25em] text-white uppercase text-center mb-2 flex items-center gap-2">
              SYSTEMS <span className="text-cyan-400">ONLINE</span>
            </h1>
            <p className="font-mono text-[10px] text-gray-500 tracking-wider mb-8 text-center uppercase">
              Uppara Vinod // Core Terminal v16.2.7
            </p>

            {/* Diagnostic Ticker */}
            <div className="w-full bg-gray-950/80 border border-white/5 p-4 rounded-xl mb-6 font-mono text-[10px] text-gray-400 min-h-[72px] flex flex-col justify-center gap-1.5 shadow-inner">
              <div className="flex justify-between items-center text-gray-500">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-cyan-500" />
                  STATUS_CHECKER
                </span>
                <span>SYS_TEMP: NOMINAL</span>
              </div>
              <div className="text-cyan-400 font-semibold truncate animate-pulse">
                &gt; {statusMessages[statusIdx]}
              </div>
              <div className="text-[9px] text-gray-600 flex justify-between">
                <span>BUFFER_DUMP: OK</span>
                <span>SECURE_LINK: YES</span>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden border border-white/5 p-[1px] mb-3">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="loadingProgress"
              />
            </div>

            {/* Progress Readout */}
            <div className="w-full flex justify-between items-center font-mono text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-violet-500" />
                INTEGRITY: SECURE
              </span>
              <span className="text-white font-bold tracking-widest text-xs">
                {progress}%
              </span>
            </div>

          </div>

          {/* Border Decorative Scanners */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/35 to-transparent animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
