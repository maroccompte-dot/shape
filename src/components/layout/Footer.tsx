import Link from "next/link";
import { Mail, MessageCircle, Zap } from "lucide-react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";

const FOOTER_SILOS = [
  {
    title: "Services IPTV",
    links: [
      { href: "/", label: "IPTV Maroc — Accueil Shape" },
      { href: "/abonnement-iptv", label: "Abonnement IPTV Maroc" },
      { href: "/abonnement-iptv#packs", label: "Packs Pro Extra Premium" },
    ],
  },
  {
    title: "Guides & Outils",
    links: [
      { href: "/installation-tutoriels", label: "Installation IPTV Smart TV Maroc" },
      { href: "/test-connexion-serveur", label: "Serveur IPTV sans coupure" },
      { href: "/faq", label: "FAQ Abonnement IPTV" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/blog", label: "Blog IPTV Maroc" },
      { href: "/contact", label: "Contact & Concierge Shape" },
      { href: "/remboursement", label: "Remboursement & garantie" },
      { href: "/blog/resoudre-buffering-iptv-maroc", label: "Résoudre le buffering" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-[#0a090f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple shadow-[0_0_20px_rgba(123,67,255,0.35)]">
              <Zap className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold">
              {SITE.shortName}
              <span className="text-purple">.ma</span>
            </span>
          </Link>
          <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted">
            {SITE.tagline}. Compatible Maroc Telecom, Inwi et Orange — tarifs
            100 % DHS.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={whatsappLink("Bonjour Shape IPTV Maroc")}
              className="inline-flex items-center gap-2 text-teal hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp support 24/7
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 text-muted hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
          </div>
        </div>

        {FOOTER_SILOS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.domain} — IPTV Maroc premium.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-foreground">
                {l.short}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
