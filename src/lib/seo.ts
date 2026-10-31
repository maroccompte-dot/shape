import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE.shortName)
    ? title
    : `${title} | ${SITE.shortName}`;

  return {
    // absolute: évite le double suffixe avec le template root `%s | Shape`
    title: { absolute: fullTitle },
    description,
    keywords: [
      "IPTV Maroc",
      "Abonnement IPTV Maroc",
      "Shape IPTV",
      "IPTV sans coupure",
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    areaServed: "MA",
    sameAs: [SITE.url],
  };
}
