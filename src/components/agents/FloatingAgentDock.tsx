"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Bot,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { whatsappLink } from "@/lib/constants";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  {
    label: "Quel pack choisir ?",
    reply:
      "Pour démarrer : Pack Pro (299 DHS). Famille / multi-écrans : Extra (449 DHS) ou Premium (599 DHS) — jusqu'à 3 appareils installés, 1 flux actif. Je vous emmène vers /abonnement-iptv.",
    href: "/abonnement-iptv",
  },
  {
    label: "Installation Smart TV",
    reply:
      "Utilisez l'Instant Setup Wizard : LG, Samsung, Android, Xiaomi, Formuler, Apple… Guide dynamique sur /installation-tutoriels.",
    href: "/installation-tutoriels",
  },
  {
    label: "Freeze / buffering",
    reply:
      "Lancez le Live Network Diagnostic pour latence & débit, puis Anti-Freeze Extra/Premium. Outil : /test-connexion-serveur.",
    href: "/test-connexion-serveur",
  },
  {
    label: "Commander WhatsApp",
    reply:
      "Parfait — je prépare un message WhatsApp pour finaliser votre Abonnement IPTV Maroc.",
    href: null,
    wa: true,
  },
];

export function FloatingAgentDock() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Salam ! Je suis le concierge Shape IPTV Maroc. Posez une question technique ou choisissez une action rapide.",
    },
  ]);

  const waDefault = useMemo(
    () =>
      whatsappLink(
        "Bonjour Shape, je viens du concierge AI sur shape.ma et je souhaite un Abonnement IPTV."
      ),
    []
  );

  function pushBot(text: string) {
    setMessages((m) => [...m, { role: "bot", text }]);
  }

  function handleQuick(q: (typeof QUICK)[number]) {
    setMessages((m) => [...m, { role: "user", text: q.label }]);
    setTimeout(() => pushBot(q.reply), 250);
  }

  function onSend(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    const lower = text.toLowerCase();
    let reply =
      "Je peux vous orienter vers l'abonnement, l'installation ou le test réseau. Essayez aussi les boutons rapides ci-dessous.";
    if (lower.includes("prix") || lower.includes("pack") || lower.includes("abonnement")) {
      reply =
        "Tarifs Shape : Pro 299 DHS, Extra 449 DHS, Premium 599 DHS / an (sans euro). Détails sur /abonnement-iptv.";
    } else if (lower.includes("install") || lower.includes("smart")) {
      reply =
        "Pour Installation IPTV Smart TV Maroc, ouvrez /installation-tutoriels — le wizard adapte les étapes à votre appareil.";
    } else if (lower.includes("freeze") || lower.includes("buffer") || lower.includes("coupure")) {
      reply =
        "Pour un Serveur IPTV sans coupure Maroc, testez d'abord /test-connexion-serveur puis envisagez Extra/Premium Anti-Freeze.";
    } else if (lower.includes("whatsapp") || lower.includes("commander")) {
      reply =
        "Cliquez sur « WhatsApp checkout » ci-dessous pour finaliser avec un conseiller Shape.";
    }
    setTimeout(() => pushBot(reply), 300);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div className="flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-[#0c0e16]/95 shadow-2xl backdrop-blur-xl animate-float-in">
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-violet-700/40 to-teal-700/30 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-teal" />
              <div>
                <p className="text-sm font-semibold">Concierge Shape AI</p>
                <p className="text-[11px] text-muted">En ligne · fr-MA</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Réduire"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/10"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-white/5 text-foreground"
                    : "ml-auto bg-teal/20 text-teal-50"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => handleQuick(q)}
                  className="rounded-full border border-border bg-black/30 px-2.5 py-1 text-[11px] text-muted hover:border-teal hover:text-teal"
                >
                  {q.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/abonnement-iptv"
                className="inline-flex items-center gap-1 rounded-lg bg-purple/30 px-2.5 py-1.5 text-[11px] font-semibold text-purple-100"
              >
                <Sparkles className="h-3 w-3" /> Voir abonnements
              </Link>
              <a
                href={waDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg bg-[#25D366]/20 px-2.5 py-1.5 text-[11px] font-semibold text-[#86efac]"
              >
                <MessageCircle className="h-3 w-3" /> WhatsApp checkout
              </a>
            </div>
          </div>

          <form
            onSubmit={onSend}
            className="flex gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: prix pack Extra…"
              className="flex-1 rounded-xl border border-border bg-black/40 px-3 py-2 text-sm outline-none focus:border-teal"
            />
            <button
              type="submit"
              className="rounded-xl bg-teal p-2.5 text-[#042f2e]"
              aria-label="Envoyer"
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
        aria-label={open ? "Fermer le concierge" : "Ouvrir le concierge Shape"}
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>
    </div>
  );
}
