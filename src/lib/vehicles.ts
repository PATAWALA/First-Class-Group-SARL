import type { OfferFilter, Vehicle, VehicleCategory } from '@/types';

export function filterByOffer(vehicles: Vehicle[], offer: OfferFilter): Vehicle[] {
  if (offer === 'all') return vehicles;
  if (offer === 'sale') {
    return vehicles.filter((v) => v.status === 'for_sale' || v.status === 'both');
  }
  return vehicles.filter((v) => v.status === 'for_rent' || v.status === 'both');
}

export function filterByCategory(
  vehicles: Vehicle[],
  category: VehicleCategory | 'all',
): Vehicle[] {
  if (category === 'all') return vehicles;
  return vehicles.filter((v) => v.category === category);
}

export function priceForOffer(vehicle: Vehicle, offer: OfferFilter): number {
  if (offer === 'rent') return vehicle.priceRentDay ?? 0;
  if (offer === 'sale') return vehicle.priceSale ?? 0;
  return vehicle.priceSale ?? vehicle.priceRentDay ?? 0;
}

export function getBrands(vehicles: Vehicle[]): string[] {
  return Array.from(new Set(vehicles.map((v) => v.brand))).sort((a, b) => a.localeCompare(b));
}

export function getRelatedVehicles(vehicle: Vehicle, all: Vehicle[], limit = 3): Vehicle[] {
  return all
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, limit);
}