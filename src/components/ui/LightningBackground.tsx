"use client";

import React, { useEffect, useRef } from "react";

/*
 * Éclairs en arrière-plan, uniquement dans une bande de la page :
 * - elle commence SOUS les éléments listés dans `startBelow` (la roue et la carte EPSI),
 * - elle s'arrête au bas de l'élément `endAt` (le titre « Protocole académique »).
 * Au-dessus et en dessous, aucun éclair.
 *
 * Tant que la roue ou la carte EPSI est visible à l'écran, aucun éclair n'est lancé.
 * Pour ne rien ralentir : chaque éclair est dessiné UNE SEULE FOIS dans une image en mémoire
 * (halo sans ombre portée), puis on ne fait que l'afficher plus ou moins fort à chaque image.
 * Rien ne tourne quand la zone n'est pas à l'écran, ni si le visiteur a demandé moins d'animations.
 */

type Point = { x: number; y: number };
type Bolt = { main: Point[]; branches: { pts: Point[]; strength: number }[]; mid: Point };

type Props = {
    startBelow: string[];
    endAt: string;
};

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
    const y1 = h * (0.1 + Math.random() * 0.8);
    const clampY = (y: number) => Math.max(h * 0.05, Math.min(h * 0.95, y));
    let a: Point;
    let b: Point;
    if (kind < 0.4) {
        // depuis le bord gauche, vers le vide de gauche
        a = { x: -10, y: y1 };
        b = { x: w * (0.22 + Math.random() * 0.25), y: clampY(y1 + (Math.random() - 0.5) * h * 0.5) };
    } else if (kind < 0.8) {
        // depuis le bord droit
        a = { x: w + 10, y: y1 };
        b = { x: w * (0.53 + Math.random() * 0.25), y: clampY(y1 + (Math.random() - 0.5) * h * 0.5) };
    } else {
        // d'un bord à l'autre
        a = { x: -10, y: y1 };
        b = { x: w + 10, y: h * (0.1 + Math.random() * 0.8) };
    }
    const span = Math.hypot(b.x - a.x, b.y - a.y);
    const main = fractalPath(a, b, 0.22, Math.max(2, span / 260));

    const branches: Bolt["branches"] = [];
    const count = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
        const start = main[Math.floor(main.length * (0.15 + Math.random() * 0.7))];
        const angle = Math.atan2(b.y - a.y, b.x - a.x) + (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.6);
        const bl = (span || 1) * (0.08 + Math.random() * 0.18);
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

// Dessine l'éclair une fois, à pleine intensité, dans une image en mémoire.
// Le halo est tracé sur une petite image (1/4 de la taille) puis agrandi : l'agrandissement
// le rend flou et doux, sans le calcul coûteux d'une ombre portée.
function renderBolt(bolt: Bolt, w: number, h: number, dpr: number, scale: number): HTMLCanvasElement {
    const off = document.createElement("canvas");
    off.width = Math.round(w * dpr);
    off.height = Math.round(h * dpr);
    const ctx = off.getContext("2d");
    if (!ctx) return off;

    const q = 0.25;
    const glow = document.createElement("canvas");
    glow.width = Math.max(1, Math.round(w * q));
    glow.height = Math.max(1, Math.round(h * q));
    const g = glow.getContext("2d");
    const chunks = 4;
    const size = Math.ceil(bolt.main.length / chunks);
    const trace = (c: CanvasRenderingContext2D, width: number, rgb: string, alpha: number) => {
        for (let k = 0; k < chunks; k++) {
            const part = bolt.main.slice(k * size, (k + 1) * size + 1);
            if (part.length < 2) continue;
            c.strokeStyle = `rgba(${rgb}, ${alpha})`;
            c.lineWidth = width * (1 - 0.15 * k); // le tronc s'affine en s'éloignant du bord
            strokePath(c, part);
        }
        for (const br of bolt.branches) {
            c.strokeStyle = `rgba(${rgb}, ${alpha * br.strength})`;
            c.lineWidth = width * 0.55;
            strokePath(c, br.pts);
        }
    };
    if (g) {
        g.setTransform(q, 0, 0, q, 0, 0);
        g.globalCompositeOperation = "lighter";
        g.lineJoin = "round";
        g.lineCap = "round";
        trace(g, 34 * scale, "0, 200, 255", 0.16);
        trace(g, 16 * scale, "170, 110, 255", 0.28);
        trace(g, 7 * scale, "190, 225, 255", 0.5);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // léger éclat qui éclaire le fond autour de l'éclair
    const r = w * 0.45;
    const rad = ctx.createRadialGradient(bolt.mid.x, bolt.mid.y, 0, bolt.mid.x, bolt.mid.y, r);
    rad.addColorStop(0, "rgba(140, 190, 255, 0.10)");
    rad.addColorStop(1, "rgba(140, 190, 255, 0)");
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);

    // halo flou (petite image agrandie), puis cœur net
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(glow, 0, 0, w, h);
    trace(ctx, 2.4 * scale, "200, 230, 255", 0.7);
    trace(ctx, 1.1 * scale, "255, 255, 255", 1);

    // fondu en haut et en bas de la zone, pour qu'on n'en voie pas les bords
    const fade = Math.min(90, h * 0.2);
    const mask = ctx.createLinearGradient(0, 0, 0, h);
    mask.addColorStop(0, "rgba(0, 0, 0, 0)");
    mask.addColorStop(fade / h, "rgba(0, 0, 0, 1)");
    mask.addColorStop(1 - fade / h, "rgba(0, 0, 0, 1)");
    mask.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, w, h);
    return off;
}

