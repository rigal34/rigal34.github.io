"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { projects } from "@data/profile";


const RecentProjectsNew = () => {
    const [activeProject, setActiveProject] = useState(projects[0].id);

    return (
        <section id="projets" className="relative z-10 py-12 md:py-16 overflow-hidden">
            {/* Avengers/Shield Style Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-neon-cyan/80 font-mono tracking-[0.5em] text-xs uppercase border border-neon-cyan/30 px-4 py-2 rounded-full bg-neon-cyan/5 backdrop-blur-sm shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                            Journal de mission
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
                        Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">projets</span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent rounded-full opacity-70" />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:min-h-[650px] items-stretch">

                    {/* Project Selector / Mission List */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                        {projects.map((project, idx) => (
                            <motion.button
                                key={project.id}
                                onClick={() => setActiveProject(project.id)}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative p-5 text-left transition-all duration-300 rounded-xl border group overflow-hidden ${activeProject === project.id
                                    ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <h3 className={`text-lg font-bold font-mono tracking-tight ${activeProject === project.id ? "text-neon-cyan" : "text-white"}`}>
                                        {project.codename}
                                    </h3>
                                    <span className={`text-[9px] px-2 py-0.5 rounded border tracking-wider font-mono ${project.status === "CLASSIFIÉ" ? "border-red-500 text-red-400 bg-red-500/10" :
                                        project.status === "EN LIGNE" || project.status === "ACTIF" ? "border-green-500 text-green-400 bg-green-500/10" :
                                            "border-neon-purple text-neon-purple bg-neon-purple/10"
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-mono tracking-wider relative z-10 truncate">{project.title}</p>

                                {/* Background Sweep Animation */}
                                {activeProject === project.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-cyan/5 to-transparent z-0"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    />
                                )}
                            </motion.button>
                        ))}

                        {/* <div className="mt-auto pt-6">
                            <Link href="/projects" passHref>
                                <NeonButton className="w-full justify-center group flex items-center">
                                    <span className="mr-2 group-hover:animate-pulse">View All Missions</span>
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                                </NeonButton>
                            </Link>
                        </div> */}
                    </div>

                    {/* Active Mission Details / Holographic View */}
                    <div className="w-full lg:w-2/3 relative perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                initial={{ opacity: 0, rotateX: -10, scale: 0.95 }}
                                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                                exit={{ opacity: 0, rotateX: 10, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="h-full"
                            >
                                <GlassCard className="h-full p-6 md:p-12 relative overflow-hidden flex flex-col border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.1)]" >

                                    {/* Holographic Grid Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(188,19,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(188,19,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none opacity-50" />

                                    {/* Scanning Line Animation */}
                                    <div className="absolute inset-0 pointer-events-none z-0">
                                        <div className="w-full h-[2px] bg-neon-cyan/30 shadow-[0_0_20px_#00f3ff] animate-scan-fast" />
                                    </div>

                                    {/* Project Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex flex-col md:flex-row justify-between items-start">
                                            <div>
                                                <div className="font-mono text-xs md:text-sm text-neon-cyan tracking-[0.3em] mb-3 md:mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]">
                                                    {"// "}{projects.find(p => p.id === activeProject)?.codename}
                                                </div>
                                                <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tighter">
                                                    {projects.find(p => p.id === activeProject)?.title}
                                                </h2>
                                                <div className="h-1 w-16 md:w-24 bg-neon-purple rounded-full shadow-[0_0_15px_#bc13fe] mt-2" />
                                            </div>

                                            {/* Tech Stack Chips (Floating) */}
                                            <div className="flex flex-row md:flex-col gap-2 items-start md:items-end mt-4 md:mt-0 flex-wrap">
                                                {projects.find(p => p.id === activeProject)?.tech.map((t, i) => (
                                                    <motion.div
                                                        key={t}
                                                        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                                                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                                        transition={{
                                                            delay: 0.3 + (i * 0.1),
                                                            type: "spring",
                                                            filter: { type: "tween", ease: "linear" }
                                                        }}
                                                        className="px-2 md:px-3 py-1 bg-black/60 border border-neon-cyan/30 text-neon-cyan text-[10px] md:text-xs font-mono rounded backdrop-blur-md shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                                                    >
                                                        {t}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-6 md:mt-8 text-sm md:text-xl text-gray-300 leading-relaxed max-w-2xl border-l-4 border-neon-purple/50 pl-4 md:pl-6 py-2 bg-gradient-to-r from-neon-purple/5 to-transparent rounded-r-lg">
                                            {projects.find(p => p.id === activeProject)?.description}
                                        </p>

                                        {/* Liens : site en ligne et code */}
                                        {(() => {
                                            const current = projects.find(p => p.id === activeProject);
                                            if (!current) return null;
                                            return (
                                                <div className="mt-6 flex flex-wrap gap-3">
                                                    {current.liveUrl && (
                                                        <a href={current.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border-2 border-green-500 text-green-400 font-mono text-xs uppercase tracking-wider hover:bg-green-500 hover:text-black transition-colors shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                                                            Voir le site ↗
                                                        </a>
                                                    )}
                                                    {current.codeUrl && (
                                                        <a href={current.codeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border-2 border-neon-cyan text-neon-cyan font-mono text-xs uppercase tracking-wider hover:bg-neon-cyan hover:text-black transition-colors shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                                                            Voir le code ↗
                                                        </a>
                                                    )}
                                                    {!current.codeUrl && current.status === "CLASSIFIÉ" && (
                                                        <span className="px-4 py-2 rounded-full border border-red-500/50 text-red-400 font-mono text-xs uppercase tracking-wider">
                                                            Code privé · démonstration sur demande
                                                        </span>
                                                    )}
                                                </div>
                                            );
                                        })()}

                                        {/* Mission Stats */}
                                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-10 border-t border-white/10">
                                            {Object.entries(projects.find(p => p.id === activeProject)?.stats || {}).map(([key, value], i) => (
                                                <motion.div
                                                    key={key}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                    className="bg-black/40 p-2 md:p-4 rounded-lg border border-white/5 hover:border-neon-cyan/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                                                >
                                                    <div className="text-lg md:text-3xl font-bold text-white group-hover:text-neon-cyan transition-colors">{value}</div>
                                                    <div className="text-[9px] md:text-xs text-gray-500 uppercase tracking-widest font-mono mt-1 group-hover:text-neon-cyan/70">{key}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Decorative Spinning Elements - "Blueprint Scanner" Aesthetic */}
                                    <div className="absolute -bottom-24 -right-24 w-96 h-96 pointer-events-none opacity-40">
                                        {/* Outer Gear */}
                                        <div className="absolute inset-0 border border-dashed border-neon-cyan/20 rounded-full animate-spin-slow" />

                                        {/* Middle Circuit Ring */}
                                        <div className="absolute inset-8 border border-dotted border-neon-purple/30 rounded-full animate-spin-reverse-slow" />

                                        {/* Inner Loading Arc */}
                                        <div className="absolute inset-16 border-t-2 border-l-2 border-neon-cyan/40 rounded-full animate-[spin_5s_linear_infinite]" />

                                        {/* Core Scanner Pulse */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-ping" />
                                            </div>
                                        </div>

                                        {/* Scanning Reticle */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent animate-[spin_8s_linear_infinite]" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[120%] bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent animate-[spin_12s_linear_infinite_reverse]" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentProjectsNew;
