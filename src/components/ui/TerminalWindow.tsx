"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { terminalCommands as commands, terminalTitle } from "@data/profile";

const TerminalWindow = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");

    // Use refs to maintain state across re-renders without triggering them
    const commandIndexRef = useRef(0);
    const charIndexRef = useRef(0);


    const isTypingRef = useRef(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const runTerminal = () => {
            const currentCommandObj = commands[commandIndexRef.current];
            const fullCommand = currentCommandObj.cmd;

            if (isTypingRef.current) {
                if (charIndexRef.current <= fullCommand.length) {
                    setCurrentLine(fullCommand.slice(0, charIndexRef.current));
                    charIndexRef.current++;
                    timeoutId = setTimeout(runTerminal, 50 + Math.random() * 50); // Random typing speed
                } else {
                    isTypingRef.current = false;
                    timeoutId = setTimeout(runTerminal, 500); // Pause before output
                }
            } else {
                // Show output and reset for next command
                setLines((prev) => {
                    const newLines = [
                        ...prev,
                        `$ ${fullCommand}`,
                        ...(currentCommandObj.output ? [currentCommandObj.output] : [])
                    ];
                    return newLines.slice(-8); // Keep last 8 lines
                });

                setCurrentLine("");
                charIndexRef.current = 0;
                isTypingRef.current = true;
                commandIndexRef.current = (commandIndexRef.current + 1) % commands.length;

                timeoutId = setTimeout(runTerminal, 1500); // Longer pause between commands
            }
        };

        timeoutId = setTimeout(runTerminal, 1000);

        return () => clearTimeout(timeoutId);
    }, []); // Run once on mount

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-lg mx-auto bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,243,255,0.15)] font-mono text-sm md:text-base text-left"
        >
            {/* Header */}
            <div className="bg-white/5 p-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-gray-500 text-xs tracking-widest uppercase">{terminalTitle}</div>
                <div className="w-8" />
            </div>

            {/* Content */}
            <div className="p-6 h-[320px] overflow-hidden flex flex-col justify-end relative">
                {/* Matrix-like background effect (subtle) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]" />

                <div className="relative z-10 font-mono leading-relaxed">
                    {lines.map((line, i) => (
                        <div key={i} className={clsx("mb-2 whitespace-pre-wrap break-words", line.startsWith("$") ? "text-neon-cyan/90 font-bold" : "text-gray-400")}>
                            {line}
                        </div>
                    ))}
                    <div className="text-neon-cyan flex items-center mt-2">
                        <span className="mr-2 text-neon-purple">$</span>
                        <span>{currentLine}</span>
                        <span className="animate-pulse ml-2 inline-block w-2 h-4 bg-neon-cyan" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TerminalWindow;
