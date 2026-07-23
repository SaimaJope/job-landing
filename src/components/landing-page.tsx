"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Package,
  Phone,
  RadioTower,
  ShieldCheck,
  Thermometer,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { BokehBackground } from "@/components/bokeh-background";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  qualification: string;
};

const services: Service[] = [
  {
    icon: Zap,
    title: "Sähköasennukset ja urakointi",
    description:
      "Sähköurakointi, sähkölaitekorjaukset ja sähköhuolto uudis- ja saneerauskohteisiin. Kiinteistöt, yrityskohteet ja taloyhtiöt.",
    qualification: "TUKES sähköurakointi",
  },
  {
    icon: RadioTower,
    title: "Tele ja antenni",
    description:
      "Antenni-, satelliitti- ja tietoverkkojen rakentaminen sekä päivitykset. Kiinteistöjen sisäverkot kuntoon.",
    qualification: "Seti Oy telepätevyys",
  },
  {
    icon: ShieldCheck,
    title: "Turvajärjestelmät",
    description:
      "Paloilmoittimet, kameravalvonta ja kulunvalvonta. Mitoitus kohteen käytön ja vaatimusten mukaan.",
    qualification: "Poliisihallituksen lupa",
  },
  {
    icon: Thermometer,
    title: "Kylmä ja huolto",
    description:
      "Kylmälaite- ja lämpöpumppuasennukset sekä kiinteistötekniikan jatkuva huolto ja ylläpitosopimukset.",
    qualification: "TUKES kylmälaiteasennus",
  },
  {
    icon: Package,
    title: "Tarvikemyynti",
    description:
      "Sähkö-, turva-, kylmä- ja teletarvikkeet edullisesti. Voit kysyä tarjousta myös pelkistä tarvikkeista.",
    qualification: "Tarjous myös tarvikkeista",
  },
];

const companyStats = [
  { value: "2009", label: "Toiminnassa vuodesta" },
  { value: "4", label: "Osaamisaluetta" },
  { value: "10", label: "Lupaa ja jäsenyyttä" },
];

const audiences = [
  {
    title: "Yksityishenkilöt",
    description:
      "Omakotitalojen ja vapaa-ajan asuntojen sähkö-, tele- ja lämpöpumpputyöt.",
  },
  {
    title: "Yritykset",
    description:
      "Liike- ja teollisuuskohteiden sähkö-, turva- ja kiinteistötekniikka.",
  },
  {
    title: "Julkinen sektori",
    description:
      "Kuntien ja julkisten kohteiden urakat dokumentoidusti toteutettuna.",
  },
];

const credentials = [
  "TUKES sähköurakointi",
  "TUKES paloilmoitin",
  "TUKES kylmälaiteasennus",
  "STUL",
  "SANT",
  "SULPU",
  "Seti Oy telepätevyys",
  "Poliisihallituksen elinkeinolupa",
  "Tilaajavastuu.fi Luotettava Kumppani",
  "Elektria-ketjun jäsenliike",
];

const processSteps = [
  {
    index: "01",
    title: "Kartoitus",
    description:
      "Käymme läpi kohteen, tarpeen, aikataulun ja luvituksen ennen toteutusta. Tarjous perustuu todelliseen laajuuteen.",
  },
  {
    index: "02",
    title: "Toteutus",
    description:
      "Asennus tehdään sovitusti ja dokumentointi kulkee mukana työn aikana. Yhteyshenkilö pysyy samana.",
  },
  {
    index: "03",
    title: "Luovutus",
    description:
      "Kohde luovutetaan käyttöön tarkastettuna. Huolto ja jatkotyöt sovitaan tarpeen mukaan.",
  },
];

const areaTargets = [
  { label: "Pohjois-Savo", query: "Pohjois-Savo, Finland", zoom: 8 },
  { label: "Iisalmi", query: "Iisalmi, Finland", zoom: 12 },
  { label: "Siilinjärvi", query: "Siilinjärvi, Finland", zoom: 12 },
  { label: "Kuopio", query: "Kuopio, Finland", zoom: 12 },
  { label: "Leppävirta", query: "Leppävirta, Finland", zoom: 12 },
  { label: "Varkaus", query: "Varkaus, Finland", zoom: 12 },
];

const contactRows = [
  {
    label: "Yhteydenottopyynnöt",
    value: "info@jobkauppa.fi",
    meta: "Sekä jobkiinteistotekniikka@gmail.com",
    icon: Mail,
    href: "mailto:info@jobkauppa.fi",
  },
  {
    label: "Suora töidentilaus",
    value: "044 572 3200",
    meta: "Juha Tykkyläinen",
    icon: Phone,
    href: "tel:+358445723200",
  },
  {
    label: "Osoite",
    value: "Myllärintie 5, 71470 Oravikoski",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Myll%C3%A4rintie%205%2C%2071470%20Oravikoski",
  },
];

