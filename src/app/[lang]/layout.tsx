// src/app/[lang]/layout.tsx
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Importamos el Footer
import { getDictionary, Locale } from "@/dictionaries/getDictionary";

export const metadata: Metadata = {
  title: "ARIXV",
  description: "Desarrollo web de alto nivel",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth">
      <body>
        <Navbar lang={lang} dict={dict.navigation} />
        {children}
        <Footer dict={dict.footer} />
        <WhatsAppButton phoneNumber="525621434770" />
      </body>
    </html>
  );
}