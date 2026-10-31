export const SITE = {
  name: "Shape IPTV Maroc",
  shortName: "Shape",
  domain: "shape.ma",
  url: "https://shape.ma",
  locale: "fr_MA",
  language: "fr-MA",
  whatsapp: "212600000000",
  email: "contact@shape.ma",
  tagline: "IPTV Maroc premium — fluide, 4K et sans coupure",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "IPTV Maroc", short: "Accueil" },
  { href: "/abonnement-iptv", label: "Abonnement IPTV Maroc", short: "Abonnement" },
  { href: "/installation-tutoriels", label: "Installation IPTV Smart TV", short: "Installation" },
  { href: "/test-connexion-serveur", label: "Test serveur IPTV", short: "Test réseau" },
  { href: "/blog", label: "Blog IPTV Maroc", short: "Blog" },
  { href: "/faq", label: "FAQ IPTV", short: "FAQ" },
  { href: "/contact", label: "Contact Shape IPTV", short: "Contact" },
] as const;

export const ISPS = [
  {
    name: "Maroc Telecom",
    slug: "maroc-telecom",
    note: "Fibre & ADSL optimisées — latence faible vers nos nœuds Casablanca / Rabat.",
  },
  {
    name: "Inwi",
    slug: "inwi",
    note: "Fibre FTTH et 4G/5G compatibles avec le protocole HLS adaptatif Shape.",
  },
  {
    name: "Orange Maroc",
    slug: "orange",
    note: "Fibre Livebox et ADSL : débit recommandé 25 Mbps+ pour le 4K UHD.",
  },
] as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
