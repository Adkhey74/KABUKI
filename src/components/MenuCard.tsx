import { MenuItem } from "@/data/menu";

/* Les couleurs de badge sont désormais opaques. Avant, `signature` combinait
   une couleur déjà transparente (α 0.8) et un opacity: 0.85 sur le span, ce qui
   le faisait tomber à 3.9:1 — sur le badge le plus fréquent de la carte. */
const BADGE: Record<NonNullable<MenuItem["badge"]>, { label: string; className: string }> = {
  signature:   { label: "Signature",   className: "text-gold-ink" },
  nouveau:     { label: "Nouveau",     className: "text-badge-new" },
  végétarien:  { label: "Végétarien",  className: "text-badge-veg" },
  épicé:       { label: "Épicé",       className: "text-badge-spicy" },
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const badge = item.badge ? BADGE[item.badge] : null;

  return (
    <div className="flex gap-4 border-b border-line py-6">

      {/* Numéro — volontairement neutre et non doré : c'est de l'information
          ordinale, pas un accent. Le prix reste ainsi le seul point d'or de la
          ligne, donc le seul point d'ancrage du regard. */}
      <span className="w-6 shrink-0 pt-0.75 text-right font-serif text-2xs tracking-normal text-ink-subtle">
        {String(item.id % 100).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-base leading-tight text-ink">
              {item.name}
            </h3>
            {badge && (
              <span
                className={`border border-current/40 px-2 py-0.5 text-2xs uppercase ${badge.className}`}
              >
                {badge.label}
              </span>
            )}
          </div>
          <span className="shrink-0 font-serif text-lg text-gold">
            {item.price.toFixed(2)} €
          </span>
        </div>

        {item.nameJp && (
          <p lang="ja" className="jp mb-1.5 mt-0.5 text-2xs text-gold-ink">
            {item.nameJp}
          </p>
        )}

        <p className="mt-1.5 text-sm text-ink-muted">
          {item.description}
        </p>

        {item.allergens && item.allergens.length > 0 && (
          <p className="mt-2 text-2xs tracking-wide text-ink-subtle">
            Allergènes : {item.allergens.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
