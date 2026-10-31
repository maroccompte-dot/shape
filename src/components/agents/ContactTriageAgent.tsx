"use client";

import { useMemo, useState, type FormEvent } from "react";
import { MessageCircle, Send } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/constants";

const REQUEST_TYPES = [
  {
    id: "abonnement",
    label: "Nouvel Abonnement",
    prompt: "Je souhaite souscrire un nouvel Abonnement IPTV Maroc",
  },
  {
    id: "test",
    label: "Test Rapide",
    prompt: "Je souhaite un test rapide IPTV avant abonnement",
  },
  {
    id: "support",
    label: "Assistance Technique",
    prompt: "J'ai besoin d'assistance technique Shape IPTV",
  },
] as const;

const DEVICES = [
  "LG webOS",
  "Samsung Tizen",
  "Android TV",
  "Xiaomi Mi Box",
  "Formuler Box",
  "Apple TV / iPhone",
  "Windows / Mac",
  "Autre",
] as const;

const PACKS = ["Pro (299 DHS)", "Extra (449 DHS)", "Premium (599 DHS)", "Je ne sais pas encore"] as const;

export function ContactTriageAgent() {
  const [request, setRequest] = useState<(typeof REQUEST_TYPES)[number]["id"]>("abonnement");
  const [device, setDevice] = useState<(typeof DEVICES)[number]>("Android TV");
  const [pack, setPack] = useState<(typeof PACKS)[number]>("Je ne sais pas encore");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  const message = useMemo(() => {
    const type = REQUEST_TYPES.find((r) => r.id === request)!;
    return [
      `Bonjour Shape (${SITE.domain}),`,
      type.prompt + ".",
      `Appareil : ${device}.`,
      `Pack intéressé : ${pack}.`,
      name ? `Nom : ${name}.` : null,
      city ? `Ville : ${city}.` : null,
      "Merci !",
    ]
      .filter(Boolean)
      .join(" ");
  }, [request, device, pack, name, city]);

  const wa = whatsappLink(message);

  function onSubmitForm(e: FormEvent) {
    e.preventDefault();
    setFormStatus("sent");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="glass rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Contact Triage Agent</h2>
        <p className="mt-2 text-sm text-muted">
          Sélectionnez le type de demande et votre appareil : l&apos;agent génère
          un message WhatsApp prérempli vers le concierge Shape.
        </p>

        <div className="mt-5 space-y-4">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Type de demande</legend>
            <div className="grid gap-2">
              {REQUEST_TYPES.map((r) => (
                <label
                  key={r.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-black/25 px-3 py-2.5 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/10"
                >
                  <input
                    type="radio"
                    name="request"
                    checked={request === r.id}
                    onChange={() => setRequest(r.id)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Appareil</span>
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value as (typeof DEVICES)[number])}
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
            >
              {DEVICES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Pack</span>
            <select
              value={pack}
              onChange={(e) => setPack(e.target.value as (typeof PACKS)[number])}
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
            >
              {PACKS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold">Prénom (optionnel)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
                placeholder="Youssef"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-semibold">Ville (optionnel)</span>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
                placeholder="Casablanca"
              />
            </label>
          </div>

          <div className="rounded-xl border border-border bg-black/30 p-3 text-xs leading-relaxed text-muted">
            {message}
          </div>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-[#052e16]"
          >
            <MessageCircle className="h-4 w-4" />
            Ouvrir WhatsApp prérempli
          </a>
        </div>
      </section>

      <section className="glass rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold">Formulaire classique</h2>
        <p className="mt-2 text-sm text-muted">
          Laissez vos coordonnées — nous répondons sous 24 h ouvrées (souvent
          plus vite via WhatsApp).
        </p>
        <form onSubmit={onSubmitForm} className="mt-5 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Nom complet</span>
            <input
              required
              name="fullname"
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Email</span>
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Téléphone Maroc</span>
            <input
              required
              name="phone"
              placeholder="06XXXXXXXX"
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold">Message</span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 outline-none focus:border-teal"
              defaultValue=""
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white"
          >
            <Send className="h-4 w-4" />
            Envoyer
          </button>
          {formStatus === "sent" ? (
            <p className="text-sm text-teal">
              Merci — message enregistré. Pour une réponse immédiate, utilisez
              aussi WhatsApp.
            </p>
          ) : null}
        </form>
        <p className="mt-4 text-xs text-muted">
          Email direct :{" "}
          <a href={`mailto:${SITE.email}`} className="text-teal underline">
            {SITE.email}
          </a>
        </p>
      </section>
    </div>
  );
}
