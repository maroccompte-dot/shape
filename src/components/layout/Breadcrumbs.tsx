import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.path + item.name} className="flex items-center gap-1.5">
                {i === 0 ? <Home className="h-3.5 w-3.5" aria-hidden /> : null}
                {last ? (
                  <span className="text-foreground/90" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="transition hover:text-teal"
                  >
                    {item.name}
                  </Link>
                )}
                {!last ? (
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
