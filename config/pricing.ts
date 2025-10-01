// config/pricing.ts

import { Tables } from '@/types/db';

// ——— Front-facing pricing model (para tu UI) ———
export interface Plan {
  name: string;
  description: string;
  features: string[];
  // usamos centavos: 2000 = $20.00, 9000 = $90.00
  monthlyPrice: number;
  // yearlyPrice?: number; // <- NO lo usamos (dejalo comentado si tu UI lo importaba)
}

// mismo set de features en ambos planes
const sharedFeatures = [
  '24/7 automatic block capture',
  'Smart filtering & notifications',
  'Safe, lightweight, and easy setup',
  'Email support',
  'Free updates',
  'Satisfaction guarantee',
  'Referral program',
];

// ✅ Solo DOS planes, ambos mensuales: $20 y $90
const pricingPlans: Plan[] = [
  {
    name: 'Starter',
    description: 'Everything you need to start.',
    features: sharedFeatures,
    monthlyPrice: 2000, // $20.00 en centavos
  },
  {
    name: 'Pro',
    description: 'Advanced features for heavy use and teams.',
    features: sharedFeatures,
    monthlyPrice: 9000, // $90.00 en centavos
  },
];

export default pricingPlans;

// ——— Dummy pricing (si renderizas con tipado de Supabase sin leer de la DB) ———
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
export interface ProductWithPrices extends Product {
  prices: Price[];
}

// ⚠️ IDs dummy (sólo para UI). En producción, usa los de tu DB/Stripe.
export const productionPricing: ProductWithPrices[] = [
  {
    id: 'starter-plan',
    name: 'Starter',
    description: 'Everything you need to start',
    active: true,
    prices: [
      {
        id: 'price_1SD75mAl3g1DrFYcrETAkrqB', // ✅ ID real de Stripe
        currency: 'USD',
        unit_amount: 2000,
        interval: 'month',
        interval_count: 1,
        type: 'recurring',
        active: true,
        product_id: 'prod_T9PvXS59yYTnBj',
      } as Price,
    ],
  },
  {
    id: 'pro-plan',
    name: 'Pro',
    description: 'Advanced features for heavy use and teams',
    active: true,
    prices: [
      {
        id: 'price_1SD73kAl3g1DrFYcQaRTyvQw', // ✅ ID real de Stripe
        currency: 'USD',
        unit_amount: 9000,
        interval: 'month',
        interval_count: 1,
        type: 'recurring',
        active: true,
        product_id: 'prod_T9Pt5UwbRkDQ0x',
      } as Price,
    ],
  },
];

