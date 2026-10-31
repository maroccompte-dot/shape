"use client";

import { useMemo, useState } from "react";
import {
  Apple,
  Box,
  CheckCircle2,
  Monitor,
  Smartphone,
  Tv,
} from "lucide-react";
import Link from "next/link";

type DeviceId =
  | "lg"
  | "samsung"
  | "android"
  | "xiaomi"
  | "formuler"
  | "apple"
  | "pc";

const DEVICES: {
  id: DeviceId;
  label: string;
  icon: typeof Tv;
}[] = [
  { id: "lg", label: "LG webOS", icon: Tv },
  { id: "samsung", label: "Samsung Tizen", icon: Tv },
  { id: "android", label: "Android TV", icon: Monitor },
  { id: "xiaomi", label: "Xiaomi Mi Box", icon: Box },
  { id: "formuler", label: "Formuler Box", icon: Box },
  { id: "apple", label: "Apple TV / iPhone", icon: Apple },
  { id: "pc", label: "Windows / Mac", icon: Smartphone },
];

const GUIDES: Record<DeviceId, string[]> = {
  lg: [
    "Ouvrez le Content Store LG et installez « IPTV Smarters » ou « SS IPTV ».",
    "Lancez l'app → Login with Xtream Codes API.",
    "Saisissez l'URL serveur Shape, username et password reçus après commande.",
    "Réglages → Player → Hardware decoder ON, qualité Auto.",
    "Connectez la TV en Ethernet ou Wi-Fi 5 GHz (Maroc Telecom / Inwi / Orange).",
  ],
  samsung: [
    "Installez Smart IPTV ou SS IPTV depuis Apps Samsung.",
    "Notez le Device ID affiché et activez-le si l'app le demande.",
    "Importez la playlist M3U ou les identifiants XC Shape.",
    "Désactivez le mode économie d'énergie agressif dans les paramètres TV.",
    "Préférez Wi-Fi 5 GHz ou câble Ethernet pour le Direct Live.",
  ],
  android: [
    "Installez TiviMate ou IPTV Smarters Pro via Google Play.",
    "Ajoutez un nouvel abonnement → Xtream Codes.",
    "Collez l'hôte Shape + login / mot de passe.",
    "Autorisez le stockage et le réseau ; désactivez l'optimisation batterie.",
    "Dans TiviMate, activez External Player (VLC) si besoin pour le 4K.",
  ],
  xiaomi: [
    "Activez les sources inconnues si vous installez un APK partenaire Shape.",
    "Installez OTT Navigator ou TiviMate.",
    "Configurez le profil XC avec vos accès Shape.",
    "Fixez le DNS box sur 1.1.1.1 ou 8.8.8.8.",
    "Testez un canal HD puis un canal 4K (packs Extra / Premium).",
  ],
  formuler: [
    "Ouvrez MyTVOnline 2 (préinstallé sur Formuler).",
    "Portal → Add Xtream Codes Portal.",
    "Entrez Name = Shape, puis URL / user / pass.",
    "Laissez le buffer sur Normal ; activez Hardware Acceleration.",
    "Redémarrez la box après la première synchro EPG.",
  ],
  apple: [
    "Sur Apple TV : App Store → IPTV Smarters ou GSE Smart IPTV.",
    "Sur iPhone / iPad : même app via l'App Store.",
    "Ajoutez Xtream Codes avec l'URL Shape fournie.",
    "Autorisez le réseau local (iOS) pour un multicast stable.",
    "Une seule session active à la fois sur Extra / Premium.",
  ],
  pc: [
    "Windows : IPTV Smarters Desktop ou VLC + playlist M3U Shape.",
    "macOS : IINA / VLC ou Smarters macOS.",
    "Importez M3U ou XC selon le message WhatsApp d'activation.",
    "Fermez les VPN lointains ; utilisez DNS Cloudflare.",
    "Pour le 4K, vérifiez GPU / décodage matériel activé.",
  ],
};

export function InstantSetupWizard() {
  const [device, setDevice] = useState<DeviceId>("lg");
  const steps = useMemo(() => GUIDES[device], [device]);
  const label = DEVICES.find((d) => d.id === device)?.label ?? "";

  return (
    <section className="glass rounded-2xl border border-border p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold sm:text-2xl">
        Instant Setup Wizard
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Sélectionnez votre appareil exact pour générer un guide d&apos;Installation
        IPTV Smart TV Maroc étape par étape — compatible Shape Pro, Extra et
        Premium.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {DEVICES.map(({ id, label: l, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setDevice(id)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm transition ${
              device === id
                ? "border-teal bg-teal/15 text-white"
                : "border-border bg-black/20 text-muted hover:border-white/20 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm font-semibold text-teal">
          Configuration {label} — {steps.length} étapes
        </p>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-border bg-black/25 p-4 animate-float-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple/30 text-xs font-bold text-purple">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground/90">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-black/20 p-4 text-sm">
        <CheckCircle2 className="h-5 w-5 text-success" />
        <span>
          Pas encore d&apos;identifiants ? Souscrivez un{" "}
          <Link href="/abonnement-iptv" className="font-semibold text-teal underline">
            Abonnement IPTV Maroc
          </Link>{" "}
          puis revenez ici.
        </span>
      </div>
    </section>
  );
}
