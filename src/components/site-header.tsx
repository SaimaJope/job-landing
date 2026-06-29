"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { publicPath } from "@/lib/public-path";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Palvelut", href: "#palvelut" },
  { label: "Yritys", href: "#yritys" },
  { label: "Toteutus", href: "#toteutus" },
  { label: "Toiminta-alue", href: "#toiminta-alue" },
  { label: "Yhteys", href: "#yhteystiedot" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && !open
          ? "border-b border-[rgba(120,160,210,0.1)] bg-background/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="relative z-10 flex min-w-0 items-center"
          aria-label="JOB Kiinteistötekniikka etusivulle"
          onClick={() => setOpen(false)}
        >
          <Image
            src={publicPath("/logo.png")}
            alt="JOB Kiinteistötekniikka Oy"
            width={170}
            height={80}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Päänavigaatio">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label-caps text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+358445723200"
            className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-text-secondary transition hover:text-text-primary"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            044 572 3200
          </a>
          <Link
            href="#yhteystiedot"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Pyydä tarjous
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Sulje valikko" : "Avaa valikko"}
          aria-expanded={open}
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center text-text-primary transition hover:text-accent lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[-1] flex flex-col bg-background/72 backdrop-blur-2xl transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_82%_110%,rgba(45,90,210,0.18),transparent),radial-gradient(60%_45%_at_12%_105%,rgba(0,141,200,0.14),transparent)]"
        />
        <nav
          className="container-shell relative flex flex-1 flex-col justify-center gap-1 pt-20"
          aria-label="Mobiilinavigaatio"
        >
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-white/[0.06] py-5"
              onClick={() => setOpen(false)}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-text-tertiary">
                0{i + 1}
              </span>
              <span className="font-display text-3xl font-medium text-text-primary transition-colors group-hover:text-accent">
                {item.label}
              </span>
            </Link>
          ))}

          <div className="mt-10 flex flex-col gap-5 pb-12">
            <a
              href="tel:+358445723200"
              className="inline-flex items-center gap-3 text-base text-text-secondary"
              onClick={() => setOpen(false)}
            >
              <Phone className="h-4 w-4 text-accent" />
              044 572 3200
            </a>
            <Link
              href="#yhteystiedot"
              className={cn(buttonVariants({ size: "lg" }), "self-start")}
              onClick={() => setOpen(false)}
            >
              Pyydä tarjous
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
