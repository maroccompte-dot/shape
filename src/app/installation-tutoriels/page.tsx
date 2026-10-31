import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InstantSetupWizard } from "@/components/agents/InstantSetupWizard";

export const metadata = buildMetadata({
  title: "Installation IPTV Smart TV Maroc — Guides LG Samsung Android",
  description:
    "Installation IPTV Smart TV Maroc : wizard interactif pour LG webOS, Samsung Tizen, Android TV, Xiaomi Mi Box, Formuler, Apple TV et PC. Shape IPTV.",
  path: "/installation-tutoriels",
  keywords: [
    "Installation IPTV Smart TV Maroc",
    "IPTV LG Maroc",
    "IPTV Samsung Maroc",
    "IPTV Android TV",
  ],
});

export default function InstallationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          {
            name: "Installation IPTV Smart TV Maroc",
            path: "/installation-tutoriels",
          },
        ]}
      />

      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Installation IPTV Smart TV Maroc
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Hub de configuration Shape : sélectionnez votre appareil et suivez un
          tutoriel dynamique (Xtream Codes / M3U). Compatible packs{" "}
          <Link href="/abonnement-iptv" className="text-teal underline">
            Abonnement IPTV Maroc
          </Link>{" "}
          Pro, Extra et Premium.
        </p>
      </header>

      <InstantSetupWizard />

      <section className="mt-12 glass rounded-2xl border border-border p-6">
        <h2 className="font-display text-xl font-bold">
          Bonnes pratiques réseau avant l&apos;install
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Préférez Ethernet ou Wi-Fi 5 GHz près de la box fibre.</li>
          <li>
            Vérifiez le débit avec le{" "}
            <Link href="/test-connexion-serveur" className="text-teal underline">
              diagnostic serveur IPTV
            </Link>
            .
          </li>
          <li>
            Sur Extra / Premium : jusqu&apos;à 3 appareils installés, 1 seul flux
            actif.
          </li>
          <li>
            Retrouvez les bases IPTV Maroc sur la{" "}
            <Link href="/" className="text-teal underline">
              page d&apos;accueil Shape
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
