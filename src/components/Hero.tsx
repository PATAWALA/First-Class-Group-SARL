'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, MessageCircle, Star } from 'lucide-react';
import { buildContactUrl } from '@/lib/whatsapp';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80';

const STATS = [
  { value: '250+', label: 'Véhicules livrés' },
  { value: '12', label: 'Marques partenaires' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '24/7', label: 'Assistance WhatsApp' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Véhicule de prestige First Class Group"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/90 to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18)_0%,rgba(10,10,10,0)_70%)]" />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold/20 blur-[140px]"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
              <BadgeCheck className="h-3.5 w-3.5" />
              Location &amp; Vente de véhicules
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            L’excellence automobile <br className="hidden sm:block" />
            <span className="text-gradient-gold">à portée de main</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver/65 sm:text-lg"
          >
            First Class Group SARL sélectionne, révisée et livre pour vous des véhicules
            d’exception — à l’achat comme à la location. Un interlocuteur unique, des démarches
            simplifiées, une exigence sans compromis.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/catalogue"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.03]"
            >
              Explorer le catalogue
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href={buildContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-gold/40 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              Nous contacter
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mt-8 flex items-center gap-3 text-sm text-silver/50"
          >
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
            </span>
            <span>4,9/5 — plus de 180 avis clients vérifiés</span>
          </motion.div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur lg:mt-20 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-night/40 px-6 py-6 text-center lg:py-8">
              <dt className="font-display text-3xl font-semibold text-gold lg:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-silver/50">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}