"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { TechIconRow } from "@components/ui/TechIcon";
import type { GitHubData } from "@lib/github";
import { analyzedSkills, identity } from "@data/profile";

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

const LEVEL_CLASSES = [
    "bg-white/5 border border-white/5",
    "bg-neon-cyan/25",
    "bg-neon-cyan/50",
    "bg-neon-cyan/75",
    "bg-neon-cyan shadow-[0_0_6px_#00f3ff]",
];

function formatDate(iso: string) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
}

const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-[10px] text-neon-cyan font-mono tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
        {children}
    </div>
);

const Heatmap = ({ calendar }: { calendar: GitHubData["calendar"] }) => {
    if (!calendar.length) return null;
    // Colonnes = semaines (dimanche → samedi), comme sur GitHub
    const firstDay = new Date(calendar[0].date + "T00:00:00Z").getUTCDay();
    const cells: (GitHubData["calendar"][number] | null)[] = [...Array(firstDay).fill(null), ...calendar];
    const weeks: (GitHubData["calendar"][number] | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const monthLabels = weeks.map((week, i) => {
        const day = week.find((d) => d && d.date.endsWith("-01")) || (i === 0 ? week.find(Boolean) : null);
        if (!day) return "";
        return MONTHS[Number(day.date.slice(5, 7)) - 1];
    });

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[680px]">
                <div className="flex gap-[3px] mb-1">
                    {monthLabels.map((label, i) => (
                        <div key={i} className="flex-1 min-w-0 text-[9px] text-gray-500 font-mono whitespace-nowrap overflow-visible">
                            {label}
                        </div>
                    ))}
                </div>
                <div className="flex gap-[3px]">
                    {weeks.map((week, i) => (
                        <div key={i} className="flex-1 min-w-0 flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, j) => {
                                const day = week[j];
                                return (
                                    <div
                                        key={j}
                                        title={day ? `${formatDate(day.date)}${day.level ? " · actif" : ""}` : ""}
                                        className={`w-full aspect-square rounded-[2px] ${day ? LEVEL_CLASSES[Math.min(day.level, 4)] : "opacity-0"}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-end gap-1 mt-3 text-[9px] font-mono text-gray-500">
                    <span className="mr-1">MOINS</span>
                    {LEVEL_CLASSES.map((c, i) => (
                        <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${c}`} />
                    ))}
                    <span className="ml-1">PLUS</span>
                </div>
            </div>
        </div>
    );
};

const GitHubStats = ({ data }: { data: GitHubData }) => {
    const totalLang = data.languages.reduce((sum, l) => sum + l.count, 0) || 1;
    const stats = [
        { label: "Dépôts publics", value: data.publicRepos },
        { label: "Sur GitHub depuis", value: data.sinceYear },
        { label: "Contributions (12 mois)", value: data.contributionsLastYear },
        { label: "Contributions au total", value: data.contributionsTotal },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full mt-12 mb-12"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1" />
                <h3 className="text-base md:text-xl text-neon-cyan font-mono tracking-widest uppercase text-center">
                    Renseignements GitHub
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Statistiques */}
                <GlassCard className="col-span-1 md:col-span-2 lg:col-span-1 p-6 bg-black/40">
                    <CardTitle>Statistiques</CardTitle>
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-white/5 rounded p-3 border border-white/5">
                                <div className="text-2xl font-bold text-white">{s.value}</div>
                                <div className="text-[9px] uppercase text-gray-500 font-mono tracking-wider mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Langages */}
                <GlassCard className="col-span-1 p-6 bg-black/40">
                    <CardTitle>Langages des dépôts</CardTitle>
                    <div className="flex flex-col gap-3">
                        {data.languages.map((lang, i) => {
                            const pct = Math.round((lang.count / totalLang) * 100);
                            return (
                                <div key={lang.name}>
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span className="text-white">{lang.name}</span>
                                        <span className="text-neon-cyan">{pct} %</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${pct}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>

                {/* Dernière activité */}
                <GlassCard className="col-span-1 p-6 bg-black/40">
                    <CardTitle>Dernière activité</CardTitle>
                    <ul className="flex flex-col gap-3">
                        {data.recentRepos.map((repo) => (
                            <li key={repo.name}>
                                <a
                                    href={`${identity.githubUrl}/${repo.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-between items-center gap-3 p-3 rounded border border-white/5 bg-white/5 hover:border-neon-cyan/50 transition-colors group"
                                >
                                    <span className="text-sm text-white font-mono truncate group-hover:text-neon-cyan transition-colors">{repo.name}</span>
                                    <span className="text-[10px] text-neon-purple font-mono whitespace-nowrap">{formatDate(repo.pushedAt)}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </GlassCard>

                {/* Calendrier des contributions */}
                <GlassCard className="col-span-1 md:col-span-2 lg:col-span-3 p-6 bg-black/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <CardTitle>Journal d&apos;activité · 12 derniers mois</CardTitle>
                        <span className="text-[10px] font-mono text-gray-400 -mt-3 sm:mt-[-1rem]">
                            {data.activeDaysLastYear} jours actifs
                        </span>
                    </div>
                    <Heatmap calendar={data.calendar} />
                </GlassCard>
            </div>

            {/* Icônes des compétences */}
            <div className="mt-10">
                <p className="text-center text-gray-400 mb-4 font-mono text-xs uppercase tracking-[0.3em]">Compétences analysées</p>
                <TechIconRow icons={analyzedSkills.split(",")} />
            </div>
        </motion.div>
    );
};

export default GitHubStats;
