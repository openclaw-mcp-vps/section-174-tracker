import crypto from "node:crypto";

const COOKIE_NAME = "section174_access";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

interface AccessPayload {
  email: string;
  exp: number;
}

function getSigningSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET || "section174-dev-secret";
}

export function getAccessCookieName() {
  return COOKIE_NAME;
}

export function getAccessCookieMaxAge() {
  return ONE_YEAR_SECONDS;
}

export function createAccessCookieValue(email: string): string {
  const payload: AccessPayload = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + ONE_YEAR_SECONDS,
  };

  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(serialized)
    .digest("base64url");

  return `${serialized}.${signature}`;
}

export function verifyAccessCookieValue(value: string | undefined): AccessPayload | null {
  if (!value) {
    return null;
  }

  const [serialized, signature] = value.split(".");
  if (!serialized || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(serialized)
    .digest("base64url");

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const validSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!validSignature) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(serialized, "base64url").toString("utf8")) as AccessPayload;
    if (!parsed.email || !parsed.exp) {
      return null;
    }

    if (parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
