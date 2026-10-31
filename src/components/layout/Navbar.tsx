"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";
import clsx from "clsx";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#0a090f]/85 backdrop-blur-xl">
      {/* Promo bar */}
      <div className="border-b border-purple/25 bg-gradient-to-r from-purple via-[#6d28d9] to-fuchsia-600">
        <Link
          href="/abonnement-iptv"
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 py-2 text-center text-[11px] font-semibold leading-snug text-white sm:gap-2.5 sm:px-6 sm:text-xs lg:px-8"
        >
          <Gift className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
          <span>
            <span className="font-bold uppercase tracking-wide">Promotion</span>
            {" — "}
            À chaque achat de pack, bénéficiez d&apos;une{" "}
            <span className="underline decoration-white/60 underline-offset-2">
              activation Application PRO gratuite
            </span>
          </span>
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple text-white shadow-[0_0_24px_rgba(123,67,255,0.45)]">
            <Zap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-foreground">{SITE.shortName}</span>
            <span className="ml-1 text-purple">.ma</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/10 text-white"
                    : "text-muted hover:bg-white/5 hover:text-white"
                )}
              >
                {link.short}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(
              "Bonjour Shape, je souhaite un Abonnement IPTV Maroc."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl bg-purple px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(123,67,255,0.35)] transition hover:brightness-110 sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-foreground lg:hidden"
            aria-expanded={open}
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-[#0b0d14] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-foreground/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink(
                "Bonjour Shape, je souhaite un Abonnement IPTV Maroc."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-xl bg-purple px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Commander via WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
