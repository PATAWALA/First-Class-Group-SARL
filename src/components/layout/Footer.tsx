'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';
import { buildContactUrl } from '@/lib/whatsapp';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/#services', label: 'Services' },
  { href: '/#pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/#avis', label: 'Avis clients' },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-anthracite">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* ─── Marque ─────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient">
                <span className="font-display text-lg font-bold text-night">FC</span>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base font-semibold text-white">
                  First Class Group
                </span>
                <span className="block text-[10px] uppercase tracking-[0.28em] text-gold/80">
                  Sarl
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver/55">
              Achat, vente et location de véhicules d’exception. Une sélection rigoureuse,
              des prix transparents et un accompagnement premium de bout en bout.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok First Class Group"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-silver/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp First Class Group"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-silver/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram First Class Group"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-xs font-semibold text-silver/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                IG
              </a>
            </div>
          </div>

          {/* ─── Navigation ─────────────────────────────────── */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-silver/55 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Horaires ───────────────────────────────────── */}
          <div className="lg:col-span-3">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              <Clock className="h-3.5 w-3.5 text-gold" />
              Horaires
            </h3>
            <ul className="mt-5 space-y-3">
              {SITE.hours.map((slot) => (
                <li key={slot.day} className="flex justify-between gap-4 text-sm">
                  <span className="text-silver/55">{slot.day}</span>
                  <span className="font-medium text-silver/85">{slot.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Contact ────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver/55 transition-colors hover:text-gold"
                >
                  {SITE.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`tel:${SITE.phoneDisplay.replace(/\s/g, '')}`}
                  className="text-silver/55 transition-colors hover:text-gold"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-silver/55 transition-colors hover:text-gold"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>

            <a
              href={buildContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-5 py-3 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter maintenant
            </a>
          </div>
        </div>

        {/* ─── Bottom bar ─────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-silver/40 sm:flex-row">
          <p>
            © {year ?? 2026} {SITE.legalName}. Tous droits réservés.
          </p>
          <p>Conçu avec exigence pour une clientèle exigeante.</p>
        </div>
      </div>
    </footer>
  );
}
