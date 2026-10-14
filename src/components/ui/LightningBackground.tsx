"use client";

import React, { useEffect, useRef } from "react";

/*
 * Éclairs en arrière-plan (derrière les parties Parcours et Formations).
 * De temps en temps, un éclair part du bord gauche, du bord droit,
 * ou traverse tout l'écran d'un bord à l'autre.
 * - Forme : trait brisé calculé au hasard (subdivisions successives) + ramifications.
 * - Rendu : halo large, halo moyen, cœur blanc, et un léger éclat qui éclaire le fond.
 * - Il tourne seulement quand la partie est visible, et pas du tout si le visiteur
 *   a demandé moins d'animations dans son système.
 */

type Point = { x: number; y: number };
type Bolt = { main: Point[]; branches: { pts: Point[]; strength: number }[]; mid: Point };

// Trait brisé entre a et b : on coupe chaque segment en deux et on décale le milieu
function fractalPath(a: Point, b: Point, roughness: number, detail: number): Point[] {
    let pts: Point[] = [a, b];
    let offset = Math.hypot(b.x - a.x, b.y - a.y) * roughness;
    while (offset > detail) {
        const next: Point[] = [pts[0]];
        for (let i = 0; i < pts.length - 1; i++) {
            const p = pts[i];
            const q = pts[i + 1];
            const dx = q.x - p.x;
            const dy = q.y - p.y;
            const len = Math.hypot(dx, dy) || 1;
            // décalage perpendiculaire au segment
            const nx = -dy / len;
            const ny = dx / len;
            const shift = (Math.random() - 0.5) * offset;
            next.push({ x: (p.x + q.x) / 2 + nx * shift, y: (p.y + q.y) / 2 + ny * shift }, q);
        }
        pts = next;
        offset /= 2;
    }
    return pts;
}

function makeBolt(w: number, h: number): Bolt {
    const kind = Math.random();
    const y1 = h * (0.08 + Math.random() * 0.84);
    let a: Point;
    let b: Point;
    if (kind < 0.4) {
        // depuis le bord gauche, vers le vide de gauche
        a = { x: -10, y: y1 };
        b = { x: w * (0.22 + Math.random() * 0.25), y: y1 + (Math.random() - 0.5) * h * 0.35 };
    } else if (kind < 0.8) {
        // depuis le bord droit
        a = { x: w + 10, y: y1 };
        b = { x: w * (0.53 + Math.random() * 0.25), y: y1 + (Math.random() - 0.5) * h * 0.35 };
    } else {
        // d'un bord à l'autre
        a = { x: -10, y: y1 };
        b = { x: w + 10, y: h * (0.08 + Math.random() * 0.84) };
    }
    const span = Math.hypot(b.x - a.x, b.y - a.y);
    const main = fractalPath(a, b, 0.22, Math.max(2, span / 260));

    // ramifications qui partent du tronc
    const branches: Bolt["branches"] = [];
    const count = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
        const start = main[Math.floor(main.length * (0.15 + Math.random() * 0.7))];
        const dirX = b.x - a.x;
        const dirY = b.y - a.y;
        const len = Math.hypot(dirX, dirY) || 1;
        const angle = Math.atan2(dirY, dirX) + (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.6);
        const bl = len * (0.08 + Math.random() * 0.18);
        const end = { x: start.x + Math.cos(angle) * bl, y: start.y + Math.sin(angle) * bl };
        branches.push({ pts: fractalPath(start, end, 0.28, Math.max(1.5, bl / 120)), strength: 0.35 + Math.random() * 0.35 });
    }
    return { main, branches, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
}

function strokePath(ctx: CanvasRenderingContext2D, pts: Point[]) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
}

