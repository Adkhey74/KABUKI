import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ── Polices japonaises ──────────────────────────────────────────────────────
   Playfair et Inter sont chargés en subset latin : sans ces deux familles, tous
   les kanji du site (歌舞伎, お品書き, les 42 noms japonais du menu) tombent sur
   la police système du visiteur — donc un rendu différent sur chaque machine.

   `preload: false` n'est pas un choix de performance mais une contrainte :
   Google n'expose pas de sous-ensemble « japanese » via next/font, et tant que
   le preload est actif next/font exige un `subsets` — qui ne correspondrait à
   rien de ce qu'on utilise ici. Le navigateur ne télécharge de toute façon que
   les tranches unicode-range des quelques glyphes réellement rendus.

   Une seule graisse : tout le japonais du site est soit décoratif, soit du
   micro-label tracké. Une fonte variable multiplierait le poids pour rien. */
const notoSerifJp = Noto_Serif_JP({
  variable: "--font-jp-serif",
  weight: ["400"],
  display: "swap",
  preload: false,
  // Les métriques de repli de Next sont calées sur des chasses latines :
  // appliquées à du CJK pleine chasse, elles déformeraient le texte au swap.
  adjustFontFallback: false,
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", "serif"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-jp-sans",
  weight: ["400"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "sans-serif"],
});

export const metadata: Metadata = {
  title: "KABUKI — Restaurant Japonais · Annecy",
  description:
    "Découvrez l'art de la cuisine japonaise au cœur d'Annecy. Sushis, makis et sashimis préparés avec soin par notre chef.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fonts = [
    playfair.variable,
    inter.variable,
    notoSerifJp.variable,
    notoSansJp.variable,
  ].join(" ");

  return (
    <html lang="fr" className={fonts}>
      <body>
        {/* Couvre d'un coup les 8 composants animés du site : reducedMotion="user"
            neutralise transformes et déplacements mais conserve les fondus, donc
            les entrées restent perceptibles sans être vestibulaires. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
