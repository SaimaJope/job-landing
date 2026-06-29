import type { Metadata, Viewport } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";

import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOB Kiinteistötekniikka Oy | Sähkö, tele ja turva Pohjois-Savossa",
  description:
    "Sähkö-, tele-, turva- ja kylmäasennukset, urakoinnit ja huoltotyöt Pohjois-Savossa. Suunnittelusta toteutukseen, avaimet käteen, Iisalmesta Varkauteen.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050810",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${ubuntu.variable} ${ubuntuMono.variable}`}
    >
      <body>
        {children}
        {/* film grain keeps the large soft gradients from banding */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
