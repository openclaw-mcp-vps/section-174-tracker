import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { upsertPurchase } from "@/lib/purchase-store";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook configuration." },
      { status: 400 },
    );
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Webhook signature verification failed.",
      },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email?.trim().toLowerCase();
    if (email) {
      await upsertPurchase({
        email,
        stripeCheckoutId: session.id,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        purchasedAt: new Date(
          (session.created ?? Math.floor(Date.now() / 1000)) * 1000,
        ).toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
