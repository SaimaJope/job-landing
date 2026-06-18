import type { Metadata } from "next";

import { MaintenancePage } from "@/components/maintenance-page";

export const metadata: Metadata = {
  title: "JOB Kiinteistötekniikka Oy | Verkkosivut päivittyvät",
  description:
    "Verkkosivujamme päivitetään. Palvelemme normaalisti, ota yhteyttä puhelimitse 044 572 3200 tai sähköpostitse.",
};

export default function Home() {
  return <MaintenancePage />;
}