function drawBolt(ctx: CanvasRenderingContext2D, bolt: Bolt, alpha: number, scale: number, w: number) {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // léger éclat qui éclaire le fond autour de l'éclair
    const r = w * 0.45;
    const g = ctx.createRadialGradient(bolt.mid.x, bolt.mid.y, 0, bolt.mid.x, bolt.mid.y, r);
    g.addColorStop(0, `rgba(140, 190, 255, ${0.10 * alpha})`);
    g.addColorStop(1, "rgba(140, 190, 255, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(bolt.mid.x - r, bolt.mid.y - r, r * 2, r * 2);

    const layers = [
        { width: 14, color: `rgba(90, 160, 255, ${0.10 * alpha})`, blur: 28, shadow: "rgba(0, 243, 255, 0.9)" },
        { width: 6, color: `rgba(170, 120, 255, ${0.22 * alpha})`, blur: 16, shadow: "rgba(188, 19, 254, 0.9)" },
        { width: 2.6, color: `rgba(200, 230, 255, ${0.65 * alpha})`, blur: 8, shadow: "rgba(150, 220, 255, 1)" },
        { width: 1.1, color: `rgba(255, 255, 255, ${alpha})`, blur: 0, shadow: "transparent" },
    ];
    // le tronc s'affine en s'éloignant du bord d'où part l'éclair
    const chunks = 4;
    const size = Math.ceil(bolt.main.length / chunks);
    for (const l of layers) {
        ctx.strokeStyle = l.color;
        ctx.shadowBlur = l.blur * scale;
        ctx.shadowColor = l.shadow;
        for (let k = 0; k < chunks; k++) {
            const part = bolt.main.slice(k * size, (k + 1) * size + 1);
            if (part.length < 2) continue;
            ctx.lineWidth = l.width * scale * (1 - 0.15 * k);
            strokePath(ctx, part);
        }
    }
    for (const br of bolt.branches) {
        for (const l of layers) {
            ctx.lineWidth = l.width * scale * 0.55;
            ctx.strokeStyle = l.color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * br.strength})`);
            ctx.shadowBlur = l.blur * scale * 0.6;
            ctx.shadowColor = l.shadow;
            strokePath(ctx, br.pts);
        }
    }
    ctx.restore();
}

// Intensité au fil du temps : coup de foudre, petit retour, second coup, puis extinction
function intensity(t: number): number {
    if (t < 70) return 1;
    if (t < 110) return 0.25;
    if (t < 170) return 0.95;
    if (t < 200) return 0.4;
    if (t < 240) return 0.8;
    return Math.max(0, 0.8 * Math.exp(-(t - 240) / 120));
}

export const LightningBackground = () => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let visible = false;
        let raf = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;

        // La toile ne fait que la taille de l'écran : on la place sur la partie visible
        const fitCanvas = (top: number, h: number) => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            const cw = Math.round(width * dpr);
            const ch = Math.round(h * dpr);
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw;
                canvas.height = ch;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${h}px`;
            }
            canvas.style.top = `${top}px`;
        };
        const measure = () => {
            width = wrap.clientWidth;
            height = wrap.clientHeight;
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(wrap);

        const strike = () => {
            if (!visible || document.hidden) return schedule();
            const rect = wrap.getBoundingClientRect();
            const top = Math.max(0, -rect.top);
            const viewH = Math.min(height - top, window.innerHeight);
            if (viewH < 80) return schedule();
            fitCanvas(top, viewH);
            const bolt = makeBolt(width, viewH);
            const scale = Math.max(0.7, Math.min(1.4, width / 1280));
            const start = performance.now();
            // parfois, un deuxième éclair suit de près le premier
            const twin = Math.random() < 0.25 ? makeBolt(width, viewH) : null;

            const frame = (now: number) => {
                const t = now - start;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, width, viewH);
                drawBolt(ctx, bolt, intensity(t), scale, width);
                if (twin) drawBolt(ctx, twin, intensity(t - 160), scale, width);
                if (t < 900) {
                    raf = requestAnimationFrame(frame);
                } else {
                    ctx.clearRect(0, 0, width, viewH);
                    schedule();
                }
            };
            raf = requestAnimationFrame(frame);
        };

        const schedule = (delay?: number) => {
            clearTimeout(timer);
            timer = setTimeout(strike, delay ?? 2000 + Math.random() * 4500);
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = visible;
                visible = entry.isIntersecting;
                if (visible && !wasVisible) schedule(900);
            },
            { threshold: 0.05 }
        );
        io.observe(wrap);

        return () => {
            io.disconnect();
            ro.disconnect();
            clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={wrapRef} className="absolute inset-y-0 left-0 right-0 md:-left-8 md:-right-8 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute left-0 top-0 block" />
        </div>
    );
};
