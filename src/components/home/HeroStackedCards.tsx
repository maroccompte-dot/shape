"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, Star } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import clsx from "clsx";

const CARDS = [
  {
    id: "pro",
    name: "Pro",
    price: 299,
    ring: "ring-violet-300/50",
    glow: "shadow-[0_25px_60px_rgba(139,92,246,0.35)]",
    chip: "bg-violet-500",
    features: ["+20 000 chaînes HD", "1 appareil unique", "Anti-Freeze inclus"],
  },
  {
    id: "extra",
    name: "Extra",
    price: 449,
    ring: "ring-purple/60",
    glow: "shadow-[0_30px_70px_rgba(123,67,255,0.55)]",
    chip: "bg-purple",
    features: ["+29 000 chaînes 4K", "Jusqu'à 3 appareils", "Anti-Freeze 2.0"],
    badge: "La plus choisie",
  },
  {
    id: "premium",
    name: "Premium",
    price: 599,
    ring: "ring-fuchsia-300/45",
    glow: "shadow-[0_25px_60px_rgba(217,70,239,0.35)]",
    chip: "bg-fuchsia-500",
    features: ["+45 000 flux UHD", "VPS dédié VIP", "Anti-Freeze 2.2"],
  },
] as const;

const STACK = [
  { rotate: -14, x: -56, y: 28, scale: 0.88, z: 1 },
  { rotate: 12, x: 58, y: 22, scale: 0.9, z: 2 },
  { rotate: -3, x: 0, y: 0, scale: 1, z: 10 },
];

export function HeroStackedCards() {
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const id = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.pop()!;
        next.unshift(front);
        return next;
      });
    }, 3200);
    return () => clearInterval(id);
  }, []);

  function bringToFront(visualIndex: number) {
    if (visualIndex === 2) return;
    setOrder((prev) => {
      const next = [...prev];
      const [picked] = next.splice(visualIndex, 1);
      next.push(picked);
      return next;
    });
  }

  const frontCard = CARDS[order[2]];

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Soft stage light */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/40 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[40%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-[50px]"
        aria-hidden
      />

      <div className="relative mx-auto flex h-[340px] items-center justify-center sm:h-[360px]">
        {order.map((cardIndex, stackPos) => {
          const card = CARDS[cardIndex];
          const pose = STACK[stackPos];
          const isFront = stackPos === 2;

          return (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onClick={() => bringToFront(stackPos)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  bringToFront(stackPos);
                }
              }}
              className={clsx(
                "absolute w-[210px] origin-bottom rounded-[22px] p-[1px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[230px]",
                isFront ? card.glow : "shadow-xl opacity-90",
                isFront ? "cursor-default" : "cursor-pointer"
              )}
              style={{
                transform: `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rotate}deg) scale(${pose.scale})`,
                zIndex: pose.z,
                background: isFront
                  ? "linear-gradient(135deg, rgba(167,139,250,0.9), rgba(123,67,255,0.5), rgba(232,121,249,0.55))"
                  : "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(123,67,255,0.15))",
              }}
              aria-label={`Pack ${card.name} — ${card.price} DH`}
            >
              <div
                className={clsx(
                  "rounded-[21px] bg-gradient-to-br from-[#1c1533] via-[#15101f] to-[#0e0b16] p-5 ring-1",
                  card.ring
                )}
              >
                {"badge" in card && card.badge && isFront ? (
                  <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple to-fuchsia-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                    <Star className="h-3 w-3 fill-current" />
                    {card.badge}
                  </span>
                ) : (
                  <span className="mb-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300/90">
                    <Sparkles className="h-3 w-3" /> Shape
                  </span>
                )}

                <p className="font-display text-2xl font-bold tracking-tight text-white">
                  {card.name}
                </p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="bg-gradient-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-3xl font-bold text-transparent">
                    {card.price}
                  </span>
                  <span className="text-sm font-medium text-violet-200/70">
                    DH / an
                  </span>
                </p>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-3">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[12px] text-violet-100/85"
                    >
                      <span
                        className={clsx(
                          "flex h-4 w-4 items-center justify-center rounded-full",
                          card.chip
                        )}
                      >
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {isFront ? (
                  <a
                    href={whatsappLink(
                      `Bonjour Shape, je prends la formule ${card.name}, 12 mois (${card.price} DHS).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 block rounded-xl bg-gradient-to-r from-purple via-violet-500 to-fuchsia-500 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_24px_rgba(123,67,255,0.45)] transition hover:brightness-110"
                  >
                    Choisir {card.name}
                  </a>
                ) : (
                  <p className="mt-4 text-center text-[10px] font-medium text-violet-300/50">
                    Toucher pour ouvrir
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick dots */}
      <div className="mt-2 flex justify-center gap-2">
        {CARDS.map((c, i) => (
          <span
            key={c.id}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-500",
              order[2] === i ? "w-6 bg-purple" : "w-1.5 bg-white/25"
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-violet-200/60">
        Pack actif : <span className="font-semibold text-white">{frontCard.name}</span> ·{" "}
        {frontCard.price} DH
      </p>
    </div>
  );
}
