"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Landmark,
  Mail,
  MapPin,
  Phone,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  Thermometer,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { BokehBackground } from "@/components/bokeh-background";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";

type Service = {
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  qualification: string;
};

const services: Service[] = [
  {
    index: "01",
    icon: Zap,
    title: "Sähköasennukset",
    description:
      "Sähköjärjestelmien suunnittelu ja asennus uudis- ja saneerauskohteisiin. Kiinteistöt, yrityskohteet ja taloyhtiöt aikataulun ja dokumentoinnin mukaan.",
    qualification: "TUKES sähköurakointi",
  },
  {
    index: "02",
    icon: RadioTower,
    title: "Tele- ja antennijärjestelmät",
    description:
      "Antenni-, satelliitti- ja tietoverkkojen rakentaminen sekä päivitykset. Kiinteistöjen sisäverkot ja yhteydet kuntoon.",
    qualification: "Seti Oy telepätevyys",
  },
  {
    index: "03",
    icon: ShieldCheck,
    title: "Turvajärjestelmät",
    description:
      "Paloilmoittimet, kameravalvonta ja kulunvalvonta. Kokonaisuus mitoitetaan kohteen käytön ja vaatimusten mukaan.",
    qualification: "Poliisihallituksen elinkeinolupa",
  },
  {
    index: "04",
    icon: Thermometer,
    title: "Kiinteistöhuolto ja kylmälaitteet",
    description:
      "Lämpöpumppu- ja kylmälaiteasennukset sekä kiinteistötekniikan jatkuva huolto. Yksittäiset kohteet ja ylläpitosopimukset.",
    qualification: "TUKES kylmälaiteasennus · SULPU",
  },
];

