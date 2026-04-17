"use client";

import { useState } from "react";
import Script from "next/script";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCheckoutUrl } from "@/lib/checkout";

const checkoutUrl = getCheckoutUrl();

export function PricingCard() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const unlock = async () => {
    setStatus("Checking your purchase...");

    const response = await fetch("/api/paywall/unlock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, email }),
    });

    if (response.ok) {
      setStatus("Access granted. Redirecting to dashboard...");
      window.location.href = "/dashboard";
      return;
    }

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    setStatus(payload?.error ?? "Could not verify this purchase yet. Try again in one minute.");
  };

  return (
    <Card className="mx-auto max-w-xl">
      <Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="afterInteractive" />

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-zinc-100">Section 174 Tracker Pro</h3>
        <p className="mt-2 text-zinc-400">
          Model the full 5-year tax drag, plan your cash buffer, and avoid surprise IRS checks.
        </p>
      </div>

      <div className="mt-6 flex items-end justify-center gap-2">
        <span className="text-4xl font-bold text-zinc-100">$19</span>
        <span className="pb-1 text-zinc-400">/month</span>
      </div>

      <ul className="mt-6 space-y-2 text-sm text-zinc-300">
        <li>5-year Section 174 amortization engine</li>
        <li>Phantom-income tax exposure by year</li>
        <li>Cash runway impact under old vs new tax rules</li>
        <li>Saved access via secure HTTP-only paywall cookie</li>
      </ul>

      <a
        href={checkoutUrl}
        className="lemonsqueezy-button mt-6 block rounded-md bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-black hover:bg-emerald-400"
      >
        Start Pro Access
      </a>

      <div className="mt-6 border-t border-zinc-800 pt-6">
        <p className="text-sm font-medium text-zinc-200">Already purchased?</p>
        <p className="mt-1 text-xs text-zinc-500">
          Enter your Lemon Squeezy order ID and checkout email to unlock access.
        </p>

        <div className="mt-4 grid gap-3">
          <div>
            <Label htmlFor="orderId">Order ID</Label>
            <Input
              id="orderId"
              placeholder="e.g. 123456"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Checkout Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={unlock}>
            Unlock Access
          </Button>
          {status ? <p className="text-xs text-zinc-400">{status}</p> : null}
        </div>
      </div>
    </Card>
  );
}
