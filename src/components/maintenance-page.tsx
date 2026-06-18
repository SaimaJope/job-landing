"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { BokehBackground } from "@/components/bokeh-background";
import { publicPath } from "@/lib/public-path";

const contactPills = [
  {
    label: "044 572 3200",
    href: "tel:+358445723200",
    icon: Phone,
  },
  {
    label: "info@jobkauppa.fi",
    href: "mailto:info@jobkauppa.fi",
    icon: Mail,
  },
];

export function MaintenancePage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <BokehBackground />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        {/* logo */}
        <Image
          src={publicPath("/logo.png")}
          alt="JOB Kiinteistötekniikka Oy"
          width={300}
          height={140}
          priority
          className="hero-rise h-14 w-auto object-contain sm:h-16"
        />

        <h1 className="hero-rise mt-10 text-balance font-display text-[clamp(2rem,6vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.02em] [animation-delay:200ms]">
          <span className="text-display">Verkkosivujamme</span>
          <br />
          <span className="text-accent-line">päivitetään.</span>
        </h1>

        <p className="hero-rise mt-7 max-w-md text-pretty leading-8 text-text-secondary [animation-delay:300ms]">
          Uudet sivut julkaistaan pian. Palvelemme normaalisti, tavoitat meidät
          alla olevista yhteystiedoista.
        </p>

        {/* contact pills */}
        <div className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:400ms]">
          {contactPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <a
                key={pill.label}
                href={pill.href}
                className="glass-pill group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm text-text-primary transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4 text-accent" />
                {pill.label}
              </a>
            );
          })}
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Myll%C3%A4rintie%205%2C%2071470%20Oravikoski"
          target="_blank"
          rel="noreferrer"
          className="hero-rise group mt-6 inline-flex items-center gap-2.5 text-sm text-text-secondary transition-colors [animation-delay:500ms] hover:text-text-primary"
        >
          <MapPin className="h-4 w-4 text-accent" />
          Myllärintie 5, 71470 Oravikoski
        </a>

        <p className="hero-rise mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary [animation-delay:600ms]">
          JOB Kiinteistötekniikka Oy · Y-tunnus 2295210-9
        </p>
      </div>
    </main>
  );
}