const audiences = [
  {
    icon: User,
    title: "Yksityishenkilöt",
    description:
      "Omakotitalojen ja vapaa-ajan asuntojen sähkö-, tele- ja lämpöpumpputyöt asennuksesta huoltoon.",
  },
  {
    icon: Building2,
    title: "Yritykset",
    description:
      "Liike- ja teollisuuskohteiden sähkö-, turva- ja kiinteistötekniikka. Yksi vastuullinen toteuttaja.",
  },
  {
    icon: Landmark,
    title: "Julkinen sektori",
    description:
      "Kuntien ja julkisten kohteiden urakat dokumentoidusti ja vaatimusten mukaan toteutettuna.",
  },
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

const cities = ["Iisalmi", "Siilinjärvi", "Kuopio", "Leppävirta", "Varkaus"];

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
      {/* faint ambient so sections below the hero keep the mood without the busy bokeh */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(70%_50%_at_80%_120%,rgba(120,92,255,0.07),transparent),radial-gradient(60%_45%_at_15%_110%,rgba(0,141,200,0.08),transparent)]"
      />
      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <AudienceSection />
        <ProcessSection />
        <CredentialsSection />
        <AreaSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------- scroll reveal ---------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- hero ---------- */

function HeroSection() {
  return (
    <section className="relative flex min-h-[94svh] items-center justify-center overflow-hidden px-5 pt-28 pb-24 text-center">
      <BokehBackground />

      <div className="container-narrow relative z-10 flex flex-col items-center">
        <Reveal>
          <p className="eyebrow flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            Pohjois-Savo · perustettu osaamiselle
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 text-balance text-[clamp(2.6rem,7.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-text-primary [text-shadow:0_2px_50px_rgba(0,0,0,0.55)]">
            Sähkö, tele
            <br className="sm:hidden" /> ja turva
            <br /> Pohjois-Savossa.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-text-secondary sm:text-xl">
            Suunnittelusta asennukseen. 25 ammattilaista Iisalmesta Varkauteen ja
            tarvittaessa koko Suomeen.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="#yhteystiedot" className={buttonVariants({ size: "lg" })}>
              Pyydä tarjous
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tuotteet/"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <ShoppingBag className="h-4 w-4 text-accent-glow" />
              Selaa tuotteita
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <p className="eyebrow-muted mt-16 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>TUKES</span>
            <Dot />
            <span>STUL</span>
            <Dot />
            <span>Seti Oy</span>
            <Dot />
            <span>SULPU</span>
            <Dot />
            <span>Tilaajavastuu Luotettava Kumppani</span>
          </p>
        </Reveal>
      </div>

      <a
        href="#palvelut"
        aria-label="Vieritä palveluihin"
        className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 text-text-tertiary transition hover:text-accent-glow sm:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce [animation-duration:2.4s]" />
      </a>
    </section>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-text-tertiary/70" aria-hidden="true" />;
}

/* ---------- services ---------- */

function ServicesSection() {
  return (
    <section id="palvelut" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <SectionHeader
            kicker="Palvelut"
            title="Neljä osaamisaluetta saman katon alta."
            description="Sähkö, tele, turva ja kiinteistötekniikan huolto voidaan koota yhdelle toteuttajalle. Vastuut pysyvät selkeinä koko projektin ajan."
          />
        </Reveal>

        <div className="mt-16 border-t border-border">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.index} delay={i * 0.06}>
                <div className="group grid grid-cols-1 gap-4 border-b border-border py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12">
                  <span className="font-display text-4xl font-medium leading-none text-text-tertiary/40 transition-colors duration-300 group-hover:text-primary md:w-20 md:text-5xl">
                    {service.index}
                  </span>

                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-accent-glow" />
                      <h3 className="text-2xl font-medium tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover:text-accent-glow">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-4 leading-7 text-text-secondary">
                      {service.description}
                    </p>
                  </div>

                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary md:max-w-[180px] md:pt-2 md:text-right">
                    {service.qualification}
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

/* ---------- audience ---------- */

function AudienceSection() {
  return (
    <section id="kenelle" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <SectionHeader kicker="Kenelle" title="Sama tekniikka, eri tilaajat." />
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group h-full border-t border-border pt-7 md:px-9 md:first:pl-0">
                  <Icon className="h-6 w-6 text-accent-glow" />
                  <h3 className="mt-6 text-xl font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-text-secondary">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function ProcessSection() {
  return (
    <section id="toteutus" className="section-pad">
      <div className="container-shell">
        <Reveal>
          <SectionHeader
            kicker="Toteutus"
            title="Työ etenee sovitussa järjestyksessä."
            description="Tilaajan kannattaa tietää miten urakka etenee yhteydenoton jälkeen. Prosessi on sama kohteen koosta riippumatta."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.1}>
              <div className="relative">
                <div className="flex items-baseline gap-4">
                  <span
                    className="h-2.5 w-2.5 shrink-0 translate-y-[-4px] rounded-full bg-accent-glow shadow-[0_0_16px_rgba(103,232,249,0.6)]"
                    aria-hidden="true"
                  />
                  <span className="font-display text-5xl font-medium leading-none text-text-primary">
                    {step.index}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-text-primary">{step.title}</h3>
                <p className="mt-3 max-w-sm leading-7 text-text-secondary">
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

/* ---------- credentials ---------- */

function CredentialsSection() {
  return (
    <section id="luvat" className="section-pad">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeader
              kicker="Luvat ja jäsenyydet"
              title="Luvat ja pätevyydet kunnossa."
              description="Sähköurakointi edellyttää näyttöä, ei lupauksia. Tässä toiminnan perusta."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-3">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="rounded-full border border-border bg-white/[0.015] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors duration-300 hover:border-border-strong hover:text-text-primary"
                >
                  {credential}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- area ---------- */

function AreaSection() {
  const mapSrc =
    "https://www.google.com/maps?q=Pohjois-Savo,%20Finland&z=8&output=embed";

  return (
    <section id="toiminta-alue" className="section-pad">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div>
              <SectionHeader
                kicker="Toiminta-alue"
                title="Pohjois-Savo on kotialue."
                description="Pääasiallinen toiminta-alue on Iisalmi, Siilinjärvi, Kuopio, Leppävirta ja Varkaus. Tarvittaessa teemme asennuksia muuallakin Suomessa."
              />

              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                {cities.map((city, i) => (
                  <span key={city} className="flex items-center gap-3">
                    {i > 0 ? <Dot /> : null}
                    {city}
                  </span>
                ))}
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Pohjois-Savo,%20Finland"
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-2 text-sm text-accent-glow transition hover:gap-3"
              >
                Avaa Google Mapsissa
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel overflow-hidden rounded-xl p-1.5">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-background">
                <iframe
                  title="JOB Kiinteistötekniikka toiminta-alue Google Mapsissa"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-[170deg] saturate-[0.6] contrast-[0.95] brightness-[0.78]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-border" />
              </div>
            </div>
          </Reveal>
        </div>
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
          <SectionHeader
            kicker="Yhteydenotto"
            title="Kerro kohteesta."
            description="Lähetä viesti lomakkeella tai soita suoraan. Vastaamme arkisin."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="panel rounded-2xl p-6 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col">
              <h3 className="text-xl font-medium text-text-primary">
                JOB Kiinteistötekniikka Oy
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                Y-tunnus 2295210-9
              </p>

              <div className="mt-8 flex flex-col">
                {contactRows.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target={row.label === "Osoite" ? "_blank" : undefined}
                      rel={row.label === "Osoite" ? "noreferrer" : undefined}
                      className={`group flex items-start gap-4 py-5 ${
                        i > 0 ? "border-t border-border" : ""
                      }`}
                    >
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-glow" />
                      <span>
                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                          {row.label}
                        </span>
                        <span className="mt-1 block text-text-primary transition-colors group-hover:text-accent-glow">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared ---------- */

function SectionHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow flex items-center gap-3">
        {kicker}
      </p>
      <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-pretty text-lg leading-8 text-text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
