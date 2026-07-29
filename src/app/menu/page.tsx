"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";
import { menuCategories } from "@/data/menu";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? menuCategories.filter((c) => c.id === active)
    : menuCategories;

  const tabs = [
    { id: null, title: "Tout" },
    ...menuCategories.map((c) => ({ id: c.id, title: c.title })),
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg">

        {/* En-tête de page */}
        <div className="relative overflow-hidden pb-20 pt-36 text-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-8"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg via-transparent to-bg" />

          <div className="relative z-1">
            <motion.span
              className="label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span lang="ja" className="jp-body">お品書き</span> — Notre Carte
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mb-4 text-2xl text-ink"
            >
              Notre Menu
            </motion.h1>
            <div className="divider" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-sm tracking-wide text-ink-muted"
            >
              Produits frais · Préparés à la commande · Prix en euros, service compris
            </motion.p>
          </div>
        </div>

        {/* ── Barre de filtres collante ────────────────────────────────────────
            `top` s'ancre sur --nav-h au lieu des 68px codés en dur d'avant :
            la navbar animait son padding, donc mesurait 90px en haut de page et
            la barre se glissait dessous. */}
        <div className="sticky top-[var(--nav-h)] z-40 border-b border-line-strong bg-bg/95 backdrop-blur-md">
          <div className="container">
            {/* Le masque latéral remplace la scrollbar qu'on masquait sans rien
                mettre à la place : les onglets se dissolvent aux bords, ce qui
                signale qu'il reste des catégories hors écran. */}
            <div
              role="tablist"
              aria-label="Filtrer par catégorie"
              className="flex snap-x snap-mandatory overflow-x-auto"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0, #000 1.5rem, #000 calc(100% - 1.5rem), transparent 100%)",
              }}
            >
              {tabs.map((cat) => (
                <button
                  key={cat.id ?? "all"}
                  type="button"
                  role="tab"
                  /* aria-selected pilote à la fois la sémantique et le style.
                     L'ancienne règle .filter-btn ciblait un [data-active] jamais
                     posé : son !important écrasait l'or de l'onglet actif dès
                     qu'on le survolait, et on perdait l'indication de sélection. */
                  aria-selected={active === cat.id}
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    "shrink-0 snap-start cursor-pointer border-b-2 border-transparent bg-transparent px-5 py-4",
                    "text-xs uppercase tracking-wider whitespace-nowrap text-ink-subtle",
                    "transition-colors hover:text-ink",
                    "aria-selected:border-gold aria-selected:text-gold-ink"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="container py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active ?? "all"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {visible.map((cat, i) => (
                <MenuSection key={cat.id} category={cat} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 border-t border-line pt-10 text-center">
            <p className="text-2xs leading-loose tracking-wide text-ink-subtle">
              Informations sur les allergènes disponibles auprès de notre équipe.<br />
              Le menu évolue selon les arrivages et les saisons.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
