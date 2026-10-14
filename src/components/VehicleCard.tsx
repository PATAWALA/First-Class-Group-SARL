'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Fuel, Gauge, MessageCircle, Settings2 } from 'lucide-react';
import type { Vehicle } from '@/types';
import { useReservation } from '@/context/ReservationContext';
import { formatMileage, formatPrice } from '@/lib/format';
import { CATEGORY_LABELS } from '@/lib/labels';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

function StatusBadge({ status }: { status: Vehicle['status'] }) {
  if (status === 'for_rent') {
    return (
      <span className="rounded-full border border-white/20 bg-night/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
        Location
      </span>
    );
  }
  if (status === 'for_sale') {
    return (
      <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-night">
        À vendre
      </span>
    );
  }
  return (
    <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-night">
      Vente &amp; Location
    </span>
  );
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const { open } = useReservation();
  const defaultOffer = vehicle.status === 'for_rent' ? 'rent' : 'sale';

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-anthracite transition-colors duration-500 hover:border-gold/35"
    >
      <Link
        href={`/vehicule/${vehicle.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
        <Image
          src={vehicle.images[0]}
          alt={vehicle.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <StatusBadge status={vehicle.status} />
        </div>

        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/15 bg-night/60 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-silver/80 backdrop-blur">
            {CATEGORY_LABELS[vehicle.category]}
          </span>
        </div>

        {!vehicle.isAvailable && (
          <div className="absolute inset-0 grid place-items-center bg-night/70 backdrop-blur-sm">
            <span className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
              Indisponible
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold text-white">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-silver/40">
              {vehicle.year} · {vehicle.color ?? '—'}
            </p>
          </div>
          <Link
            href={`/vehicule/${vehicle.id}`}
            aria-label={`Voir la fiche de ${vehicle.title}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-silver/60 transition-colors hover:border-gold/40 hover:text-gold"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-4 grid grid-cols-3 gap-2 border-y border-white/5 py-4 text-[11px] text-silver/60">
          <li className="flex flex-col items-center gap-1.5 text-center">
            <Settings2 className="h-4 w-4 text-gold/70" />
            <span className="truncate">{vehicle.transmission}</span>
          </li>
          <li className="flex flex-col items-center gap-1.5 border-x border-white/5 text-center">
            <Fuel className="h-4 w-4 text-gold/70" />
            <span className="truncate">{vehicle.fuel}</span>
          </li>
          <li className="flex flex-col items-center gap-1.5 text-center">
            <Gauge className="h-4 w-4 text-gold/70" />
            <span className="truncate">{formatMileage(vehicle.mileage)}</span>
          </li>
        </ul>

        <div className="mt-5 flex flex-1 flex-col justify-end gap-4">
          <div className="space-y-1">
            {vehicle.priceSale && (
              <p className="font-display text-xl font-semibold text-white">
                {formatPrice(vehicle.priceSale)}
              </p>
            )}
            {vehicle.priceRentDay && (
              <p className="text-sm font-medium text-gold">
                {formatPrice(vehicle.priceRentDay)}
                <span className="text-silver/40"> / jour</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => open(vehicle, defaultOffer)}
            disabled={!vehicle.isAvailable}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            <MessageCircle className="h-4 w-4" />
            Réserver sur WhatsApp
          </button>
        </div>
      </div>
    </motion.article>
  );
}