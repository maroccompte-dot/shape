import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "FAQ IPTV Maroc — Paiement, multi-écrans, réseau",
  description:
    "FAQ Shape IPTV Maroc : facturation DHS, configuration technique, multi-écrans Extra/Premium, stabilité Anti-Freeze. Réponses fr-MA.",
  path: "/faq",
  keywords: ["FAQ IPTV Maroc", "paiement IPTV Maroc", "IPTV multi écrans"],
});

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "FAQ IPTV", path: "/faq" }]} />
      <JsonLd data={faqLd} />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          FAQ Abonnement IPTV Maroc
        </h1>
        <p className="mt-4 text-muted">
          Questions classées : Facturation & Paiement au Maroc, Configuration
          Technique, Multi-écrans & Mobilité, Stabilité Réseau. Pour commander,{" "}
          <Link href="/abonnement-iptv" className="text-teal underline">
            voir les packs
          </Link>{" "}
          ou{" "}
          <Link href="/contact" className="text-teal underline">
            contacter le concierge
          </Link>
          .
        </p>
      </header>

      <FaqSearch items={FAQ_ITEMS} />
    </div>
  );
}
