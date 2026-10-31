import Link from "next/link";
import { Cpu, Film, Snowflake, MonitorPlay } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PricingCards } from "@/components/pricing/PricingCards";
import { SmartPackRecommender } from "@/components/agents/SmartPackRecommender";
import { JsonLd } from "@/components/seo/JsonLd";
import { PACKS } from "@/lib/packs";
import { SITE } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Abonnement IPTV Maroc — Packs Pro Extra Premium",
  description:
    "Abonnement IPTV Maroc Shape : Pro 299 DHS, Extra 449 DHS, Premium 599 DHS. Anti-Freeze, 4K UHD, VOD XXL, installation jusqu'à 3 appareils (1 flux actif).",
  path: "/abonnement-iptv",
  keywords: [
    "Abonnement IPTV",
    "Abonnement IPTV Maroc",
    "IPTV pas cher Maroc",
    "IPTV 4K Maroc",
  ],
});

export default function AbonnementPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Abonnement IPTV Maroc", path: "/abonnement-iptv" }]} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Abonnement IPTV Maroc Shape",
          brand: SITE.name,
          description:
            "Abonnements IPTV annuels en DHS — Pro, Extra, Premium avec Anti-Freeze et VOD.",
          offers: PACKS.map((p) => ({
            "@type": "Offer",
            name: `Pack ${p.name}`,
            price: p.priceDhs,
            priceCurrency: "MAD",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/abonnement-iptv`,
          })),
        }}
      />

      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Abonnement IPTV Maroc — packs Pro, Extra & Premium
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Choisissez un{" "}
          <strong className="text-foreground">Abonnement IPTV</strong> pensé
          pour les réseaux marocains : architecture OTT Anti-Freeze, chaînes HD /
          FHD / 4K UHD, bibliothèque VOD massive et tarifs exclusivement en DHS
          sur {SITE.domain}.
        </p>
      </header>

      <section className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Snowflake,
            title: "Anti-Freeze",
            text: "Lissage HLS et bascule de nœuds pour limiter les freezes live.",
          },
          {
            icon: MonitorPlay,
            title: "HD · FHD · 4K UHD",
            text: "Qualité adaptée à votre débit fibre / ADSL / 4G.",
          },
          {
            icon: Film,
            title: "VOD XXL",
            text: "Jusqu'à +180 000 films & séries selon le pack Premium.",
          },
          {
            icon: Cpu,
            title: "Serveurs OTT",
            text: "Standard, Haute Disponibilité ou VPS dédié selon le tier.",
          },
        ].map((b) => (
          <article
            key={b.title}
            className="glass rounded-2xl border border-border p-5"
          >
            <b.icon className="mb-3 h-6 w-6 text-teal" />
            <h2 className="font-display text-lg font-semibold">{b.title}</h2>
            <p className="mt-2 text-sm text-muted">{b.text}</p>
          </article>
        ))}
      </section>

      <section id="packs" className="mb-14 scroll-mt-28">
        <h2 className="mb-2 font-display text-2xl font-bold">
          Tarifs Abonnement IPTV Maroc (DHS)
        </h2>
        <p className="mb-8 max-w-3xl text-sm text-muted">
          Extra et Premium : installation jusqu&apos;à{" "}
          <strong className="text-foreground">3 appareils</strong> (Smart TV,
          Smartphone, TV Box/PC) pour regarder partout — streaming sur{" "}
          <strong className="text-foreground">1 appareil actif à la fois</strong>{" "}
          (non simultané) afin d&apos;éviter le freeze et garantir la stabilité
          maximale du serveur.
        </p>
        <PricingCards />
      </section>

      <SmartPackRecommender />

      <p className="mt-10 text-sm text-muted">
        Besoin d&apos;aide pour installer ?{" "}
        <Link href="/installation-tutoriels" className="text-teal underline">
          Installation IPTV Smart TV Maroc
        </Link>{" "}
        ·{" "}
        <Link href="/test-connexion-serveur" className="text-teal underline">
          Tester le serveur
        </Link>{" "}
        ·{" "}
        <Link href="/" className="text-teal underline">
          Retour IPTV Maroc
        </Link>
      </p>
    </div>
  );
}
