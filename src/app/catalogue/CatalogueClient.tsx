'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import type { OfferFilter, VehicleCategory } from '@/types';
import { VEHICLES } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';
import VehicleCategories from '@/components/VehicleCategories';
import { filterByCategory, filterByOffer, getBrands, priceForOffer } from '@/lib/vehicles';
import { CATEGORY_LABELS } from '@/lib/labels';
import { formatPrice } from '@/lib/format';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'km-asc' | 'year-desc';

const CATEGORY_OPTIONS: (VehicleCategory | 'all')[] = ['all', 'suv', 'sedan', 'luxury', 'city'];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Mise en avant' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'km-asc', label: 'Kilométrage' },
  { value: 'year-desc', label: 'Année récente' },
];

export default function CatalogueClient() {
  const [offer, setOffer] = useState<OfferFilter>('all');
  const [category, setCategory] = useState<VehicleCategory | 'all'>('all');
  const [brand, setBrand] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const bounds =
    offer === 'rent'
      ? { max: 300_000, step: 5_000 }
      : { max: 100_000_000, step: 500_000 };
  const [maxPrice, setMaxPrice] = useState(bounds.max);

  useEffect(() => {
    setMaxPrice(bounds.max);
  }, [bounds.max]);

  const brands = useMemo(() => getBrands(VEHICLES), []);

  const counts = useMemo(
    () => ({
      all: VEHICLES.length,
      sale: filterByOffer(VEHICLES, 'sale').length,
      rent: filterByOffer(VEHICLES, 'rent').length,
    }),
    [],
  );

  const results = useMemo(() => {
    let list = filterByOffer(VEHICLES, offer);
    list = filterByCategory(list, category);

    if (brand !== 'all') {
      list = list.filter((v) => v.brand === brand);
    }

    list = list.filter((v) => priceForOffer(v, offer) <= maxPrice);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((v) =>
        `${v.brand} ${v.model} ${v.title} ${v.year} ${CATEGORY_LABELS[v.category]}`
          .toLowerCase()
          .includes(q),
      );
    }

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => priceForOffer(a, offer) - priceForOffer(b, offer));
        break;
      case 'price-desc':
        sorted.sort((a, b) => priceForOffer(b, offer) - priceForOffer(a, offer));
        break;
      case 'km-asc':
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'year-desc':
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return sorted;
  }, [offer, category, brand, maxPrice, query, sort]);

  const resetFilters = () => {
    setOffer('all');
    setCategory('all');
    setBrand('all');
    setQuery('');
    setSort('featured');
    setMaxPrice(100_000_000);
  };

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Catalogue
          </span>
          <h1 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Tous nos véhicules disponibles
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-silver/60 sm:text-base">
            {VEHICLES.length} véhicules en stock, inspectés et prêts à partir.
            Filtrez selon votre besoin, puis réservez directement sur WhatsApp.
          </p>
        </motion.div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-anthracite p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <VehicleCategories value={offer} onChange={setOffer} counts={counts} />

            <div className="flex items-center gap-3">
              <div className="relative flex-1 lg:w-72">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/35" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une marque, un modèle…"
                  className="w-full rounded-full border border-white/10 bg-night/60 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-silver/30 focus:border-gold/50 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-silver/70 transition-colors hover:border-gold/40 hover:text-white lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </button>
            </div>
          </div>

          <div
            className={`${
              filtersOpen ? 'grid' : 'hidden'
            } mt-6 gap-6 border-t border-white/5 pt-6 lg:grid lg:grid-cols-12`}
          >
            <div className="lg:col-span-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-silver/45">
                Catégorie
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((option) => {
                  const active = category === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                        active
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/10 text-silver/55 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {option === 'all' ? 'Toutes' : CATEGORY_LABELS[option]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:col-span-4 lg:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-silver/45">
                  Marque
                </span>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none"
                >
                  <option value="all">Toutes les marques</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-silver/45">
                  Trier par
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="lg:col-span-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-silver/45">
                  Budget max
                </span>
                <span className="text-xs font-semibold text-gold">
                  {formatPrice(maxPrice)}
                  {offer === 'rent' && <span className="text-silver/40"> / jour</span>}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={bounds.max}
                step={bounds.step}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-gold"
              />
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 text-xs text-silver/45 transition-colors hover:text-gold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-silver/50">
            <span className="font-semibold text-white">{results.length}</span>{' '}
            {results.length > 1 ? 'véhicules trouvés' : 'véhicule trouvé'}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((vehicle, index) => (
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-2xl border border-dashed border-white/15 bg-anthracite/50 px-6 py-16 text-center"
          >
            <p className="font-display text-lg text-white">Aucun véhicule ne correspond</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-silver/50">
              Essayez d’élargir votre budget ou de modifier vos filtres. Notre équipe peut aussi
              rechercher un véhicule sur mesure pour vous.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-night"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser la recherche
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}