import type { Metadata } from 'next';
import CatalogueClient from './CatalogueClient';

export const metadata: Metadata = {
  title: 'Catalogue véhicules — Vente & Location',
  description:
    'Découvrez tous nos véhicules disponibles à la vente et à la location : SUV, berlines, citadines et voitures de luxe. Filtrez par offre, catégorie, marque et budget.',
};

export default function CataloguePage() {
  return <CatalogueClient />;
}