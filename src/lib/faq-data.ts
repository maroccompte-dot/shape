import type { FaqItem } from "@/components/faq/FaqSearch";

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "pay-1",
    category: "Facturation & Paiement au Maroc",
    question: "Quels moyens de paiement acceptez-vous au Maroc ?",
    answer:
      "Shape accepte les paiements en DHS via WhatsApp : virement bancaire, CIH / Attijari / BMCE, cash à la livraison selon ville, et parfois paiement mobile. Les tarifs affichés (299 / 449 / 599 DHS) sont annuels, sans euro.",
  },
  {
    id: "pay-2",
    category: "Facturation & Paiement au Maroc",
    question: "L'abonnement est-il annuel ou mensuel ?",
    answer:
      "Les packs Pro, Extra et Premium sont facturés à l'année (DHS/an) pour garantir un prix stable et un serveur prioritaire. Contactez le concierge pour toute demande particulière.",
  },
  {
    id: "pay-3",
    category: "Facturation & Paiement au Maroc",
    question: "Puis-je obtenir une facture ?",
    answer:
      "Oui. Après validation du paiement, demandez une facture/reçu sur WhatsApp avec votre nom et ville. Indiquez le pack commandé (Pro, Extra ou Premium).",
  },
  {
    id: "pay-4",
    category: "Facturation & Paiement au Maroc",
    question: "Puis-je être remboursé ?",
    answer:
      "Oui, sous 15 jours après achat/activation, sur demande motivée à contact@shape.ma ou via /contact. Garantie pendant toute la durée de l’abonnement. Traitement 3–7 jours ouvrables, même moyen de paiement. Détails : /remboursement.",
  },
  {
    id: "tech-1",
    category: "Configuration Technique",
    question: "Comment installer Shape sur Smart TV LG ou Samsung ?",
    answer:
      "Utilisez la page Installation IPTV Smart TV Maroc (/installation-tutoriels) : le wizard Instant Setup génère les étapes XC/M3U pour LG webOS, Samsung Tizen, Android TV, Xiaomi, Formuler, Apple et PC.",
  },
  {
    id: "tech-2",
    category: "Configuration Technique",
    question: "Qu'est-ce que l'Anti-Freeze Shape ?",
    answer:
      "L'Anti-Freeze précharge les segments HLS et bascule entre nœuds OTT pour limiter les freezes. Version intégrée sur Pro, 2.0 sur Extra, 2.2 de pointe sur Premium (VPS dédié).",
  },
  {
    id: "tech-3",
    category: "Configuration Technique",
    question: "Quels opérateurs sont compatibles ?",
    answer:
      "Maroc Telecom, Inwi et Orange Maroc (fibre, ADSL, 4G). Lancez le diagnostic sur /test-connexion-serveur pour valider latence et débit 4K.",
  },
  {
    id: "multi-1",
    category: "Multi-écrans & Mobilité",
    question: "Puis-je installer Extra ou Premium sur plusieurs appareils ?",
    answer:
      "Oui. Extra et Premium permettent l'installation jusqu'à 3 appareils (Smart TV, Smartphone, TV Box/PC) pour regarder partout. La lecture est limitée à 1 appareil actif à la fois (non simultané) pour éviter le freeze et maximiser la stabilité serveur.",
  },
  {
    id: "multi-2",
    category: "Multi-écrans & Mobilité",
    question: "Que signifie « connexion non simultanée » ?",
    answer:
      "Vos identifiants fonctionnent sur plusieurs appareils installés, mais un seul flux vidéo peut être actif. Fermez la session sur la TV avant d'ouvrir le téléphone, par exemple.",
  },
  {
    id: "multi-3",
    category: "Multi-écrans & Mobilité",
    question: "Le pack Pro est-il mono-appareil ?",
    answer:
      "Oui. Le pack Pro (299 DHS) est conçu pour 1 appareil unique — idéal pour démarrer. Passez Extra ou Premium pour la mobilité multi-écrans.",
  },
  {
    id: "net-1",
    category: "Stabilité Réseau",
    question: "Comment obtenir un serveur IPTV sans coupure au Maroc ?",
    answer:
      "Fibre recommandée (≥25 Mbps pour 4K), DNS Cloudflare/Google, Ethernet ou Wi-Fi 5 GHz, et pack Extra/Premium Anti-Freeze. Diagnostiquez sur /test-connexion-serveur.",
  },
  {
    id: "net-2",
    category: "Stabilité Réseau",
    question: "Que faire en cas de buffering pendant un match ?",
    answer:
      "Passez en FHD si le débit chute, fermez les autres téléchargements, vérifiez le Wi-Fi, et assurez-vous qu'un seul appareil streame. Contactez le support VIP Premium si le nœud doit être recalibré.",
  },
  {
    id: "net-3",
    category: "Stabilité Réseau",
    question: "La 4G suffit-elle pour Shape IPTV ?",
    answer:
      "Oui pour du HD/FHD avec une bonne couverture. Pour le 4K sport, privilégiez la fibre. Le diagnostic réseau recommande le protocole HLS adapté à la 4G.",
  },
];
