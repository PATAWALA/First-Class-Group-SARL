'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, X } from 'lucide-react';
import { SITE } from '@/lib/site';
import { buildContactUrl } from '@/lib/whatsapp';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/#services', label: 'Services' },
  { href: '/#pourquoi-nous', label: 'Pourquoi nous' },
  { href: '/#avis', label: 'Avis' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-night/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 lg:h-20 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-gradient shadow-glow sm:h-10 sm:w-10">
            <span className="font-display text-base font-bold text-night sm:text-lg">FC</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold tracking-wide text-white sm:text-base">
              First Class
            </span>
            <span className="block text-[9px] uppercase tracking-[0.28em] text-gold/80 sm:text-[10px]">
              Group Sarl
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-silver/70 transition-colors hover:bg-white/5 hover:text-white xl:px-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a
            href={buildContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-xs font-semibold text-night transition-transform duration-300 hover:scale-[1.03] xl:px-5 xl:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xl:inline">Contact rapide WhatsApp</span>
            <span className="xl:hidden">WhatsApp</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-night/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 sm:px-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-silver/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href={buildContactUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-3.5 text-sm font-semibold text-night"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contacter sur WhatsApp
                </a>
              </li>
              <li className="pt-2 text-center text-xs text-silver/40">{SITE.phoneDisplay}</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}