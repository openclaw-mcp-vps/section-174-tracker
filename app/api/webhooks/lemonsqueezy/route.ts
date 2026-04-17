import { NextResponse } from "next/server";
import { initializeLemonSqueezy, savePurchase, verifyWebhookSignature } from "@/lib/lemonsqueezy";

export async function POST(request: Request) {
  initializeLemonSqueezy();

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  const valid = verifyWebhookSignature(rawBody, signature);

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    meta?: { event_name?: string };
    data?: {
      id?: string;
      attributes?: {
        user_email?: string;
        identifier?: string;
      };
    };
  };

  const eventName = payload.meta?.event_name;

  if (eventName?.includes("order") || eventName?.includes("subscription")) {
    const email = payload.data?.attributes?.user_email;
    const orderId = payload.data?.attributes?.identifier ?? payload.data?.id;

    if (email && orderId) {
      await savePurchase({
        email,
        orderId,
        productId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ ok: true });
}
