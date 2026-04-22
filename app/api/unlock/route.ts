import { NextResponse } from "next/server";

import {
  createAccessCookieValue,
  getAccessCookieMaxAge,
  getAccessCookieName,
} from "@/lib/access";
import { hasPaidEmail } from "@/lib/purchase-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, message: "Email is required." },
        { status: 400 },
      );
    }

    const paid = await hasPaidEmail(email);
    if (!paid) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "No completed purchase found for that email yet. If you just checked out, wait a minute and try again.",
        },
        { status: 403 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getAccessCookieName(),
      value: createAccessCookieValue(email),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getAccessCookieMaxAge(),
    });

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to unlock access." },
      { status: 500 },
    );
  }
}
