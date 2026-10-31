"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { whatsappLink } from "@/lib/constants";

type Msg = { role: "bot" | "user"; text: string; href?: string };

const QUICK = [
  {
    label: "Quel pack choisir ?",
    reply:
      "Pour démarrer : Pack Pro (299 DHS). Famille / multi-écrans : Extra (449 DHS) ou Premium (599 DHS) — jusqu'à 3 appareils installés, 1 flux actif.",
    href: "/abonnement-iptv",
  },
  {
    label: "Installation Smart TV",
    reply:
      "Ouvrez l'Instant Setup Wizard : LG, Samsung, Android, Xiaomi, Formuler, Apple…",
    href: "/installation-tutoriels",
  },
  {
    label: "Freeze / buffering",
    reply:
      "Lancez le Live Network Diagnostic (latence & débit), puis Anti-Freeze Extra/Premium.",
    href: "/test-connexion-serveur",
  },
  {
    label: "FAQ & remboursement",
    reply:
      "Réponses paiement DHS, multi-écrans et garantie — je vous ouvre la FAQ.",
    href: "/faq",
  },
  {
    label: "Contact concierge",
    reply:
      "L'agent de triage prépare un WhatsApp selon votre demande (abonnement, test, support).",
    href: "/contact",
  },
  {
    label: "Commander WhatsApp",
    reply:
      "Parfait — je prépare un message WhatsApp pour finaliser votre Abonnement IPTV Maroc.",
    href: null,
    wa: true,
  },
] as const;

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

  function pushBot(text: string, href?: string) {
    setMessages((m) => [...m, { role: "bot", text, href }]);
  }

  function handleQuick(q: (typeof QUICK)[number]) {
    setMessages((m) => [...m, { role: "user", text: q.label }]);
    setTimeout(() => {
      pushBot(q.reply, q.href ?? undefined);
      if (q.href) router.push(q.href);
      if ("wa" in q && q.wa) {
        window.open(waDefault, "_blank", "noopener,noreferrer");
      }
    }, 220);
  }

  function onSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    const lower = text.toLowerCase();
    let reply =
      "Je peux vous orienter vers l'abonnement, l'installation, le test réseau, la FAQ ou le contact.";
    let href: string | undefined;

    if (
      lower.includes("prix") ||
      lower.includes("pack") ||
      lower.includes("abonnement") ||
      lower.includes("extra") ||
      lower.includes("premium")
    ) {
      reply =
        "Tarifs Shape : Pro 299 DHS, Extra 449 DHS, Premium 599 DHS / an (sans euro). J'ouvre la page abonnement.";
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
        "Cliquez sur « WhatsApp checkout » ou dites « pack Extra » pour affiner.";
    }

    setTimeout(() => {
      pushBot(reply, href);
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
          className="flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-[#0c0e16]/95 shadow-2xl backdrop-blur-xl animate-float-in"
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

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
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
              </div>
            ))}
            <nav aria-label="Actions rapides du concierge" className="flex flex-wrap gap-2 pt-1">
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
                <MessageCircle className="h-3 w-3" aria-hidden /> WhatsApp checkout
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
              placeholder="Ex: prix pack Extra…"
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
