'use client';

import { motion } from 'framer-motion';
import { Car, KeyRound, LayoutGrid } from 'lucide-react';
import type { OfferFilter } from '@/types';
import { OFFER_LABELS } from '@/lib/labels';

const OPTIONS: { value: OfferFilter; icon: typeof Car }[] = [
  { value: 'all', icon: LayoutGrid },
  { value: 'sale', icon: Car },
  { value: 'rent', icon: KeyRound },
];

interface VehicleCategoriesProps {
  value: OfferFilter;
  onChange: (value: OfferFilter) => void;
  counts?: Partial<Record<OfferFilter, number>>;
  className?: string;
}

export default function VehicleCategories({
  value,
  onChange,
  counts,
  className = '',
}: VehicleCategoriesProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrer par type d’offre"
      className={`inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur ${className}`}
    >
      {OPTIONS.map(({ value: optionValue, icon: Icon }) => {
        const isActive = value === optionValue;
        const count = counts?.[optionValue];

        return (
          <button
            key={optionValue}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(optionValue)}
            className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5 ${
              isActive ? 'text-night' : 'text-silver/60 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="offer-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gold-gradient"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className="h-4 w-4" />
            <span>{OFFER_LABELS[optionValue]}</span>
            {typeof count === 'number' && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? 'bg-night/20 text-night' : 'bg-white/10 text-silver/60'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}