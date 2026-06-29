import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "JOB Kiinteistötekniikka Oy | Sähkö, tele ja turva-asennukset Pohjois-Savossa",
  description:
    "Sähkö-, tele-, turva- ja kylmäasennukset, urakoinnit ja huoltotyöt Pohjois-Savossa. Suunnittelusta toteutukseen, avaimet käteen. Iisalmesta Varkauteen ja tarvittaessa koko Suomi.",
};

export default function Home() {
  return <LandingPage />;
}
