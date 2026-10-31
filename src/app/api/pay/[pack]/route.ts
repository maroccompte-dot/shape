import { NextRequest } from "next/server";
import { stripeLink } from "@/lib/payment";
import type { PackId } from "@/lib/packs";

export const runtime = "nodejs";

const PACKS: PackId[] = ["pro", "extra", "premium"];

type Ctx = { params: Promise<{ pack: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { pack: raw } = await ctx.params;
  const pack = raw.toLowerCase() as PackId;
  if (!PACKS.includes(pack)) {
    return Response.redirect(new URL("/abonnement-iptv", _req.url), 302);
  }

  const url = stripeLink(pack, "EUR");
  if (url) {
    return Response.redirect(url, 302);
  }

  // Pas de lien Stripe : renvoyer vers le concierge / contact
  return Response.redirect(new URL("/contact?pay=stripe", _req.url), 302);
}
