import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppModal from '@/components/WhatsAppModal';
import { ReservationProvider } from '@/context/ReservationContext';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://firstclassgroup.com'),
  title: {
    default: `${SITE.name} — Vente & Location de véhicules d’exception`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'First Class Group SARL — Achat, vente et location de véhicules (SUV, berlines, luxe, citadines). Véhicules révisés, démarches simplifiées, réservation immédiate via WhatsApp.',
  keywords: [
    'location voiture',
    'vente véhicule',
    'SUV',
    'berline',
    'voiture de luxe',
    'First Class Group',
    'Cotonou',
    'Bénin',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.name,
    title: `${SITE.name} — L’excellence automobile à portée de main`,
    description:
      'Achat, vente et location de véhicules d’exception. Réservez en 2 clics sur WhatsApp.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-night font-sans text-silver antialiased">
        <ReservationProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppModal />
        </ReservationProvider>
      </body>
    </html>
  );
}