export function LandingPage() {
  return (
    <div id="top" className="relative min-h-screen">
      {/* faint ambient so sections below the hero keep the deep blue mood */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_50%_at_82%_115%,rgba(64,86,220,0.08),transparent),radial-gradient(60%_45%_at_12%_108%,rgba(0,141,200,0.06),transparent)]"
      />
      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <CompanySection />
        <ProcessSection />
        <AreaSection />
        <CtaBand />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------- scroll reveal ----------
   Content is server-rendered visible. The hidden state is applied only after
   mount and only to elements below the fold, so nothing disappears if JS or
   IntersectionObserver is late. */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setHidden(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-70px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        hidden && "reveal-hidden",
        shown && "reveal-shown",
        className,
      )}
      style={delay && shown ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/* shared section heading: display headline, left aligned */
function SectionHeading({
  title,
  className,
}: {
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.02em] text-text-primary">
        {title}
      </h2>
    </div>
  );
}

/* ---------- hero ---------- */

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <BokehBackground />

      <div className="container-shell relative z-10 flex min-h-[88svh] flex-col justify-center pb-24 pt-40">
        <div className="max-w-3xl">
          <h1 className="hero-rise text-balance font-display text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em] [animation-delay:100ms]">
            <span className="text-display">Sähkö, tele ja turva.</span>
            <br />
            <span className="text-accent-line">Pohjois-Savossa.</span>
          </h1>

          <p className="hero-rise mt-8 max-w-xl text-pretty leading-8 text-text-secondary [animation-delay:200ms] sm:text-lg">
            JOB Kiinteistötekniikka Oy tekee sähkö-, tele-, turva- ja
            kylmäasennukset, urakoinnit ja huoltotyöt. Suunnittelusta
            toteutukseen, avaimet käteen. Iisalmesta Varkauteen ja tarvittaessa
            koko Suomi.
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-5 [animation-delay:300ms]">
            <Link href="#yhteystiedot" className={buttonVariants({ size: "lg" })}>
              Pyydä tarjous
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+358445723200"
              className="inline-flex items-center gap-2.5 font-mono text-sm tracking-[0.08em] text-text-primary transition hover:text-accent"
            >
              <Phone className="h-4 w-4 text-accent" />
              044 572 3200
            </a>
          </div>

          <div className="hero-rise mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary [animation-delay:400ms]">
            <span>TUKES-valtuutettu</span>
            <span className="text-accent/40">·</span>
            <span>STUL-jäsen</span>
            <span className="text-accent/40">·</span>
            <span>Tilaajavastuu.fi Luotettava Kumppani</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- services as rows, not a card wall ---------- */

