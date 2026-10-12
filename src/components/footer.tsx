"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { identity } from '@data/profile';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: identity.githubUrl, label: "GitHub" },
    ...(identity.linkedinUrl ? [{ icon: <FaLinkedin />, url: identity.linkedinUrl, label: "LinkedIn" }] : []),
    { icon: <FaEnvelope />, url: `mailto:${identity.email}`, label: "E-mail" },
  ];

  return (
    <footer className="relative border-t-3 border-neon-cyan/20 bg-black/80 backdrop-blur-md">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

          {/* Left: System Status */}
          <div className="flex flex-col items-center md:items-start order-2 md:order-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-neon-cyan/80 tracking-widest uppercase">
                Statut du système : en ligne
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">
              © {currentYear} {identity.firstName} {identity.lastName}. Tous protocoles sécurisés.
            </p>
          </div>

          {/* Center: Reboot Button */}
          <div className="order-1 md:order-2">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-2 bg-black/50 border border-neon-cyan/30 rounded-full overflow-hidden hover:border-neon-cyan/80 transition-colors"
            >
              <span className="relative z-10 text-xs font-bold text-neon-cyan font-mono tracking-widest uppercase group-hover:text-white transition-colors">
                Redémarrer le système
              </span>
              <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4 order-3">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors text-xl transform hover:scale-110 duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
