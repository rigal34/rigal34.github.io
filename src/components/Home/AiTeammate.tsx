"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { aiTeammate } from "@data/profile";

/*
 * Partie « Je travaille avec une IA »
 * Présente le site Ligne d'Eau, réalisé par Claude Opus 5.5 sous la direction de Bruno.
 * Tous les textes sont dans src/data/profile.ts (aiTeammate).
 * Pas de nouvel effet animé : seulement l'apparition douce déjà utilisée ailleurs sur la page.
 */
const AiTeammate = () => {
    return (
        <section id="ia" className="relative z-10 py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Titre */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="text-neon-purple/90 font-mono tracking-[0.4em] text-xs uppercase border border-neon-purple/40 px-4 py-2 rounded-full bg-neon-purple/5 backdrop-blur-sm">
                            {aiTeammate.kicker}
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan drop-shadow-[0_0_12px_rgba(188,19,254,0.45)]">
                            {aiTeammate.title}
                        </span>
                    </h2>

                    <p className="max-w-3xl text-lg md:text-2xl text-white font-semibold leading-snug">
                        {aiTeammate.credit}
                    </p>
                    <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
                        {aiTeammate.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                    {/* Le résultat */}
                    <GlassCard hoverEffect={false} className="lg:col-span-3 p-6 md:p-10 border-neon-cyan/30 bg-black/60">
                        <div className="flex flex-col h-full">
                            <div className="font-mono text-xs text-neon-cyan tracking-[0.3em] mb-3">{"// RÉSULTAT_EN_LIGNE"}</div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                                {aiTeammate.resultTitle}
                            </h3>
                            <p className="text-gray-300 leading-relaxed md:text-lg mb-6 border-l-4 border-neon-purple/50 pl-4">
                                {aiTeammate.resultText}
                            </p>

                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {aiTeammate.stats.map((s) => (
                                    <div key={s.label} className="bg-black/40 p-3 md:p-4 rounded-lg border border-white/10">
                                        <div className="text-2xl md:text-4xl font-bold text-white">{s.value}</div>
                                        <div className="text-[9px] md:text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-wrap items-center gap-4">
                                <a
                                    href={aiTeammate.resultUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-full border-2 border-green-500 text-green-400 font-mono text-sm uppercase tracking-wider hover:bg-green-500 hover:text-black transition-colors shadow-[0_0_12px_rgba(34,197,94,0.35)]"
                                >
                                    Voir le résultat ↗
                                </a>
                                <span className="text-xs text-gray-500 font-mono">{aiTeammate.resultNote}</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Qui a fait quoi */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {aiTeammate.roles.map((role, i) => (
                            <GlassCard
                                key={role.who}
                                hoverEffect={false}
                                className={`p-6 bg-black/60 border-l-4 ${i === 0 ? "border-l-neon-cyan" : "border-l-neon-purple"}`}
                            >
                                <h3 className={`font-mono text-sm tracking-widest uppercase mb-3 ${i === 0 ? "text-neon-cyan" : "text-neon-purple"}`}>
                                    {role.who}
                                </h3>
                                <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
                                    {role.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Pourquoi c'est un atout */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {aiTeammate.arguments.map((arg, i) => (
                        <motion.div
                            key={arg.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 p-5 rounded-xl border border-white/10"
                        >
                            <h3 className="text-white font-bold mb-2">{arg.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{arg.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AiTeammate;
