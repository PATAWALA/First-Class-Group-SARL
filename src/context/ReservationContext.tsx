'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { OfferType, Vehicle } from '@/types';

interface ReservationContextValue {
  isOpen: boolean;
  vehicle: Vehicle | null;
  offer: OfferType;
  open: (vehicle: Vehicle, offer?: OfferType) => void;
  close: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [offer, setOffer] = useState<OfferType>('sale');
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((v: Vehicle, o?: OfferType) => {
    setVehicle(v);
    setOffer(o ?? (v.status === 'for_rent' ? 'rent' : 'sale'));
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<ReservationContextValue>(
    () => ({ isOpen, vehicle, offer, open, close }),
    [isOpen, vehicle, offer, open, close],
  );

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

export function useReservation(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error('useReservation doit être utilisé à l’intérieur de <ReservationProvider>.');
  }
  return ctx;
}