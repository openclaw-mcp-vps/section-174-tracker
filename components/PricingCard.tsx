import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  "5-year Section 174 amortization forecast",
  "Tax liability delta vs immediate deduction",
  "Runway compression estimate from phantom income",
  "Save multiple scenarios in your browser",
  "Export-ready projection table for your finance team",
];

export function PricingCard() {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  return (
    <Card className="border-[#3b7dd8]/40 bg-gradient-to-b from-[#0f1829] to-[#121b2c]">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8fb9ff]">
          Simple Pricing
        </p>
        <CardTitle className="text-4xl">
          $19<span className="text-lg text-[var(--muted-foreground)]">/month</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-[#d7dfeb]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#66a3ff]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {paymentLink ? (
          <a href={paymentLink} target="_blank" rel="noreferrer">
            <Button className="w-full" size="lg">
              Buy Access
            </Button>
          </a>
        ) : (
          <Button className="w-full" size="lg" disabled>
            Add `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` to enable checkout
          </Button>
        )}

        <p className="text-xs text-[var(--muted-foreground)]">
          After checkout, return here and unlock with the same email you used at
          purchase.
        </p>
      </CardContent>
    </Card>
  );
}