// Intensité au fil du temps : coup de foudre, petit retour, second coup, puis extinction
function intensity(t: number): number {
    if (t < 0) return 0;
    if (t < 70) return 1;
    if (t < 110) return 0.25;
    if (t < 170) return 0.95;
    if (t < 200) return 0.4;
    if (t < 240) return 0.8;
    return Math.max(0, 0.8 * Math.exp(-(t - 240) / 120));
}

export const LightningBackground = ({ startBelow, endAt }: Props) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const startKey = startBelow.join("|");

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const startSelectors = startKey.split("|");
        let visible = false;
        let raf = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;

        // La bande autorisée, en pixels depuis le haut du calque
        const band = () => {
            const wrapTop = wrap.getBoundingClientRect().top;
            let top = 0;
            for (const sel of startSelectors) {
                const el = document.querySelector(sel);
                if (el) top = Math.max(top, el.getBoundingClientRect().bottom - wrapTop + 24);
            }
            const end = document.querySelector(endAt);
            const bottom = end ? end.getBoundingClientRect().bottom - wrapTop + 24 : wrap.clientHeight;
            return { top, bottom, wrapTop };
        };

        const schedule = (delay?: number) => {
            clearTimeout(timer);
            timer = setTimeout(strike, delay ?? 2000 + Math.random() * 4500);
        };

        // vrai si un des éléments du haut (la roue, la carte EPSI) est visible à l'écran
        const topPartOnScreen = () =>
            startSelectors.some((sel) => {
                const el = document.querySelector(sel);
                if (!el) return false;
                const r = el.getBoundingClientRect();
                // partie réellement visible sous le menu fixe (64 px)
                const seen = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 64);
                return seen > 80;
            });

        function strike() {
            if (!visible || document.hidden || !canvas || !ctx || !wrap) return schedule();
            if (topPartOnScreen()) return schedule(1500);
            const { top, bottom, wrapTop } = band();
            // partie de la bande actuellement visible à l'écran
            const visTop = Math.max(top, -wrapTop);
            const visBottom = Math.min(bottom, -wrapTop + window.innerHeight);
            const h = visBottom - visTop;
            if (h < 120) return schedule(1200);

            const width = wrap.clientWidth;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const cw = Math.round(width * dpr);
            const ch = Math.round(h * dpr);
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw;
                canvas.height = ch;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${h}px`;
            }
            canvas.style.top = `${visTop}px`;

            const scale = Math.max(0.7, Math.min(1.4, width / 1280));
            const img = renderBolt(makeBolt(width, h), width, h, dpr, scale);
            // parfois, un deuxième éclair suit de près le premier
            const twin = Math.random() < 0.25 ? renderBolt(makeBolt(width, h), width, h, dpr, scale) : null;
            const start = performance.now();
            const c2d = ctx;

            const frame = (now: number) => {
                const t = now - start;
                c2d.clearRect(0, 0, cw, ch);
                c2d.globalAlpha = intensity(t);
                c2d.drawImage(img, 0, 0);
                if (twin) {
                    c2d.globalAlpha = intensity(t - 160);
                    c2d.drawImage(twin, 0, 0);
                }
                c2d.globalAlpha = 1;
                if (t < 900) {
                    raf = requestAnimationFrame(frame);
                } else {
                    c2d.clearRect(0, 0, cw, ch);
                    schedule();
                }
            };
            raf = requestAnimationFrame(frame);
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = visible;
                visible = entry.isIntersecting;
                if (visible && !wasVisible) schedule(900);
            },
            { threshold: 0 }
        );
        io.observe(wrap);

        return () => {
            io.disconnect();
            clearTimeout(timer);
            cancelAnimationFrame(raf);
        };
    }, [startKey, endAt]);

    return (
        <div ref={wrapRef} className="absolute inset-y-0 left-0 right-0 md:-left-8 md:-right-8 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute left-0 top-0 block" />
        </div>
    );
};
