"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  FileCheck,
  Landmark,
  Mail,
  MapPin,
  Network,
  PencilRuler,
  Phone,
  PlugZap,
  RadioTower,
  ShieldCheck,
  Thermometer,
  User,
  Users,
  Wrench,
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
    title: "Sähköasennukset",
    description:
      "Sähköjärjestelmien suunnittelu ja asennus uudis- ja saneerauskohteisiin. Kiinteistöt, yrityskohteet ja taloyhtiöt.",
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
    title: "Huolto ja kylmälaitteet",
    description:
      "Lämpöpumppu- ja kylmälaiteasennukset sekä kiinteistötekniikan jatkuva huolto ja ylläpitosopimukset.",
    qualification: "TUKES kylmälaiteasennus",
  },
];

const heroStrip = [
  { icon: PencilRuler, label: "Suunnittelu" },
  { icon: PlugZap, label: "Asennus" },
  { icon: Wrench, label: "Huolto" },
  { icon: ClipboardCheck, label: "Ylläpito" },
];

const trustItems = [
  { icon: Users, title: "25 ammattilaista", meta: "Iisalmesta Varkauteen" },
  { icon: BadgeCheck, title: "TUKES-luvat", meta: "Sähkö, paloilmoitin, kylmälaite" },
  { icon: Award, title: "Luotettava Kumppani", meta: "Tilaajavastuu.fi" },
  { icon: Network, title: "STUL · SANT · SULPU", meta: "Liittojäsenyydet" },
  { icon: FileCheck, title: "Elinkeinolupa", meta: "Poliisihallitus, turvallisuusala" },
];

const companyStats = [
  { value: "25", label: "Ammattilaista" },
  { value: "4", label: "Osaamisaluetta" },
  { value: "10", label: "Lupaa ja jäsenyyttä" },
];

const audiences = [
  {
    icon: User,
    title: "Yksityishenkilöt",
    description:
      "Omakotitalojen ja vapaa-ajan asuntojen sähkö-, tele- ja lämpöpumpputyöt.",
  },
  {
    icon: Building2,
    title: "Yritykset",
    description:
      "Liike- ja teollisuuskohteiden sähkö-, turva- ja kiinteistötekniikka.",
  },
  {
    icon: Landmark,
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
  "Poliisihallitus",
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
    label: "Puhelin",
    value: "044 572 3200",
    icon: Phone,
    href: "tel:+358445723200",
  },
  {
    label: "Sähköposti",
    value: "info@jobkauppa.fi",
    meta: "Osoite vahvistetaan ennen julkaisua.",
    icon: Mail,
    href: "mailto:info@jobkauppa.fi",
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
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_50%_at_82%_115%,rgba(64,86,220,0.1),transparent),radial-gradient(60%_45%_at_12%_108%,rgba(0,141,200,0.08),transparent)]"
      />
      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <TrustBand />
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

/* ---------- hero ---------- */

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <BokehBackground />
      <LightArc />

      <div className="container-shell relative z-10 grid min-h-[92svh] items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
        <div className="max-w-xl">
          <p className="hero-rise label-caps text-accent">
            Luotettava. Vastuullinen. Tekninen.
          </p>

          <h1 className="hero-rise mt-7 text-balance font-display text-[clamp(2.5rem,6.4vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.02em] [animation-delay:100ms]">
            <span className="text-display">Kiinteistötekniikkaa,</span>
            <br />
            <span className="text-accent-line">joka toimii.</span>
          </h1>

          <p className="hero-rise mt-7 max-w-lg text-pretty leading-8 text-text-secondary [animation-delay:200ms] sm:text-lg">
            JOB Kiinteistötekniikka Oy tarjoaa kokonaisvaltaiset sähkö-, tele- ja
            turvaratkaisut kiinteistöihin, toimitiloihin ja teollisuuteen.
            Suunnittelusta asennukseen ja ylläpitoon, 25 ammattilaisen voimin.
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-6 [animation-delay:300ms]">
            <Link href="#yhteystiedot" className={buttonVariants({ size: "lg" })}>
              Pyydä tarjous
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#palvelut"
              className="label-caps group inline-flex items-center gap-2.5 text-text-secondary transition-colors hover:text-text-primary"
            >
              Palvelut
              <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <a
            href="tel:+358445723200"
            className="hero-rise mt-9 inline-flex items-center gap-2.5 font-mono text-[12px] tracking-[0.12em] text-text-secondary transition [animation-delay:400ms] hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5 text-accent" />
            044 572 3200
          </a>
        </div>

        <div className="hero-rise relative flex flex-col justify-center [animation-delay:250ms]">
          {/* soft glow field where the arc passes, so the right side keeps light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -top-44 bottom-0 hidden bg-[radial-gradient(42%_46%_at_56%_30%,rgba(47,120,230,0.18),transparent_72%),radial-gradient(26%_30%_at_72%_16%,rgba(124,192,255,0.14),transparent_70%)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute left-[58%] top-[-120px] hidden h-28 w-28 -translate-x-1/2 lg:block"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(150,205,255,0.38),transparent_62%)]" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(160,210,255,0.85)]" />
          </div>

          <div className="card-glow relative grid grid-cols-2 gap-y-7 px-4 py-7 backdrop-blur-xl sm:grid-cols-4">
            {heroStrip.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex flex-col items-center gap-3 text-center",
                    i > 0 && "sm:border-l sm:border-[rgba(77,166,255,0.14)]",
                  )}
                >
                  <Icon className="h-6 w-6 text-accent [filter:drop-shadow(0_0_10px_rgba(77,166,255,0.5))]" />
                  <span className="label-caps text-[10px] text-text-secondary">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* glowing light arc sweeping across the hero, like a single long exposure */
function LightArc() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4da6ff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#7cc0ff" stopOpacity="0.5" />
          <stop offset="0.75" stopColor="#9bd0ff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#4da6ff" stopOpacity="0" />
        </linearGradient>
        <filter id="arcBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <path
        d="M-80,700 C420,610 780,470 1240,210"
        stroke="url(#arcGrad)"
        strokeWidth="12"
        opacity="0.3"
        filter="url(#arcBlur)"
      />
      <path
        d="M-80,700 C420,610 780,470 1240,210"
        stroke="url(#arcGrad)"
        strokeWidth="1.6"
        opacity="0.85"
      />
    </svg>
  );
}

