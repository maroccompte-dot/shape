export type PackId = "pro" | "extra" | "premium";

export interface Pack {
  id: PackId;
  packNumber: number;
  name: string;
  theme: "purple" | "teal" | "vip";
  featured?: boolean;
  tagline: string;
  priceDhs: number;
  devicesInstall: number;
  features: string[];
  highlightNote?: string;
  ctaLabel: string;
}

export const PACKS: Pack[] = [
  {
    id: "pro",
    packNumber: 1,
    name: "Pro",
    theme: "purple",
    tagline:
      "Le pack idéal pour démarrer avec l'application PRO activée dès la souscription.",
    priceDhs: 299,
    devicesInstall: 1,
    features: [
      "+20 000 canaux mondiaux en direct",
      "+90 000 films (VOD)",
      "+50 000 séries (VOD)",
      "Serveur OTT Standard",
      "Qualité HD & FHD stable",
      "Anti-freeze intégré",
      "1 Appareil unique",
      "Activation de l'Application PRO incluse",
      "Support 24/7",
    ],
    ctaLabel: "Commander — 299 DHS",
  },
  {
    id: "extra",
    packNumber: 2,
    name: "Extra",
    theme: "teal",
    tagline:
      "Haute technologie et catalogue XXL. Installation jusqu'à 3 appareils (Smart TV, Smartphone, TV Box/PC) pour regarder partout — lecture sur 1 appareil actif à la fois (connexion non simultanée) pour éviter le freeze et garantir la stabilité serveur.",
    priceDhs: 449,
    devicesInstall: 3,
    featured: true,
    features: [
      "+29 000 chaînes internationales",
      "+129 000 contenus VOD",
      "Serveur OTT Haute Disponibilité",
      "Qualité HD, FHD & 4K",
      "Anti-freeze 2.0",
      "Multi-Appareils — jusqu'à 3 écrans (Salon, Chambre, Mobile)",
      "Activation de l'Application PRO gratuite",
      "Support client prioritaire 24/7",
    ],
    highlightNote:
      "Installation jusqu'à 3 appareils (Connexion non simultanée — 1 flux actif)",
    ctaLabel: "Commander — 449 DHS",
  },
  {
    id: "premium",
    packNumber: 3,
    name: "Premium",
    theme: "vip",
    featured: false,
    tagline:
      "L'élite du divertissement mondial. Installation jusqu'à 3 appareils (Smart TV, Smartphone, TV Box/PC) pour regarder partout — streaming strictement limité à 1 appareil actif à la fois afin d'éviter le freeze et maximiser la stabilité du serveur.",
    priceDhs: 599,
    devicesInstall: 3,
    features: [
      "Master catalogue de +45 000 flux TV Premium",
      "+180 000 films et séries (VOD)",
      "Serveur OTT VPS dédié",
      "Résolution 4K UHD authentique",
      "Anti-freeze 2.2 de pointe",
      "Multi-Appareils — jusqu'à 3 écrans (Salon, Chambre, Mobile)",
      "Activation de l'Application PRO incluse",
      "Ligne d'assistance VIP 24/7",
    ],
    highlightNote:
      "Installation jusqu'à 3 appareils (Connexion non simultanée — 1 flux actif)",
    ctaLabel: "Commander — 599 DHS",
  },
];

export function getPack(id: PackId): Pack {
  const pack = PACKS.find((p) => p.id === id);
  if (!pack) throw new Error(`Pack introuvable: ${id}`);
  return pack;
}
