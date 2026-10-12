"use client";

import React from "react";

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Radial Gradient Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 animate-glow-pulse" />

            {/* Moving Particles (Simulated with simple CSS divs or SVG) */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-neon-cyan rounded-full animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-neon-purple rounded-full animate-ping delay-700" />
        </div>
    );
};
