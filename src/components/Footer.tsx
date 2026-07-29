import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/#about", label: "À propos" },
  { href: "/menu", label: "Menu" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-strong bg-bg">
      <div className="container py-12">

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-8">
          {/* Logo */}
          <div>
            <div className="font-serif text-lg font-semibold tracking-[0.12em] text-ink">
              KABUKI
            </div>
            <div className="mt-1 text-2xs uppercase tracking-widest text-gold-ink">
              <span lang="ja" className="jp-body">歌舞伎</span> · Annecy
            </div>
          </div>

          <nav aria-label="Navigation de pied de page" className="flex flex-wrap gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-wider text-ink-muted no-underline transition-colors hover:text-gold-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* L'année est figée au build : ce composant est rendu côté serveur.
              Acceptable ici, le site étant une démonstration. */}
          <p className="text-2xs tracking-normal text-ink-subtle">
            © {new Date().getFullYear()} KABUKI Annecy
          </p>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-center">
          {/* Cette ligne existait à peine : elle était posée à 1.6:1. */}
          <p className="text-2xs uppercase tracking-wider text-ink-subtle">
            12 Rue des Marquisats · 74000 Annecy · +33 (0)4 50 00 00 00
          </p>
        </div>
      </div>
    </footer>
  );
}
