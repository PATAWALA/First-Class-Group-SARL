import Link from 'next/link';
import { ArrowRight, Car, HandCoins, KeyRound, MessageCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Reveal from '@/components/ui/Reveal';
import { buildContactUrl } from '@/lib/whatsapp';

const SERVICES = [
  {
    icon: Car,
    title: 'Vente de véhicules',
    description:
      'Une sélection rigoureuse de véhicules neufs et d’occasion, inspectés et garantis. Financement possible.',
  },
  {
    icon: KeyRound,
    title: 'Location courte & longue durée',
    description:
      'À la journée, à la semaine ou au mois. Kilométrage flexible, entretien et assurance inclus.',
  },
  {
    icon: HandCoins,
    title: 'Dépôt-vente & reprise',
    description:
      'Nous vendons votre véhicule pour vous au meilleur prix, ou nous le reprenons en échange.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="services" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
              Nos services
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Trois façons de rouler First Class
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-anthracite p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/35">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver/55">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FeaturedVehicles />
      <WhyUs />
      <Testimonials />

      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-anthracite px-8 py-14 text-center lg:px-16 lg:py-20">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(212,175,55,0.16)_0%,rgba(10,10,10,0)_100%)]" />

              <span className="text-xs font-medium uppercase tracking-[0.28em] text-gold">
                Un projet automobile ?
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                Parlons de votre prochain véhicule
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-silver/60 sm:text-base">
                Un conseiller dédié vous répond en moins de 30 minutes sur WhatsApp.
                Disponibilité, tarifs, essai : posez toutes vos questions.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={buildContactUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-night transition-transform duration-300 hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Écrire sur WhatsApp
                </a>
                <Link
                  href="/catalogue"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-gold/40 hover:bg-white/10"
                >
                  Parcourir le catalogue
                  <ArrowRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}