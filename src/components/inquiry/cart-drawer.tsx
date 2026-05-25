"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { useCart } from "@/components/inquiry/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartLauncher() {
  const { count, open } = useCart();

  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Avaa tilauslista (${count} tuotetta)`}
      className="glass-pill fixed bottom-6 right-6 z-40 flex h-14 items-center gap-3 rounded-full px-5 text-sm font-medium text-text-primary shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:border-accent-glow"
    >
      <ShoppingBag className="h-5 w-5 text-accent-glow" />
      Tilauslista
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-background">
        {count}
      </span>
    </button>
  );
}

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, clear, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            // position:fixed inline so the .panel class (position:relative) can't
            // override it and drop the drawer into normal flow at the page bottom
            style={{ position: "fixed", top: 0, bottom: 0, right: 0 }}
            className="panel z-50 flex w-full max-w-md flex-col rounded-l-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            role="dialog"
            aria-label="Tilauslista"
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-accent-glow" />
                <h2 className="text-lg font-medium text-text-primary">
                  Tilauslista
                  <span className="ml-2 text-text-tertiary">{count}</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Sulje"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition hover:bg-white/5 hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="py-12 text-center text-sm text-text-secondary">
                  Tilauslista on tyhjä. Lisää tuotteita luettelosta.
                </p>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-text-primary">{item.name}</p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary">
                          {item.code}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <QtyButton
                          label="Vähennä"
                          onClick={() => setQty(item.id, item.qty - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </QtyButton>
                        <span className="w-6 text-center text-sm tabular-nums text-text-primary">
                          {item.qty}
                        </span>
                        <QtyButton
                          label="Lisää"
                          onClick={() => setQty(item.id, item.qty + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </QtyButton>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label="Poista"
                          className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition hover:text-text-primary"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <footer className="border-t border-border px-6 py-5">
                <p className="mb-4 text-xs leading-5 text-text-secondary">
                  Tilauslista ei ole sitova tilaus. Lähetä se yhteydenottolomakkeella,
                  niin palaamme saatavuuden ja hinnan kanssa.
                </p>
                <Link
                  href="/#yhteystiedot"
                  onClick={close}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Siirry yhteydenottoon
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-3 w-full text-center text-xs text-text-tertiary transition hover:text-text-primary"
                >
                  Tyhjennä lista
                </button>
              </footer>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function QtyButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary transition hover:border-border-strong hover:text-text-primary"
    >
      {children}
    </button>
  );
}