function ServicesSection() {
  return (
    <section id="palvelut" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <SectionHeading title="Mitä teemme" />
        </Reveal>

        <div className="mt-12 border-t border-[rgba(120,160,210,0.12)]">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.04}>
                <div className="group grid grid-cols-1 gap-x-8 gap-y-4 border-b border-[rgba(120,160,210,0.12)] py-8 transition-colors hover:bg-[rgba(120,160,210,0.03)] md:grid-cols-[auto_1fr_auto] md:items-start md:py-9">
                  <div className="flex items-center gap-5 md:gap-6">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>

                  <div className="md:max-w-2xl">
                    <h3 className="text-xl font-medium tracking-[-0.01em] text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-pretty leading-7 text-text-secondary">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-4 md:pt-1 md:text-right">
                    <span className="font-mono text-[10px] uppercase leading-4 tracking-[0.13em] text-text-tertiary">
                      {service.qualification}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- company ---------- */

function CompanySection() {
  return (
    <section id="yritys" className="section-pad-b">
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="text-balance font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.1] tracking-[-0.02em] text-text-primary">
                Laaja-alainen
                <br />
                ammattitaito.
              </h2>
              <p className="mt-6 max-w-lg text-pretty leading-8 text-text-secondary">
                Sähköurakointia, sähkölaitekorjauksia ja sähköhuoltoa, tele- ja
                turva-asennuksia sekä kylmäasennuksia. Kaikki kohteet myös
                avaimet käteen -periaatteella, suunnittelusta toteutukseen.
              </p>
              <p className="mt-4 max-w-lg text-pretty leading-8 text-text-secondary">
                Vuodesta 2009. Olemme toteuttaneet useita merkittäviä hankkeita
                Pohjois-Savossa ja muualla Suomessa.
              </p>

              <div className="mt-12 flex flex-wrap gap-x-14 gap-y-7">
                {companyStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[2.75rem] font-medium leading-none text-text-primary">
                      {stat.value}
                    </div>
                    <div className="eyebrow-muted mt-3">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="eyebrow-muted">Luvat ja jäsenyydet</p>
                <ul className="mt-4 grid max-w-lg gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {credentials.map((credential) => (
                    <li
                      key={credential}
                      className="flex items-baseline gap-2.5 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-px overflow-hidden rounded-2xl border border-[rgba(120,160,210,0.12)]">
              {audiences.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-1 flex-col justify-center bg-[rgba(16,26,44,0.4)] p-7 transition-colors hover:bg-[rgba(20,32,54,0.55)]"
                >
                  <h3 className="font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function ProcessSection() {
  return (
    <section id="toteutus" className="section-pad-b">
      <div className="container-shell">
        <Reveal>
          <SectionHeading title="Suunnittelusta toteutukseen" />
          <p className="mt-6 max-w-xl text-pretty leading-8 text-text-secondary">
            Kaikki kohteet myös avaimet käteen -periaatteella. Sama
            yhteyshenkilö kulkee mukana kartoituksesta luovutukseen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[rgba(120,160,210,0.12)] md:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col bg-[rgba(16,26,44,0.4)] p-8 md:p-9">
                <h3 className="text-lg font-medium text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- area ---------- */

function AreaSection() {
  const [active, setActive] = useState(0);
  const target = areaTargets[active];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    target.query,
  )}&z=${target.zoom}&output=embed`;

  return (
    <section id="toiminta-alue" className="section-pad-b">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <SectionHeading title="Pohjois-Savo on kotialue" />
              <p className="mt-6 text-pretty leading-8 text-text-secondary">
                Pääasiallinen toiminta-alue on Iisalmi, Siilinjärvi, Kuopio,
                Leppävirta ja Varkaus. Tarvittaessa teemme asennuksia muuallakin
                Suomessa.
              </p>

              <div className="mt-9 flex flex-wrap gap-2.5">
                {areaTargets.map((item, i) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                      i === active
                        ? "border-[rgba(120,185,255,0.5)] bg-[rgba(47,130,255,0.1)] text-text-primary"
                        : "border-[rgba(120,160,210,0.18)] text-text-secondary hover:border-[rgba(120,185,255,0.4)] hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target.query)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 text-sm text-accent transition-all hover:gap-3"
              >
                Avaa Google Mapsissa
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-glow overflow-hidden p-1.5">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-background">
                <iframe
                  key={target.label}
                  title={`JOB Kiinteistötekniikka toiminta-alue: ${target.label}`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-[170deg] saturate-[0.6] contrast-[0.95] brightness-[0.78]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[rgba(120,160,210,0.12)]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

function CtaBand() {
  return (
    <section className="pb-6">
      <div className="container-shell">
        <Reveal>
          <div className="card-glow relative overflow-hidden p-9 sm:p-12">
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-medium tracking-[-0.01em] text-text-primary">
                  Valmiina seuraavaan projektiin?
                </h2>
                <p className="mt-3 max-w-md leading-7 text-text-secondary">
                  Kerro kohteesta, niin suunnitellaan yhdessä toimiva ja kestävä
                  ratkaisu. Vastaamme arkisin.
                </p>
              </div>
              <Link
                href="#yhteystiedot"
                className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
              >
                Ota yhteyttä
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function ContactSection() {
  return (
    <section id="yhteystiedot" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <SectionHeading title="Ota yhteyttä" />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="card-glow p-6 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col">
              <h3 className="text-xl font-medium text-text-primary">
                JOB Kiinteistötekniikka Oy
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                Y-tunnus 2295210-9
              </p>

              <div className="mt-6 flex flex-col border-t border-[rgba(120,160,210,0.12)]">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target={row.label === "Osoite" ? "_blank" : undefined}
                      rel={row.label === "Osoite" ? "noreferrer" : undefined}
                      className="group flex items-start gap-4 border-b border-[rgba(120,160,210,0.12)] py-5"
                    >
                      <Icon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
                          {row.label}
                        </span>
                        <span className="mt-1 block text-text-primary transition-colors group-hover:text-accent">
                          {row.value}
                        </span>
                        {row.meta ? (
                          <span className="mt-1 block text-sm text-text-secondary">
                            {row.meta}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  );
                })}
              </div>

              <p className="mt-auto pt-6 text-sm leading-6 text-text-tertiary">
                Pohjois-Savon alue ja koko Suomi.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
