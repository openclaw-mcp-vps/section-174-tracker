import { NextResponse } from "next/server";
import { z } from "zod";
import { hasPurchase } from "@/lib/lemonsqueezy";

const unlockSchema = z.object({
  orderId: z.string().min(2),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const json = (await request.json().catch(() => null)) as unknown;
  const parsed = unlockSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid order ID and checkout email." }, { status: 400 });
  }

  const allowed = await hasPurchase(parsed.data.orderId, parsed.data.email);

  if (!allowed) {
    return NextResponse.json(
      { error: "Purchase not found yet. If you just paid, wait 60 seconds and try again." },
      { status: 404 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "s174_access",
    value: "active",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
