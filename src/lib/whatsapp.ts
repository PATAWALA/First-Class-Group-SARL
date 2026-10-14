import type { OfferType, Vehicle } from '@/types';
import { SITE } from './site';
import { formatMileage, formatPrice } from './format';
import { CATEGORY_LABELS, STATUS_LABELS } from './labels';

export function buildWhatsAppUrl(message: string, phone: string = SITE.whatsapp): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(url: string): void {
  if (typeof window === 'undefined') return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export interface ReservationExtras {
  name?: string;
  date?: string;
  note?: string;
}

export function buildVehicleMessage(
  vehicle: Vehicle,
  offer: OfferType,
  extras: ReservationExtras = {},
): string {
  const lines: string[] = [];

  lines.push(`Bonjour ${SITE.name} 👋`);
  lines.push('');
  lines.push(
    offer === 'rent'
      ? 'Je souhaite *réserver ce véhicule en location* :'
      : "Je suis *intéressé(e) par l'achat* de ce véhicule :",
  );
  lines.push('');

  lines.push(`🚗 *Véhicule* : ${vehicle.brand} ${vehicle.model}`);
  lines.push(`📅 *Année* : ${vehicle.year}`);
  lines.push(`🏷️ *Catégorie* : ${CATEGORY_LABELS[vehicle.category]}`);
  lines.push(`📋 *Type d'offre* : ${offer === 'rent' ? 'Location' : 'Vente'}`);
  lines.push(`⚙️ *Transmission* : ${vehicle.transmission}`);
  lines.push(`⛽ *Carburant* : ${vehicle.fuel}`);
  lines.push(`🛣️ *Kilométrage* : ${formatMileage(vehicle.mileage)}`);
  lines.push('');

  if (offer === 'rent' && vehicle.priceRentDay) {
    lines.push(`💰 *Tarif* : ${formatPrice(vehicle.priceRentDay)} / jour`);
  } else if (offer === 'sale' && vehicle.priceSale) {
    lines.push(`💰 *Prix* : ${formatPrice(vehicle.priceSale)}`);
  } else {
    lines.push(`💰 *Prix* : à confirmer`);
  }

  if (extras.date) lines.push(`📆 *Date souhaitée* : ${extras.date}`);
  if (extras.name) lines.push(`👤 *Nom* : ${extras.name}`);
  if (extras.note) {
    lines.push('');
    lines.push(`📝 *Précisions* : ${extras.note}`);
  }

  lines.push('');
  lines.push(`🔖 *Référence* : ${vehicle.id.toUpperCase()}`);
  lines.push(`📌 *Statut catalogue* : ${STATUS_LABELS[vehicle.status]}`);
  lines.push('');
  lines.push('Merci de me confirmer la disponibilité. 🙏');

  return lines.join('\n');
}

export function buildContactMessage(): string {
  return [
    `Bonjour ${SITE.name} 👋`,
    '',
    "Je souhaite être mis(e) en relation avec un conseiller pour découvrir vos véhicules disponibles à la vente et à la location.",
    '',
    'Merci d’avance pour votre retour. 🙏',
  ].join('\n');
}

export function buildContactUrl(): string {
  return buildWhatsAppUrl(buildContactMessage());
}