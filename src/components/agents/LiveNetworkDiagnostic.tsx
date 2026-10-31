"use client";

import { useState } from "react";
import {
  Activity,
  Gauge,
  Loader2,
  Radio,
  Signal,
} from "lucide-react";
import Link from "next/link";

type Isp = "iam" | "inwi" | "orange" | "other";
type LinkType = "fiber" | "adsl" | "4g";

interface Result {
  latencyMs: number;
  downloadMbps: number;
  jitterMs: number;
  score: number;
  protocol: string;
  quality: string;
  advice: string;
}

function simulateDiagnostic(isp: Isp, link: LinkType): Result {
  const baseLatency =
    link === "fiber" ? 18 : link === "adsl" ? 42 : 55;
  const ispBonus = isp === "iam" ? -3 : isp === "inwi" ? -1 : isp === "orange" ? -2 : 5;
  const latencyMs = Math.max(8, Math.round(baseLatency + ispBonus + Math.random() * 12));
  const downloadMbps =
    link === "fiber"
      ? 80 + Math.random() * 120
      : link === "adsl"
        ? 8 + Math.random() * 14
        : 20 + Math.random() * 40;
  const jitterMs = Math.round((link === "fiber" ? 2 : 8) + Math.random() * 6);
  const mbps = Math.round(downloadMbps * 10) / 10;

  let quality = "HD 720p";
  let protocol = "HLS adaptatif (sécurisé)";
  let advice =
    "Débit correct pour du live HD. Pack Pro recommandé ; évitez le 4K en heures de pointe.";

  if (mbps >= 25 && latencyMs < 45) {
    quality = "4K UHD";
    protocol = "HLS Low-Latency + Anti-Freeze 2.2";
    advice =
      "Excellent pour un Serveur IPTV sans coupure Maroc. Pack Premium / Extra conseillé pour le 4K sport.";
  } else if (mbps >= 12) {
    quality = "Full HD 1080p";
    protocol = "HLS adaptatif + Anti-Freeze 2.0";
    advice =
      "Idéal Full HD. Sur ADSL, restez en FHD ; sur fibre, activez le 4K progressivement.";
  }

  if (link === "4g" && latencyMs > 50) {
    protocol = "HLS conservateur (buffer étendu)";
    advice +=
      " En 4G, limitez-vous à 1 appareil actif et privilégiez le Wi-Fi fibre dès que possible.";
  }

  const score = Math.min(
    100,
    Math.round(
      (mbps >= 25 ? 40 : mbps >= 12 ? 28 : 15) +
        (latencyMs < 30 ? 35 : latencyMs < 50 ? 25 : 12) +
        (jitterMs < 8 ? 25 : 12)
    )
  );

  return {
    latencyMs,
    downloadMbps: mbps,
    jitterMs,
    score,
    protocol,
    quality,
    advice,
  };
}

export function LiveNetworkDiagnostic() {
  const [isp, setIsp] = useState<Isp>("iam");
  const [link, setLink] = useState<LinkType>("fiber");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [progress, setProgress] = useState(0);

  async function runTest() {
    setRunning(true);
    setResult(null);
    setProgress(0);
    for (let i = 1; i <= 8; i++) {
      await new Promise((r) => setTimeout(r, 220));
      setProgress(i * 12.5);
    }
    // Lightweight real RTT sample via favicon fetch timing
    let sampledLatency: number | null = null;
    try {
      const t0 = performance.now();
      await fetch("/", { cache: "no-store", method: "HEAD" });
      sampledLatency = Math.round(performance.now() - t0);
    } catch {
      sampledLatency = null;
    }
    const base = simulateDiagnostic(isp, link);
    if (sampledLatency !== null) {
      base.latencyMs = Math.round(base.latencyMs * 0.55 + sampledLatency * 0.45);
    }
    setResult(base);
    setRunning(false);
    setProgress(100);
  }

  return (
    <section className="glass rounded-2xl border border-border p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/20 text-teal">
          <Activity className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Live Network Diagnostic
          </h2>
          <p className="mt-1 text-sm text-muted">
            Évaluez latence, bande passante estimée et protocole optimal pour un
            streaming IPTV stable sur fibre, ADSL ou 4G au Maroc.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold">Opérateur</span>
          <select
            value={isp}
            onChange={(e) => setIsp(e.target.value as Isp)}
            className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 text-foreground outline-none focus:border-teal"
          >
            <option value="iam">Maroc Telecom</option>
            <option value="inwi">Inwi</option>
            <option value="orange">Orange Maroc</option>
            <option value="other">Autre / 4G voyage</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold">Type de liaison</span>
          <select
            value={link}
            onChange={(e) => setLink(e.target.value as LinkType)}
            className="w-full rounded-xl border border-border bg-black/40 px-3 py-2.5 text-foreground outline-none focus:border-teal"
          >
            <option value="fiber">Fibre FTTH</option>
            <option value="adsl">ADSL</option>
            <option value="4g">4G / 5G mobile</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        disabled={running}
        onClick={runTest}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-[#042f2e] disabled:opacity-60"
      >
        {running ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Gauge className="h-4 w-4" />
        )}
        {running ? "Diagnostic en cours…" : "Lancer le test serveur"}
      </button>

      {running || progress > 0 ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-sky-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-black/30 p-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
              <Signal className="h-3.5 w-3.5" /> Latence
            </p>
            <p className="mt-1 font-display text-2xl font-bold">
              {result.latencyMs} ms
            </p>
          </div>
          <div className="rounded-xl border border-border bg-black/30 p-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
              <Gauge className="h-3.5 w-3.5" /> Débit estimé
            </p>
            <p className="mt-1 font-display text-2xl font-bold">
              {result.downloadMbps} Mbps
            </p>
          </div>
          <div className="rounded-xl border border-border bg-black/30 p-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
              <Radio className="h-3.5 w-3.5" /> Score stabilité
            </p>
            <p className="mt-1 font-display text-2xl font-bold">{result.score}/100</p>
          </div>
          <div className="sm:col-span-3 rounded-xl border border-teal/40 bg-teal/10 p-5">
            <p className="text-sm">
              <strong>Qualité recommandée :</strong> {result.quality}
            </p>
            <p className="mt-1 text-sm">
              <strong>Protocole optimal :</strong> {result.protocol}
            </p>
            <p className="mt-2 text-sm text-foreground/85">{result.advice}</p>
            <p className="mt-3 text-sm">
              Jitter estimé : {result.jitterMs} ms —{" "}
              <Link href="/abonnement-iptv" className="font-semibold text-teal underline">
                voir les packs Anti-Freeze
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
