import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { BLOG_POSTS, formatBlogDate, getPostBySlug } from "@/lib/blog-data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.keyword, "Blog IPTV Maroc"],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: SITE.language,
          author: { "@type": "Organization", name: SITE.name },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal">
          {post.category} · {post.keyword}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} min de lecture
          </span>
        </p>
      </header>

      <div className="space-y-5 text-base leading-relaxed text-foreground/90">
        {post.content.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      <aside className="mt-10 rounded-2xl border border-teal/40 bg-teal/10 p-5 text-sm">
        <p className="font-semibold text-teal">Maillage interne Shape</p>
        <ul className="mt-3 space-y-2 text-muted">
          <li>
            Souscrire :{" "}
            <Link href="/abonnement-iptv" className="text-teal underline">
              Abonnement IPTV Maroc (Pro / Extra / Premium)
            </Link>
          </li>
          <li>
            Découvrir l&apos;offre :{" "}
            <Link href="/" className="text-teal underline">
              IPTV Maroc — accueil shape.ma
            </Link>
          </li>
          <li>
            Installer :{" "}
            <Link href="/installation-tutoriels" className="text-teal underline">
              Tutoriels Smart TV
            </Link>
          </li>
        </ul>
      </aside>

      <p className="mt-8">
        <Link href="/blog" className="text-sm text-muted hover:text-teal">
          ← Retour au blog
        </Link>
      </p>
    </article>
  );
}
