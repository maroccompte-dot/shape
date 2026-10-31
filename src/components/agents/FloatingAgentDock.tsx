"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Building2,
  Check,
  Copy,
  CreditCard,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import type { PackId } from "@/lib/packs";
import { PACKS } from "@/lib/packs";

type Rib = { bank: string; holder: string; rib: string };

type PayPanel = {
  kind: "choose" | "rib" | "stripe";
  bank?: "attijari" | "cih";
  packId?: PackId;
};

type Msg = {
  role: "bot" | "user";
  text: string;
  href?: string;
  pay?: PayPanel;
};

const QUICK = [
  {
    label: "Quel pack choisir ?",
    reply:
      "Pour démarrer : Pack Pro (299 DHS). Famille / multi-écrans : Extra (449 DHS) ou Premium (599 DHS) — jusqu'à 3 appareils installés, 1 flux actif.",
    href: "/abonnement-iptv" as string | null,
  },
  {
    label: "Installation Smart TV",
    reply:
      "Ouvrez l'Instant Setup Wizard : LG, Samsung, Android, Xiaomi, Formuler, Apple…",
    href: "/installation-tutoriels" as string | null,
  },
  {
    label: "Freeze / buffering",
    reply:
      "Lancez le Live Network Diagnostic (latence & débit), puis Anti-Freeze Extra/Premium.",
    href: "/test-connexion-serveur" as string | null,
  },
  {
    label: "FAQ & remboursement",
    reply: "Réponses paiement, multi-écrans et garantie — je vous ouvre la FAQ.",
    href: "/faq" as string | null,
  },
  {
    label: "Payer (RIB / Stripe)",
    reply:
      "Comme sur Virgin Megastore : Maroc = virement Attijariwafa ou CIH (ou CashPlus / Wafacash) ; hors Maroc = carte Stripe (€). Choisissez ci-dessous.",
    href: null,
    pay: { kind: "choose" } as PayPanel,
  },
  {
    label: "Commander WhatsApp",
    reply:
      "Parfait — je prépare un message WhatsApp pour finaliser votre Abonnement IPTV Maroc.",
    href: null,
    wa: true,
  },
] as const;

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
    <div className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5">
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate font-mono text-[11px] text-white">{display}</p>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] font-semibold text-violet-100"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setOk(true);
          setTimeout(() => setOk(false), 1400);
        }}
      >
        {ok ? <Check className="h-3 w-3 text-teal" /> : <Copy className="h-3 w-3" />}
        {ok ? "OK" : "Copier"}
      </button>
    </div>
  );
}

