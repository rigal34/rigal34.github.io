"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { educations } from "@data/profile";
import { FaGraduationCap } from "react-icons/fa";

const AcademicLog = () => {
    return (
        <section id="formations" className="relative z-10 container mx-auto px-4 py-12 md:py-16">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none pb-20 overflow-hidden">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
            </div>

            <div className="flex flex-col items-center mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h4 className="text-neon-cyan font-mono tracking-[0.5em] text-xs mb-3 uppercase text-center border-b border-neon-cyan/30 pb-2 inline-block">
                        Acquisition de connaissances
                    </h4>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                    Protocole <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">académique</span>
                </h2>

                <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>BASE DE DONNÉES SYSTÈME : EN LIGNE</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto relative">
                {/* Central Data Spine (Desktop) */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent md:-translate-x-1/2 ml-8 md:ml-0 hidden md:block">
                    {/* Moving Data Packet */}
                    <motion.div
                        className="w-full h-24 bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-50 blur-sm"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                {/* Mobile Data Spine */}
                <div className="absolute left-3 sm:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent md:hidden" />

                <div className="space-y-12 md:space-y-16 relative">
                    {educations.map((edu, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row gap-8 relative items-center ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>

                            {/* Central Node Connection */}
                            <div className="absolute left-3 sm:left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center">
                                <div className="w-3 h-3 bg-deep-bg rounded-full border-2 border-neon-cyan shadow-[0_0_10px_#00f3ff] relative z-20">
                                    <div className="absolute inset-0 bg-neon-cyan animate-ping opacity-75 rounded-full" />
                                </div>
                                {/* Horizontal Connector Line */}
                                <div className={`absolute top-1/2 h-[2px] bg-neon-cyan/30 w-4 sm:w-8 md:w-16 -z-10 ${idx % 2 !== 0 ? "right-1/2 origin-right" : "left-1/2 origin-left"}`} />
                            </div>

                            {/* Content Card Side */}
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex-1 w-full pl-10 sm:pl-16 md:pl-0"
                            >
                                <GlassCard className="relative p-1 overflow-hidden group border-neon-cyan/20 bg-deep-bg/80">
                                    {/* Animated Border Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" />

                                    <div className="relative bg-[#0a0a0a] p-4 md:p-8 rounded-xl h-full flex flex-col justify-between z-10">
                                        {/* Header area */}
                                        <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-start">
                                            <div className="max-w-[80%]">
                                                <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors leading-tight">{edu.degree}</h3>
                                                <p className="text-neon-purple font-mono text-xs md:text-sm mt-1 leading-tight">{edu.program}</p>
                                            </div>
                                            <div className="text-2xl md:text-4xl text-neon-cyan opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#00f3ff] transition-all duration-300">
                                                <FaGraduationCap />
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                                            <div>
                                                <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-mono tracking-widest block mb-1">Chronologie</span>
                                                <span className="text-xs md:text-sm text-gray-300 font-bold">{edu.date}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] md:text-[10px] uppercase text-gray-500 font-mono tracking-widest block mb-1">Lieu</span>
                                                <span className="text-xs md:text-sm text-gray-300 font-bold">{edu.location}</span>
                                            </div>
                                        </div>

                                        {/* Grade / Download Bar */}
                                        <div className="mt-auto">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[8px] md:text-[10px] text-neon-cyan font-mono">{edu.done ? "INSTALLATION_TERMINÉE" : "INSTALLATION_EN_COURS"}</span>
                                                <span className="text-xs md:text-sm font-bold text-white">{edu.grade}</span>
                                            </div>
                                            <div className="h-1 md:h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: edu.done ? "100%" : "55%" }}
                                                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                                />
                                            </div>
                                        </div>

                                        {/* Decorative Corner Accents */}
                                        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neon-cyan/50" />
                                        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neon-cyan/50" />
                                    </div>
                                </GlassCard>
                            </motion.div>

                            {/* Empty space/Date Marker Side */}
                            <div className="hidden md:flex flex-1 justify-center items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="px-4 py-2 bg-black/50 border border-white/10 rounded-full backdrop-blur-sm"
                                >
                                    <span className="text-xs font-mono text-gray-400">ENTRÉE_JOURNAL : {edu.date}</span>
                                </motion.div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicLog;
