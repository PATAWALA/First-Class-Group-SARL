import type { OfferFilter, VehicleCategory, VehicleStatus } from '@/types';

export const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  suv: 'SUV',
  sedan: 'Berline',
  luxury: 'Luxe',
  city: 'Citadine',
};

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  for_sale: 'À la vente',
  for_rent: 'À la location',
  both: 'Vente & Location',
};

export const OFFER_LABELS: Record<OfferFilter, string> = {
  all: 'Tous',
  sale: 'À la vente',
  rent: 'À la location',
};