"use client";

import { Check, ImageOff, Plus, X } from "lucide-react";

import { useCart } from "@/components/inquiry/cart-provider";
import { formatPrice, type Product } from "@/lib/products";
import { publicPath } from "@/lib/public-path";

export function ProductCard({ product }: { product: Product }) {
  const { add, remove, has } = useCart();
  const inCart = has(product.id);
  const price = formatPrice(product.price);

  return (
    <article
      data-product-card
      className="group flex w-full max-w-[340px] flex-col overflow-hidden rounded-xl border border-border bg-white/[0.015] transition-colors duration-300 hover:border-border-strong"
    >
      <div className="relative aspect-square overflow-hidden bg-white/90">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicPath(product.image)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface text-text-tertiary">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
          {product.code}
        </p>
        <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-text-primary">
          {product.name}
        </h3>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-text-secondary">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <p className="text-sm text-text-primary">
            {price ?? (
              <span className="text-text-secondary">Hinta pyydettäessä</span>
            )}
          </p>
          {inCart ? (
            <button
              type="button"
              onClick={() => remove(product.id)}
              aria-label="Poista tilauslistalta"
              className="group/btn mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-accent-glow/50 bg-accent-glow/10 text-sm font-medium text-accent-glow transition hover:border-text-secondary/40 hover:bg-white/[0.04] hover:text-text-primary"
            >
              <Check className="h-4 w-4 group-hover/btn:hidden" />
              <X className="hidden h-4 w-4 group-hover/btn:block" />
              <span className="group-hover/btn:hidden">Listalla</span>
              <span className="hidden group-hover/btn:block">Poista listalta</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                add({ id: product.id, name: product.name, code: product.code })
              }
              className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-white/[0.02] text-sm font-medium text-text-primary transition hover:border-accent-glow hover:bg-white/[0.05]"
            >
              <Plus className="h-4 w-4" />
              Lisää tilaukseen
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
