"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { accreditations } from "@data/profile";
import { FaGraduationCap, FaRocket, FaHandshake, FaIdCard, FaLock } from "react-icons/fa";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    diplome: FaGraduationCap,
    fusee: FaRocket,
    alternance: FaHandshake,
    permis: FaIdCard,
};
const CertIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = ICONS[name] || FaGraduationCap;
    return <Icon className={className} />;
};

const certs = accreditations;

const SecurityClearance = () => {
    return (
        <section id="accreditations" className="relative z-10 container mx-auto px-4 py-16">
            {/* Section Header */}
            <div className="flex flex-col items-center mb-12 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-16 h-16 border-2 border-neon-cyan rounded-full flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-2 border border-neon-purple rounded-full animate-spin-slow" />
                        <FaLock className="text-2xl text-neon-cyan animate-pulse" />
                    </div>
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-bold text-white text-center uppercase tracking-tighter mb-2">
                    Niveaux <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">d&apos;accès</span>
                </h2>

                <div className="flex items-center gap-2 text-[10px] font-mono text-neon-cyan/70 tracking-[0.3em] uppercase border border-neon-cyan/20 px-3 py-1 rounded bg-black/40 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>Accréditations vérifiées</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {certs.map((cert, idx) => (
                    <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <GlassCard className="h-full relative overflow-hidden bg-black/40 border-l-2 border-l-neon-cyan group-hover:bg-black/60 transition-all duration-500">

                            {/* Holographic Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl pointer-events-none opacity-[0.03] grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.05]">
                                <CertIcon name={cert.icon} className="text-white" />
                            </div>

                            {/* Scanning Laser Effect */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/50 shadow-[0_0_10px_#00f3ff] -translate-y-10 group-hover:translate-y-[200px] transition-transform duration-[1.5s] ease-linear pointer-events-none opacity-0 group-hover:opacity-100" />

                            <div className="p-6 relative z-10 flex flex-col h-full">
                                {/* Badge Header */}
                                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">Accréditation</span>
                                        <span className="text-[10px] text-neon-cyan font-bold font-mono">{cert.level}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                        <CertIcon name={cert.icon} className="text-sm text-neon-cyan" />
                                    </div>
                                </div>

                                {/* Cert Details */}
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors leading-tight">
                                    {cert.title}
                                </h3>
                                <p className="text-xs text-neon-purple font-mono mb-6">{cert.issuer}</p>

                                {/* Badge Footer */}
                                <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-600 font-mono">RÉF.</span>
                                        <span className="text-[10px] text-gray-400 font-mono font-bold tracking-wider group-hover:text-white transition-colors">{cert.ref}</span>
                                    </div>

                                    <div className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 whitespace-nowrap ${cert.status === "EN COURS" ? "bg-neon-purple/10 text-neon-purple border border-neon-purple/30" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}>
                                        <span className={`w-1 h-1 rounded-full animate-pulse ${cert.status === "EN COURS" ? "bg-neon-purple" : "bg-green-500"}`} />
                                        {cert.status}
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10 group-hover:border-neon-cyan/50 transition-colors" />
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SecurityClearance;
