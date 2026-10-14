'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import type { Testimonial } from '@/types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aïcha D.',
    role: 'Cheffe d’entreprise — Cotonou',
    initials: 'AD',
    rating: 5,
    message:
      'J’ai loué un Range Rover Sport pour un séminaire de trois jours. Véhicule impeccable, livré à l’heure, chauffeur très professionnel. Je recommande sans hésiter.',
  },
  {
    id: 't2',
    name: 'Karim B.',
    role: 'Client achat — Toyota Land Cruiser',
    initials: 'KB',
    rating: 5,
    message:
      'Achat de mon Land Cruiser en toute sérénité. Le rapport d’inspection m’a été remis avant même la visite. Aucune mauvaise surprise, des vrais professionnels.',
  },
  {
    id: 't3',
    name: 'Sandra M.',
    role: 'Cliente location longue durée',
    initials: 'SM',
    rating: 5,
    message:
      'La réservation via WhatsApp est d’une simplicité déconcertante. Réponse en moins de 5 minutes, contrat clair, véhicule nickel. Service vraiment First Class.',
  },
  {
    id: 't4',
    name: 'Yann T.',
    role: 'Client achat — BMW X5',
    initials: 'YT',
    rating: 5,
    message:
      'Ils se sont occupés de la carte grise et de l’assurance de A à Z. J’ai juste eu à récupérer les clés. Efficacité remarquable.',
  },
  {
    id: 't5',
    name: 'Fatou N.',
    role: 'Cliente location — événement privé',
    initials: 'FN',
    rating: 5,
    message:
      'Mercedes Classe S pour mon mariage : voiture sublime, décorée avec goût, ponctualité parfaite. Merci pour ce moment.',
  },
  {
    id: 't6',
    name: 'Olivier K.',
    role: 'Client achat — Audi A4',
    initials: 'OK',
    rating: 4,
    message:
      'Excellent rapport qualité-prix et un accompagnement très humain. Le suivi post-vente est un vrai plus.',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
            i < rating ? 'fill-gold text-gold' : 'text-white/15'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="avis" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
            Avis clients
          </span>
          <h2 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Ils nous font confiance
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-silver/60 sm:mt-4 sm:text-base">
            4,9/5 de satisfaction moyenne sur plus de 180 avis vérifiés.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.figure
              key={testimonial.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.07, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-anthracite p-5 transition-colors duration-500 hover:border-gold/30 sm:p-6"
            >
              <Quote className="h-5 w-5 text-gold/30 sm:h-6 sm:w-6" />

              <blockquote className="mt-3 flex-1 text-xs leading-relaxed text-silver/70 sm:mt-4 sm:text-sm">
                « {testimonial.message} »
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4 sm:mt-6 sm:pt-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-gradient text-[11px] font-bold text-night sm:h-10 sm:w-10 sm:text-xs">
                  {testimonial.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white sm:text-sm">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-[10px] text-silver/45 sm:text-[11px]">
                    {testimonial.role}
                  </p>
                </div>
                <Stars rating={testimonial.rating} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}