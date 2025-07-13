import type { Metadata } from "next";
import { Open_Sans, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Fotos do Tap - Fotografia Profissional",
  description: "Serviços de fotografia para casamentos, eventos e ensaios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-cor-secundaria font-principal text-cor-primaria antialiased",
          openSans.variable,
          dmSerifText.variable
        )}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
