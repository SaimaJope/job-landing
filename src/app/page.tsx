import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "JOB Kiinteistötekniikka Oy | Sähkö, tele ja turva-asennukset Pohjois-Savossa",
  description:
    "Sähkö-, tele- ja turva-asennukset sekä kiinteistöhuolto Pohjois-Savossa. 25 ammattilaista, Iisalmesta Varkauteen ja tarvittaessa koko Suomi.",
};

export default function Home() {
  return <LandingPage />;
}
