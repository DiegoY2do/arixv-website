// src/app/[lang]/layout.tsx

import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
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
  // Obtenemos el diccionario completo basado en la URL
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth">
      <body >
        {/* Pasamos el idioma y solo la sección 'navigation' del diccionario */}
        <Navbar lang={lang} dict={dict.navigation} />
        {children}
      </body>
    </html>
  );
}