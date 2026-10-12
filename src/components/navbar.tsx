"use client";

import React, { JSX, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navlinks } from "@utils/constants";
import { identity } from "@data/profile";

/*
 * Menu fixé en haut de l'écran.
 * Chaque lien fait descendre directement à sa partie de la page,
 * et le lien de la partie visible s'allume (effet fil d'Ariane).
 */
const Navbar = (): JSX.Element => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Allume le lien de la partie qui occupe le milieu de l'écran
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const watch = () =>
      navlinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      });
    watch();
    // Les parties apparaissent après l'écran de chargement : on réessaie un peu plus tard
    const retry = setTimeout(watch, 2500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearTimeout(retry);
    };
  }, []);

  const goTo = (id: string) => {
    setShowMobileNav(false);
    if (id === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || showMobileNav ? "bg-black/80 backdrop-blur-md border-b border-neon-cyan/20" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-10 h-16" aria-label="Menu principal">
        <button
          type="button"
          onClick={() => goTo("accueil")}
          className="flex items-center gap-3"
          aria-label="Revenir en haut de la page"
        >
          <span className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-neon-cyan text-neon-cyan font-mono font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]">
            {identity.initials}
          </span>
          <span className="hidden sm:block text-lg font-semibold text-white">
            {identity.firstName} {identity.lastName}
          </span>
        </button>

        {/* Ordinateur */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
          {navlinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => goTo(link.id)}
                className={`px-3 py-2 rounded transition-colors ${
                  active === link.id
                    ? "text-neon-cyan bg-neon-cyan/10 shadow-[inset_0_-2px_0_#00f3ff]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.title}
              </button>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={identity.cvFile}
              download={identity.cvDownloadName}
              className="px-4 py-2 rounded-full border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-colors"
            >
              Mon CV ↓
            </a>
          </li>
        </ul>

        {/* Téléphone */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setShowMobileNav(!showMobileNav)}
          aria-label={showMobileNav ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={showMobileNav}
        >
          {showMobileNav ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {showMobileNav && (
        <ul className="md:hidden flex flex-col px-4 pb-4 gap-1 font-mono text-sm uppercase tracking-widest">
          {navlinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => goTo(link.id)}
                className={`w-full text-left px-3 py-3 rounded ${
                  active === link.id ? "text-neon-cyan bg-neon-cyan/10" : "text-gray-200"
                }`}
              >
                {link.title}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={identity.cvFile}
              download={identity.cvDownloadName}
              className="block text-center px-4 py-3 rounded-full border-2 border-green-500 text-green-400"
            >
              Télécharger mon CV ↓
            </a>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
