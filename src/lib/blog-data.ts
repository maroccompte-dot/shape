export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string;
  readingMinutes: number;
  category: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "optimiser-iptv-fibre-optique-maroc",
    title: "Optimiser l'IPTV sur fibre optique au Maroc (Maroc Telecom, Inwi, Orange)",
    description:
      "Guide complet pour stabiliser votre IPTV Maroc en fibre FTTH : débit 4K, DNS, QoS routeur et Anti-Freeze Shape.",
    keyword: "IPTV fibre optique Maroc",
    date: "2026-07-14",
    readingMinutes: 9,
    category: "Réseau & Fibre",
    content: [
      "La fibre optique a transformé l'expérience IPTV Maroc. Avec un abonnement FTTH Maroc Telecom, Inwi ou Orange, vous disposez en théorie d'un débit largement suffisant pour le 4K UHD. Pourtant, beaucoup d'utilisateurs signalent encore du buffering. Ce guide explique comment tirer le maximum de votre ligne fibre avec Shape IPTV.",
      "Commencez par mesurer le débit réel, pas le débit commercial. Branchez un PC ou un smartphone en Wi-Fi 5 GHz près de la box, lancez un test, puis comparez avec un test câblé Ethernet. Pour du 4K fluide, visez au moins 25 Mbps stables ; pour du FHD, 10–15 Mbps suffisent. Notre outil dédié sur /test-connexion-serveur évalue latence et bande passante pour recommander le protocole idéal.",
      "Côté DNS, privilégiez des résolveurs fiables (1.1.1.1, 8.8.8.8) configurés dans la Livebox / box fibre. Évitez les VPN trop lointains qui ajoutent 80–150 ms de latence : l'Anti-Freeze Shape compense les micro-coupures locales, pas une route internationale saturée.",
      "Activez le QoS (Quality of Service) si votre routeur le propose, et priorisez l'adresse MAC de la Smart TV ou de la TV Box. Sur fibre Maroc Telecom, désactivez temporairement le Wi-Fi Guest pendant les matchs pour libérer de la bande passante.",
      "Enfin, choisissez le bon pack : le pack Pro couvre déjà HD/FHD ; Extra et Premium débloquent le 4K et l'installation jusqu'à 3 appareils (1 flux actif). Consultez les détails et tarifs DHS sur /abonnement-iptv, puis activez en quelques minutes depuis la page d'accueil shape.ma.",
    ],
  },
  {
    slug: "meilleure-configuration-smart-tv-iptv-maroc",
    title: "Meilleure configuration Smart TV pour IPTV au Maroc (LG, Samsung, Android)",
    description:
      "Réglages LG webOS, Samsung Tizen et Android TV pour une Installation IPTV Smart TV Maroc sans erreur XC/M3U.",
    keyword: "Installation IPTV Smart TV Maroc",
    date: "2026-08-21",
    readingMinutes: 11,
    category: "Installation",
    content: [
      "Une Installation IPTV Smart TV Maroc réussie dépend autant de l'application que des réglages système. Ce tutoriel couvre LG webOS, Samsung Tizen et Android TV / Google TV — les trois plateformes les plus répandues à Casablanca, Rabat, Marrakech et Tanger.",
      "Sur LG webOS, installez l'application IPTV Smarters ou SS IPTV via le Content Store, puis saisissez vos identifiants Shape (URL serveur XC + username / password). Passez la qualité vidéo sur « Auto » et activez le hardware decoding. Sur webOS 22+, autorisez le stockage local pour le cache VOD.",
      "Samsung Tizen préfère souvent Smart IPTV ou SS IPTV. Après activation du compte développeur (si requis), importez la playlist. Limitez le buffer à 3–5 secondes pour réduire le délai live, et évitez le Wi-Fi 2.4 GHz saturé : connectez la TV en Ethernet ou Wi-Fi 5 GHz.",
      "Android TV et Xiaomi Mi Box offrent le plus de flexibilité (TiviMate, IPTV Smarters Pro, OTT Navigator). Accordez les permissions réseau, désactivez l'économie d'énergie agressive, et mettez à jour Google Play Services. Pour Formuler et boxes Linux, utilisez MyTVOnline 2 avec le profil XC API Shape.",
      "Notre assistant InstantSetupWizard sur /installation-tutoriels génère les étapes exactes selon votre appareil. Pour comparer Pro, Extra et Premium (299 / 449 / 599 DHS), rendez-vous sur /abonnement-iptv. Shape IPTV Maroc active l'application PRO dès la souscription.",
    ],
  },
  {
    slug: "resoudre-buffering-iptv-maroc",
    title: "Résoudre le buffering IPTV au Maroc : causes et solutions Anti-Freeze",
    description:
      "Diagnostic complet des freezes IPTV (Wi-Fi, DNS, ISP, serveur) et solutions Anti-Freeze 2.0 / 2.2 Shape.",
    keyword: "Serveur IPTV sans coupure Maroc",
    date: "2026-09-16",
    readingMinutes: 10,
    category: "Stabilité",
    content: [
      "Le buffering reste la plainte n°1 des abonnés IPTV Maroc. Avant de changer de fournisseur, isolez la cause : réseau local, opérateur, ou serveur. Un Serveur IPTV sans coupure Maroc repose sur trois piliers — débit, latence et architecture Anti-Freeze.",
      "Cause 1 — Wi-Fi saturé. Les murs épais des appartements marocains et le voisinage 2.4 GHz provoquent des micro-coupures. Solution : Ethernet, CPL, ou répéteur 5 GHz près de la TV. Cause 2 — débit ADSL insuffisant pour le 4K. Passez en FHD ou passez à la fibre.",
      "Cause 3 — DNS lent ou bloqué. Certains DNS opérateur résolvent mal les CDN OTT. Basculez vers Cloudflare ou Google DNS. Cause 4 — trop d'appareils en simultané. Sur Extra et Premium, Shape autorise l'installation jusqu'à 3 appareils mais un seul flux actif : la connexion non simultanée protège le serveur et votre confort.",
      "La technologie Anti-Freeze Shape (v2.0 Extra, v2.2 Premium) précharge les segments HLS, bascule automatiquement entre nœuds VPS, et lisse les pics de latence. Sur fibre, le pack Premium avec serveur VPS dédié offre la marge la plus confortable pour le sport en 4K.",
      "Lancez un diagnostic live sur /test-connexion-serveur, puis choisissez votre pack sur /abonnement-iptv. L'équipe Shape reste joignable 24/7 pour un recalibrage serveur si votre ISP change de peering.",
    ],
  },
  {
    slug: "iptv-multi-ecrans-mobilite-maroc",
    title: "IPTV multi-écrans et mobilité au Maroc : Smart TV, téléphone et TV Box",
    description:
      "Comment installer IPTV sur 3 appareils au Maroc tout en gardant 1 connexion active pour une stabilité maximale.",
    keyword: "IPTV multi appareils Maroc",
    date: "2026-10-28",
    readingMinutes: 8,
    category: "Mobilité",
    content: [
      "Regarder le foot à la maison, un film dans le train Casablanca–Rabat, puis une série le soir sur le téléphone : c'est le scénario multi-écrans que demandent les abonnés Shape. Les packs Extra et Premium répondent précisément à ce besoin de mobilité.",
      "Règle métier claire : vous pouvez installer l'abonnement jusqu'à 3 appareils (Smart TV, Smartphone, TV Box/PC) pour regarder où vous voulez. En revanche, le streaming fonctionne sur 1 appareil actif à la fois (connexion non simultanée). Cette limite évite le freeze et garantit la stabilité maximale du serveur OTT.",
      "Exemple concret : activez la Smart TV du salon le soir, puis déconnectez-la avant d'ouvrir l'app sur le smartphone. Le changement de session est quasi immédiat. Sur Premium, le serveur VPS dédié et l'Anti-Freeze 2.2 accélèrent encore cette bascule.",
      "Côté apps : TiviMate / Smarters sur Android, GSE ou Smarters iOS pour iPhone, et players natifs sur Formuler / Apple TV. Conservez les mêmes identifiants XC sur chaque appareil — c'est l'activation serveur qui gère la session unique.",
      "Pour souscrire Extra (449 DHS) ou Premium (599 DHS), ouvrez /abonnement-iptv. Des guides par appareil sont disponibles sur /installation-tutoriels, et la page d'accueil shape.ma résume la compatibilité Maroc Telecom, Inwi et Orange.",
    ],
  },
];

/** Parse YYYY-MM-DD as calendar date (no UTC day-shift). */
export function parseBlogDate(isoDate: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    throw new Error(`Date blog invalide (attendu YYYY-MM-DD): ${isoDate}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error(`Date blog impossible: ${isoDate}`);
  }
  return date;
}

/** Affichage strict fr-MA, ex. « 28 octobre 2026 ». */
export function formatBlogDate(isoDate: string): string {
  return parseBlogDate(isoDate).toLocaleDateString("fr-MA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
