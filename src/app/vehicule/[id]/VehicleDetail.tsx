'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Check,
  Fuel,
  Gauge,
  MessageCircle,
  Palette,
  Phone,
  Settings2,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import type { Vehicle } from '@/types';
import { useReservation } from '@/context/ReservationContext';
import { formatMileage, formatPrice } from '@/lib/format';
import { CATEGORY_LABELS, STATUS_LABELS } from '@/lib/labels';
import { buildContactUrl } from '@/lib/whatsapp';
import { getRelatedVehicles } from '@/lib/vehicles';
import { VEHICLES } from '@/data/vehicles';
import { SITE } from '@/lib/site';
import VehicleCard from '@/components/VehicleCard';

interface VehicleDetailProps {
  vehicle: Vehicle;
}

export default function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const { open } = useReservation();
  const [activeImage, setActiveImage] = useState(0);
  const related = getRelatedVehicles(vehicle, VEHICLES);

  const canChooseOffer = vehicle.status === 'both';
  const defaultOffer = vehicle.status === 'for_rent' ? 'rent' : 'sale';

  const specs = [
    { icon: Calendar, label: 'Année', value: String(vehicle.year) },
    { icon: Gauge, label: 'Kilométrage', value: formatMileage(vehicle.mileage) },
    { icon: Settings2, label: 'Transmission', value: vehicle.transmission },
    { icon: Fuel, label: 'Carburant', value: vehicle.fuel },
    { icon: Users, label: 'Places', value: vehicle.seats ? `${vehicle.seats} places` : '—' },
    { icon: Zap, label: 'Puissance', value: vehicle.power ? `${vehicle.power} ch` : '—' },
    { icon: Palette, label: 'Couleur', value: vehicle.color ?? '—' },
    { icon: ShieldCheck, label: 'Statut', value: STATUS_LABELS[vehicle.status] },
  ];

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        {/* Fil d'Ariane */}
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-xs text-silver/50 transition-colors hover:text-gold sm:text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Retour au catalogue
        </Link>

        <div className="mt-6 grid gap-8 sm:mt-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Colonne gauche : galerie + détails */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Galerie */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-anthracite">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={vehicle.images[activeImage]}
                      alt={`${vehicle.title} — photo ${activeImage + 1}`}
                      fill
                      priority={activeImage === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
                  <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-night sm:px-3 sm:text-[10px]">
                    {STATUS_LABELS[vehicle.status]}
                  </span>
                  <span className="rounded-full border border-white/20 bg-night/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white backdrop-blur sm:px-3 sm:text-[10px]">
                    {CATEGORY_LABELS[vehicle.category]}
                  </span>
                </div>
              </div>

              {vehicle.images.length > 1 && (
                <div className="no-scrollbar flex gap-2 overflow-x-auto p-3 sm:gap-3 sm:p-4">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Voir la photo ${index + 1}`}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:h-16 sm:w-24 ${
                        activeImage === index
                          ? 'border-gold opacity-100'
                          : 'border-white/10 opacity-55 hover:opacity-90'
                      }`}
                    >
                      <Image src={image} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-8 sm:mt-10">
              <h1 className="font-display text-xl leading-tight text-white sm:text-2xl lg:text-3xl xl:text-4xl">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-silver/40 sm:text-sm">
                {vehicle.title}
              </p>

              {vehicle.description && (
                <p className="mt-5 text-sm leading-relaxed text-silver/65 sm:mt-6 sm:text-base">
                  {vehicle.description}
                </p>
              )}
            </div>

            {/* Fiche technique */}
            <div className="mt-8 sm:mt-10">
              <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                Fiche technique
              </h2>
              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:mt-5 sm:grid-cols-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-anthracite px-3 py-4 sm:px-4 sm:py-5">
                    <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-silver/40 sm:text-[11px]">
                      <spec.icon className="h-3 w-3 text-gold/70 sm:h-3.5 sm:w-3.5" />
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-xs font-medium text-white sm:mt-2 sm:text-sm">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Équipements */}
            <div className="mt-8 sm:mt-10">
              <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                Équipements &amp; options
              </h2>
              <ul className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
                {vehicle.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-xs text-silver/70 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-gold sm:h-4 sm:w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne droite : CTA sticky */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-white/10 bg-anthracite p-5 sm:p-6">
                {/* Prix */}
                <div className="space-y-3">
                  {vehicle.priceSale && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-silver/40 sm:text-[11px]">
                        Prix de vente
                      </p>
                      <p className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                        {formatPrice(vehicle.priceSale)}
                      </p>
                    </div>
                  )}

                  {vehicle.priceRentDay && (
                    <div className={vehicle.priceSale ? 'border-t border-white/5 pt-3' : undefined}>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-silver/40 sm:text-[11px]">
                        Location
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-gold sm:text-2xl">
                        {formatPrice(vehicle.priceRentDay)}
                        <span className="ml-1 text-xs font-normal text-silver/45 sm:text-sm">
                          / jour
                        </span>
                      </p>
                    </div>
                  )}

                  {!vehicle.priceSale && !vehicle.priceRentDay && (
                    <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                      Sur devis
                    </p>
                  )}
                </div>

                {/* Disponibilité */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 sm:mt-5 sm:px-4 sm:py-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      vehicle.isAvailable ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                  />
                  <span className="text-xs text-silver/60">
                    {vehicle.isAvailable
                      ? 'Disponible immédiatement'
                      : 'Actuellement indisponible'}
                  </span>
                </div>

                {/* CTAs */}
                <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {canChooseOffer ? (
                    <>
                      <button
                        type="button"
                        onClick={() => open(vehicle, 'sale')}
                        disabled={!vehicle.isAvailable}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-4"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Acheter ce véhicule
                      </button>
                      <button
                        type="button"
                        onClick={() => open(vehicle, 'rent')}
                        disabled={!vehicle.isAvailable}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-4"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Réserver en location
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => open(vehicle, defaultOffer)}
                      disabled={!vehicle.isAvailable}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-5 py-3.5 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-4"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {defaultOffer === 'rent' ? 'Réserver sur WhatsApp' : 'Acheter sur WhatsApp'}
                    </button>
                  )}

                  <a
                    href={buildContactUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-silver/70 transition-colors duration-300 hover:border-white/25 hover:text-white sm:px-6 sm:py-3.5"
                  >
                    <Phone className="h-4 w-4" />
                    Poser une question
                  </a>
                </div>

                {/* Réassurance */}
                <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-4 text-[11px] text-silver/50 sm:mt-6 sm:space-y-3 sm:pt-5 sm:text-xs">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold sm:h-4 sm:w-4" />
                    Garantie mécanique 6 mois incluse (achat)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold sm:h-4 sm:w-4" />
                    Démarches administratives prises en charge
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold sm:h-4 sm:w-4" />
                    Conseiller joignable 7j/7 — {SITE.phoneDisplay}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Véhicules similaires */}
        {related.length > 0 && (
          <section className="mt-14 sm:mt-20 lg:mt-28">
            <h2 className="font-display text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
              Véhicules similaires
            </h2>
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((item, index) => (
                <VehicleCard key={item.id} vehicle={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}