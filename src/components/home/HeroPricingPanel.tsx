import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/constants";
import { HeroStackedCards } from "@/components/home/HeroStackedCards";
import { CompatiblePlatforms } from "@/components/home/CompatiblePlatforms";

export function HeroPricingPanel() {
  return (
    <section className="relative overflow-hidden px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div
        className="hero-grid pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(123,67,255,0.22),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-10 z-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-14">
        {/* Left copy */}
        <div className="animate-float-in px-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple/35 bg-purple/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-200 shadow-[0_0_24px_rgba(123,67,255,0.2)]">
            <Zap className="h-3.5 w-3.5 text-success" />
            IPTV Maroc · {SITE.domain}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            IPTV Maroc{" "}
            <span className="bg-gradient-to-r from-violet-300 via-purple to-fuchsia-300 bg-clip-text text-transparent">
              fluide, 4K,
            </span>{" "}
            sans coupure
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-violet-100/65 sm:text-lg">
            Packs Shape 100 % DHS —{" "}
            <strong className="text-white">Pro 299</strong>,{" "}
            <strong className="text-white">Extra 449</strong>,{" "}
            <strong className="text-white">Premium 599</strong> DH / 12 mois.
            Anti-Freeze, activation rapide, commande WhatsApp.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/abonnement-iptv"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(123,67,255,0.45)] transition hover:brightness-110"
            >
              Voir les abonnements <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(
                "Bonjour Shape, je découvre IPTV Maroc sur shape.ma."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#052e16]"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-violet-200/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" />
              IAM · Inwi · Orange
            </span>
            <span className="text-white/20">|</span>
            <span>Support 24/7</span>
            <span className="text-white/20">|</span>
            <span>Activation express</span>
          </div>

          <CompatiblePlatforms />
        </div>

        {/* Right: staged tilted cards only */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple/20 via-transparent to-fuchsia-500/10 blur-xl" />
          <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 backdrop-blur-xl sm:p-7">
            <div className="mb-1 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple">
                  Packs Shape
                </p>
                <p className="text-sm text-violet-100/60">
                  Faites défiler les cartes · cliquez pour choisir
                </p>
              </div>
              <span className="rounded-full border border-purple/30 bg-purple/15 px-3 py-1 text-[11px] font-semibold text-violet-200">
                {SITE.domain}
              </span>
            </div>

            <div className="animate-card-float mt-2">
              <HeroStackedCards />
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 border-t border-white/10 pt-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-fuchsia-500 text-white shadow-lg">
                <Zap className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold text-white">
                Shape<span className="text-purple">.ma</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex max-w-7xl flex-wrap items-center gap-3 rounded-2xl border border-purple/20 bg-white/[0.04] px-4 py-3 text-sm text-violet-100/70 shadow-sm backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
        </span>
        <span className="font-semibold text-success">Serveurs Shape : ONLINE</span>
        <span className="text-white/20">·</span>
        <span>Latence Casa / Rabat &lt; 25 ms · Uptime 99.9 %</span>
        <Link
          href="/test-connexion-serveur"
          className="ml-auto font-semibold text-purple hover:underline"
        >
          Tester ma connexion →
        </Link>
      </div>
    </section>
  );
}
