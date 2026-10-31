"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clapperboard,
  CreditCard,
  MonitorSmartphone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import clsx from "clsx";

type TabId =
  | "pourquoi"
  | "catalogue"
  | "antifreeze"
  | "multi"
  | "commande";

const NAV: {
  id: TabId;
  label: string;
  sub: string;
  icon: typeof Sparkles;
  accent: string;
}[] = [
  {
    id: "pourquoi",
    label: "Pourquoi Shape",
    sub: "Avantages premium",
    icon: Sparkles,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "catalogue",
    label: "Chaînes & VOD",
    sub: "Catalogue XXL",
    icon: Clapperboard,
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "antifreeze",
    label: "Anti-Freeze",
    sub: "Zéro coupure",
    icon: Snowflake,
    accent: "from-cyan-400 to-violet-500",
  },
  {
    id: "multi",
    label: "Multi-appareils",
    sub: "TV · Phone · Box",
    icon: MonitorSmartphone,
    accent: "from-emerald-400 to-violet-500",
  },
  {
    id: "commande",
    label: "Commande",
    sub: "WhatsApp DHS",
    icon: CreditCard,
    accent: "from-amber-400 to-violet-500",
  },
];

export function HomeTabs() {
  const [active, setActive] = useState<TabId>("pourquoi");
  const [animKey, setAnimKey] = useState(0);
  const current = NAV.find((t) => t.id === active)!;

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [active]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple">
            Experience hub
          </p>
          <h2 className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
            Hub IPTV Maroc —{" "}
            <span className="bg-gradient-to-r from-purple to-fuchsia-400 bg-clip-text text-transparent">
              onglets premium
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Cinq univers complets : avantages, catalogue, stabilité, mobilité et
            commande. Cliquez un onglet pour explorer.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-purple/25 bg-purple/10 px-4 py-2 text-xs font-semibold text-purple sm:inline-flex">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-success" />
          Contenu interactif · fr-MA
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-purple/20 bg-[#0e0c16] shadow-[0_0_80px_rgba(123,67,255,0.12)]">
        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Vertical premium nav */}
          <div
            role="tablist"
            aria-label="Hub IPTV Maroc"
            className="flex gap-2 overflow-x-auto border-b border-purple/15 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:border-purple/15 lg:p-4"
          >
            {NAV.map((t, i) => {
              const Icon = t.icon;
              const selected = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(t.id)}
                  className={clsx(
                    "group relative flex min-w-[200px] items-center gap-3 rounded-2xl px-3 py-3 text-left transition lg:min-w-0",
                    selected
                      ? "bg-gradient-to-r from-purple/30 to-transparent text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  )}
                >
                  {selected ? (
                    <span className="absolute left-0 top-1/2 hidden h-8 w-1 -translate-y-1/2 rounded-r-full bg-purple lg:block" />
                  ) : null}
                  <span
                    className={clsx(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition",
                      selected
                        ? `bg-gradient-to-br ${t.accent} text-white shadow-lg`
                        : "bg-[#161b22] text-muted group-hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-violet-300">
                        0{i + 1}
                      </span>
                      <span className="truncate text-sm font-semibold">
                        {t.label}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted">
                      {t.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel — unique layout per tab */}
          <div
            key={animKey}
            role="tabpanel"
            className="relative min-h-[420px] animate-float-in p-5 sm:p-8 lg:p-10"
          >
            <div
              className={clsx(
                "pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br opacity-30 blur-3xl",
                current.accent
              )}
              aria-hidden
            />
            <div className="relative">
              {active === "pourquoi" ? <PanelPourquoi /> : null}
              {active === "catalogue" ? <PanelCatalogue /> : null}
              {active === "antifreeze" ? <PanelAntiFreeze /> : null}
              {active === "multi" ? <PanelMulti /> : null}
              {active === "commande" ? <PanelCommande /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelPourquoi() {
  const points = [
    {
      t: "100 % DHS",
      d: "Pro 299 · Extra 449 · Premium 599 DH / 12 mois. Aucun tarif euro.",
    },
    {
      t: "Serveurs Maroc-friendly",
      d: "Nœuds OTT pensés pour latence basse Casa / Rabat / Marrakech.",
    },
    {
      t: "Anti-Freeze inclus",
      d: "De la version de base au 2.2 VIP selon votre pack.",
    },
    {
      t: "Support 24/7",
      d: "WhatsApp + concierge AI + ligne VIP Premium.",
    },
  ];

  return (
    <div>
      <Badge>Avantages</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        Pourquoi les foyers marocains choisissent{" "}
        <span className="text-purple">Shape</span>
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Shape.ma n&apos;est pas un abonnement IPTV générique : c&apos;est une
        expérience locale — paiement dirham, activation WhatsApp, guides Smart
        TV, et stabilité calibrée Maroc Telecom, Inwi et Orange.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {points.map((p, i) => (
          <div
            key={p.t}
            className="rounded-2xl border border-white/8 bg-[#161b22]/80 p-4"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple/20 text-xs font-bold text-purple">
                {i + 1}
              </span>
              <h4 className="font-semibold text-white">{p.t}</h4>
            </div>
            <p className="text-sm text-muted">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl border border-purple/25 bg-purple/10 px-5 py-4">
        {[
          { v: "99.9%", l: "Uptime" },
          { v: "<25ms", l: "Latence cible" },
          { v: "12k+", l: "Foyers" },
          { v: "24/7", l: "Support" },
        ].map((s) => (
          <div key={s.l}>
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              {s.v}
            </p>
            <p className="text-xs text-muted">{s.l}</p>
          </div>
        ))}
      </div>

      <CtaRow
        primary={{ href: "/abonnement-iptv", label: "Comparer les packs" }}
        secondary={{ href: "/faq", label: "Lire la FAQ" }}
      />
    </div>
  );
}

function PanelCatalogue() {
  const rows = [
    {
      pack: "Pro",
      price: "299 DH",
      live: "+20 000",
      vod: "+140 000",
      q: "HD / FHD",
      highlight: false,
    },
    {
      pack: "Extra",
      price: "449 DH",
      live: "+29 000",
      vod: "+129 000",
      q: "HD · FHD · 4K",
      highlight: true,
    },
    {
      pack: "Premium",
      price: "599 DH",
      live: "+45 000",
      vod: "+180 000",
      q: "4K UHD",
      highlight: false,
    },
  ];

  return (
    <div>
      <Badge>Catalogue</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        Chaînes live, sport & VOD cinéma
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Maroc · Maghreb · Moyen-Orient · Europe · Sport (beIN / SSC) · Kids ·
        Docs. EPG synchronisé pour planifier vos soirées. Le catalogue évolue
        avec chaque pack.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-purple/20 text-xs uppercase tracking-wider text-purple">
            <tr>
              <th className="px-4 py-3 font-semibold">Pack</th>
              <th className="px-4 py-3 font-semibold">Prix / an</th>
              <th className="px-4 py-3 font-semibold">Live</th>
              <th className="px-4 py-3 font-semibold">VOD</th>
              <th className="px-4 py-3 font-semibold">Qualité</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.pack}
                className={clsx(
                  "border-t border-white/5",
                  r.highlight ? "bg-purple/15" : "bg-[#161b22]/50"
                )}
              >
                <td className="px-4 py-3.5 font-semibold text-white">
                  {r.pack}
                  {r.highlight ? (
                    <span className="ml-2 rounded-full bg-purple px-2 py-0.5 text-[10px] font-bold">
                      POPULAIRE
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3.5 text-purple font-bold">{r.price}</td>
                <td className="px-4 py-3.5 text-muted">{r.live}</td>
                <td className="px-4 py-3.5 text-muted">{r.vod}</td>
                <td className="px-4 py-3.5 text-muted">{r.q}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "Chaînes 2M / Al Aoula / Medi1",
          "Sport & compétitions",
          "Cinéma & séries",
          "Kids & docs",
          "Chaînes arabes & EU",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <CtaRow
        primary={{ href: "/abonnement-iptv#packs", label: "Voir les packs" }}
        secondary={{ href: "/blog", label: "Guides blog" }}
      />
    </div>
  );
}

function PanelAntiFreeze() {
  const layers = [
    {
      v: "Pro",
      name: "Anti-Freeze",
      d: "Buffer HLS + nœud standard — idéal HD/FHD mono-écran.",
    },
    {
      v: "Extra",
      name: "Anti-Freeze 2.0",
      d: "Haute disponibilité + bascule auto — sport FHD/4K.",
    },
    {
      v: "Premium",
      name: "Anti-Freeze 2.2",
      d: "VPS dédié + low-latency — matchs 4K heures de pointe.",
    },
  ];

  return (
    <div>
      <Badge>Stabilité</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        Anti-Freeze — serveur IPTV sans coupure
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Freezes = Wi-Fi saturé, DNS lent ou nœud saturé. Shape précharge les
        segments, bascule de route et adapte le protocole HLS à votre ligne
        fibre, ADSL ou 4G.
      </p>

      <div className="mt-8 space-y-3">
        {layers.map((l, i) => (
          <div
            key={l.v}
            className="flex gap-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-transparent p-4"
          >
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#161b22] text-center">
              <span className="text-[10px] text-muted">Niv.</span>
              <span className="text-sm font-bold text-cyan-300">{i + 1}</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Pack {l.v}
              </p>
              <h4 className="font-semibold text-white">{l.name}</h4>
              <p className="mt-1 text-sm text-muted">{l.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Wifi, t: "Testez votre FAI", d: "IAM · Inwi · Orange" },
          { icon: ShieldCheck, t: "Score stabilité", d: "Latence + débit" },
          { icon: Snowflake, t: "Protocole idéal", d: "HLS adapté" },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-xl border border-white/8 bg-[#161b22] p-4"
          >
            <c.icon className="mb-2 h-5 w-5 text-cyan-300" />
            <p className="text-sm font-semibold text-white">{c.t}</p>
            <p className="text-xs text-muted">{c.d}</p>
          </div>
        ))}
      </div>

      <CtaRow
        primary={{
          href: "/test-connexion-serveur",
          label: "Lancer le diagnostic",
        }}
        secondary={{
          href: "/blog/resoudre-buffering-iptv-maroc",
          label: "Guide buffering",
        }}
      />
    </div>
  );
}

function PanelMulti() {
  const devices = [
    { name: "Smart TV salon", ok: true },
    { name: "Smart TV chambre", ok: true },
    { name: "Smartphone / tablette", ok: true },
    { name: "TV Box / PC", ok: true },
    { name: "2 flux en même temps", ok: false },
  ];

  return (
    <div>
      <Badge>Mobilité</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        Multi-appareils intelligents
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Extra & Premium : installez jusqu&apos;à{" "}
        <strong className="text-white">3 appareils</strong> (Smart TV,
        Smartphone, TV Box/PC) pour regarder partout. Streaming limité à{" "}
        <strong className="text-white">1 appareil actif</strong> — stabilité
        maximale, zéro freeze serveur.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <Tv className="h-5 w-5" />
            <h4 className="font-semibold text-white">Ce qui est autorisé</h4>
          </div>
          <ul className="space-y-2.5">
            {devices.map((d) => (
              <li
                key={d.name}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-muted">{d.name}</span>
                {d.ok ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                    <Check className="h-3 w-3" /> OK
                  </span>
                ) : (
                  <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-bold text-red-300">
                    Non
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-white/8 bg-[#161b22] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              Pack Pro
            </p>
            <p className="mt-1 text-lg font-bold text-white">1 appareil unique</p>
            <p className="mt-2 text-sm text-muted">
              Idéal pour démarrer sur une seule Smart TV.
            </p>
          </div>
          <div className="rounded-2xl border border-purple/40 bg-purple/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">
              Extra & Premium
            </p>
            <p className="mt-1 text-lg font-bold text-white">
              Jusqu&apos;à 3 installs · 1 flux
            </p>
            <p className="mt-2 text-sm text-muted">
              Salon → chambre → mobile : basculez la session librement.
            </p>
          </div>
          <p className="text-xs text-muted">
            Compatible LG, Samsung, Android, Xiaomi, Formuler, Apple, Windows/Mac.
          </p>
        </div>
      </div>

      <CtaRow
        primary={{
          href: "/installation-tutoriels",
          label: "Wizard installation",
        }}
        secondary={{
          href: "/blog/iptv-multi-ecrans-mobilite-maroc",
          label: "Article multi-écrans",
        }}
      />
    </div>
  );
}

function PanelCommande() {
  const steps = [
    {
      n: "1",
      t: "Choisissez",
      d: "Pro, Extra ou Premium selon catalogue et mobilité.",
    },
    {
      n: "2",
      t: "Payez en DHS",
      d: "RIB Attijari / CIH, CashPlus / Wafacash, ou Stripe (€).",
    },
    {
      n: "3",
      t: "Recevez XC",
      d: "Identifiants + activation lecteur, souvent le jour même.",
    },
    {
      n: "4",
      t: "Installez",
      d: "Suivez le wizard Smart TV et lancez le premier live.",
    },
  ];

  return (
    <div>
      <Badge>Checkout</Badge>
      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        Commander Shape en quelques minutes
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Parcours 100 % marocain : pas de carte internationale obligatoire, pas
        d&apos;euro. Le concierge AI prépare votre message WhatsApp.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.n}
            className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-transparent p-4"
          >
            <span className="font-display text-3xl font-bold text-amber-400/40">
              {s.n}
            </span>
            <h4 className="mt-1 font-semibold text-white">{s.t}</h4>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-purple/30 bg-[#161b22] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="font-semibold text-white">Prêt à finaliser ?</p>
          <p className="mt-1 text-sm text-muted">
            Extra 449 DH — le plus choisi · Premium 599 DH — VIP 4K
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
          <a
            href={whatsappLink(
              "Bonjour Shape, je veux commander un Abonnement IPTV Maroc (Extra ou Premium)."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#052e16]"
          >
            WhatsApp maintenant
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-purple/40 px-4 py-2.5 text-sm font-semibold text-purple"
          >
            Triage agent <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <CtaRow
        primary={{ href: "/abonnement-iptv", label: "Page abonnement" }}
        secondary={{ href: "/faq", label: "Questions paiement" }}
      />
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-purple/40 bg-purple/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-violet-200">
      {children}
    </span>
  );
}

function CtaRow({
  primary,
  secondary,
}: {
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={primary.href}
        className="inline-flex items-center gap-2 rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(123,67,255,0.35)] transition hover:brightness-110"
      >
        {primary.label} <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href={secondary.href}
        className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple/40"
      >
        {secondary.label}
      </Link>
    </div>
  );
}
