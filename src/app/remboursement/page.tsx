import Link from "next/link";
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  Mail,
  RefreshCcw,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE, whatsappLink } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Remboursement IPTV Maroc — Politique Shape 15 jours",
  description:
    "Politique de remboursement Shape IPTV Maroc : 15 jours, garantie pendant l’abonnement, délai 3–7 jours ouvrables, même moyen de paiement. Contact contact@shape.ma.",
  path: "/remboursement",
  keywords: [
    "remboursement IPTV Maroc",
    "garantie abonnement IPTV",
    "Shape remboursement",
  ],
});

const POINTS = [
  {
    n: "02",
    icon: RefreshCcw,
    title: "Remboursement sous 15 jours",
    brief:
      "Possible dans les 15 jours après achat / activation, sur demande motivée.",
    detail:
      "Adressez votre demande à contact@shape.ma ou via la page Contact. Indiquez : identité, date d’achat, type d’abonnement (Pro / Extra / Premium) et motif. Une preuve de paiement pourra être demandée.",
  },
  {
    n: "03",
    icon: BadgeCheck,
    title: "Garantie pendant toute la durée",
    brief:
      "Votre pack Shape est garanti sur toute la période d’abonnement (ex. 12 mois).",
    detail:
      "En cas de panne imputable au service (accès / panel), nous nous engageons à un remplacement, une réactivation ou une solution équivalente, dans la limite de nos moyens techniques et des conditions de l’offre.",
  },
  {
    n: "04",
    icon: Clock3,
    title: "Délai de traitement",
    brief: "3 à 7 jours ouvrables après acceptation du dossier complet.",
    detail:
      "Ce délai couvre le traitement interne Shape. L’apparition des fonds sur votre compte dépend ensuite de votre banque ou opérateur de paiement.",
  },
  {
    n: "05",
    icon: Wallet,
    title: "Mode de remboursement",
    brief: "Même moyen de paiement que l’achat (carte, virement, etc.).",
    detail:
      "Sauf impossibilité technique signalée — un mode alternatif équivalent pourra alors être proposé d’un commun accord.",
  },
  {
    n: "06",
    icon: ShieldAlert,
    title: "Cas particuliers",
    brief: "Certains cas n’ouvrent pas droit à remboursement.",
    detail:
      "Abus, partage non autorisé des identifiants, ou non-respect des conditions d’usage peuvent entraîner un refus. Les problèmes liés uniquement à votre réseau (Wi-Fi saturé, débit insuffisant) ne constituent pas, à eux seuls, un motif de remboursement si le service fonctionne sur un setup conforme.",
  },
] as const;

export default function RemboursementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ name: "Remboursement", path: "/remboursement" }]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Politique de remboursement Shape IPTV Maroc",
          url: `${SITE.url}/remboursement`,
          description:
            "Remboursement sous 15 jours, garantie abonnement, délais et modes de remboursement Shape.ma.",
          inLanguage: SITE.language,
        }}
      />

      <header className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-purple">
          Politique Shape
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Remboursement & garantie IPTV Maroc
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          En bref : remboursement possible sous{" "}
          <strong className="text-white">15 jours</strong>, garantie pendant
          toute la durée de l’abonnement, traitement en{" "}
          <strong className="text-white">3–7 jours ouvrables</strong>, via le
          même moyen de paiement.
        </p>
      </header>

      {/* Brief summary cards */}
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        {[
          { t: "15 jours", d: "Pour demander un remboursement" },
          { t: "Garantie", d: "Sur toute la durée du pack" },
          { t: "3–7 j.", d: "Traitement après acceptation" },
        ].map((s) => (
          <div
            key={s.t}
            className="glass-shine rounded-2xl border border-white/10 px-4 py-4 text-center"
          >
            <p className="font-display text-xl font-bold text-purple">{s.t}</p>
            <p className="mt-1 text-xs text-muted">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {POINTS.map((p) => (
          <article
            key={p.n}
            className="glass-shine overflow-hidden rounded-2xl border border-white/10 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple/20 text-purple">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-purple">
                  Article {p.n}
                </p>
                <h2 className="mt-0.5 font-display text-lg font-bold text-white">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-violet-100/90">
                  {p.brief}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.detail}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-10 rounded-2xl border border-purple/30 bg-purple/10 p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <Mail className="h-5 w-5 text-purple" />
          Comment demander un remboursement ?
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
          <li>
            Écrivez à{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-purple underline"
            >
              {SITE.email}
            </a>{" "}
            ou passez par la{" "}
            <Link href="/contact" className="font-semibold text-purple underline">
              page Contact
            </Link>
            .
          </li>
          <li>
            Précisez identité, date d’achat, pack (Pro / Extra / Premium) et
            motif.
          </li>
          <li>Joignez une preuve de paiement si demandée.</li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-purple px-4 py-2.5 text-sm font-semibold text-white"
          >
            <CreditCard className="h-4 w-4" />
            Ouvrir le contact
          </Link>
          <a
            href={whatsappLink(
              "Bonjour Shape, je souhaite une demande de remboursement / garantie. Pack : "
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </aside>

      <p className="mt-8 text-sm text-muted">
        Voir aussi :{" "}
        <Link href="/abonnement-iptv" className="text-purple underline">
          Abonnement IPTV Maroc
        </Link>{" "}
        ·{" "}
        <Link href="/faq" className="text-purple underline">
          FAQ
        </Link>{" "}
        ·{" "}
        <Link href="/" className="text-purple underline">
          Accueil IPTV Maroc
        </Link>
      </p>
    </div>
  );
}
