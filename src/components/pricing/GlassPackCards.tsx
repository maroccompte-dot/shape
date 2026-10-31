import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { PACKS } from "@/lib/packs";
import { whatsappLink } from "@/lib/constants";
import { PaymentOptions } from "@/components/pricing/PaymentOptions";
import clsx from "clsx";

type Mode = "teaser" | "full";

export function GlassPackCards({ mode = "teaser" }: { mode?: Mode }) {
  return (
    <div id={mode === "full" ? "packs" : undefined} className="grid gap-5 lg:grid-cols-3">
      {PACKS.map((pack, i) => {
        const featured = Boolean(pack.featured);
        const wa = whatsappLink(
          `Bonjour Shape, je souhaite commander le Pack ${pack.name} à ${pack.priceDhs} DHS/an.`
        );
        const href = mode === "teaser" ? "/abonnement-iptv#packs" : wa;
        const isExternal = mode === "full";

        return (
          <article
            key={pack.id}
            className={clsx(
              "glass-shine relative flex flex-col overflow-hidden rounded-2xl p-6 animate-float-in",
              featured && "glass-shine-featured lg:-translate-y-2 lg:scale-[1.02]"
            )}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {featured ? (
              <span className="absolute right-4 top-4 z-[1] inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple to-fuchsia-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_0_20px_rgba(123,67,255,0.5)]">
                <Sparkles className="h-3 w-3" /> Populaire
              </span>
            ) : null}

            <div className="relative z-[1] flex flex-1 flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Pack {pack.packNumber}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white drop-shadow-sm">
                {pack.name}
              </h3>

              <div className="mt-4 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-200/70">
                  Maroc · annuel
                </p>
                <p className="mt-0.5 font-display text-3xl font-bold tracking-tight text-white">
                  <span className="bg-gradient-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-transparent">
                    {pack.priceDhs}
                  </span>{" "}
                  <span className="text-base font-medium text-violet-100/70">
                    DH / an
                  </span>
                </p>
              </div>

              {mode === "teaser" ? (
                <p className="mt-4 flex-1 text-sm leading-relaxed text-violet-100/70 line-clamp-3">
                  {pack.tagline}
                </p>
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-violet-100/70">
                    {pack.tagline}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {pack.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-violet-50/90"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          strokeWidth={2.5}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pack.highlightNote ? (
                    <div className="mt-4 rounded-xl border border-amber-300/40 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-50">
                      {pack.highlightNote}
                    </div>
                  ) : null}
                  <PaymentOptions packId={pack.id} />
                </>
              )}

              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "relative z-[1] mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-semibold transition",
                    featured
                      ? "bg-gradient-to-r from-purple to-fuchsia-500 text-white shadow-[0_8px_28px_rgba(123,67,255,0.45)] hover:brightness-110"
                      : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  )}
                >
                  Choisir {pack.name}
                </a>
              ) : (
                <Link
                  href={href}
                  className={clsx(
                    "relative z-[1] mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-semibold transition",
                    featured
                      ? "bg-gradient-to-r from-purple to-fuchsia-500 text-white shadow-[0_8px_28px_rgba(123,67,255,0.45)] hover:brightness-110"
                      : "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  )}
                >
                  Choisir {pack.name}
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
