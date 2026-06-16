"use client";

import React, { useEffect, useState } from "react";
import { usePersona } from "@/context/PersonaContext";
import { personalInfo } from "@/data/portfolioData";
import { ArrowRight, Download, Mail, MousePointer2, Sparkles } from "lucide-react";
import AvatarCanvas from "./AvatarCanvas";
import { motion } from "framer-motion";

export default function Hero() {
  const { persona } = usePersona();
  const currentPersonaInfo = personalInfo.personas[persona];
  const [displayText, setDisplayText] = useState("");
  const targetText = currentPersonaInfo.tagline;

  useEffect(() => {
    let active = true;
    let index = 0;
    window.setTimeout(() => {
      if (active) setDisplayText("");
    }, 0);

    const type = () => {
      if (!active) return;
      if (index <= targetText.length) {
        setDisplayText(targetText.slice(0, index));
        index++;
        window.setTimeout(type, 28);
      }
    };

    type();
    return () => {
      active = false;
    };
  }, [targetText]);

  const [primaryBtnPos, setPrimaryBtnPos] = useState({ x: 0, y: 0 });
  const [secondaryBtnPos, setSecondaryBtnPos] = useState({ x: 0, y: 0 });

  const handleMagneticMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.22, y: y * 0.22 });
  };

  const handleMagneticLeave = (
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setPos({ x: 0, y: 0 });
  };

  const accent = (() => {
    switch (persona) {
      case "full-stack":
        return {
          text: "text-rose-300",
          solid: "bg-rose-400 hover:bg-rose-300 text-gray-950 shadow-rose-400/25",
          border: "border-rose-300/35 hover:border-rose-300/70 hover:bg-rose-300/10",
          glow: "from-rose-500/20 via-amber-400/10 to-transparent",
          status: "border-rose-300/30 bg-rose-300/10 text-rose-100",
        };
      case "sde":
        return {
          text: "text-violet-300",
          solid: "bg-violet-400 hover:bg-violet-300 text-gray-950 shadow-violet-400/25",
          border: "border-violet-300/35 hover:border-violet-300/70 hover:bg-violet-300/10",
          glow: "from-violet-500/20 via-sky-400/10 to-transparent",
          status: "border-violet-300/30 bg-violet-300/10 text-violet-100",
        };
      case "ai-ml":
      default:
        return {
          text: "text-cyan-300",
          solid: "bg-cyan-300 hover:bg-cyan-200 text-gray-950 shadow-cyan-300/25",
          border: "border-cyan-300/35 hover:border-cyan-300/70 hover:bg-cyan-300/10",
          glow: "from-cyan-400/20 via-indigo-400/10 to-transparent",
          status: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
        };
    }
  })();

  const getResumeLink = () => {
    switch (persona) {
      case "ai-ml":
        return "/resumes/UPPARA_VINOD_AI_ML.pdf";
      case "full-stack":
        return "/resumes/UPPARA_VINOD_FULL_STACK.pdf";
      case "sde":
        return "/resumes/UPPARA_VINOD_SDE.pdf";
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 92, damping: 16 } },
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#02040a]">
      <div className="absolute inset-0 z-0">
        <AvatarCanvas />
      </div>

      <div className={`absolute inset-0 z-[1] bg-radial-glow opacity-90`} />
      <div className={`absolute inset-0 z-[1] bg-gradient-to-br ${accent.glow}`} />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,4,10,0.92)_0%,rgba(2,4,10,0.48)_34%,rgba(2,4,10,0.12)_56%,rgba(2,4,10,0.7)_100%)]" />
      <div className="absolute inset-0 z-[1] bg-grid-pattern opacity-20" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#02040a] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
          className="max-w-2xl"
        >


          <motion.h1
            variants={item}
            className="max-w-3xl font-display text-[clamp(2.75rem,8vw,6.7rem)] font-black leading-[0.92] tracking-normal text-white"
          >
            Uppara <span className={accent.text}>Vinod</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-gray-200 sm:text-xl"
          >
            {currentPersonaInfo.brandStatement}
          </motion.p>

          <motion.div variants={item} className="mt-5 flex min-h-8 items-center">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-gray-300 sm:text-sm">
              {displayText}
              <span className={`ml-1 inline-block h-4 w-2 align-middle ${accent.text} cursor-blink bg-current`} />
            </p>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              onMouseMove={(e) => handleMagneticMove(e, setPrimaryBtnPos)}
              onMouseLeave={() => handleMagneticLeave(setPrimaryBtnPos)}
              style={{ transform: `translate(${primaryBtnPos.x}px, ${primaryBtnPos.y}px)` }}
              className={`inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-black uppercase tracking-wider shadow-2xl transition duration-150 ${accent.solid}`}
            >
              Project Showcase
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={getResumeLink()}
              download
              onMouseMove={(e) => handleMagneticMove(e, setSecondaryBtnPos)}
              onMouseLeave={() => handleMagneticLeave(setSecondaryBtnPos)}
              style={{ transform: `translate(${secondaryBtnPos.x}px, ${secondaryBtnPos.y}px)` }}
              className={`inline-flex items-center justify-center gap-2 border px-7 py-3 text-xs font-black uppercase tracking-wider text-white backdrop-blur-xl transition duration-150 ${accent.border}`}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="hidden max-w-xs border border-white/10 bg-black/20 p-4 backdrop-blur-xl lg:block"
          >
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Sparkles className={`h-3.5 w-3.5 ${accent.text}`} />
              Avatar response layer
            </div>
            <p className="text-xs leading-relaxed text-gray-300">
              Cursor movement steers head, eyes, and reactive lighting. Click to trigger a gesture response.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mx-auto hidden items-center gap-2 border border-white/10 bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gray-300 backdrop-blur-xl sm:flex"
          >
            <MousePointer2 className={`h-3.5 w-3.5 ${accent.text}`} />
            Move cursor / scroll to shift scene
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex items-center justify-start gap-3 lg:justify-end"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 bg-black/20 p-3 text-gray-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
              title="GitHub"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 bg-black/20 p-3 text-gray-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
              title="LinkedIn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="border border-white/10 bg-black/20 p-3 text-gray-300 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
