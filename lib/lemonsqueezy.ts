import * as lemonsqueezy from "@lemonsqueezy/lemonsqueezy.js";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "purchases.json");

export type PurchaseRecord = {
  orderId: string;
  email: string;
  productId?: string;
  createdAt: string;
};

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(signature, "utf8"));
  } catch {
    return false;
  }
}

async function readRecords() {
  try {
    const text = await fs.readFile(dataPath, "utf8");
    return JSON.parse(text) as PurchaseRecord[];
  } catch {
    return [];
  }
}

async function writeRecords(records: PurchaseRecord[]) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(records, null, 2), "utf8");
}

export async function savePurchase(record: PurchaseRecord) {
  const records = await readRecords();
  const exists = records.some(
    (entry) => entry.orderId === record.orderId || entry.email.toLowerCase() === record.email.toLowerCase(),
  );

  if (!exists) {
    records.push(record);
    await writeRecords(records);
  }
}

export async function hasPurchase(orderId: string, email: string) {
  const records = await readRecords();

  return records.some((entry) => {
    const sameOrder = entry.orderId === orderId;
    const sameEmail = entry.email.toLowerCase() === email.toLowerCase();
    return sameOrder && sameEmail;
  });
}

export function initializeLemonSqueezy() {
  // Keep the SDK referenced and ready for future server-side checkout creation.
  if (typeof lemonsqueezy === "object") {
    return true;
  }

  return false;
}
