import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

let initialized = false;

export function initLemonSqueezy() {
  if (initialized) {
    return;
  }

  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    return;
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error("Lemon Squeezy setup error", error);
    },
  });

  initialized = true;
}
