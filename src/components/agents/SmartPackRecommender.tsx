"use client";

import { useMemo, useState } from "react";
import { Sparkles, Tv, Wifi, MonitorSmartphone } from "lucide-react";
import { getPack, type PackId } from "@/lib/packs";
import { whatsappLink } from "@/lib/constants";
import Link from "next/link";

type Quality = "hd" | "fhd" | "uhd";
type Devices = "1" | "2" | "3";
type Usage = "basic" | "family" | "premium";

export function SmartPackRecommender() {
  const [quality, setQuality] = useState<Quality>("fhd");
  const [devices, setDevices] = useState<Devices>("1");
  const [usage, setUsage] = useState<Usage>("family");

  const recommendation = useMemo(() => {
    let id: PackId = "pro";
    let reason =
      "Le pack Pro couvre HD/FHD, Anti-Freeze et l'activation PRO pour démarrer sereinement.";

    if (quality === "uhd" || usage === "premium" || devices === "3") {
      id = "premium";
      reason =
        "Le pack Premium offre 4K UHD, serveur VPS dédié, Anti-Freeze 2.2 et installation jusqu'à 3 appareils (1 flux actif) — idéal pour une expérience VIP sans coupure.";
    } else if (
      quality === "fhd" ||
      usage === "family" ||
      devices === "2" ||
      Number(devices) > 1
    ) {
      id = "extra";
      reason =
        "Le pack Extra débloque HD/FHD/4K, catalogue XXL et installation jusqu'à 3 appareils avec connexion non simultanée pour stabilité maximale.";
    }

    if (quality === "hd" && devices === "1" && usage === "basic") {
      id = "pro";
      reason =
        "Usage mono-écran en HD/FHD : le pack Pro à 299 DHS/an est le meilleur rapport qualité-prix.";
    }

    return { pack: getPack(id), reason };
  }, [quality, devices, usage]);

  const { pack, reason } = recommendation;

  return (
    <section className="glass rounded-2xl border border-border p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/20 text-purple">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Smart Pack Recommender
          </h2>
          <p className="mt-1 text-sm text-muted">
            Agent Shape : répondez à 3 questions pour obtenir le pack IPTV Maroc
            adapté à votre foyer (tarifs DHS uniquement).
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <fieldset className="space-y-2">
          <legend className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Tv className="h-4 w-4 text-teal" /> Qualité souhaitée
          </legend>
          {(
            [
              ["hd", "HD stable"],
              ["fhd", "Full HD"],
              ["uhd", "4K UHD"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-black/20 px-3 py-2 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/10"
            >
              <input
                type="radio"
                name="quality"
                value={value}
                checked={quality === value}
                onChange={() => setQuality(value)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <MonitorSmartphone className="h-4 w-4 text-teal" /> Appareils à installer
          </legend>
          {(
            [
              ["1", "1 appareil"],
              ["2", "2 à 3 appareils"],
              ["3", "Mobilité 3 écrans"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-black/20 px-3 py-2 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/10"
            >
              <input
                type="radio"
                name="devices"
                value={value}
                checked={devices === value}
                onChange={() => setDevices(value)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Wifi className="h-4 w-4 text-teal" /> Usage principal
          </legend>
          {(
            [
              ["basic", "Chaînes live basiques"],
              ["family", "Famille + VOD"],
              ["premium", "Sport / 4K / VIP"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-black/20 px-3 py-2 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/10"
            >
              <input
                type="radio"
                name="usage"
                value={value}
                checked={usage === value}
                onChange={() => setUsage(value)}
              />
              {label}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="mt-6 rounded-xl border border-teal/40 bg-teal/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">
          Recommandation agent
        </p>
        <p className="mt-1 font-display text-2xl font-bold">
          Pack {pack.name} — {pack.priceDhs} DHS / an
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{reason}</p>
        {(pack.id === "extra" || pack.id === "premium") && (
          <p className="mt-3 rounded-lg border border-gold/50 bg-gold/10 px-3 py-2 text-sm text-amber-100">
            Installation jusqu&apos;à 3 appareils (Smart TV, Smartphone, TV Box/PC)
            — lecture sur 1 appareil actif à la fois (non simultané).
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappLink(
              `Bonjour Shape, votre agent recommande le Pack ${pack.name} (${pack.priceDhs} DHS). Je souhaite commander.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-teal px-4 py-2.5 text-sm font-semibold text-[#042f2e]"
          >
            Commander {pack.name} sur WhatsApp
          </a>
          <Link
            href="/installation-tutoriels"
            className="rounded-xl border border-border px-4 py-2.5 text-sm text-foreground hover:bg-white/5"
          >
            Voir l&apos;installation
          </Link>
        </div>
      </div>
    </section>
  );
}
