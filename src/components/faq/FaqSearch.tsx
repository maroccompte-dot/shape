"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export function FaqSearch({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Tous");

  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const catOk = category === "Tous" || item.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une question (paiement, freeze, multi-écrans…)"
            className="w-full rounded-xl border border-border bg-black/40 py-3 pl-10 pr-3 text-sm outline-none focus:border-teal"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              category === c
                ? "bg-teal text-[#042f2e]"
                : "border border-border bg-black/30 text-muted hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted">Aucun résultat pour « {query} ».</p>
        ) : (
          filtered.map((item) => (
            <details
              key={item.id}
              className="group glass rounded-xl border border-border open:border-teal/40"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold marker:content-none">
                <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-teal">
                  {item.category}
                </span>
                {item.question}
              </summary>
              <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
