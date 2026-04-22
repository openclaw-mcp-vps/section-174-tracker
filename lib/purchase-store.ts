import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const PURCHASES_PATH = path.join(DATA_DIR, "purchases.json");

export interface PurchaseRecord {
  email: string;
  stripeCheckoutId: string;
  amount: number;
  currency: string;
  purchasedAt: string;
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(PURCHASES_PATH);
  } catch {
    await fs.writeFile(PURCHASES_PATH, "[]", "utf8");
  }
}

export async function readPurchases(): Promise<PurchaseRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(PURCHASES_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as PurchaseRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function upsertPurchase(record: PurchaseRecord): Promise<void> {
  const purchases = await readPurchases();
  const index = purchases.findIndex(
    (item) => item.stripeCheckoutId === record.stripeCheckoutId,
  );

  if (index >= 0) {
    purchases[index] = record;
  } else {
    purchases.push(record);
  }

  await fs.writeFile(PURCHASES_PATH, JSON.stringify(purchases, null, 2), "utf8");
}

export async function hasPaidEmail(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const purchases = await readPurchases();
  return purchases.some((record) => record.email.trim().toLowerCase() === normalized);
}