/* ---------- services ---------- */

function ServicesSection() {
  return (
    <section id="palvelut" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <h2 className="section-label">Palvelumme</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.05} className="h-full">
                <div className="card-glow card-glow-hoverlift group flex h-full flex-col p-7">
                  <Icon className="h-7 w-7 text-accent [filter:drop-shadow(0_0_12px_rgba(77,166,255,0.45))]" />
                  <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-text-secondary">
                    {service.description}
                  </p>
                  <div className="mt-7 flex items-end justify-between gap-4">
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

/* ---------- trust band ---------- */

function TrustBand() {
  return (
    <section className="pb-6">
      <div className="container-shell">
        <Reveal>
          <div className="card-glow grid grid-cols-2 gap-y-9 px-6 py-9 md:grid-cols-3 xl:grid-cols-5">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "flex flex-col items-center gap-3 px-3 text-center",
                    i > 0 && "xl:border-l xl:border-[rgba(77,166,255,0.13)]",
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(77,166,255,0.28)] bg-[rgba(16,32,58,0.4)]">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                    {item.meta}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- company ---------- */

function CompanySection() {
  return (
    <section id="yritys" className="section-pad">
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="label-caps text-accent">Osaamisemme</p>
              <h2 className="mt-6 text-balance font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.02em] text-text-primary">
                Teknistä osaamista.
                <br />
                Inhimillistä otetta.
              </h2>
              <p className="mt-6 max-w-lg text-pretty leading-8 text-text-secondary">
                Yhdistämme vahvan teknisen osaamisen ja käytännön kokemuksen.
                Meille tärkeintä on ratkaista asiakkaan tarve luotettavasti,
                laatua ja aikataulua kunnioittaen.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-12 gap-y-7">
                {companyStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-4xl font-medium text-text-primary">
                      {stat.value}
                      <span className="text-accent">+</span>
                    </div>
                    <div className="eyebrow-muted mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-11 flex max-w-lg flex-wrap gap-2.5">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-[rgba(77,166,255,0.18)] bg-[rgba(13,24,44,0.4)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.11em] text-text-secondary transition-colors duration-300 hover:border-[rgba(120,185,255,0.45)] hover:text-text-primary"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center gap-5">
              {audiences.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="card-glow card-glow-hoverlift flex items-start gap-5 p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(77,166,255,0.28)] bg-[rgba(16,32,58,0.4)]">
                      <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <span>
                      <span className="block font-medium text-text-primary">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-text-secondary">
                        {item.description}
                      </span>
                    </span>
                  </div>
                );
              })}
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
    <section id="toteutus" className="section-pad pt-0">
      <div className="container-shell">
        <Reveal>
          <h2 className="section-label">Näin työ etenee</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.07} className="h-full">
              <div className="card-glow h-full p-8">
                <div className="font-display text-[2.6rem] font-medium leading-none">
                  <span className="text-accent-line">{step.index}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-text-primary">
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
    <section id="toiminta-alue" className="section-pad pt-0">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <p className="label-caps text-accent">Toiminta-alue</p>
              <h2 className="mt-6 text-balance font-display text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.02em] text-text-primary">
                Pohjois-Savo on kotialue.
              </h2>
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
                      "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-200",
                      i === active
                        ? "border-[rgba(120,185,255,0.6)] bg-[rgba(47,130,255,0.12)] text-text-primary shadow-[0_0_18px_rgba(77,166,255,0.18)]"
                        : "border-[rgba(77,166,255,0.18)] text-text-secondary hover:border-[rgba(120,185,255,0.4)] hover:text-text-primary",
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
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[rgba(77,166,255,0.15)]" />
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
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_8%_50%,rgba(47,120,230,0.16),transparent_70%),radial-gradient(40%_120%_at_92%_50%,rgba(80,70,200,0.14),transparent_70%)]"
            />
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
          <h2 className="section-label">Ota yhteyttä</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="card-glow p-6 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-glow flex h-full flex-col p-6 sm:p-9">
              <h3 className="text-xl font-medium text-text-primary">
                JOB Kiinteistötekniikka Oy
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                Y-tunnus 2295210-9
              </p>

              <div className="mt-6 flex flex-col">
                {contactRows.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target={row.label === "Osoite" ? "_blank" : undefined}
                      rel={row.label === "Osoite" ? "noreferrer" : undefined}
                      className={cn(
                        "group flex items-start gap-4 py-5",
                        i > 0 && "border-t border-[rgba(77,166,255,0.12)]",
                      )}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgba(77,166,255,0.26)] bg-[rgba(16,32,58,0.4)]">
                        <Icon className="h-4 w-4 text-accent" />
                      </span>
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
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
