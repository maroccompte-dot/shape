import Link from "next/link";
import {
  CheckCircle2,
  Clapperboard,
  Gauge,
  MessageCircle,
  Shield,
  Smartphone,
  Snowflake,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ISPS, SITE, whatsappLink } from "@/lib/constants";
import { PACKS } from "@/lib/packs";
import { getPostsSorted } from "@/lib/blog-data";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroPricingPanel } from "@/components/home/HeroPricingPanel";
import { HomeTabs } from "@/components/home/HomeTabs";
import { HomeFaq } from "@/components/home/HomeFaq";
import { GlassPackCards } from "@/components/pricing/GlassPackCards";
import { CompatiblePlayers } from "@/components/home/CompatiblePlayers";

export const metadata = buildMetadata({
  title: "IPTV Maroc — Abonnement Premium sans coupure",
  description:
    "IPTV Maroc Shape : packs Pro, Extra et Premium en DHS, Anti-Freeze, 4K, compatible Maroc Telecom, Inwi et Orange. Activation rapide via WhatsApp.",
  path: "/",
  keywords: [
    "IPTV Maroc",
    "meilleur IPTV Maroc",
    "IPTV Casablanca",
    "IPTV fibre Maroc",
  ],
});

const FEATURES = [
  {
    icon: Snowflake,
    title: "Anti-Freeze Pro → 2.2",
    text: "Préchargement HLS et bascule de nœuds pour un live sport stable même en heures de pointe.",
  },
  {
    icon: Clapperboard,
    title: "Live + VOD XXL",
    text: "Des dizaines de milliers de chaînes et jusqu'à +180 000 films & séries selon le pack Premium.",
  },
  {
    icon: Smartphone,
    title: "Mobilité 3 appareils",
    text: "Extra & Premium : installez Smart TV, téléphone et box — 1 flux actif pour zéro freeze.",
  },
  {
    icon: Gauge,
    title: "Optimisé FAI Maroc",
    text: "Peering calibré Maroc Telecom, Inwi et Orange — fibre, ADSL et 4G.",
  },
  {
    icon: Shield,
    title: "Support 24/7",
    text: "WhatsApp concierge + assistance VIP Premium pour les urgences match.",
  },
  {
    icon: Zap,
    title: "Activation rapide",
    text: "Identifiants XC après paiement DHS — application PRO incluse sur tous les packs.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Choisissez votre pack",
    text: "Pro 299 DH, Extra 449 DH ou Premium 599 DH / 12 mois — 100 % DHS.",
  },
  {
    n: "02",
    title: "Payez via WhatsApp",
    text: "Virement CIH, Attijari, BMCE ou mode convenu avec le concierge Shape.",
  },
  {
    n: "03",
    title: "Installez en minutes",
    text: "Recevez XC / M3U et suivez le wizard Smart TV LG, Samsung, Android…",
  },
  {
    n: "04",
    title: "Regardez sans coupure",
    text: "Anti-Freeze actif. Testez votre ligne à tout moment sur le diagnostic.",
  },
];

const DEVICES = [
  "LG webOS",
  "Samsung Tizen",
  "Android TV / Google TV",
  "Xiaomi Mi Box",
  "Formuler Box",
  "Apple TV & iPhone",
  "Windows & Mac",
  "Fire Stick",
];

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kenitra",
  "Tétouan",
];

