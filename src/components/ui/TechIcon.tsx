import React from "react";
import {
    SiPhp, SiJavascript, SiHtml5, SiCss3, SiMysql, SiPython, SiSymfony, SiDoctrine, SiPostman,
    SiSpring, SiReact, SiBootstrap, SiSass, SiTailwindcss, SiWordpress, SiFigma, SiSqlite, SiUml,
    SiGit, SiGithub, SiVercel, SiDocker, SiN8N, SiFastapi, SiMqtt,
} from "react-icons/si";
import { FaJava, FaBrain, FaFileExcel, FaShieldAlt, FaUsers } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

type IconDef = { Icon: React.ComponentType<{ className?: string }>; bg: string; color: string };

/*
 * Icônes dessinées sur place (aucun service extérieur) : une tuile arrondie,
 * dans le même style que skillicons.dev.
 * Pour ajouter une techno : une ligne ici, puis son nom dans src/data/profile.ts.
 */
const DARK = "#242938";
const ICONS: Record<string, IconDef> = {
    php: { Icon: SiPhp, bg: DARK, color: "#ffffff" },
    js: { Icon: SiJavascript, bg: "#f0db4f", color: "#323330" },
    html: { Icon: SiHtml5, bg: "#e44d26", color: "#ffffff" },
    css: { Icon: SiCss3, bg: "#1572b6", color: "#ffffff" },
    mysql: { Icon: SiMysql, bg: DARK, color: "#ffffff" },
    python: { Icon: SiPython, bg: DARK, color: "#ffd43b" },
    java: { Icon: FaJava, bg: DARK, color: "#f89820" },
    symfony: { Icon: SiSymfony, bg: DARK, color: "#ffffff" },
    doctrine: { Icon: SiDoctrine, bg: DARK, color: "#fc6a31" },
    twig: { Icon: SiSymfony, bg: DARK, color: "#bacf29" },
    postman: { Icon: SiPostman, bg: "#ff6c37", color: "#ffffff" },
    spring: { Icon: SiSpring, bg: DARK, color: "#6db33f" },
    react: { Icon: SiReact, bg: DARK, color: "#61dafb" },
    bootstrap: { Icon: SiBootstrap, bg: "#7952b3", color: "#ffffff" },
    sass: { Icon: SiSass, bg: "#cd6799", color: "#ffffff" },
    tailwind: { Icon: SiTailwindcss, bg: DARK, color: "#38bdf8" },
    wordpress: { Icon: SiWordpress, bg: "#21759b", color: "#ffffff" },
    figma: { Icon: SiFigma, bg: DARK, color: "#f24e1e" },
    sqlite: { Icon: SiSqlite, bg: "#0f80cc", color: "#ffffff" },
    uml: { Icon: SiUml, bg: DARK, color: "#fabd14" },
    git: { Icon: SiGit, bg: "#f05032", color: "#ffffff" },
    github: { Icon: SiGithub, bg: DARK, color: "#ffffff" },
    vscode: { Icon: VscVscode, bg: DARK, color: "#23a8f2" },
    vercel: { Icon: SiVercel, bg: DARK, color: "#ffffff" },
    docker: { Icon: SiDocker, bg: "#2496ed", color: "#ffffff" },
    n8n: { Icon: SiN8N, bg: "#ea4b71", color: "#ffffff" },
    fastapi: { Icon: SiFastapi, bg: "#009688", color: "#ffffff" },
    mqtt: { Icon: SiMqtt, bg: "#660066", color: "#ffffff" },
    ia: { Icon: FaBrain, bg: DARK, color: "#bc13fe" },
    excel: { Icon: FaFileExcel, bg: "#107c41", color: "#ffffff" },
    secu: { Icon: FaShieldAlt, bg: DARK, color: "#00f3ff" },
    scrum: { Icon: FaUsers, bg: DARK, color: "#22c55e" },
};

/* Remplit son parent (qui doit être en position relative et avoir une taille) */
export const TechIcon = ({ icon, alt, className = "" }: { icon: string; alt: string; className?: string }) => {
    const def = ICONS[icon] || { Icon: SiGithub, bg: DARK, color: "#ffffff" };
    const { Icon, bg, color } = def;
    return (
        <div
            className={`absolute inset-0 rounded-[22%] flex items-center justify-center ${className}`}
            style={{ background: bg, color }}
            aria-label={alt}
            role="img"
        >
            <Icon className="w-[62%] h-[62%]" />
        </div>
    );
};

/* Une rangée de tuiles, à la place d'une image skillicons.dev */
export const TechIconRow = ({ icons, size = 40 }: { icons: string[]; size?: number }) => (
    <div className="flex justify-center flex-wrap gap-3">
        {icons.map((icon) => (
            <div key={icon} className="relative" style={{ width: size, height: size }}>
                <TechIcon icon={icon} alt={icon} />
            </div>
        ))}
    </div>
);
