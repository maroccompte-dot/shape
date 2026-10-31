import Link from "next/link";
import { Clock, Newspaper } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatBlogDate, getPostsSorted } from "@/lib/blog-data";

export const metadata = buildMetadata({
  title: "Blog IPTV Maroc — Guides fibre, Smart TV et stabilité",
  description:
    "Blog Shape IPTV Maroc : optimiser la fibre, configurer Smart TV, résoudre le buffering et maîtriser le multi-écrans. Articles SEO fr-MA.",
  path: "/blog",
  keywords: ["Blog IPTV Maroc", "guide IPTV Maroc", "tutoriel IPTV"],
});

export default function BlogHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Blog IPTV Maroc", path: "/blog" }]} />

      <header className="mb-10 max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 text-sm text-teal">
          <Newspaper className="h-4 w-4" /> Hub éditorial Shape
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Blog IPTV Maroc
        </h1>
        <p className="mt-4 text-muted">
          Articles détaillés pour réussir votre expérience Shape : réseau,
          installation et mobilité — avec liens vers{" "}
          <Link href="/abonnement-iptv" className="text-teal underline">
            Abonnement IPTV Maroc
          </Link>{" "}
          et l&apos;
          <Link href="/" className="text-teal underline">
            accueil IPTV Maroc
          </Link>
          .
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {getPostsSorted().map((post) => (
          <article
            key={post.slug}
            className="glass flex flex-col rounded-2xl border border-border p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-teal">
              {post.category}
            </p>
            <h2 className="mt-2 font-display text-xl font-bold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-teal"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {post.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} min
              </span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 text-sm font-semibold text-teal hover:underline"
            >
              Lire l&apos;article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
