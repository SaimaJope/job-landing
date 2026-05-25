"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useCart } from "@/components/inquiry/cart-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Tuotteet", href: "/tuotteet" },
  { label: "Palvelut", href: "/#palvelut" },
  { label: "Toteutus", href: "/#toteutus" },
  { label: "Alue", href: "/#toiminta-alue" },
  { label: "Yhteys", href: "/#yhteystiedot" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-white/[0.08] bg-background/42 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label="JOB Kiinteistötekniikka etusivulle"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="JOB Kiinteistötekniikka Oy"
            width={170}
            height={80}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-7 rounded-full px-5 py-2 lg:flex",
            scrolled ? "glass-pill" : "",
          )}
          aria-label="Päänavigaatio"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-sm tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+358445723200"
            className="group mr-1 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary"
          >
            <Phone className="h-4 w-4 text-accent-glow" />
            044 572 3200
          </a>
          {count > 0 ? <CartButton count={count} onClick={openCart} /> : null}
          <Link
            href="/tuotteet"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4")}
          >
            <ShoppingBag className="h-4 w-4 text-accent-glow" />
            Selaa tuotteita
          </Link>
          <Link href="/#yhteystiedot" className={cn(buttonVariants({ size: "sm" }))}>
            Pyydä tarjous
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          {count > 0 ? <CartButton count={count} onClick={openCart} /> : null}
          <button
            type="button"
            aria-label={open ? "Sulje valikko" : "Avaa valikko"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center text-text-primary transition hover:text-accent-glow"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/[0.08] bg-background/60 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-shell flex flex-col py-2" aria-label="Mobiilinavigaatio">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-border/60 py-4 text-base text-text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 py-5">
            <a
              href="tel:+358445723200"
              className="inline-flex items-center gap-2 text-sm text-text-secondary"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4 text-accent-glow" />
              044 572 3200
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/tuotteet"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                onClick={() => setOpen(false)}
              >
                <ShoppingBag className="h-4 w-4 text-accent-glow" />
                Selaa tuotteita
              </Link>
              <Link
                href="/#yhteystiedot"
                className={cn(buttonVariants({ size: "sm" }))}
                onClick={() => setOpen(false)}
              >
                Pyydä tarjous
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Tilauslista${count ? `, ${count} tuotetta` : ""}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition hover:text-accent-glow"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-background">
          {count}
        </span>
      ) : null}
    </button>
  );
}
