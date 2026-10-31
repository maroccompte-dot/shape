import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LiveNetworkDiagnostic } from "@/components/agents/LiveNetworkDiagnostic";

export const metadata = buildMetadata({
  title: "Serveur IPTV sans coupure Maroc — Test connexion",
  description:
    "Testez latence et bande passante pour un Serveur IPTV sans coupure Maroc. Diagnostic fibre / ADSL / 4G et protocole HLS recommandé — Shape IPTV.",
  path: "/test-connexion-serveur",
  keywords: [
    "Serveur IPTV sans coupure Maroc",
    "test IPTV Maroc",
    "IPTV buffering Maroc",
    "latence IPTV",
  ],
});

export default function TestConnexionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          {
            name: "Test connexion serveur IPTV",
            path: "/test-connexion-serveur",
          },
        ]}
      />

      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Serveur IPTV sans coupure Maroc — diagnostic réseau
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Outil Shape pour estimer la capacité 4K de votre ligne Maroc Telecom,
          Inwi ou Orange, mesurer la latence perçue et recommander le protocole
          de streaming optimal avant de souscrire un{" "}
          <Link href="/abonnement-iptv" className="text-teal underline">
            Abonnement IPTV
          </Link>
          .
        </p>
      </header>

      <LiveNetworkDiagnostic />

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            t: "Fibre FTTH",
            d: "Meilleur scénario 4K UHD + Anti-Freeze 2.2 (Premium).",
          },
          {
            t: "ADSL",
            d: "Privilégiez FHD ; fermez les téléchargements pendant le live.",
          },
          {
            t: "4G / 5G",
            d: "HD/FHD possibles ; 1 appareil actif obligatoire pour la stabilité.",
          },
        ].map((c) => (
          <article
            key={c.t}
            className="rounded-2xl border border-border bg-black/30 p-5"
          >
            <h2 className="font-display text-lg font-semibold">{c.t}</h2>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
          </article>
        ))}
      </section>

      <p className="mt-8 text-sm text-muted">
        Guides appareils :{" "}
        <Link href="/installation-tutoriels" className="text-teal underline">
          Installation IPTV Smart TV Maroc
        </Link>{" "}
        · Accueil{" "}
        <Link href="/" className="text-teal underline">
          IPTV Maroc
        </Link>
      </p>
    </div>
  );
}
