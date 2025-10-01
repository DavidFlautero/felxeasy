'use server';

import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/config';
import { createClient } from '@/utils/supabase/server';
import { createOrRetrieveCustomer } from '@/utils/supabase/admin';
import {
  getURL,
  getErrorRedirect,
  calculateTrialEndUnixTimestamp
} from '@/utils/helpers';
import { Tables } from '@/types/db';

type Price = Tables<'prices'>;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

/**
 * Checkout con Stripe usando Server Actions y Supabase.
 */
export async function checkoutWithStripe(
  price: Price,
  redirectPath: string = '/account'
): Promise<CheckoutResponse> {
  try {
    const supabase = createClient();
    const { error, data: { user } } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('Supabase getUser error:', error);
      throw new Error('Could not get user session.');
    }

    // Crear o recuperar cliente en Stripe
    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id,
        email: user.email
      });
    } catch (err) {
      console.error('Error createOrRetrieveCustomer:', err);
      throw new Error('Unable to access customer record.');
    }

    // Configuración de sesión de checkout
    const params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer,
      customer_update: { address: 'auto' },
      line_items: [{ price: price.id, quantity: 1 }],
      cancel_url: getURL(),
      success_url: getURL(redirectPath),
      mode: price.type === 'recurring' ? 'subscription' : 'payment',
      subscription_data:
        price.type === 'recurring'
          ? { trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days) }
          : undefined
    };

    // Crear sesión en Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error('Stripe checkout.sessions.create error:', err);
      throw new Error('Unable to create checkout session.');
    }

    if (!session) {
      throw new Error('Unable to create checkout session.');
    }

    return { sessionId: session.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      errorRedirect: getErrorRedirect(
        redirectPath,
        message,
        'Please try again later or contact a system administrator.'
      )
    };
  }
}

/**
 * Billing portal de Stripe usando Server Actions y Supabase.
 */
export async function createStripePortal(currentPath: string) {
  try {
    const supabase = createClient();
    const { error, data: { user } } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('Supabase getUser error:', error);
      throw new Error('Could not get user session.');
    }

    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id,
        email: user.email
      });
    } catch (err) {
      console.error('Error createOrRetrieveCustomer:', err);
      throw new Error('Unable to access customer record.');
    }

    if (!customer) throw new Error('Could not get customer.');

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getURL('/account')
    });

    if (!url) throw new Error('Could not create billing portal.');

    return url;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return getErrorRedirect(
      currentPath,
      message,
      'Please try again later or contact a system administrator.'
    );
  }
}
