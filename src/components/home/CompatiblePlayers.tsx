import Image from "next/image";
import Link from "next/link";

type PlayerLogo = {
  name: string;
  src: string;
  /** Fond de la tuile — adapté au contraste du logo */
  bg: string;
  /** Classes object-* / scale pour cadrer le logo */
  img: string;
};

/**
 * Logos issus de /PHOTO PLAYER → /public/players
 * bg + crop calibrés selon transparence / fond blanc / format large.
 */
const PLAYERS: PlayerLogo[] = [
  {
    name: "TiviMate",
    src: "/players/tivimate.jpg",
    bg: "bg-[#0b1224]",
    img: "object-contain scale-[0.92] p-1",
  },
  {
    name: "IPTV Smarters Pro",
    src: "/players/iptv-smarters-pro.png",
    bg: "bg-[#181f44]",
    img: "object-contain scale-[0.95]",
  },
  {
    name: "Smarters Pro",
    src: "/players/smarters-pro.png",
    bg: "bg-[#181f44]",
    img: "object-contain scale-[0.95]",
  },
  {
    name: "Hot Player",
    src: "/players/hot-player.svg",
    bg: "bg-white",
    img: "object-contain scale-[0.72] p-2",
  },
  {
    name: "Hot IPTV",
    src: "/players/hot-iptv.png",
    bg: "bg-black",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "IBO Player",
    src: "/players/ibo-player.png",
    bg: "bg-black",
    img: "object-contain scale-[0.88]",
  },
  {
    name: "IBO Pro",
    src: "/players/ibo-pro.png",
    bg: "bg-black",
    img: "object-contain scale-[0.88]",
  },
  {
    name: "IBOSol",
    src: "/players/ibosol.png",
    bg: "bg-black",
    img: "object-contain scale-[0.78] p-1.5",
  },
  {
    name: "IBOX XPlayer",
    src: "/players/ibox-xplayer.png",
    bg: "bg-black",
    img: "object-contain scale-[0.85]",
  },
  {
    name: "IB Player",
    src: "/players/ib-player.png",
    bg: "bg-white",
    img: "object-contain scale-[0.9]",
  },
  {
    name: "IB Pro",
    src: "/players/ib-pro.png",
    bg: "bg-white",
    img: "object-contain scale-[0.9]",
  },
  {
    name: "IB Smarter",
    src: "/players/ib-smarter.png",
    bg: "bg-black",
    img: "object-contain scale-[0.8] p-1",
  },
  {
    name: "Bob Player",
    src: "/players/bob-player.png",
    bg: "bg-black",
    img: "object-contain scale-[0.78] p-2",
  },
  {
    name: "Bob Pro",
    src: "/players/bob-pro.png",
    bg: "bg-black",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "Duplex",
    src: "/players/duplex.png",
    bg: "bg-black",
    img: "object-contain scale-[0.78] p-2",
  },
  {
    name: "King 4K",
    src: "/players/king-4k.png",
    bg: "bg-black",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "Nino Player",
    src: "/players/nino-player.webp",
    bg: "bg-white",
    img: "object-contain scale-[0.88]",
  },
  {
    name: "SmartOne",
    src: "/players/smartone.webp",
    bg: "bg-black",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "SmartOne Pro",
    src: "/players/smartone-pro.png",
    bg: "bg-black",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "Nanomid",
    src: "/players/nanomid.jpg",
    bg: "bg-white",
    img: "object-contain scale-[0.9]",
  },
];

export function CompatiblePlayers() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-8 -z-10 h-48 w-[70%] -translate-x-1/2 rounded-full bg-purple/15 blur-[90px]"
        aria-hidden
      />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300/90">
            Lecteurs IPTV
          </p>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Applications compatibles
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Activez Shape sur votre lecteur préféré — XC API ou M3U, selon
            l&apos;app. Même expérience Anti-Freeze sur Smart TV, box et mobile.
          </p>
        </div>
        <Link
          href="/installation-tutoriels"
          className="text-sm font-semibold text-purple hover:underline"
        >
          Guides d&apos;installation →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
        {PLAYERS.map((p) => (
          <div
            key={p.name}
            title={`Compatible ${p.name}`}
            className="group overflow-hidden rounded-2xl border border-white/12 bg-[#0c0a12]/80 shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-purple/45 hover:shadow-[0_14px_40px_rgba(123,67,255,0.3)]"
          >
            <div
              className={`relative h-[72px] w-full overflow-hidden sm:h-[78px] ${p.bg}`}
            >
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-white/8"
                aria-hidden
              />
              <Image
                src={p.src}
                alt={p.name}
                fill
                sizes="160px"
                unoptimized={p.src.endsWith(".svg")}
                className={`transition duration-300 group-hover:scale-105 ${p.img}`}
              />
            </div>
            <div className="border-t border-white/8 bg-black/50 px-1.5 py-1.5 text-center backdrop-blur-sm">
              <span className="line-clamp-1 text-[10px] font-semibold tracking-wide text-violet-100/85">
                {p.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
