'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card-header';
import type { Tables } from '@/types/db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';

import pricingPlans, { dummyPricing, productionPricing } from '@/config/pricing';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
// interface ProductWithPrices extends Product {
//   prices: Price[];
// }
export interface ProductWithPrices extends Partial<Product> {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function PricingRounded({
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price: any) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

const handleStripeCheckout = async (price: Price) => {
  console.log('➡️ Starting checkout for price:', price);

  setPriceIdLoading(price.id);

  if (!user) {
    setPriceIdLoading(undefined);
    console.log('❌ No user logged in, redirecting to /signup');
    return router.push('/signup');
  }

  try {
    const result = await checkoutWithStripe(price, currentPath);
    console.log('✅ Result from checkoutWithStripe:', result);

    const { errorRedirect, sessionId } = result;

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      console.log('❌ Error redirect returned:', errorRedirect);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      console.log('❌ No sessionId returned');
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    console.log('➡️ Redirecting to Stripe checkout with sessionId:', sessionId);
    stripe?.redirectToCheckout({ sessionId });

  } catch (err) {
    setPriceIdLoading(undefined);
    console.error('🔥 Exception in handleStripeCheckout:', err);
  }
};


  // const displayProducts = products.length ? products : dummyPricing;
  const displayProducts = products.length ? products : productionPricing;

  if (!displayProducts.length) {
    return (
      <section className="container mx-auto" id="pricing">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="container mx-auto" id="pricing">
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 ">
          <h1 className="text-3xl font-bold text-center">
            Flat pricing, no management fees.
          </h1>
          <p className="mt-2 text-center text-muted-foreground">
            Whether you're one person trying to get ahead or a big firm trying
            to take over the world, we've got a plan for you.
          </p>
          {displayProducts.length === 0 && (
            <p className="mt-4 text-center text-red-500">
              Note: This is dummy pricing data. Please add your own pricing data in the Stripe Dashboard to see actual plans. Alternatively, you may use the Stripe Fixtures command to create your own pricing data, see <a href="https://hikari.antoineross.com/docs/configure/stripe/local" className="underline" target="_blank" rel="noopener noreferrer">documentation</a>.
            </p>
          )}
          <div className="flex items-center justify-center mt-6 space-x-4">
            
          </div>
          <div className="grid gap-6 mt-10 md:grid-cols-3">
            {displayProducts.map((product) => {
              const price = product?.prices?.find(
                (price: any) => price.interval === billingInterval
              );
              if (!price) return null;
              const priceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price.currency!,
                minimumFractionDigits: 0
              }).format((price?.unit_amount || 0) / 100);
              const isActive = subscription
                ? product.name === subscription?.prices?.products?.name
                : false;
              const cardBgColor = isActive
                ? 'border-black bg-white text-black'
                : 'bg-white text-black';

              // Use features from the pricingPlans config
              const plan = pricingPlans.find(
                (plan) => plan.name === product.name
              );
              const features = plan ? plan.features : [];

              return (
                <Card
                  key={product.id}
                  className={`w-full max-w-sm rounded-4xl border-2 ${cardBgColor}`}
                >
                  <CardHeader className="rounded-t-4xl flex flex-col justify-center">
                    <div className="flex items-center">
                      <Moon className="h-8 w-8 text-gray-600 fill-zinc-500" />
                      <CardTitle className="ml-2 text-2xl font-bold">{product.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold py-8 text-center">{priceString}</div>
                    <p className="mt-2 text-muted-foreground">
                      {product.description}
                    </p>
                    <Button
                      variant="default"
                      type="button"
                      onClick={() => handleStripeCheckout(price)}
                      className="mt-4 w-full rounded-4xl"
                    >
                      {subscription ? 'Manage' : 'Subscribe'}
                    </Button>
                    <ul className="mt-4 space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckIcon className="text-blue-500" />
                          <span>{feature.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}