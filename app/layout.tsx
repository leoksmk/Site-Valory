import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { LangProvider } from "@/components/lang-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valory — Célula Automatizada de Cartonização Inteligente",
  description:
    "Valory RAC — célula automatizada para alocação de medicamentos em embalagens com Triple Check, visão computacional e zero divergência.",
  icons: { icon: "/logo.webp" },
  openGraph: {
    title: "Valory — Cartonização Inteligente",
    description:
      "Célula robótica que separa, conta e embala medicamentos com Triple Check e zero divergência.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
