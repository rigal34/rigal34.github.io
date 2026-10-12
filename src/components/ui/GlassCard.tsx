"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className,
    hoverEffect = true,
}) => {
    return (
        <motion.div
            className={twMerge(
                clsx(
                    "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md",
                    "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
                    className
                )
            )}
            whileHover={
                hoverEffect
                    ? {
                        scale: 1.02,
                        borderColor: "rgba(0, 243, 255, 0.5)",
                        boxShadow: "0 0 20px rgba(0, 243, 255, 0.2)",
                    }
                    : {}
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            <div className="relative z-10 w-full h-full">{children}</div>
        </motion.div>
    );
};
