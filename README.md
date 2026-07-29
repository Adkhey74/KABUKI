# KABUKI — restaurant japonais, Annecy

Site vitrine d'un restaurant japonais. **Projet de démonstration** : les
coordonnées, l'adresse et le téléphone affichés sont fictifs, et le formulaire de
réservation n'envoie rien (`preventDefault`, aucune route d'envoi). À brancher sur
une API avant toute mise en ligne réelle.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · framer-motion

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Où se trouvent les choses

| Quoi | Où |
|---|---|
| Tokens de design (couleurs, typo, filets) | `src/app/globals.css` — bloc `@theme` |
| Utilitaires maison (`.container`, `.label`, `.btn-*`, `.input`, `.jp`) | `src/app/globals.css` — blocs `@utility` |
| La carte (7 catégories, 34 plats, allergènes) | `src/data/menu.ts` |
| Polices | `src/app/layout.tsx` |

## Conventions

- **Zéro `style={{}}`, zéro `<style>` dans le JSX.** Tout le style passe par les
  utilitaires Tailwind et les tokens de `globals.css`. Les seules exceptions
  tolérées sont les `background-image` d'URL distante et les dégradés `radial` /
  `mask-image`, que Tailwind n'exprime pas.
- **Aucune couleur en dur** dans un composant : utiliser les tokens
  (`text-ink-muted`, `border-line-strong`, `text-gold-ink`…). Les trois niveaux de
  texte sont opaques et tous au-dessus de 5:1 — ne pas réintroduire d'échelle
  d'opacité pour hiérarchiser, c'est ce qui rendait la moitié du site illisible.
- **Texte japonais** : l'envelopper dans `<span lang="ja" className="jp">` (ou
  `jp-body` pour les micro-labels), et n'envelopper que le fragment japonais —
  jamais toute la ligne, sinon le français bascule de police lui aussi.
- Commentaires en français, orientés « pourquoi ».

## Note sur les polices japonaises

`Noto_Serif_JP` et `Noto_Sans_JP` sont chargées avec `preload: false` dans
`layout.tsx`. Ce n'est pas un réglage de performance : Google n'expose pas de
sous-ensemble « japanese » via `next/font`, et tant que le preload est actif
`next/font` réclame un `subsets` qui ne correspondrait à rien de ce qu'on utilise
ici. Conséquence attendue : le **build** émet beaucoup de fichiers `.woff2`, mais
le navigateur n'en télécharge que deux ou trois — ceux qui couvrent les kanji
réellement affichés.
