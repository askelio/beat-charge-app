// pages/api/create-product.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getURL } from '@/libs/helpers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});


export async function  POST(req: Request) {
  const body = await req.json()
  const { title, price, song_id } = body;
  console.log('VAVAVA')
  console.log(song_id)
  // Create a new product in Stripe
  const stripeProduct = await stripe.products.create({
      name: title,
      description: song_id.toString(),
  });

  // Create a price for the product in Stripe
  const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // Price in cents
      currency: 'usd',
      product: stripeProduct.id,
  });


  const supabase = createRouteHandlerClient({ 
    cookies
    });      const {
    data: { user }
  } = await supabase.auth.getUser();

  const customer = await createOrRetrieveCustomer({
    uuid: user?.id || '',
    email: user?.email || ''
  });

  const metadata: Stripe.MetadataParam = {
    song_id: song_id.toString()
  }

  // Create a payment link
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer,
    line_items: [
      {
        price: stripePrice.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: metadata,
    client_reference_id: song_id.toString(),
    success_url: `${getURL()}/account`,
    cancel_url: `${getURL()}/`,
  });

  const response = JSON.stringify({url: session.url});
  return new NextResponse(response, { status: 200 });
};
