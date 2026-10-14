import { BadgeCheck, FileCheck2, Gem, ShieldCheck } from 'lucide-react';
import Reveal from './ui/Reveal';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Véhicules révisés',
    description:
      'Contrôle technique complet sur 120 points, historique d’entretien vérifié et garantie mécanique incluse.',
  },
  {
    icon: FileCheck2,
    title: 'Démarches simplifiées',
    description:
      'Carte grise, assurance, transfert de propriété : nous nous occupons de toute la paperasse pour vous.',
  },
  {
    icon: Gem,
    title: 'Service First Class',
    description:
      'Livraison à domicile, véhicule de courtoisie et conseiller dédié joignable 7j/7 sur WhatsApp.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparence totale',
    description:
      'Prix affichés sans frais cachés, photos réelles non retouchées et rapport d’inspection remis avant signature.',
  },
];

export default function WhyUs() {
  return (
    <section id="pourquoi-nous" className="relative py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(212,175,55,0.06)_0%,rgba(10,10,10,0)_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs">
            Pourquoi First Class
          </span>
          <h2 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            L’exigence au service de votre confiance
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-silver/60 sm:mt-4 sm:text-base">
            Nous ne vendons pas seulement des voitures. Nous garantissons une expérience
            irréprochable, du premier contact jusqu’à la remise des clés.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-anthracite p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 sm:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-night sm:h-12 sm:w-12">
                  <pillar.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white sm:mt-5 sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-silver/55 sm:mt-2.5 sm:text-sm">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}