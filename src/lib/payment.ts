import type { PackId } from "@/lib/packs";

export type PayCurrency = "MAD" | "EUR";

const STRIPE_EUR: Record<PackId, string> = {
  pro: "STRIPE_LINK_PRO_EUR",
  extra: "STRIPE_LINK_EXTRA_EUR",
  premium: "STRIPE_LINK_PREMIUM_EUR",
};

/** Liens Stripe (euros / hors Maroc) — mêmes URLs que virginmegastore.ma */
export function stripeLink(packId: PackId, currency: PayCurrency = "EUR"): string | undefined {
  if (currency !== "EUR") return undefined;
  const key = STRIPE_EUR[packId];
  const url = key ? process.env[key] : undefined;
  return url && /^https:\/\/(buy|checkout)\.stripe\.com\//.test(url) ? url : undefined;
}

export type RibBank = "attijari" | "cih";

export type RibPayload = {
  bank: string;
  holder: string;
  rib: string;
};

export function getRib(bank: RibBank): RibPayload | null {
  const map = {
    attijari: { name: "Attijariwafa bank", env: "RIB_ATTIJARI" },
    cih: { name: "CIH Bank", env: "RIB_CIH" },
  } as const;
  const meta = map[bank];
  const rib = (process.env[meta.env] ?? "").replace(/\D/g, "");
  const holder = process.env.RIB_HOLDER?.trim() || "";
  if (rib.length !== 24) return null;
  return { bank: meta.name, holder, rib };
}

export function formatRib(rib: string): string {
  const d = rib.replace(/\D/g, "");
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 22)} ${d.slice(22)}`;
}

/** Discours paiement (aligné virginmegastore.ma) */
export const PAYMENT_DISCOURSE = {
  mad: "Au Maroc : virement Attijariwafa bank ou CIH Bank, ou dépôt CashPlus / Wafacash. Envoyez le reçu au concierge pour activer.",
  eur: "Hors Maroc / MRE : carte bancaire en euros via Stripe (Visa / Mastercard). Joignez le reçu au concierge.",
  both: "Maroc : virement Attijariwafa / CIH ou dépôt CashPlus / Wafacash. International : carte (€) Stripe. Le reçu déclenche l'activation.",
} as const;
