import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomProcessPayments } from "@/components/layout/BottomProcessPayments";
import { FloatingAgentDock } from "@/components/agents/FloatingAgentDock";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `IPTV Maroc Premium | ${SITE.name}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.language}>
      <body className={`${outfit.variable} ${syne.variable} antialiased`}>
        <JsonLd data={organizationJsonLd()} />
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <BottomProcessPayments />
        <Footer />
        <FloatingAgentDock />
      </body>
    </html>
  );
}
