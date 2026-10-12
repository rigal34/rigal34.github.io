"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { NeonButton } from "@components/ui/NeonButton";
import TerminalWindow from "@components/ui/TerminalWindow";
import GitHubStats from "@components/Home/GitHubStats";
import ParticleExplosion from "@components/ui/ParticleExplosion";
import type { GitHubData } from "@lib/github";
import { hero, identity, slogan } from "@data/profile";

const HackerHero = ({ github }: { github: GitHubData }) => {
    const [showContent, setShowContent] = useState(false);
    const [breachText, setBreachText] = useState("INITIALISATION DU SYSTÈME...");

    useEffect(() => {
        // Simulate "System Breach" loading sequence
        const sequence = hero.loading.map((text, i) => ({ text, delay: 450 * (i + 1) }));

        const timeouts: NodeJS.Timeout[] = [];

        sequence.forEach(({ text, delay }, index) => {
            const timeout = setTimeout(() => {
                setBreachText(text);
                if (index === sequence.length - 1) {
                    setTimeout(() => setShowContent(true), 450);
                }
            }, delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <section id="accueil" className="relative w-full min-h-screen container mx-auto px-4 pt-28 pb-8 flex flex-col">
            {/* Background Particles */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <ParticleExplosion />
            </div>

            <AnimatePresence>
                {!showContent && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center">
                            <div className="text-neon-cyan font-mono text-2xl md:text-4xl tracking-widest animate-pulse mb-4">
                                {breachText}
                            </div>
                            <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                                <motion.div
                                    className="h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.8, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showContent && (
                <div className="flex flex-col gap-16">
                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left z-20">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-xl md:text-2xl font-light text-neon-cyan tracking-[0.2em] mb-4 uppercase">
                                    {hero.kicker}
                                </h2>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    {identity.firstName} {identity.lastName}
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-2xl md:text-4xl font-semibold text-gray-300 mb-4 min-h-[60px] md:min-h-[90px] lg:min-h-[60px]"
                            >
                                <TypeAnimation
                                    sequence={hero.typing.flatMap((t) => [t, 1500])}
                                    wrapper="span"
                                    speed={60}
                                    repeat={Infinity}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]"
                                />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="max-w-xl mx-auto lg:mx-0 mb-8 text-base md:text-lg text-gray-400 leading-relaxed border-l-2 border-neon-purple/60 pl-4 text-left"
                            >
                                {slogan}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center w-full lg:w-auto"
                            >
                                <NeonButton
                                    variant="primary"
                                    onClick={() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Mes projets
                                </NeonButton>
                                <NeonButton
                                    variant="secondary"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Contact
                                </NeonButton>
                                <NeonButton
                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.3)] group relative overflow-hidden"
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = identity.cvFile;
                                        link.download = identity.cvDownloadName;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    <div className="flex items-center gap-2 relative z-10">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                        </svg>
                                        <span>Mon CV</span>
                                    </div>
                                    {/* Glitch Overlay */}
                                    <div className="absolute inset-0 bg-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                </NeonButton>
                            </motion.div>
                        </div>

                        {/* Right Content - Terminal */}
                        <motion.div
                            initial={{ opacity: 0, rotateX: 90 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex-1 w-full max-w-xl z-20 lg:mt-0 perspective-1000"
                        >
                            <TerminalWindow />
                        </motion.div>
                    </div>

                    {/* GitHub Stats Section */}
                    <GitHubStats data={github} />
                </div>
            )}
        </section>
    );
};

export default HackerHero;
