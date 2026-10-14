const nf = new Intl.NumberFormat('fr-FR');

export function formatPrice(value: number, currency = 'FCFA'): string {
  if (!Number.isFinite(value)) return '—';
  return `${nf.format(value)} ${currency}`;
}

export function formatMileage(km: number): string {
  if (!Number.isFinite(km)) return '—';
  return `${nf.format(km)} km`;
}

export function formatNumber(value: number): string {
  return nf.format(value);
}