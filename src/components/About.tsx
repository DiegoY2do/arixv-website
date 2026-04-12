"use client";

import Image from "next/image";

interface Pillar {
  title: string;
  desc: string;
}

interface AboutProps {
  dict: {
    badge: string;
    title: string;
    description: string;
    pillars: Pillar[];
  };
}

const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-white text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md shadow-sm">
    <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
    {children}
  </div>
);

export default function About({ dict }: AboutProps) {
  return (
    <section id="nosotros" className="relative w-full py-24 lg:py-32 bg-[#DBE9EE]/20 border-t border-zinc-300">
      
      {/* TEXTURA DE CUADRÍCULA */}
      <div className="absolute top-0 right-0 w-full sm:w-3/4 lg:w-1/2 h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A30_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A30_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_left,black_10%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 pt-16">
        
        {/* Encabezado Tipográfico */}
        <div className="max-w-4xl mb-20 lg:mb-28">
          <SectionBadge>{dict.badge}</SectionBadge>
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-[#0b0f14] sm:text-5xl lg:text-7xl leading-[1.05]">
            {dict.title}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-[#4F6D7A] font-light border-l-2 border-[#E11D48] pl-6 ml-1">
            {dict.description}
          </p>
        </div>

        {/* LAYOUT ASIMÉTRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* COLUMNA IZQUIERDA: Contenedor de tu Imagen */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-32 h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden border border-zinc-300 shadow-xl bg-[#0b0f14]">
            
            <Image 
              src="/about-img.webp" 
              alt="Arquitectura de software y código a medida"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            
            <div className="absolute inset-0 bg-[#0b0f14]/20 mix-blend-multiply pointer-events-none" />
            
            <div className="absolute bottom-6 right-6 border border-white/20 bg-[#0b0f14]/80 backdrop-blur-md p-3 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#E11D48]" />
              <span className="text-[10px] font-mono text-white tracking-widest uppercase">INGENIERÍA WEB</span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Pilares Separados en Bloques Independientes */}
          {/* Cambiamos el border-t por un gap grande para separarlos físicamente */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 relative z-10">
            
            {dict.pillars.map((pillar, index) => (
              <div 
                key={index}
                // Añadimos fondo blanco, borde perimetral y padding para crear el efecto de bloque separado
                className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 p-8 lg:p-10 border border-zinc-300 bg-white/90 backdrop-blur-sm shadow-sm overflow-hidden"
              >
                {/* Línea roja vertical técnica permanente */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E11D48]" />
                
                {/* Número Gigante Permanente en Carmesí */}
                <div className="shrink-0 pt-1 relative z-10 pl-2">
                  <span className="text-5xl md:text-6xl font-black text-[#E11D48] tracking-tighter leading-none block">
                    0{index + 1}
                  </span>
                </div>

                {/* Contenido Permanente */}
                <div className="flex-1 relative z-10 pr-4 sm:pr-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0b0f14] tracking-tight mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-600 font-light">
                    {pillar.desc}
                  </p>
                </div>
                
                {/* Icono decorativo fijo */}
                <div className="absolute top-10 right-8 text-[#4F6D7A]/20 rotate-90 hidden sm:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20M12 2l4 4-4-4zm0 20l-4-4 4 4zm-10-10l4 4-4-4zm20 0l-4-4 4 4z"/></svg>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}