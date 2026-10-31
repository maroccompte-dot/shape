import Image from "next/image";
import Link from "next/link";

const PLATFORMS = [
  {
    name: "Android",
    src: "/platforms/android-real.png",
    bg: "bg-black",
    img: "object-contain scale-[0.78]",
  },
  {
    name: "Tizen",
    src: "/platforms/tizen-real.png",
    bg: "bg-black",
    img: "object-contain scale-[0.88]",
  },
  {
    name: "webOS",
    src: "/platforms/webos-real.png",
    bg: "bg-white",
    img: "object-contain scale-[0.82]",
  },
  {
    name: "VIDAA",
    src: "/platforms/vidaa-real.png",
    bg: "bg-gradient-to-r from-[#d8b4fe] via-[#818cf8] to-[#4f46e5]",
    img: "object-cover object-center",
  },
  {
    name: "Apple",
    src: "/platforms/apple-real.png",
    bg: "bg-black",
    // smaller so the apple mark is clear (no "Action packed")
    img: "object-cover object-[center_22%] scale-[1.15]",
  },
  {
    name: "Google TV",
    src: "/platforms/googletv-real.png",
    bg: "bg-black",
    img: "object-contain scale-[0.9]",
  },
] as const;

export function CompatiblePlatforms() {
  return (
    <div className="mt-6">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300/90">
          Compatible sur
        </p>
        <Link
          href="/installation-tutoriels"
          className="text-[11px] font-semibold text-purple hover:underline"
        >
          Guides d&apos;installation →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {PLATFORMS.map((p) => (
          <div
            key={p.name}
            title={`Compatible ${p.name}`}
            className="group overflow-hidden rounded-2xl border border-white/12 bg-[#0c0a12]/80 shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-purple/45 hover:shadow-[0_14px_40px_rgba(123,67,255,0.3)]"
          >
            <div
              className={`relative h-[68px] w-full overflow-hidden ${p.bg}`}
            >
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-white/10"
                aria-hidden
              />
              <Image
                src={p.src}
                alt={p.name}
                fill
                sizes="120px"
                className={`transition duration-300 group-hover:scale-105 ${p.img}`}
              />
            </div>
            <div className="border-t border-white/8 bg-black/50 px-1 py-1.5 text-center backdrop-blur-sm">
              <span className="text-[10px] font-semibold tracking-wide text-violet-100/85">
                {p.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
