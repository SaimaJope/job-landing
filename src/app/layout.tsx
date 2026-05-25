import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { CartProvider } from "@/components/inquiry/cart-provider";
import { CartDrawer, CartLauncher } from "@/components/inquiry/cart-drawer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <CartProvider>
          {children}
          <CartLauncher />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
