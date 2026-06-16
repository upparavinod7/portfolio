"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Code2, Orbit, Rocket } from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

const chapters = [
  {
    id: "origin",
    label: "01 / Origin",
    title: "A builder identity formed around intelligence, systems, and craft.",
    copy: "The portfolio opens like a digital control room: personal story, technical proof, and project evidence all orbiting one central character.",
    icon: BrainCircuit,
  },
  {
    id: "systems",
    label: "02 / Systems",
    title: "Every section behaves like part of the same interactive universe.",
    copy: "Scroll reveals mission phases, animated interfaces, live skill matrices, and project records with depth, motion, and tactile response.",
    icon: Orbit,
  },
  {
    id: "launch",
    label: "03 / Launch",
    title: "The work is framed as product thinking, not just code samples.",
    copy: "Projects surface the problem, architecture, impact, and stack through immersive panels that invite exploration without sacrificing clarity.",
    icon: Rocket,
  },
];

export default function StoryConstellation() {
  const { persona } = usePersona();

  const accent = (() => {
    switch (persona) {
      case "full-stack":
        return {
          text: "text-rose-300",
          border: "border-rose-300/25",
          fill: "bg-rose-300",
          glow: "shadow-rose-400/20",
          wash: "from-rose-500/15 via-amber-400/5",
        };
      case "sde":
        return {
          text: "text-violet-300",
          border: "border-violet-300/25",
          fill: "bg-violet-300",
          glow: "shadow-violet-400/20",
          wash: "from-violet-500/15 via-sky-400/5",
        };
      case "ai-ml":
      default:
        return {
          text: "text-cyan-300",
          border: "border-cyan-300/25",
          fill: "bg-cyan-300",
          glow: "shadow-cyan-400/20",
          wash: "from-cyan-400/15 via-indigo-400/5",
        };
    }
  })();

  return (
    <section className="relative overflow-hidden bg-[#02040a] py-20 sm:py-28">
      <div className={`absolute inset-x-0 top-0 h-64 bg-gradient-to-b ${accent.wash} to-transparent`} />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className={`mb-4 inline-flex items-center gap-2 border ${accent.border} bg-black/20 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest ${accent.text} backdrop-blur-xl`}
          >
            <Code2 className="h-3.5 w-3.5" />
            Scroll narrative system
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="max-w-xl font-display text-3xl font-black leading-tight text-white sm:text-5xl"
          >
            A personal brand experience that unfolds like a launch sequence.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            The site now uses motion, reactive interfaces, and cinematic pacing to turn your resume into a memorable world around your work.
          </motion.p>
        </div>

        <div className="relative space-y-5">
          <div className={`absolute left-5 top-8 bottom-8 w-px ${accent.fill} opacity-30 shadow-[0_0_28px_4px] ${accent.glow}`} />
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <motion.article
                key={chapter.id}
                initial={{ opacity: 0, x: 38, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ type: "spring", stiffness: 82, damping: 18, delay: index * 0.08 }}
                className={`group relative border ${accent.border} bg-white/[0.035] p-5 shadow-2xl backdrop-blur-2xl transition duration-500 hover:bg-white/[0.06] sm:p-7`}
              >
                <div className={`absolute -left-1 top-8 h-3 w-3 ${accent.fill} shadow-[0_0_24px_5px] ${accent.glow}`} />
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center border ${accent.border} bg-black/30 ${accent.text}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] ${accent.text}`}>
                      {chapter.label}
                    </p>
                    <h3 className="font-display text-xl font-black leading-snug text-white sm:text-2xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">{chapter.copy}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
