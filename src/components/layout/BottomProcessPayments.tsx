import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Search,
  Zap,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Choisir le pack",
    subtitle: "Pro, Extra ou Premium adaptés au Maroc",
    href: "/abonnement-iptv",
  },
  {
    n: "02",
    icon: Lock,
    title: "Payer en sécurité",
    subtitle: "Paiement protégé 100 % en DHS",
    href: "/contact",
  },
  {
    n: "03",
    icon: Zap,
    title: "Activer IPTV",
    subtitle: "Identifiants & lecteur — livraison rapide",
    href: "/installation-tutoriels",
  },
] as const;

const PAYMENTS: {
  name: string;
  src: string;
  width: number;
  height: number;
}[] = [
  { name: "Orange Money", src: "/payments/orange.svg", width: 64, height: 24 },
  { name: "Cash Plus", src: "/payments/cashplus.svg", width: 84, height: 24 },
  { name: "Wafacash", src: "/payments/wafacash.png", width: 90, height: 24 },
  {
    name: "Attijariwafa bank",
    src: "/payments/attijari.png",
    width: 100,
    height: 24,
  },
  { name: "Visa", src: "/payments/visa.svg", width: 52, height: 20 },
  { name: "Mastercard", src: "/payments/mastercard.svg", width: 40, height: 26 },
  { name: "CIH Bank", src: "/payments/cih.png", width: 84, height: 22 },
  { name: "Bank of Africa", src: "/payments/boa.png", width: 100, height: 22 },
  { name: "Binance", src: "/payments/binance.svg", width: 26, height: 26 },
  { name: "Stripe", src: "/payments/stripe.svg", width: 56, height: 24 },
];

export function BottomProcessPayments() {
  return (
    <section
      aria-label="Comment commander et moyens de paiement"
      className="relative border-t border-purple/15 bg-gradient-to-b from-[#0a090f] via-[#0c0a14] to-[#0a090f]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col items-stretch justify-between gap-8 md:flex-row md:items-start md:gap-4 lg:gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="flex flex-1 items-start gap-3 md:contents"
              >
                <Link
                  href={step.href}
                  className="group flex flex-1 flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-purple/25 bg-[#161b22] shadow-[0_0_28px_rgba(123,67,255,0.18)] transition group-hover:border-purple/50 group-hover:shadow-[0_0_36px_rgba(123,67,255,0.35)]">
                      <Icon className="h-7 w-7 text-purple" strokeWidth={1.75} />
                    </span>
                    <span className="absolute -right-1 -top-1 rounded-md bg-purple px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-[0_0_12px_rgba(123,67,255,0.55)]">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-[200px] text-sm text-muted">
                    {step.subtitle}
                  </p>
                </Link>

                {index < STEPS.length - 1 ? (
                  <div
                    className="hidden flex-shrink-0 items-center pt-8 md:flex"
                    aria-hidden
                  >
                    <span className="h-px w-10 bg-gradient-to-r from-white/25 to-purple/60 lg:w-16" />
                    <ArrowRight className="h-4 w-4 -translate-x-0.5 text-purple" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="relative mt-12 mb-8">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="inline-flex items-center gap-2 bg-[#0a090f] px-4 text-sm font-semibold text-white">
              <CreditCard className="h-4 w-4 text-purple" />
              Moyens de paiement flexibles
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {PAYMENTS.map((p) => (
            <div
              key={p.name}
              title={p.name}
              className="flex h-10 min-w-[92px] shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-white px-3 shadow-[0_4px_14px_rgba(123,67,255,0.1)]"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-5 w-auto max-w-[88px] object-contain"
              />
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-muted">
          Maroc : RIB Attijariwafa / CIH + Cash Plus / Wafacash · International :
          Visa / Mastercard via Stripe (€) · reçu au concierge Shape.
        </p>
      </div>
    </section>
  );
}
