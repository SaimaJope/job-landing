"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import type { Catalog } from "@/lib/products";

const PAGE = 48;

export function ProductCatalog({ catalog }: { catalog: Catalog }) {
  const { products, categories } = catalog;
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (active !== "all" && p.categoryId !== active) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        (p.ean ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, active, query]);

  // reset paging when the result set changes
  useEffect(() => {
    setLimit(PAGE);
  }, [active, query]);

  const visible = filtered.slice(0, limit);
  const remaining = filtered.length - visible.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      {/* category rail */}
      <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain scroll-slim lg:pr-2">
        <p className="eyebrow mb-4">Kategoriat</p>
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1 lg:pb-4">
          <CategoryButton
            active={active === "all"}
            onClick={() => setActive("all")}
            label="Kaikki tuotteet"
            count={products.length}
          />
          {categories.map((c) => (
            <CategoryButton
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
              label={c.name}
              count={c.count}
            />
          ))}
        </nav>
      </aside>

      <div>
        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hae tuotetta, koodia tai EAN-numeroa…"
            className="field h-12 w-full rounded-lg pl-11 pr-11 text-sm"
            aria-label="Hae tuotteita"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Tyhjennä haku"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-text-tertiary transition hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
          {filtered.length} tuotetta
        </p>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-text-secondary">
            Ei osumia haulla &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {remaining > 0 ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="glass-pill rounded-full px-6 py-3 text-sm font-medium text-text-primary transition hover:border-accent-glow"
                >
                  Näytä lisää ({remaining})
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex max-w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-xs tracking-wide transition lg:w-full ${
        active
          ? "bg-white/[0.06] text-text-primary"
          : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary"
      }`}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="shrink-0 font-mono text-[10px] text-text-tertiary">{count}</span>
    </button>
  );
}
