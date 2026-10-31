"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq-data";
import clsx from "clsx";

const HOME_FAQ = FAQ_ITEMS.slice(0, 8);

export function HomeFaq() {
  const [openId, setOpenId] = useState<string | null>(HOME_FAQ[0]?.id ?? null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            FAQ IPTV Maroc — questions fréquentes
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Paiement DHS, installation Smart TV, multi-écrans Extra/Premium et
            stabilité Anti-Freeze.
          </p>
        </div>
        <Link
          href="/faq"
          className="text-sm font-semibold text-purple hover:underline"
        >
          Voir toute la FAQ →
        </Link>
      </div>

      <div className="space-y-3">
        {HOME_FAQ.map((item) => {
          const open = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-[#161b22]"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span>
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-violet-300">
                    {item.category}
                  </span>
                  <span className="font-semibold text-white">{item.question}</span>
                </span>
                <ChevronDown
                  className={clsx(
                    "h-5 w-5 shrink-0 text-muted transition",
                    open && "rotate-180 text-purple"
                  )}
                />
              </button>
              {open ? (
                <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
