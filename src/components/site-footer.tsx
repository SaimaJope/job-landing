import Image from "next/image";
import Link from "next/link";

import { publicPath } from "@/lib/public-path";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[rgba(77,166,255,0.13)]">
      <div className="container-shell flex flex-col items-start gap-7 py-12 md:flex-row md:items-center md:justify-between">
        <Link href="#top" className="inline-flex">
          <Image
            src={publicPath("/logo.png")}
            alt="JOB Kiinteistötekniikka Oy"
            width={140}
            height={66}
            className="h-8 w-auto object-contain opacity-90"
          />
        </Link>

        <nav
          className="flex flex-wrap items-center gap-x-9 gap-y-3"
          aria-label="Alanavigaatio"
        >
          <Link
            href="#yhteystiedot"
            className="label-caps text-[11px] text-text-tertiary transition-colors hover:text-text-primary"
          >
            Tietosuoja
          </Link>
          <Link
            href="#yhteystiedot"
            className="label-caps text-[11px] text-text-tertiary transition-colors hover:text-text-primary"
          >
            Yhteystiedot
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
            Y-tunnus 2295210-9
          </span>
        </nav>

        <span className="text-sm text-text-tertiary">
          © {new Date().getFullYear()} JOB Kiinteistötekniikka Oy
        </span>
      </div>
    </footer>
  );
}
