"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";

const POSTER = "/video/hero-chef-poster.webp";

/**
 * Vidéo de fond du Hero (chef qui tranche du thon), en calque `absolute` sous
 * le voile et le contenu. Même montage que sur akwebsolutions.fr.
 *
 * 1. Le premier affichage est l'image d'attente (36 Ko, préchargée en priorité
 *    haute) : c'est elle qui compte pour le LCP, pas la vidéo.
 * 2. `preload="none"` + lecture lancée par le script : un visiteur en
 *    mouvement réduit ou en économie de données ne télécharge JAMAIS la vidéo,
 *    il garde l'image fixe.
 *
 * Les fichiers sont des réencodages de la vidéo d'origine (3,6 Mo, avec une
 * piste audio inutile) — sans audio, index en tête de fichier pour démarrer
 * avant la fin du téléchargement :
 *
 *   1080p — WebM/VP9 824 Ko · MP4/H.264 1,6 Mo
 *    720p — WebM/VP9 406 Ko · MP4/H.264 680 Ko   (servi sous 768 px)
 *
 * Pour remplacer la vidéo, changer aussi le nom des fichiers : un navigateur
 * qui a gardé l'ancienne en cache la resservirait sous le même nom.
 *
 * ⚠️ Le voile qui garantit la lisibilité du texte est dans Hero.tsx, pas ici :
 * il est calculé pour tenir même sur une image blanche, donc indépendant de la
 * vidéo. Ne pas l'alléger sans refaire la mesure sur les images de la vidéo —
 * le centre (planche et thon) est clair.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  preload(POSTER, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS refuse la lecture automatique d'une vidéo non muette : la propriété
    // posée ici ne dépend pas de ce que React écrit dans le HTML serveur.
    video.muted = true;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const held =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData === true;
    if (held) return;

    // Hors de l'écran, la vidéo s'arrête : inutile de décoder 24 images par
    // seconde pendant que le visiteur lit la carte.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else {
        video.play().catch(() => {
          // Lecture refusée (iOS en économie d'énergie) : l'image fixe reste.
        });
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={POSTER}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
      >
        {/* Le navigateur prend la PREMIÈRE source dont le `media` correspond et
            dont le type est lisible : WebM avant MP4 (moitié moins lourd à
            qualité égale), mobile avant desktop. */}
        <source src="/video/hero-chef-720.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/video/hero-chef-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero-chef-1080.webm" type="video/webm" />
        <source src="/video/hero-chef-1080.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
