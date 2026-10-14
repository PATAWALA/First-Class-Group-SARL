import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ─── Cache & navigations ──────────────────────────────── */
  cacheComponents: true,
  partialPrefetching: true,

  /* ─── Images distantes (Unsplash) ──────────────────────── */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Formats modernes pour de meilleures performances
    formats: ['image/avif', 'image/webp'],
    // Tailles utiles pour ton design (grille 3 colonnes, hero plein écran)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ─── Turbopack + Tailwind v4 ──────────────────────────── */
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;