import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Mozilla_Headline, Mozilla_Text } from "next/font/google";

import "./globals.css";

const mozillaText = Mozilla_Text({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mozilla-text",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

const mozillaHeadline = Mozilla_Headline({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mozilla-headline",
  display: "swap",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOB Kiinteistötekniikka Oy | Sähkö, tele ja turva Pohjois-Savossa",
  description:
    "Sähkö-, tele- ja turva-asennukset Pohjois-Savossa. Suunnittelusta asennukseen, 25 ammattilaista Iisalmesta Varkauteen.",
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
      className={`${mozillaText.variable} ${mozillaHeadline.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        {children}
        {/* film grain keeps the large soft gradients from banding */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
