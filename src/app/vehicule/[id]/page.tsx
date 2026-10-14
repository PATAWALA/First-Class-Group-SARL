import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VEHICLES, getVehicleById } from '@/data/vehicles';
import { CATEGORY_LABELS } from '@/lib/labels';
import VehicleDetail from './VehicleDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return { title: 'Véhicule introuvable' };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    description: `${vehicle.title} — ${CATEGORY_LABELS[vehicle.category]}, ${vehicle.transmission}, ${vehicle.fuel}. ${
      vehicle.priceSale ? `À vendre : ${vehicle.priceSale} FCFA.` : ''
    } ${vehicle.priceRentDay ? `En location : ${vehicle.priceRentDay} FCFA/jour.` : ''}`,
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} — First Class Group`,
      images: [{ url: vehicle.images[0] }],
    },
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetail vehicle={vehicle} />;
}