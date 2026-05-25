import type { Metadata } from "next";

import catalogData from "@/data/catalog.json";
import { ProductCatalog } from "@/components/products/product-catalog";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Catalog } from "@/lib/products";

const catalog = catalogData as Catalog;

export const metadata: Metadata = {
  title: "Tuotteet | JOB Kiinteistötekniikka Oy",
  description:
    "Sähkö- ja taloteknisten tuotteiden luettelo. Kokoa tilauslista ja pyydä tarjous saatavuudesta ja hinnasta.",
};

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_50%_at_80%_120%,rgba(120,92,255,0.06),transparent),radial-gradient(60%_45%_at_15%_110%,rgba(0,141,200,0.07),transparent)]"
      />
      <SiteHeader />

      <main className="relative z-10 pb-28 pt-32">
        <div className="container-shell">
          <header className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-accent-glow/50" />
              Tuotteet
            </p>
            <h1 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
              Tuoteluettelo
            </h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-text-secondary">
              Sähkö- ja talotekniikan tuotteita entisestä JOB Kaupasta. Lisää
              tarvitsemasi tuotteet tilauslistalle ja lähetä se yhteydenottolomakkeella.
              Vahvistamme saatavuuden ja hinnan.
            </p>
            <p className="mt-4 text-sm text-text-tertiary">
              Hinnat sisältävät ALV 25,5 % ja ovat viitteellisiä. Verkkokauppa on
              suljettu; vahvistamme hinnan ja saatavuuden yhteydenoton yhteydessä.
            </p>
          </header>

          <div className="mt-14">
            <ProductCatalog catalog={catalog} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
