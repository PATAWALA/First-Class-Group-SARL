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
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-sm text-silver/50 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au catalogue
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-anthracite">
              <div className="relative aspect-[16/10] w-full">
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

                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-night">
                    {STATUS_LABELS[vehicle.status]}
                  </span>
                  <span className="rounded-full border border-white/20 bg-night/60 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur">
                    {CATEGORY_LABELS[vehicle.category]}
                  </span>
                </div>
              </div>

              {vehicle.images.length > 1 && (
                <div className="no-scrollbar flex gap-3 overflow-x-auto p-4">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Voir la photo ${index + 1}`}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
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

            <div className="mt-10">
              <h1 className="font-display text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-silver/40">
                {vehicle.title}
              </p>

              {vehicle.description && (
                <p className="mt-6 text-sm leading-relaxed text-silver/65 sm:text-base">
                  {vehicle.description}
                </p>
              )}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-white">Fiche technique</h2>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-anthracite px-4 py-5">
                    <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-silver/40">
                      <spec.icon className="h-3.5 w-3.5 text-gold/70" />
                      {spec.label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-white">
                Équipements &amp; options
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-silver/70"
                  >
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-white/10 bg-anthracite p-6">
                <div className="space-y-3">
                  {vehicle.priceSale && (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-silver/40">
                        Prix de vente
                      </p>
                      <p className="mt-1 font-display text-3xl font-semibold text-white">
                        {formatPrice(vehicle.priceSale)}
                      </p>
                    </div>
                  )}

                  {vehicle.priceRentDay && (
                    <div className={vehicle.priceSale ? 'border-t border-white/5 pt-3' : undefined}>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-silver/40">
                        Location
                      </p>
                      <p className="mt-1 font-display text-2xl font-semibold text-gold">
                        {formatPrice(vehicle.priceRentDay)}
                        <span className="ml-1 text-sm font-normal text-silver/45">/ jour</span>
                      </p>
                    </div>
                  )}

                  {!vehicle.priceSale && !vehicle.priceRentDay && (
                    <p className="font-display text-2xl font-semibold text-white">Sur devis</p>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
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

                <div className="mt-6 space-y-3">
                  {canChooseOffer ? (
                    <>
                      <button
                        type="button"
                        onClick={() => open(vehicle, 'sale')}
                        disabled={!vehicle.isAvailable}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-4 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Acheter ce véhicule
                      </button>
                      <button
                        type="button"
                        onClick={() => open(vehicle, 'rent')}
                        disabled={!vehicle.isAvailable}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-6 py-4 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
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
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-4 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {defaultOffer === 'rent' ? 'Réserver sur WhatsApp' : 'Acheter sur WhatsApp'}
                    </button>
                  )}

                  <a
                    href={buildContactUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-silver/70 transition-colors duration-300 hover:border-white/25 hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Poser une question
                  </a>
                </div>

                <ul className="mt-6 space-y-3 border-t border-white/5 pt-5 text-xs text-silver/50">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    Garantie mécanique 6 mois incluse (achat)
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    Démarches administratives prises en charge
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    Conseiller joignable 7j/7 — {SITE.phoneDisplay}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Véhicules similaires
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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