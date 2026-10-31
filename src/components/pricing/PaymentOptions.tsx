"use client";

import { useEffect, useState } from "react";
import { Building2, Copy, CreditCard, Check } from "lucide-react";
import type { PackId } from "@/lib/packs";
import { PAYMENT_DISCOURSE } from "@/lib/payment";
import clsx from "clsx";

type Rib = { bank: string; holder: string; rib: string };

const STRIPE_PATH: Record<PackId, string> = {
  pro: "/api/pay/pro",
  extra: "/api/pay/extra",
  premium: "/api/pay/premium",
};

function CopyRow({
  label,
  display,
  value,
}: {
  label: string;
  display: string;
  value: string;
}) {
  const [ok, setOk] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate font-mono text-sm text-white">{display}</p>
      </div>
      <button
        type="button"
        className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg bg-white/10 px-2.5 text-xs font-semibold text-violet-100 hover:bg-white/15"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        }}
      >
        {ok ? <Check className="h-3.5 w-3.5 text-teal" /> : <Copy className="h-3.5 w-3.5" />}
        {ok ? "Copié" : "Copier"}
      </button>
    </div>
  );
}

function RibPanel({ bank }: { bank: "attijari" | "cih" }) {
  const [rib, setRib] = useState<Rib | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/rib?bank=${bank}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("fail");
        return r.json();
      })
      .then((data: Rib) => {
        if (alive) setRib(data);
      })
      .catch(() => {
        if (alive) setErr(true);
      });
    return () => {
      alive = false;
    };
  }, [bank]);

  if (err) {
    return (
      <p className="text-sm text-muted">
        RIB indisponible — contactez le concierge WhatsApp.
      </p>
    );
  }
  if (!rib) {
    return <p className="text-sm text-muted">Chargement du RIB…</p>;
  }

  const grouped = `${rib.rib.slice(0, 3)} ${rib.rib.slice(3, 6)} ${rib.rib.slice(6, 22)} ${rib.rib.slice(22)}`;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-white">Virement · {rib.bank}</p>
      {rib.holder ? (
        <CopyRow label="Titulaire" display={rib.holder} value={rib.holder} />
      ) : null}
      <CopyRow label="RIB (24 chiffres)" display={grouped} value={rib.rib} />
      <p className="text-xs text-muted">
        Virez le montant exact du pack, puis envoyez la capture / référence au
        concierge Shape pour activation.
      </p>
    </div>
  );
}

export function PaymentOptions({ packId }: { packId: PackId }) {
  const [mode, setMode] = useState<"mad" | "eur">("mad");
  const [bank, setBank] = useState<"attijari" | "cih">("attijari");

  return (
    <div className="mt-4 rounded-2xl border border-purple/20 bg-[#0c0a14]/80 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
        Paiement
      </p>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("mad")}
          className={clsx(
            "min-h-9 flex-1 rounded-xl px-3 text-xs font-semibold",
            mode === "mad"
              ? "bg-purple text-white"
              : "border border-white/10 text-muted hover:text-white"
          )}
        >
          Maroc (DH)
        </button>
        <button
          type="button"
          onClick={() => setMode("eur")}
          className={clsx(
            "min-h-9 flex-1 rounded-xl px-3 text-xs font-semibold",
            mode === "eur"
              ? "bg-purple text-white"
              : "border border-white/10 text-muted hover:text-white"
          )}
        >
          International (€)
        </button>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-muted">
        {mode === "mad" ? PAYMENT_DISCOURSE.mad : PAYMENT_DISCOURSE.eur}
      </p>

      {mode === "mad" ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(
              [
                ["attijari", "Attijariwafa"],
                ["cih", "CIH Bank"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBank(id)}
                className={clsx(
                  "inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold",
                  bank === id
                    ? "bg-teal/20 text-teal"
                    : "border border-white/10 text-muted"
                )}
              >
                <Building2 className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          <RibPanel bank={bank} />
        </div>
      ) : (
        <a
          href={STRIPE_PATH[packId]}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#635bff] to-[#0a2540] text-sm font-semibold text-white"
        >
          <CreditCard className="h-4 w-4" />
          Payer par carte (Stripe)
        </a>
      )}
    </div>
  );
}
