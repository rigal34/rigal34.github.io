"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
    variant = "primary",
    className,
    children,
    ...props
}) => {
    const baseStyles =
        "relative px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group";

    const variants = {
        primary: "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.3)]",
        secondary: "bg-transparent border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_#bc13fe] shadow-[0_0_10px_rgba(188,19,254,0.3)]",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 z-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
    );
};
