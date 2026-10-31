import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactTriageAgent } from "@/components/agents/ContactTriageAgent";

export const metadata = buildMetadata({
  title: "Contact Shape IPTV Maroc — Concierge WhatsApp",
  description:
    "Contactez Shape IPTV Maroc : agent de triage (nouvel abonnement, test rapide, assistance technique) et formulaire classique. WhatsApp prérempli.",
  path: "/contact",
  keywords: ["Contact IPTV Maroc", "WhatsApp IPTV Maroc", "support IPTV"],
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact Shape IPTV", path: "/contact" }]} />

      <header className="mb-10 max-w-3xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Contact & concierge IPTV Maroc
        </h1>
        <p className="mt-4 text-base text-muted">
          Décrivez votre besoin : l&apos;agent génère un WhatsApp prêt à envoyer.
          Consultez aussi l&apos;
          <Link href="/abonnement-iptv" className="text-teal underline">
            Abonnement IPTV Maroc
          </Link>{" "}
          ou l&apos;
          <Link href="/faq" className="text-teal underline">
            FAQ
          </Link>{" "}
          avant d&apos;écrire.
        </p>
      </header>

      <ContactTriageAgent />
    </div>
  );
}
