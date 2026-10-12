"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import clsx from "clsx";
import { TechIcon } from "@components/ui/TechIcon";
import { skillCategories, type SkillLevel } from "@data/profile";

const categories = skillCategories;

const LEVEL_WIDTH: Record<SkillLevel, number> = { "Maîtrisé": 90, "Pratiqué": 65, "En apprentissage": 35 };
const LEVEL_COLOR: Record<SkillLevel, string> = {
    "Maîtrisé": "text-neon-cyan",
    "Pratiqué": "text-neon-purple",
    "En apprentissage": "text-green-400",
};

const TechArsenal = () => {
    const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

    return (
        <section id="competences" className="relative z-10 container mx-auto px-4 py-12 md:py-16">
            {/* Section Header */}
            <div className="flex flex-col items-center mb-12">
                <h4 className="text-neon-cyan font-mono tracking-[0.5em] text-sm mb-2 uppercase">Capacités du système</h4>
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
                    Arsenal <span className="text-neon-purple">technologique</span>
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Category Selection (Side Menu) */}
                <div className="w-full lg:w-1/4 flex flex-col gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={clsx(
                                "group relative p-4 text-left border rounded-lg transition-all duration-300 font-mono text-sm tracking-widest uppercase overflow-hidden",
                                activeCategory === cat.id
                                    ? "border-neon-cyan text-neon-cyan bg-neon-cyan/5 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <span className="relative z-10 flex justify-between items-center">
                                <span>{`// ${cat.name}`}</span>
                                {activeCategory === cat.id && (
                                    <motion.span
                                        layoutId="activeDot"
                                        className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"
                                    />
                                )}
                            </span>
                            {/* Hover Glitch Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                        </button>
                    ))}
                </div>

                {/* Skills Grid (Weapon Rack) */}
                <div className="flex-1 min-h-[400px]">
                    <GlassCard className="h-full p-8 relative overflow-hidden border-neon-cyan/20">
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
                            >
                                {categories.find(c => c.id === activeCategory)?.skills.map((skill, idx) => (
                                    <div
                                        key={skill.name}
                                        className="group relative p-4 rounded-xl bg-black/40 border border-white/5 hover:border-neon-purple/50 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Icon Container with Glow */}
                                            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-hover:border-neon-purple group-hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] transition-all duration-300">
                                                <div className="relative w-8 h-8">
                                                    <TechIcon
                                                        icon={skill.icon}
                                                        alt={skill.name}
                                                        className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="text-white font-bold group-hover:text-neon-purple transition-colors">{skill.name}</h4>
                                                <div className="flex justify-between items-center text-xs text-gray-500 font-mono mt-1">
                                                    <span>NIVEAU</span>
                                                    <span className={LEVEL_COLOR[skill.level]}>{skill.level}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Animated Progress Bar */}
                                        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${LEVEL_WIDTH[skill.level]}%` }}
                                                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};

export default TechArsenal;
