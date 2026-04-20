"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css"; // Ajusta la ruta si tu globals.css está dentro de [lang]

// Diccionario local específico para el 404
const dictionaries = {
  es: {
    badge: "ERROR 404",
    title: "NODE",
    titleHighlight: "MISSING",
    description: "El recurso que buscas ha sido desvinculado o no existe en el ecosistema digital de ARIXV.",
    button: "[ REGRESAR AL INICIO ]",
  },
  en: {
    badge: "404 ERROR",
    title: "NODE",
    titleHighlight: "MISSING",
    description: "The resource you are looking for has been unlinked or does not exist in the ARIXV digital ecosystem.",
    button: "[ RETURN TO HOME ]",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  
  // Detectar el idioma desde la URL (ej: /en/pagina-falsa -> 'en'). Por defecto 'es'.
  const lang = pathname.startsWith("/en") ? "en" : "es";
  const dict = dictionaries[lang];

  return (
    <html lang={lang}>
      <body className="bg-[#0b0f14] text-white antialiased font-sans">
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b0f14] selection:bg-[#E11D48]/30">
          
          {/* FONDO (Patrón exacto de tu Hero) */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.04]" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            
            {/* BADGE TÉCNICO */}
            <div className="mb-4 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-[#E11D48]/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
              <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
              {dict.badge}
            </div>
            
            {/* EL NÚMERO 404 GIGANTE */}
            <div className="relative group">
              <h1 className="text-[clamp(8rem,20vw,16rem)] font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.15)] select-none transition-all duration-700 group-hover:[-webkit-text-stroke:2px_#E11D48]">
                404
              </h1>
            </div>

            {/* MENSAJE DE ERROR */}
            <div className="mt-8 z-20 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-widest sm:text-4xl text-white">
                  {dict.title} <span className="text-[#E11D48]">{dict.titleHighlight}</span>
                </h2>
                <p className="mx-auto max-w-md text-base font-normal leading-relaxed text-zinc-400 sm:text-lg">
                  {dict.description}
                </p>
              </div>
            </div>

            {/* BOTÓN DE RETORNO */}
            <div className="mt-12 z-20">
              <Link 
                href={`/${lang}`} 
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-widest font-bold text-white transition-all duration-300 bg-transparent border border-white/20 hover:border-white"
              >
                {dict.button}
              </Link>
            </div>

          </div>
        </main>
      </body>
    </html>
  );
}