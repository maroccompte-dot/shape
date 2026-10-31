import { getRib, type RibBank } from "@/lib/payment";

export const runtime = "nodejs";

const BANKS: RibBank[] = ["attijari", "cih"];

export async function GET(req: Request) {
  const headers = {
    "Cache-Control": "no-store",
  };
  const url = new URL(req.url);
  const requested = (url.searchParams.get("bank") || "attijari").toLowerCase();
  const bank: RibBank =
    requested === "cih" && getRib("cih") ? "cih" : "attijari";

  if (!BANKS.includes(bank)) {
    return Response.json({ error: "invalid_bank" }, { status: 400, headers });
  }

  const rib = getRib(bank);
  if (!rib) {
    return Response.json({ error: "unavailable" }, { status: 503, headers });
  }

  return Response.json(rib, { headers });
}
