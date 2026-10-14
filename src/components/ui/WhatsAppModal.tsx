'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle2, MessageCircle, ShieldCheck, X } from 'lucide-react';
import type { OfferType } from '@/types';
import { useReservation } from '@/context/ReservationContext';
import { buildVehicleMessage, buildWhatsAppUrl, openWhatsApp } from '@/lib/whatsapp';
import { formatMileage, formatPrice } from '@/lib/format';
import { CATEGORY_LABELS } from '@/lib/labels';
import { SITE } from '@/lib/site';

export default function WhatsAppModal() {
  const { isOpen, vehicle, offer, close } = useReservation();

  const [selectedOffer, setSelectedOffer] = useState<OfferType>(offer);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) setSelectedOffer(offer);
  }, [isOpen, offer]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDate('');
      setNote('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close]);

  const canChooseOffer = vehicle?.status === 'both';

  const handleConfirm = () => {
    if (!vehicle) return;
    const message = buildVehicleMessage(vehicle, selectedOffer, { name, date, note });
    openWhatsApp(buildWhatsAppUrl(message));
    close();
  };

  const activePrice =
    selectedOffer === 'rent' ? vehicle?.priceRentDay : vehicle?.priceSale;

  return (
    <AnimatePresence>
      {isOpen && vehicle && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={close}
            className="absolute inset-0 cursor-default bg-night/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Pré-réservation WhatsApp"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-anthracite shadow-2xl sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-anthracite/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Pré-réservation</p>
                  <p className="text-[11px] text-silver/45">
                    Vérifiez les informations avant l’envoi
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Fermer la fenêtre"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-silver/60 transition-colors hover:border-white/25 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-5">
              <div className="sm:col-span-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={vehicle.images[0]}
                    alt={vehicle.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-display text-base font-semibold text-white">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-[11px] text-silver/60">
                      {vehicle.year} · {CATEGORY_LABELS[vehicle.category]}
                    </p>
                  </div>
                </div>

                <dl className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver/45">Transmission</dt>
                    <dd className="font-medium text-silver/85">{vehicle.transmission}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver/45">Carburant</dt>
                    <dd className="font-medium text-silver/85">{vehicle.fuel}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver/45">Kilométrage</dt>
                    <dd className="font-medium text-silver/85">{formatMileage(vehicle.mileage)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver/45">Référence</dt>
                    <dd className="font-mono text-[11px] text-gold">
                      {vehicle.id.toUpperCase()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="sm:col-span-3">
                {canChooseOffer && (
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-silver/45">
                      Type d’offre
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['sale', 'rent'] as OfferType[]).map((option) => {
                        const active = selectedOffer === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedOffer(option)}
                            className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                              active
                                ? 'border-gold bg-gold/10 text-gold'
                                : 'border-white/10 bg-white/5 text-silver/60 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {option === 'sale' ? 'Achat' : 'Location'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-gold/20 bg-gold/5 px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold/80">
                    {selectedOffer === 'rent' ? 'Tarif journalier' : 'Prix de vente'}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-white">
                    {activePrice ? formatPrice(activePrice) : 'Sur devis'}
                    {selectedOffer === 'rent' && activePrice && (
                      <span className="ml-1 text-sm font-normal text-silver/50">/ jour</span>
                    )}
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-silver/45">Votre nom</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Jean Dupont"
                      className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-2.5 text-sm text-white placeholder:text-silver/25 focus:border-gold/50 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs text-silver/45">
                      <Calendar className="h-3 w-3" />
                      {selectedOffer === 'rent' ? 'Date souhaitée' : 'Date de visite'}
                    </span>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none [color-scheme:dark]"
                    />
                  </label>
                </div>

                <label className="mt-3 block">
                  <span className="mb-1.5 block text-xs text-silver/45">
                    Précisions (optionnel)
                  </span>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex : livraison à domicile souhaitée"
                    className="w-full resize-none rounded-xl border border-white/10 bg-night/60 px-4 py-2.5 text-sm text-white placeholder:text-silver/25 focus:border-gold/50 focus:outline-none"
                  />
                </label>

                <ul className="mt-5 space-y-2 text-xs text-silver/50">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                    Aucun engagement — simple demande de disponibilité
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                    Réponse d’un conseiller en moins de 30 minutes
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-4 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Envoyer sur WhatsApp
                </button>

                <p className="mt-3 text-center text-[11px] text-silver/35">
                  Vous serez redirigé vers WhatsApp — {SITE.phoneDisplay}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}