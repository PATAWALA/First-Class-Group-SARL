'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { OfferFilter } from '@/types';
import { VEHICLES } from '@/data/vehicles';
import { filterByOffer } from '@/lib/vehicles';
import VehicleCard from './VehicleCard';
import VehicleCategories from './VehicleCategories';
import Reveal from './ui/Reveal';

const MAX_ITEMS = 6;

export default function FeaturedVehicles() {
  const [offer, setOffer] = useState<OfferFilter>('all');

  const counts = useMemo(
    () => ({
      all: VEHICLES.length,
      sale: filterByOffer(VEHICLES, 'sale').length,
      rent: filterByOffer(VEHICLES, 'rent').length,
    }),
    [],
  );

  const vehicles = useMemo(() => {
    const filtered = filterByOffer(VEHICLES, offer);
    const sorted = [...filtered].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    return sorted.slice(0, MAX_ITEMS);
  }, [offer]);

  return (
    <section id="catalogue" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              Notre sélection
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Véhicules vedettes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-silver/60 sm:text-base">
              Chaque véhicule est inspecté sur 120 points de contrôle avant sa mise en ligne.
              Prix affichés, historique transparent, disponibilité en temps réel.
            </p>
          </div>

          <VehicleCategories value={offer} onChange={setOffer} counts={counts} />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <VehicleCard vehicle={vehicle} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {vehicles.length === 0 && (
          <p className="mt-12 text-center text-sm text-silver/50">
            Aucun véhicule ne correspond à cette sélection pour le moment.
          </p>
        )}

        <Reveal className="mt-14 flex justify-center">
          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold/40 hover:bg-white/10"
          >
            Voir tout le catalogue
            <ArrowRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}