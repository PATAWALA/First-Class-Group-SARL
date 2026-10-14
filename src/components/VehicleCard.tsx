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
      <span className="rounded-full border border-white/20 bg-night/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur sm:px-3 sm:text-[10px]">
        Location
      </span>
    );
  }
  if (status === 'for_sale') {
    return (
      <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-night sm:px-3 sm:text-[10px]">
        À vendre
      </span>
    );
  }
  return (
    <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-night sm:px-3 sm:text-[10px]">
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

        <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-4 sm:top-4">
          <StatusBadge status={vehicle.status} />
        </div>

        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <span className="rounded-full border border-white/15 bg-night/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-silver/80 backdrop-blur sm:px-3 sm:text-[10px]">
            {CATEGORY_LABELS[vehicle.category]}
          </span>
        </div>

        {!vehicle.isAvailable && (
          <div className="absolute inset-0 grid place-items-center bg-night/70 backdrop-blur-sm">
            <span className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white sm:px-4 sm:py-2 sm:text-xs">
              Indisponible
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-base font-semibold text-white sm:text-lg">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.14em] text-silver/40 sm:text-xs">
              {vehicle.year} · {vehicle.color ?? '—'}
            </p>
          </div>
          <Link
            href={`/vehicule/${vehicle.id}`}
            aria-label={`Voir la fiche de ${vehicle.title}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-silver/60 transition-colors hover:border-gold/40 hover:text-gold sm:h-9 sm:w-9"
          >
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <ul className="mt-3 grid grid-cols-3 gap-1.5 border-y border-white/5 py-3 text-[10px] text-silver/60 sm:mt-4 sm:gap-2 sm:py-4 sm:text-[11px]">
          <li className="flex flex-col items-center gap-1 text-center sm:gap-1.5">
            <Settings2 className="h-3.5 w-3.5 text-gold/70 sm:h-4 sm:w-4" />
            <span className="truncate">{vehicle.transmission}</span>
          </li>
          <li className="flex flex-col items-center gap-1 border-x border-white/5 text-center sm:gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-gold/70 sm:h-4 sm:w-4" />
            <span className="truncate">{vehicle.fuel}</span>
          </li>
          <li className="flex flex-col items-center gap-1 text-center sm:gap-1.5">
            <Gauge className="h-3.5 w-3.5 text-gold/70 sm:h-4 sm:w-4" />
            <span className="truncate">{formatMileage(vehicle.mileage)}</span>
          </li>
        </ul>

        <div className="mt-4 flex flex-1 flex-col justify-end gap-3 sm:mt-5 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            {vehicle.priceSale && (
              <p className="font-display text-lg font-semibold text-white sm:text-xl">
                {formatPrice(vehicle.priceSale)}
              </p>
            )}
            {vehicle.priceRentDay && (
              <p className="text-xs font-medium text-gold sm:text-sm">
                {formatPrice(vehicle.priceRentDay)}
                <span className="text-silver/40"> / jour</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => open(vehicle, defaultOffer)}
            disabled={!vehicle.isAvailable}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-2.5 text-xs font-semibold text-night transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:py-3 sm:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Réserver sur WhatsApp
          </button>
        </div>
      </div>
    </motion.article>
  );
}