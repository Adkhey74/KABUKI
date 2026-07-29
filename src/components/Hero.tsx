"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] min-h-[600px] w-full flex-col items-center justify-center overflow-hidden">

      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=1920&q=80')" }}
      />

      {/* ── Voilage en trois couches ──────────────────────────────────────────
          L'ancien overlay était un simple dégradé vertical dont le creux (α 0.35)
          tombait pile sur le texte centré : sur une zone claire de la photo, le
          H1 descendait à 2.7:1 et le sur-titre doré à 1.2:1. Et comme la photo
          vient d'Unsplash, on ne maîtrise pas ce qui passe dessous.
          On rend donc la lisibilité indépendante de l'image : voile plat à 50 %,
          puis voile radial à 80 % centré sur le bloc de texte. Il ne reste que
          10 % de l'image derrière les mots — même sur du blanc pur, le fond
          composite ne dépasse pas #222, soit 13.5:1 pour le titre. */}
      <div className="absolute inset-0 bg-bg/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0) 72%)",
        }}
      />
      {/* Raccord haut (derrière la navbar) et bas (vers la section About) */}
      <div className="absolute inset-0 bg-linear-to-b from-bg/85 via-transparent to-bg/95" />

      {/* Filigrane décoratif — le seul élément qui justifie de charger une
          police japonaise éditoriale. Purement ornemental, donc aria-hidden. */}
      <span
        aria-hidden="true"
        lang="ja"
        className="jp pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[18vw] leading-none text-gold/[0.06]"
      >
        歌舞伎
      </span>

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-180 px-6 text-center">
        <motion.span
          className="label mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span lang="ja" className="jp-body">歌舞伎</span> — Art Culinaire Japonais
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl font-semibold text-ink"
        >
          KABUKI
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="origin-center"
        >
          <div className="divider my-6" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mb-10 text-sm uppercase tracking-wide text-ink-muted"
        >
          Restaurant Japonais · Annecy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/menu" className="btn-primary">Découvrir le Menu</Link>
          <Link href="/#contact" className="btn-outline">Réserver une Table</Link>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-2xs uppercase tracking-widest text-ink-subtle">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-linear-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
