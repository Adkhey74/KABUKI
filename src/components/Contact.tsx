"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronDown } from "lucide-react";

const hours = [
  { day: "Lundi", time: "Fermé", closed: true },
  { day: "Mar – Ven", time: "12h – 14h30  ·  19h – 22h30" },
  { day: "Samedi", time: "12h – 15h  ·  19h – 23h" },
  { day: "Dimanche", time: "12h – 15h" },
];

const infos = [
  { icon: MapPin, title: "Adresse", content: "12 Rue des Marquisats\n74000 Annecy, France" },
  { icon: Phone, title: "Téléphone", content: "+33 (0)4 50 00 00 00", href: "tel:+33450000000" },
  { icon: Mail, title: "Email", content: "contact@kabuki-annecy.fr", href: "mailto:contact@kabuki-annecy.fr" },
];

/* Chaque label est relié à son champ par cet id : les six <label> du formulaire
   n'étaient auparavant associés à rien, donc un lecteur d'écran annonçait six
   champs anonymes et six textes décoratifs. */
const LABEL = "mb-2 block text-2xs uppercase tracking-wider text-ink-subtle";

export default function Contact() {
  return (
    <section id="contact" className="bg-surface py-28">
      <div className="container">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-18 text-center"
        >
          <span className="label">Nous Trouver</span>
          <h2 className="text-2xl text-ink">Contact &amp; Réservation</h2>
          <div className="divider" />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">

          {/* Colonne infos */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-10 flex flex-col gap-7">
              {infos.map(({ icon: Icon, title, content, href }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center border border-gold/60">
                    <Icon size={15} className="text-gold" />
                  </div>
                  <div>
                    <p className="mb-1 text-2xs uppercase tracking-wider text-ink-subtle">
                      {title}
                    </p>
                    {href ? (
                      /* Un lien tel:/mailto: ne doit pas se signaler par la seule
                         couleur — d'où le soulignement au survol. */
                      <a
                        href={href}
                        className="text-sm text-ink-muted underline-offset-4 transition-colors hover:text-gold-ink hover:underline"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="whitespace-pre-line text-sm text-ink-muted">{content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Horaires */}
            <div className="border-t border-line-strong pt-8">
              <div className="mb-5 flex items-center gap-3">
                <Clock size={14} className="text-gold" />
                <span className="text-2xs uppercase tracking-wider text-ink-subtle">
                  Horaires
                </span>
              </div>
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between border-b border-line py-2.5"
                >
                  <span className="text-sm text-ink-muted">{h.day}</span>
                  {/* « Fermé » était le mot le moins lisible du site (2.4:1)
                      alors que c'est celui qui doit sauter aux yeux. */}
                  <span className={h.closed ? "text-sm text-closed" : "text-sm text-ink"}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="border border-line-strong bg-card p-6 md:p-10"
          >
            <h3 className="mb-2 font-serif text-xl text-ink">
              Réserver une Table
            </h3>
            <p className="mb-8 text-sm text-ink-muted">
              Nous vous répondrons dans les 24h.
            </p>

            {/* Site de démonstration : le formulaire n'est relié à aucune route
                d'envoi, d'où le preventDefault. À brancher sur une API avant
                toute mise en ligne réelle. */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstname" className={LABEL}>Prénom</label>
                  <input id="firstname" name="firstname" className="input" type="text" placeholder="Marie" />
                </div>
                <div>
                  <label htmlFor="lastname" className={LABEL}>Nom</label>
                  <input id="lastname" name="lastname" className="input" type="text" placeholder="Dupont" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={LABEL}>Email</label>
                <input id="email" name="email" className="input" type="email" placeholder="marie@email.fr" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className={LABEL}>Date</label>
                  <input id="date" name="date" className="input scheme-dark" type="date" />
                </div>
                <div>
                  <label htmlFor="guests" className={LABEL}>Personnes</label>
                  {/* appearance-none sans chevron ne laissait rien deviner qu'il
                      s'agissait d'une liste déroulante. */}
                  <div className="relative">
                    <select id="guests" name="guests" className="input cursor-pointer appearance-none pr-10">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-card">
                          {n} personne{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className={LABEL}>Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  className="input resize-none"
                  rows={3}
                  placeholder="Allergie, occasion spéciale…"
                />
              </div>

              <button type="submit" className="btn-primary mt-2 w-full">
                Confirmer la Réservation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
