"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { GlassCard } from "@components/ui/GlassCard";
import { contact, identity } from "@data/profile";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

import * as THREE from "three";

// --- 3D Components ---

function ParticleGlobe(props: React.ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.2 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 10;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function OrbitingSatellite({ radius, speed, color, offset = 0 }: { radius: number, speed: number, color: string, offset?: number }) {
    const ref = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (ref.current) {
            const t = clock.getElapsedTime() * speed + offset;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            // ref.current.position.y = Math.sin(t * 0.5) * 0.2; // slight bob
            ref.current.lookAt(0, 0, 0); // Always face center (or camera if we changed it)
        }
    });

    return (
        <group ref={ref}>
            <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                {/* Satellite Core */}
                <mesh>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
                {/* Label (using simple mesh for now, could be HTML but keeping it 3D-ish for perf/style) */}
                {/* Actually, let's just make it a glowy point */}
                <pointLight distance={1} intensity={2} color={color} />
            </Float>
        </group>
    );
}

const SocialLink = ({ name, icon, url, color, detail }: { name: string, icon: React.ReactNode, url: string, color: string, detail: string }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-black/40 hover:bg-white/5 hover:border-neon-cyan/50 transition-all duration-300 group">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${color}/10 text-${color} group-hover:bg-${color}/20 transition-colors`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">{name}</span>
            <span className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">{detail} &rarr;</span>
        </div>
    </a>
);

const ConnectSection = () => {
    return (
        <section id="contact" className="relative z-10 container mx-auto px-4 py-12 md:py-16 min-h-[600px] flex items-center">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center relative">

                {/* LEFT: 3D Scene Container */}
                <div className="hidden lg:block lg:h-[600px] w-full relative order-2 lg:order-1 perspective-1000">
                    <div className="absolute inset-0 bg-gradient-radial from-neon-purple/20 to-transparent opacity-30 blur-3xl" />

                    <Canvas camera={{ position: [0, 0, 3], fov: 60 }} className="w-full h-full">
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                        <ParticleGlobe />

                        {/* Satellites */}
                        <OrbitingSatellite radius={1.6} speed={0.5} color="#00f3ff" offset={0} />
                        <OrbitingSatellite radius={2.0} speed={0.3} color="#bc13fe" offset={2} />
                        <OrbitingSatellite radius={1.8} speed={0.4} color="#00ff9d" offset={4} />

                        {/* Connection Lines (Visual) */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[1.6, 1.61, 64]} />
                            <meshBasicMaterial color="#00f3ff" opacity={0.1} transparent side={THREE.DoubleSide} />
                        </mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[2.0, 2.01, 64]} />
                            <meshBasicMaterial color="#bc13fe" opacity={0.1} transparent side={THREE.DoubleSide} />
                        </mesh>
                    </Canvas>

                    {/* Overlay Label for 3D Scene */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-mono tracking-[0.5em] uppercase text-center opacity-70">
                        Relais_réseau_mondial <br />
                        <span className="text-neon-cyan animate-pulse">EN LIGNE</span>
                    </div>
                </div>

                {/* RIGHT: HUD Interface */}
                <div className="order-1 lg:order-2 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-black/70 border-neon-cyan/30">
                            {/* HUD Corners */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-cyan" />

                            <h4 className="text-neon-purple font-mono tracking-widest text-xs mb-4 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-purple rounded-full animate-ping" />
                                {contact.kicker}
                            </h4>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase leading-none">
                                {contact.titleTop} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">{contact.titleBottom}</span>
                            </h2>

                            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light">
                                {contact.text}
                            </p>

                            <div className="flex flex-col gap-4">
                                <SocialLink name="E-mail direct" icon={<FaEnvelope />} url={`mailto:${identity.email}`} color="neon-cyan" detail={identity.email} />
                                {identity.linkedinUrl && (
                                    <SocialLink name="Signal LinkedIn" icon={<FaLinkedin />} url={identity.linkedinUrl} color="neon-purple" detail="Voir mon profil" />
                                )}
                                <SocialLink name="Dépôt de code" icon={<FaGithub />} url={identity.githubUrl} color="white" detail={identity.githubUrl.replace("https://", "")} />

                                <div
                                    className="flex items-center gap-3 p-3 rounded-lg border border-green-500/30 bg-black/40 hover:bg-green-500/10 hover:border-green-500/80 transition-all duration-300 group cursor-pointer mt-2 w-full"
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = identity.cvFile;
                                        link.download = identity.cvDownloadName;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 font-mono tracking-widest uppercase group-hover:text-green-400/80 transition-colors">Dossier professionnel</span>
                                        <span className="text-sm font-bold text-white group-hover:text-green-500 transition-colors">TÉLÉCHARGER MON CV &darr;</span>
                                    </div>
                                </div>

                                {/* Decorative Scanline */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent animate-scan-fast opacity-50 pointer-events-none" />
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default ConnectSection;
