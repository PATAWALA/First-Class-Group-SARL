export type VehicleCategory = 'suv' | 'sedan' | 'luxury' | 'city';
export type VehicleStatus = 'for_sale' | 'for_rent' | 'both';
export type OfferType = 'sale' | 'rent';
export type OfferFilter = 'all' | OfferType;
export type Transmission = 'Automatique' | 'Manuelle';
export type FuelType = 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  status: VehicleStatus;
  priceSale?: number;
  priceRentDay?: number;
  mileage: number;
  transmission: Transmission;
  fuel: FuelType;
  images: string[];
  features: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  description?: string;
  seats?: number;
  doors?: number;
  power?: number;
  color?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  initials: string;
}