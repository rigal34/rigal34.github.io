"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { NeonButton } from "@components/ui/NeonButton";
import { featuredRepos, identity } from "@data/profile";

const packages = featuredRepos.map((r) => ({
    id: r.name,
    name: r.name,
    type: r.type,
    language: r.language,
    year: r.year,
    desc: r.desc,
    url: `https://github.com/${r.owner}/${r.name}`,
    clone: `git clone github.com/${r.owner}/${r.name}`,
}));

// Helper for 'decrypting' text effect
const DecryptText = ({ text, reveal = false }: { text: string, reveal: boolean }) => {
    const [display, setDisplay] = useState(text);
    // Characters to use for the scrambling effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        if (!reveal) {
            setDisplay(text);
            return;
        }

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 2; // Speed of reveal
        }, 30);

        return () => clearInterval(interval);
    }, [reveal, text]);

    return <span>{display}</span>;
}

const PackageRegistry = () => {
    const [hoveredPkg, setHoveredPkg] = useState<string | null>(null);

    return (
        <section id="depots" className="relative z-10 container mx-auto px-4 py-12 md:py-16">

            {/* Holographic Header */}
            <div className="flex flex-col items-center mb-12 md:mb-16 relative">
                <div className="relative group cursor-default">
                    <h2 className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity duration-500 text-center">
                        Registre <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">GitHub</span>
                    </h2>
                    <div className="absolute -inset-4 border border-neon-cyan/20 rounded-lg skew-x-12 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:skew-x-0 transition-all duration-700 pointer-events-none" />
                    <div className="absolute -inset-4 border border-neon-purple/20 rounded-lg -skew-x-12 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 group-hover:skew-x-0 transition-all duration-700 delay-100 pointer-events-none" />
                </div>

                <div className="mt-4 flex items-center gap-4 text-[10px] md:text-xs font-mono text-neon-cyan/70 tracking-[0.2em] md:tracking-[0.3em]">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neon-cyan rounded-full animate-pulse" />
                    <span>AUTRES_DÉPÔTS_EN_ACCÈS_LIBRE</span>
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neon-cyan rounded-full animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 relative z-10 perspective-2000">
                {packages.map((pkg, idx) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 50, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setHoveredPkg(pkg.id)}
                        onMouseLeave={() => setHoveredPkg(null)}
                        className="group relative"
                    >
                        {/* Neural Connection Lines (SVG) - Visual only */}
                        <div className="absolute -top-6 md:-top-10 left-1/2 w-0.5 h-6 md:h-10 bg-gradient-to-b from-transparent to-neon-cyan/20 -z-10 group-hover:h-8 md:group-hover:h-12 group-hover:-top-8 md:group-hover:-top-12 transition-all duration-300 pointer-events-none" />
                        <div className="absolute -top-8 md:-top-12 left-1/2 w-2 h-2 rounded-full bg-neon-cyan/0 group-hover:bg-neon-cyan/50 blur-sm transition-all duration-300 -translate-x-1/2 pointer-events-none" />

                        {/* Holographic Card Logic */}
                        <GlassCard className="h-auto md:h-full relative overflow-hidden bg-black/60 md:bg-black/40 border-neon-cyan/30 md:border-white/5 md:group-hover:border-neon-cyan/50 md:group-hover:bg-black/60 transition-all duration-500 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.1)] md:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:group-hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]">

                            {/* Animated Border Trace */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                <defs>
                                    <linearGradient id="gradient-border" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00f3ff" />
                                        <stop offset="100%" stopColor="#bc13fe" />
                                    </linearGradient>
                                </defs>
                                {/* Mobile: Always visible, fully drawn */}
                                <rect x="0" y="0" width="100%" height="100%" fill="none" rx="12" ry="12" stroke="url(#gradient-border)" strokeWidth="2" className="md:hidden" />
                                {/* Desktop: Animated on hover */}
                                <rect x="0" y="0" width="100%" height="100%" fill="none" rx="12" ry="12" stroke="url(#gradient-border)" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" className="hidden md:block">
                                    <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1s" begin="mouseenter" fill="freeze" />
                                </rect>
                            </svg>

                            <div className="p-5 md:p-8 h-auto md:h-full flex flex-col relative z-20">
                                {/* Header: Type & Version */}
                                <div className="flex justify-between items-start mb-4 md:mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[9px] text-neon-cyan font-mono tracking-widest uppercase mb-1 opacity-70">Type</span>
                                        <span className="text-[10px] md:text-xs text-white font-bold bg-white/10 px-2 py-1 rounded w-fit">{pkg.type}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[8px] md:text-[9px] text-neon-purple font-mono tracking-widest uppercase mb-1 opacity-70">Langage</span>
                                        <span className="text-[10px] md:text-xs text-neon-purple font-mono">{pkg.language}</span>
                                    </div>
                                </div>

                                {/* Package Identity */}
                                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white md:text-white md:group-hover:text-transparent md:group-hover:bg-clip-text md:group-hover:bg-gradient-to-r md:group-hover:from-neon-cyan md:group-hover:to-white transition-all duration-300">
                                    {pkg.name}
                                </h3>

                                {/* Description with Decrypt Effect on Hover */}
                                <div className="text-sm text-gray-400 leading-relaxed mb-6 md:mb-8 flex-grow h-auto md:h-20 overflow-hidden font-mono">
                                    <DecryptText text={pkg.desc} reveal={hoveredPkg === pkg.id} />
                                </div>

                                {/* Terminal Install Simulation */}
                                <div className="mt-auto relative overflow-hidden rounded bg-black/80 border border-white/10 p-3 mb-4 group-hover:border-neon-cyan/30 transition-colors hidden md:block">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    <div className="font-mono text-xs text-neon-cyan truncate">
                                        <span className="text-pink-500 mr-2">➜</span>
                                        <span className="text-gray-400">~</span>
                                        {hoveredPkg === pkg.id ? (
                                            <span className="animate-pulse"> {pkg.clone}_</span>
                                        ) : (
                                            <span className="opacity-50"> git clone ...</span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions & Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-neon-cyan/20 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[9px] uppercase text-gray-500 font-mono">Créé en</span>
                                        <span className="text-base md:text-lg font-bold text-white">{pkg.year}</span>
                                    </div>
                                    <a href={pkg.url} target="_blank" rel="noopener noreferrer">
                                        <NeonButton className="px-4 py-2 text-[10px] md:text-xs group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-shadow">
                                            Ouvrir le dépôt
                                        </NeonButton>
                                    </a>
                                </div>
                            </div>

                            {/* Background Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <a href={`${identity.githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-neon-cyan hover:text-white tracking-widest uppercase underline underline-offset-8 decoration-neon-cyan/40">
                    Voir tous mes dépôts sur GitHub ↗
                </a>
            </div>
        </section>
    );
};

export default PackageRegistry;
