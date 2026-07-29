"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "40+", label: "Couverts" },
  { value: "12", label: "Ans d'expérience" },
  { value: "100%", label: "Produits frais" },
];

export default function About() {
  return (
    <section id="about" className="bg-surface py-28">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-20 text-center"
        >
          <span className="label">Notre Histoire</span>
          <h2 className="mb-4 text-2xl text-ink">
            L&apos;Art Japonais à Annecy
          </h2>
          <div className="divider" />
          <p className="mx-auto mt-5 max-w-130 text-base text-ink-muted">
            Fondé en 2012, KABUKI est la rencontre entre la rigueur de la cuisine
            japonaise et la générosité de la gastronomie alpine — un voyage immobile,
            au bord du lac d&apos;Annecy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
        >
          <div>
            <span className="label">Notre Chef</span>
            <h3 className="mb-5 text-xl text-ink">
              Hiroshi Tanaka,<br />
              <em className="text-gold">Maître Sushi</em>
            </h3>
            <p className="mb-4 text-base text-ink-muted">
              Formé pendant douze ans à Tokyo, Hiroshi Tanaka a posé ses couteaux
              à Annecy pour y partager sa vision de la cuisine japonaise : rigoureuse,
              épurée, vivante.
            </p>
            <p className="mb-10 text-base text-ink-muted">
              Chaque matin, il sélectionne personnellement les poissons. Chaque soir,
              il façonne ses nigiri derrière notre comptoir ouvert — sous vos yeux.
            </p>

            {/* Les trois chiffres tenaient dans deux flex imbriqués sans wrap,
                avec les séparateurs en <div> : sous 360px la ligne débordait.
                Le séparateur devient une bordure gauche, ce qui le fait suivre
                le retour à la ligne au lieu de le contrarier. */}
            <dl className="flex flex-wrap gap-x-10 gap-y-6">
              {stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "border-l border-gold/60 pl-10" : undefined}>
                  <dd className="font-serif text-xl leading-none text-gold">
                    {s.value}
                  </dd>
                  <dt className="mt-1.5 text-2xs uppercase tracking-wider text-ink-subtle">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative h-105 overflow-hidden">
            {/* Volontairement en <img> : le passage à next/image reste à faire.
                Le warning ESLint est laissé visible pour ne pas l'oublier. */}
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80"
              alt="Chef préparant des sushis"
              loading="lazy"
              decoding="async"
              className="block size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-bg/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
