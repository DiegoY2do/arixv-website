"use client";

import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  dict: {
    brand: string;
    description: string;
    sections: {
      navigation: { title: string; links: FooterLink[] };
      social: { title: string; links: FooterLink[] };
      legal: { title: string; links: FooterLink[] };
    };
    copyright: string;
  };
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#05080a] pt-16 md:pt-24 -mt-[2px] z-10">
      
      {/* AISLAMIENTO DEL BRILLO: Ahora en tono Carmesí sutil para coherencia */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E11D48]/5 blur-[150px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* 1. Área de Contenido Completo */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 mb-20">
          
          {/* Marca y Descripción (Columna Izquierda) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-3xl font-bold tracking-tighter text-white mb-6">
              {dict.brand}<span className="text-[#E11D48]">.</span>
            </span>
            <p className="text-xl leading-relaxed text-[#C0D6DF] max-w-sm opacity-90 font-light italic">
              {dict.description}
            </p>
          </div>

          {/* Sistema de Enlaces */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            
            {/* Menú de Navegación */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
                {dict.sections.navigation.title} //
              </h4>
              <ul className="flex flex-col gap-4">
                {dict.sections.navigation.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-base font-medium text-zinc-300 hover:text-[#E11D48] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlaces Sociales */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
                {dict.sections.social.title} //
              </h4>
              <ul className="flex flex-col gap-4">
                {dict.sections.social.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-zinc-300 hover:text-[#E11D48] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enlaces Legales */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
                {dict.sections.legal.title} //
              </h4>
              <ul className="flex flex-col gap-4">
                {dict.sections.legal.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-base font-medium text-zinc-300 hover:text-[#E11D48] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 2. Título Masivo de Impacto Visual - Gradiente ajustado a Rojo */}
        <div className="w-full text-center select-none pointer-events-none border-b border-white/5 pb-6 overflow-hidden">
          <h2 className="text-[18vw] sm:text-[15vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-[#E11D48]/5 opacity-90">
            {dict.brand}
          </h2>
        </div>

        {/* 3. Línea Inferior Legal y Botón Top */}
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between py-8 gap-6">
          <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-500 text-center md:text-left">
            © {currentYear} {dict.brand}. {dict.copyright}
          </p>
          
          {/* Botón Volver Arriba */}
          <a 
            href="#top" 
            className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] transition-all hover:bg-[#E11D48]/20 hover:border-[#E11D48]/50 active:scale-95"
            aria-label="Volver arriba"
          >
            <svg className="h-6 w-6 text-zinc-500 transition-transform group-hover:-translate-y-1 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}