export default function HomePage() {
  const homeFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.slice(0, 8).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          inLanguage: SITE.language,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE.url}/faq?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd data={homeFaqLd} />

      <HeroPricingPanel />

      {/* Intro SEO long-form */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Qu&apos;est-ce que l&apos;IPTV Maroc Shape ?
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                L&apos;<strong className="text-white">IPTV Maroc</strong> Shape
                permet de regarder la télévision en streaming (chaînes live,
                sport, cinéma, kids) et une bibliothèque VOD sur Smart TV,
                téléphone ou TV Box — sans décodeur satellite classique.
              </p>
              <p>
                Contrairement aux offres floues en euro,{" "}
                <strong className="text-white">shape.ma</strong> affiche des
                tarifs clairs en dirhams :{" "}
                <Link href="/abonnement-iptv" className="text-purple underline">
                  Abonnement IPTV Maroc
                </Link>{" "}
                Pro 299 DH, Extra 449 DH et Premium 599 DH pour 12 mois.
              </p>
              <p>
                Notre priorité : un{" "}
                <Link
                  href="/test-connexion-serveur"
                  className="text-purple underline"
                >
                  serveur IPTV sans coupure
                </Link>{" "}
                grâce à l&apos;Anti-Freeze, un support WhatsApp 24/7 et des
                tutoriels d&apos;
                <Link
                  href="/installation-tutoriels"
                  className="text-purple underline"
                >
                  Installation IPTV Smart TV Maroc
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="glass rounded-2xl border border-border p-6">
            <h3 className="font-display text-lg font-semibold">
              En résumé — Shape vs IPTV générique
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {[
                "Prix 100 % DHS, packs Pro / Extra / Premium",
                "Anti-Freeze intégré jusqu'à la v2.2 Premium",
                "Extra & Premium : jusqu'à 3 appareils, 1 flux actif",
                "Compatible Maroc Telecom, Inwi, Orange",
                "Wizard installation + diagnostic réseau inclus",
                "Concierge AI + WhatsApp pour la commande",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Fonctionnalités IPTV Maroc incluses
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Tout ce dont un foyer marocain a besoin pour un streaming fluide au
          quotidien.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-[#161b22] p-5 transition hover:border-purple/40"
            >
              <f.icon className="mb-3 h-6 w-6 text-purple" />
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <HomeTabs />

      {/* ISP */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Compatible opérateurs Maroc
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Architecture OTT calibrée pour les réseaux fibre et ADSL des grands
          FAI marocains. Débit conseillé : 10 Mbps FHD · 25 Mbps+ pour le 4K.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ISPS.map((isp) => (
            <article
              key={isp.slug}
              className="glass rounded-2xl border border-border p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple/20 text-purple">
                <Wifi className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{isp.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{isp.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Comment ça marche ?
        </h2>
        <p className="mt-2 text-sm text-muted">
          Quatre étapes pour passer du choix du pack au premier match en direct.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="relative rounded-2xl border border-border bg-[#161b22] p-5"
            >
              <span className="font-display text-3xl font-bold text-violet-300/90">
                {s.n}
              </span>
              <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Devices */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Appareils supportés
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Shape fonctionne sur la majorité des Smart TV et boxes vendues au
              Maroc. Notre{" "}
              <Link
                href="/installation-tutoriels"
                className="text-purple underline"
              >
                Instant Setup Wizard
              </Link>{" "}
              génère les étapes exactes selon votre modèle.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {DEVICES.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-purple/20 bg-purple/10 px-3 py-1.5 text-xs font-semibold text-purple"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl border border-border p-6">
            <h3 className="font-display text-lg font-semibold">
              Règle multi-écrans Extra & Premium
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Installation jusqu&apos;à <strong className="text-white">3 appareils</strong>{" "}
              (Smart TV, Smartphone, TV Box/PC) pour regarder partout — streaming
              sur <strong className="text-white">1 appareil actif à la fois</strong>{" "}
              (non simultané) afin d&apos;éviter le freeze et garantir la
              stabilité maximale du serveur.
            </p>
            <Link
              href="/abonnement-iptv"
              className="mt-5 inline-flex text-sm font-semibold text-purple hover:underline"
            >
              Détails des packs →
            </Link>
          </div>
        </div>
      </section>

      <CompatiblePlayers />

      {/* Packs teaser — glass brillant */}
      <section
        id="packs"
        className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/20 blur-[100px]"
          aria-hidden
        />
        <h2 className="mb-2 font-display text-2xl font-bold sm:text-3xl">
          Packs Abonnement IPTV Maroc
        </h2>
        <p className="mb-8 text-sm text-muted">
          Choisissez selon catalogue, qualité et mobilité — tarifs annuels DHS.
        </p>
        <GlassPackCards mode="teaser" />
      </section>

      {/* Parcours */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Parcours Shape — pages dédiées
        </h2>
        <p className="mt-2 text-sm text-muted">
          Architecture multi-pages SEO : chaque besoin a sa route.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/abonnement-iptv",
              icon: Tv,
              title: "Abonnement IPTV Maroc",
              text: `Packs Pro Extra Premium dès ${PACKS[0].priceDhs} DHS + Smart Pack Recommender.`,
            },
            {
              href: "/installation-tutoriels",
              icon: Sparkles,
              title: "Installation Smart TV",
              text: "Wizard LG, Samsung, Android, Xiaomi, Formuler, Apple, PC.",
            },
            {
              href: "/test-connexion-serveur",
              icon: Gauge,
              title: "Test serveur sans coupure",
              text: "Latence, débit 4K et protocole HLS recommandé.",
            },
            {
              href: "/blog",
              icon: Clapperboard,
              title: "Blog IPTV Maroc",
              text: "Guides fibre, buffering, multi-écrans et configs TV.",
            },
            {
              href: "/faq",
              icon: MessageCircle,
              title: "FAQ complète",
              text: "Paiement, technique, mobilité, réseau — searchable.",
            },
            {
              href: "/contact",
              icon: Users,
              title: "Contact concierge",
              text: "Triage agent + WhatsApp prérempli selon votre demande.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl border border-border bg-[#161b22] p-5 transition hover:border-purple/50"
            >
              <card.icon className="mb-3 h-6 w-6 text-purple" />
              <h3 className="font-display text-lg font-bold group-hover:text-purple">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities + trust */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          IPTV Maroc — villes & confiance
        </h2>
        <p className="mt-2 text-sm text-muted">
          Abonnés actifs dans les principales villes du Royaume.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-border bg-[#111018] px-3 py-1.5 text-sm text-muted"
            >
              IPTV {c}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "+12 000 foyers",
              text: "Communauté Shape qui regarde live & VOD chaque jour.",
            },
            {
              icon: Shield,
              title: "Uptime 99.9 %",
              text: "Supervision serveurs et bascule Anti-Freeze automatique.",
            },
            {
              icon: CheckCircle2,
              title: "Paiement local",
              text: "Virements bancaires marocains et suivi WhatsApp.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-[#161b22] p-5"
            >
              <item.icon className="mb-3 h-6 w-6 text-purple" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Derniers guides du blog
            </h2>
            <p className="mt-2 text-sm text-muted">
              Conseils fibre, Smart TV et buffering pour le Maroc.
            </p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-purple hover:underline">
            Tout le blog →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {getPostsSorted().slice(0, 4).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-border bg-[#161b22] p-5 transition hover:border-purple/40"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                {post.category}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <HomeFaq />

      {/* SEO long-form ~500 mots */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          IPTV Maroc : guide complet pour un streaming fluide en 2026
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
          <p>
            L&apos;<strong className="text-white">IPTV Maroc</strong> est devenu
            la solution préférée des foyers qui veulent regarder la télévision en
            direct, le sport, le cinéma et les séries sans dépendre uniquement
            d&apos;un décodeur satellite. Grâce à Internet (fibre, ADSL ou 4G),
            vous diffusez des milliers de chaînes et une bibliothèque VOD sur
            Smart TV, téléphone ou TV Box. Sur{" "}
            <strong className="text-white">shape.ma</strong>, l&apos;offre est
            conçue pour le marché marocain : tarifs en dirhams, activation
            WhatsApp et serveurs calibrés pour Maroc Telecom, Inwi et Orange.
          </p>
          <p>
            Choisir un{" "}
            <Link href="/abonnement-iptv" className="font-semibold text-purple underline">
              Abonnement IPTV Maroc
            </Link>{" "}
            de qualité, c&apos;est d&apos;abord comparer le catalogue, la
            stabilité et le support. Shape propose trois packs annuels clairs —
            <strong className="text-white"> Pro 299 DH</strong>,{" "}
            <strong className="text-white">Extra 449 DH</strong> et{" "}
            <strong className="text-white">Premium 599 DH</strong> — sans prix
            en euro. Le pack Pro convient pour démarrer sur un appareil en HD /
            FHD. Extra et Premium ouvrent le 4K, un catalogue XXL et
            l&apos;installation jusqu&apos;à trois appareils (Smart TV,
            smartphone, TV Box/PC), avec une règle essentielle pour éviter le
            freeze : <strong className="text-white">un seul flux actif à la fois</strong>{" "}
            (connexion non simultanée).
          </p>
          <p>
            La stabilité reste le critère n°1 au Maroc. Un{" "}
            <Link
              href="/test-connexion-serveur"
              className="font-semibold text-purple underline"
            >
              serveur IPTV sans coupure
            </Link>{" "}
            repose sur le débit, la latence et la technologie Anti-Freeze. Sur
            fibre FTTH, visez idéalement 25 Mbps et plus pour le 4K ; en FHD,
            10 à 15 Mbps suffisent souvent. Préférez le Wi-Fi 5 GHz ou un câble
            Ethernet jusqu&apos;à la TV, et un DNS fiable (Cloudflare ou Google).
            Notre outil de diagnostic réseau sur shape.ma estime latence et
            capacité 4K avant même de souscrire.
          </p>
          <p>
            L&apos;
            <Link
              href="/installation-tutoriels"
              className="font-semibold text-purple underline"
            >
              Installation IPTV Smart TV Maroc
            </Link>{" "}
            ne doit pas être un frein. Shape est compatible Android TV / Google
            TV, Samsung Tizen, LG webOS, VIDAA, Apple TV / iPhone, Xiaomi Mi Box
            et boxes Formuler. Un wizard interactif guide chaque étape
            (identifiants XC ou playlist M3U). Une fois le paiement confirmé en
            DHS, l&apos;activation du lecteur et de l&apos;application PRO peut
            être très rapide, avec un support client joignable 24/7.
          </p>
          <p>
            Pourquoi Shape plutôt qu&apos;une offre IPTV générique ? Parce que
            le contenu éditorial, les outils (test serveur, FAQ, blog) et le
            maillage local (Casablanca, Rabat, Marrakech, Fès, Tanger…) sont
            pensés pour l&apos;utilisateur marocain. Vous trouvez des guides
            pour optimiser la fibre, résoudre le buffering, configurer une
            Smart TV ou gérer le multi-écrans. La politique de{" "}
            <Link href="/remboursement" className="font-semibold text-purple underline">
              remboursement
            </Link>{" "}
            (demande sous 15 jours, garantie sur la durée de l&apos;abonnement)
            renforce aussi la confiance.
          </p>
          <p>
            En résumé, l&apos;IPTV au Maroc réussit quand trois conditions sont
            réunies : une ligne Internet adaptée, une installation correcte sur
            l&apos;appareil, et un fournisseur transparent sur les prix, les
            appareils et le support. Shape IPTV Maroc réunit ces piliers —
            packs Pro, Extra et Premium, Anti-Freeze, VOD XXL et parcours
            WhatsApp. Pour commencer, comparez les formules sur la page
            abonnement, testez votre connexion, puis activez votre compte en
            quelques minutes. Que vous soyez fan de football, de cinéma ou de
            chaînes arabes et internationales, un bon{" "}
            <strong className="text-white">IPTV Maroc</strong> transforme votre
            salon — et votre mobilité — en expérience fluide, 4K et sans
            coupure.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-purple/30 bg-gradient-to-br from-purple/25 via-[#161b22] to-[#0a090f] p-8 sm:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple/30 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Prêt pour IPTV Maroc sans coupure ?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Commandez Pro, Extra ou Premium en DHS et activez votre lecteur
              aujourd&apos;hui avec le support Shape.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/abonnement-iptv"
                className="inline-flex rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(123,67,255,0.4)]"
              >
                Voir les abonnements
              </Link>
              <a
                href={whatsappLink(
                  "Bonjour Shape, je veux commander un Abonnement IPTV Maroc."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#111018] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4 text-success" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
