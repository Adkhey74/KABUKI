"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/#about", label: "À propos" },
  { href: "/menu", label: "Menu" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    /* Hauteur figée à --nav-h. Avant, le padding s'animait de 1.5rem à 1rem au
       scroll : la navbar « sautait » au passage des 50px, et surtout sa hauteur
       variable rendait impossible d'ancrer la barre de filtres de /menu. */
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 h-[var(--nav-h)]",
        "transition-[background-color,border-color,backdrop-filter] duration-400",
        scrolled
          ? "border-b border-gold/20 bg-bg/95 backdrop-blur-md"
          : "border-b border-transparent bg-bg/15"
      )}
    >
      <div className="container flex h-full items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col gap-0.5 no-underline">
          <span className="font-serif text-[1.4rem] font-semibold leading-none tracking-[0.12em] text-ink [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
            KABUKI
          </span>
          {/* Le fragment japonais est isolé pour qu'Inter continue de rendre
              le latin : mélanger les deux dans un seul span ferait tomber
              « Annecy » dans Noto Sans JP. */}
          <span className="text-2xs leading-none tracking-widest text-gold-ink">
            <span lang="ja" className="jp-body">歌舞伎</span> · Annecy
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-wider text-ink no-underline transition-colors hover:text-gold-ink [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn-gold-outline">
            Réserver
          </Link>
        </nav>

        {/* Burger — p-3 porte la cible à 44×44, contre 30px auparavant */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="nav-mobile"
          className="-mr-3 cursor-pointer border-none bg-transparent p-3 text-ink md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Drawer mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gold/20 bg-bg/98 backdrop-blur-md"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col px-6 pb-8 pt-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-sm uppercase tracking-wider text-ink no-underline transition-colors hover:text-gold-ink"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="btn-gold-outline mt-6 w-full"
              >
                Réserver
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
