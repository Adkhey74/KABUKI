"use client";

import { motion } from "framer-motion";
import { MenuCategory } from "@/data/menu";
import MenuCard from "./MenuCard";

export default function MenuSection({ category, index }: { category: MenuCategory; index: number }) {
  return (
    <motion.section
      id={category.id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      className="mb-16"
    >
      {/* En-tête de catégorie.
          La description passait auparavant en display:none sous 600px — ce
          n'était pas du responsive mais une perte de contenu, y compris pour
          les lecteurs d'écran. Elle se place désormais sous le titre en mobile
          et le rejoint à droite à partir de md. */}
      <div className="mb-2 flex flex-col gap-3 border-b border-gold pb-5 md:flex-row md:items-end md:justify-between md:gap-4">
        <div>
          <span lang="ja" className="jp mb-1.5 block text-2xs uppercase tracking-widest text-gold-ink">
            {category.titleJp}
          </span>
          <h2 className="font-serif text-xl text-ink">
            {category.title}
          </h2>
        </div>
        <p className="max-w-80 text-sm text-ink-muted md:text-right">
          {category.description}
        </p>
      </div>

      <div>
        {category.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
