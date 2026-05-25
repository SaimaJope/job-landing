import Image from "next/image";
import Link from "next/link";

import { publicPath } from "@/lib/public-path";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="container-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/#top" className="inline-flex">
          <Image
            src={publicPath("/logo.png")}
            alt="JOB Kiinteistötekniikka Oy"
            width={138}
            height={65}
            className="h-7 w-auto object-contain opacity-90"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-tertiary">
          <Link href="/tuotteet/" className="link-underline">
            Tuotteet
          </Link>
          <span>© {new Date().getFullYear()} JOB Kiinteistötekniikka Oy</span>
          <span>Y-tunnus 2295210-9</span>
          <Link href="/#yhteystiedot" className="link-underline">
            Tietosuojaseloste
          </Link>
        </div>
      </div>
    </footer>
  );
}
