"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { menuCategories } from "@/data/menu";

const highlights = menuCategories
  .flatMap((c) => c.items.filter((i) => i.badge === "signature"))
  .slice(0, 6);

export default function MenuPreview() {
  return (
    <section className="bg-bg py-28">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16 text-center"
        >
          <span className="label">Nos Créations</span>
          <h2 className="text-2xl text-ink">Les Incontournables</h2>
          <div className="divider" />
        </motion.div>

        {/* Les filets de la grille étaient calculés en JS puis rattrapés par huit
            règles nth-child dans un <style> injecté — un cas particulier par
            palier de breakpoint. Ici la grille elle-même fait les filets :
            gap-px laisse voir le fond du conteneur entre des cellules opaques,
            donc les gouttières restent justes quel que soit le nombre de
            colonnes, sans exception nommée. */}
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => {
            const category = menuCategories.find((c) => c.items.includes(item));
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-bg p-9 transition-colors hover:bg-card"
              >
                <span lang="ja" className="jp text-2xs uppercase tracking-widest text-gold-ink">
                  {category?.titleJp}
                </span>
                <h3 className="mb-1 mt-2 font-serif text-base text-ink transition-colors group-hover:text-gold-ink">
                  {item.name}
                </h3>
                {item.nameJp && (
                  <p lang="ja" className="jp mb-3 text-2xs text-gold-ink">
                    {item.nameJp}
                  </p>
                )}
                <p className="mb-5 text-sm text-ink-muted">
                  {item.description}
                </p>
                <span className="font-serif text-lg text-gold">
                  {item.price.toFixed(2)} €
                </span>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/menu" className="btn-gold-outline">
            Voir le Menu Complet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
