export function getCheckoutUrl() {
  const productId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID;
  if (!productId) return "#";

  return `https://checkout.lemonsqueezy.com/buy/${productId}`;
}