function RibCard({ bank, packId }: { bank: "attijari" | "cih"; packId?: PackId }) {
  const [rib, setRib] = useState<Rib | null>(null);
  const [err, setErr] = useState(false);
  const pack = packId ? PACKS.find((p) => p.id === packId) : undefined;

  useEffect(() => {
    let alive = true;
    fetch(`/api/rib?bank=${bank}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Rib) => alive && setRib(data))
      .catch(() => alive && setErr(true));
    return () => {
      alive = false;
    };
  }, [bank]);

  if (err) {
    return (
      <p className="mt-2 text-[11px] text-muted">
        RIB indisponible — utilisez WhatsApp checkout.
      </p>
    );
  }
  if (!rib) {
    return <p className="mt-2 text-[11px] text-muted">Chargement du RIB…</p>;
  }

  const grouped = `${rib.rib.slice(0, 3)} ${rib.rib.slice(3, 6)} ${rib.rib.slice(6, 22)} ${rib.rib.slice(22)}`;

  return (
    <div className="mt-2 space-y-1.5 rounded-xl border border-teal/30 bg-black/35 p-2.5">
      <p className="text-xs font-bold text-white">Virement · {rib.bank}</p>
      {rib.holder ? (
        <CopyRow label="Titulaire" display={rib.holder} value={rib.holder} />
      ) : null}
      <CopyRow label="RIB (24 chiffres)" display={grouped} value={rib.rib} />
      {pack ? (
        <CopyRow
          label={`Montant · Pack ${pack.name}`}
          display={`${pack.priceDhs} DHS`}
          value={String(pack.priceDhs)}
        />
      ) : null}
      <p className="text-[10px] leading-relaxed text-muted">
        Collez le RIB dans votre app bancaire, virez le montant exact, puis
        envoyez ici la capture / référence du virement 📷.
      </p>
    </div>
  );
}

function StripeCard({ packId }: { packId?: PackId }) {
  const packs = packId ? PACKS.filter((p) => p.id === packId) : PACKS;
  return (
    <div className="mt-2 space-y-1.5 rounded-xl border border-[#635bff]/40 bg-black/35 p-2.5">
      <p className="text-xs font-bold text-white">Carte bancaire · Stripe (€)</p>
      <p className="text-[10px] text-muted">
        Hors Maroc / MRE — mêmes liens Stripe que Virgin Megastore.
      </p>
      {packs.map((p) => (
        <a
          key={p.id}
          href={`/api/pay/${p.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-9 items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-[#635bff]/90 to-[#0a2540] px-2.5 text-[11px] font-semibold text-white"
        >
          <span className="inline-flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5" />
            Pack {p.name}
          </span>
          <span>Payer →</span>
        </a>
      ))}
    </div>
  );
}

function PayChooser({
  onRib,
  onStripe,
}: {
  onRib: (bank: "attijari" | "cih") => void;
  onStripe: () => void;
}) {
  return (
    <div className="mt-2 space-y-1.5 rounded-xl border border-purple/30 bg-black/35 p-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">
        Moyen de paiement
      </p>
      <button
        type="button"
        onClick={() => onRib("attijari")}
        className="flex min-h-9 w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 text-left text-[11px] font-semibold text-violet-50 hover:border-teal"
      >
        <Building2 className="h-3.5 w-3.5 text-teal" />
        RIB Attijariwafa bank (Maroc)
      </button>
      <button
        type="button"
        onClick={() => onRib("cih")}
        className="flex min-h-9 w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 text-left text-[11px] font-semibold text-violet-50 hover:border-teal"
      >
        <Building2 className="h-3.5 w-3.5 text-teal" />
        RIB CIH Bank (Maroc)
      </button>
      <button
        type="button"
        onClick={onStripe}
        className="flex min-h-9 w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 text-left text-[11px] font-semibold text-violet-50 hover:border-[#635bff]"
      >
        <CreditCard className="h-3.5 w-3.5 text-[#a5a0ff]" />
        Stripe carte (€) — hors Maroc
      </button>
      <p className="text-[10px] text-muted">
        CashPlus / Wafacash : demandez les infos via WhatsApp checkout.
      </p>
    </div>
  );
}

export function FloatingAgentDock() {
  const router = useRouter();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Salam ! Concierge Shape IPTV Maroc. Choisissez une action rapide ou posez une question — je navigue pour vous.",
    },
  ]);

  const waDefault = useMemo(
    () =>
      whatsappLink(
        "Bonjour Shape, je viens du concierge AI sur shape.ma et je souhaite un Abonnement IPTV."
      ),
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button, a, input")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function pushBot(text: string, opts?: { href?: string; pay?: PayPanel }) {
    setMessages((m) => [
      ...m,
      { role: "bot", text, href: opts?.href, pay: opts?.pay },
    ]);
  }

  function handleQuick(q: (typeof QUICK)[number]) {
    setMessages((m) => [...m, { role: "user", text: q.label }]);
    setTimeout(() => {
      pushBot(q.reply, {
        href: q.href ?? undefined,
        pay: "pay" in q ? q.pay : undefined,
      });
      if (q.href) router.push(q.href);
      if ("wa" in q && q.wa) {
        window.open(waDefault, "_blank", "noopener,noreferrer");
      }
    }, 220);
  }

  function showPayChooser(extra = "") {
    pushBot(
      `${extra}Maroc : virement Attijariwafa ou CIH (même RIB que Virgin), ou CashPlus / Wafacash. Hors Maroc : Stripe (€).`.trim(),
      { pay: { kind: "choose" } }
    );
  }

  function onSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    const lower = text.toLowerCase();

    setTimeout(() => {
      if (
        lower.includes("rib") ||
        lower.includes("virement") ||
        lower.includes("attijari") ||
        lower.includes("cih") ||
        lower.includes("paiement") ||
        lower.includes("stripe") ||
        lower.includes("payer") ||
        lower.includes("cashplus") ||
        lower.includes("wafacash")
      ) {
        const bank: "attijari" | "cih" | undefined = lower.includes("cih")
          ? "cih"
          : lower.includes("attijari")
            ? "attijari"
            : undefined;
        if (lower.includes("stripe") || lower.includes("carte") || lower.includes("euro")) {
          pushBot("Voici les liens Stripe (€) — hors Maroc / MRE.", {
            pay: { kind: "stripe" },
          });
          return;
        }
        if (bank) {
          pushBot(`Voici le RIB ${bank === "cih" ? "CIH Bank" : "Attijariwafa"}.`, {
            pay: { kind: "rib", bank },
          });
          return;
        }
        showPayChooser();
        return;
      }

      let reply =
        "Je peux vous orienter vers l'abonnement, l'installation, le test réseau, la FAQ, le paiement ou le contact.";
      let href: string | undefined;

      if (
        lower.includes("prix") ||
        lower.includes("pack") ||
        lower.includes("abonnement") ||
        lower.includes("extra") ||
        lower.includes("premium")
      ) {
        reply =
          "Tarifs Shape : Pro 299 DHS, Extra 449 DHS, Premium 599 DHS / an. Pour payer, dites « payer » — RIB ou Stripe dans le chat.";
        href = "/abonnement-iptv";
      } else if (lower.includes("install") || lower.includes("smart") || lower.includes("tutoriel")) {
        reply =
          "Pour Installation IPTV Smart TV Maroc, j'ouvre le wizard d'installation.";
        href = "/installation-tutoriels";
      } else if (
        lower.includes("freeze") ||
        lower.includes("buffer") ||
        lower.includes("coupure") ||
        lower.includes("réseau") ||
        lower.includes("reseau")
      ) {
        reply =
          "Pour un Serveur IPTV sans coupure Maroc, j'ouvre le diagnostic réseau.";
        href = "/test-connexion-serveur";
      } else if (lower.includes("faq") || lower.includes("rembours")) {
        reply = "J'ouvre la FAQ IPTV Maroc.";
        href = "/faq";
      } else if (lower.includes("contact") || lower.includes("support")) {
        reply = "J'ouvre le triage contact / WhatsApp.";
        href = "/contact";
      } else if (lower.includes("blog") || lower.includes("guide")) {
        reply = "Guides fibre, buffering et multi-écrans — j'ouvre le blog.";
        href = "/blog";
      } else if (lower.includes("whatsapp") || lower.includes("commander")) {
        reply =
          "Cliquez sur « WhatsApp checkout » ou dites « payer » pour RIB / Stripe.";
      }

      pushBot(reply, { href });
      if (href) router.push(href);
    }, 280);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-[#0c0e16]/95 shadow-2xl backdrop-blur-xl animate-float-in"
        >
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-violet-700/40 to-teal-700/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-teal" aria-hidden />
              <div>
                <p id={titleId} className="text-sm font-semibold">
                  Concierge Shape AI
                </p>
                <p className="text-[11px] text-muted">
                  Navigation agentique · fr-MA
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Réduire le concierge"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/10"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto px-3 py-3"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`max-w-[95%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-white/5 text-foreground"
                    : "ml-auto bg-teal/20 text-teal-50"
                }`}
              >
                <p>{msg.text}</p>
                {msg.href ? (
                  <Link
                    href={msg.href}
                    className="mt-1.5 inline-flex text-[11px] font-semibold text-teal underline"
                  >
                    Ouvrir {msg.href} →
                  </Link>
                ) : null}
                {msg.pay?.kind === "choose" ? (
                  <PayChooser
                    onRib={(bank) =>
                      pushBot(
                        `Voici le RIB ${bank === "cih" ? "CIH Bank" : "Attijariwafa bank"}.`,
                        { pay: { kind: "rib", bank } }
                      )
                    }
                    onStripe={() =>
                      pushBot("Liens Stripe (€) — hors Maroc / MRE.", {
                        pay: { kind: "stripe" },
                      })
                    }
                  />
                ) : null}
                {msg.pay?.kind === "rib" && msg.pay.bank ? (
                  <RibCard bank={msg.pay.bank} packId={msg.pay.packId} />
                ) : null}
                {msg.pay?.kind === "stripe" ? (
                  <StripeCard packId={msg.pay.packId} />
                ) : null}
              </div>
            ))}
            <nav
              aria-label="Actions rapides du concierge"
              className="flex flex-wrap gap-2 pt-1"
            >
              {QUICK.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => handleQuick(q)}
                  className="min-h-9 rounded-full border border-border bg-black/30 px-3 py-1.5 text-[11px] text-violet-100 hover:border-teal hover:text-teal"
                >
                  {q.label}
                </button>
              ))}
            </nav>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/abonnement-iptv"
                className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-purple/30 px-2.5 py-1.5 text-[11px] font-semibold text-purple-100"
              >
                <Sparkles className="h-3 w-3" aria-hidden /> Voir abonnements
              </Link>
              <a
                href={waDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1 rounded-lg bg-[#25D366]/20 px-2.5 py-1.5 text-[11px] font-semibold text-[#86efac]"
              >
                <MessageCircle className="h-3 w-3" aria-hidden /> WhatsApp
                checkout
              </a>
            </div>
          </div>

          <form
            onSubmit={onSend}
            className="flex gap-2 border-t border-border p-3"
            aria-label="Message au concierge"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: payer · RIB CIH · Stripe…"
              aria-label="Votre question IPTV"
              className="min-h-11 flex-1 rounded-xl border border-border bg-black/40 px-3 py-2 text-sm outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="min-h-11 min-w-11 rounded-xl bg-teal p-2.5 text-[#042f2e]"
              aria-label="Envoyer le message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-teal-500 text-white shadow-[0_0_32px_rgba(20,184,166,0.45)] transition hover:scale-105"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        aria-label={open ? "Fermer le concierge" : "Ouvrir le concierge Shape"}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
}
