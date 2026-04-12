"use client";

import { useEffect, useRef, useState } from "react";

interface Step {
  number: string;
  title: string;
  desc: string;
}

interface ProcessProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
}

// Badge unificado
const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-white text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md">
    <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
    {children}
  </div>
);

export default function Process({ dict }: ProcessProps) {
  // Estado para que los elementos aparezcan en pantalla
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  // Estado para el foco exclusivo (solo un número, o null)
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Observador para revelar el elemento (Aparecer)
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.15 } // Aparece cuando entra un 15% a la pantalla
    );

    // 2. Observador para el Foco (El 50% de la pantalla)
    const focusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            // Si entra al centro, se convierte en el único activo
            setActiveItem(index);
          } else {
            // Si sale del centro y era el activo, lo apagamos
            setActiveItem((prev) => (prev === index ? null : prev));
          }
        });
      },
      // Esto recorta la detección a una franja del 10% exactamente en el centro de la pantalla
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => {
        visibilityObserver.observe(child);
        focusObserver.observe(child);
      });
    }

    return () => {
      visibilityObserver.disconnect();
      focusObserver.disconnect();
    };
  }, []);

  return (
    <section id="proceso" className="relative w-full bg-[#DBE9EE]/20 py-24 lg:py-40">
      
      {/* TEXTURA DE CUADRÍCULA */}
      <div className="absolute top-0 left-0 w-full sm:w-3/4 lg:w-1/2 h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A30_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A30_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_right,black_10%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Cabecera */}
        <div className="mb-20 flex flex-col items-center text-center">
          <SectionBadge>{dict.badge}</SectionBadge>
          <h2 className="text-4xl font-bold tracking-tight text-[#0b0f14] sm:text-5xl lg:text-7xl">
            {dict.title}
          </h2>
          <p className="mt-8 max-w-2xl text-base text-[#4F6D7A] sm:text-lg">
            {dict.subtitle}
          </p>
        </div>

        {/* CONTENEDOR TIPO LISTA EDITORIAL */}
        <div ref={containerRef} className="w-full flex flex-col border-t border-zinc-300">
          
          {/* PASO 01 */}
          <div data-index={0} className={`group flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-16 border-b border-zinc-300 gap-8 lg:gap-16 transition-all duration-700 
            ${visibleItems.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
            ${activeItem === 0 ? 'is-active' : (activeItem !== null ? 'opacity-40 grayscale-[50%]' : '')}`}
          >
            <div className="lg:w-48 shrink-0">
              <span className="text-6xl md:text-8xl font-black text-zinc-300 group-hover:text-[#E11D48] group-[.is-active]:text-[#E11D48] transition-colors duration-500 tracking-tighter">
                01<span className="text-[#E11D48] text-2xl md:text-4xl ml-2 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">//</span>
              </span>
            </div>
            
            <div className="flex-1">
              <span className="text-[10px] font-mono text-[#E11D48] tracking-[0.2em] uppercase block mb-4">Discovery Phase</span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0b0f14] mb-4 tracking-tight">{dict.steps[0]?.title}</h3>
              <p className="text-base leading-relaxed text-[#4F6D7A] max-w-xl">{dict.steps[0]?.desc}</p>
            </div>

            <div className="w-full lg:w-72 h-40 shrink-0 bg-white border border-zinc-200 p-4 flex flex-col justify-center gap-3 relative overflow-hidden transition-all duration-500 group-hover:border-[#E11D48]/30 group-[.is-active]:border-[#E11D48]/30 group-hover:shadow-[0_10px_30px_rgba(225,29,72,0.1)] group-[.is-active]:shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#E11D48]/10 to-transparent opacity-0 translate-y-full group-hover:opacity-100 group-[.is-active]:opacity-100 group-hover:translate-y-0 group-[.is-active]:translate-y-0 transition-all duration-700 ease-in-out" />
               {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 relative z-10">
                  <div className="h-4 w-4 border border-zinc-300 flex items-center justify-center bg-zinc-50">
                    <svg className="h-3 w-3 text-[#E11D48] opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity delay-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className={`h-1.5 bg-zinc-200 group-hover:bg-zinc-300 group-[.is-active]:bg-zinc-300 transition-colors ${i === 0 ? 'w-24' : i === 1 ? 'w-16' : 'w-20'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* PASO 02 */}
          <div data-index={1} className={`group flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-16 border-b border-zinc-300 gap-8 lg:gap-16 transition-all duration-700 
            ${visibleItems.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
            ${activeItem === 1 ? 'is-active' : (activeItem !== null ? 'opacity-40 grayscale-[50%]' : '')}`}
          >
            <div className="lg:w-48 shrink-0">
              <span className="text-6xl md:text-8xl font-black text-zinc-300 group-hover:text-[#E11D48] group-[.is-active]:text-[#E11D48] transition-colors duration-500 tracking-tighter">
                02<span className="text-[#E11D48] text-2xl md:text-4xl ml-2 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">//</span>
              </span>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-[#E11D48] tracking-[0.2em] uppercase block mb-4">Architecture</span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0b0f14] mb-4 tracking-tight">{dict.steps[1]?.title}</h3>
              <p className="text-base leading-relaxed text-[#4F6D7A] max-w-xl">{dict.steps[1]?.desc}</p>
            </div>
            <div className="w-full lg:w-72 h-40 shrink-0 bg-white border border-zinc-200 flex items-center justify-center relative transition-all duration-500 group-hover:border-[#E11D48]/30 group-[.is-active]:border-[#E11D48]/30 group-hover:shadow-[0_10px_30px_rgba(225,29,72,0.1)] group-[.is-active]:shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
              <div className="absolute w-full h-[1px] bg-zinc-100 top-1/2 -translate-y-1/2" />
              <div className="absolute h-full w-[1px] bg-zinc-100 left-1/2 -translate-x-1/2" />
              <div className="z-10 h-12 w-12 border border-zinc-200 bg-zinc-50 scale-100 group-hover:scale-110 group-[.is-active]:scale-110 transition-transform flex items-center justify-center">
                <div className="h-2 w-2 bg-[#E11D48] animate-pulse" />
              </div>
            </div>
          </div>

          {/* PASO 03 */}
          <div data-index={2} className={`group flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-16 border-b border-zinc-300 gap-8 lg:gap-16 transition-all duration-700 
            ${visibleItems.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
            ${activeItem === 2 ? 'is-active' : (activeItem !== null ? 'opacity-40 grayscale-[50%]' : '')}`}
          >
            <div className="lg:w-48 shrink-0">
              <span className="text-6xl md:text-8xl font-black text-zinc-300 group-hover:text-[#E11D48] group-[.is-active]:text-[#E11D48] transition-colors duration-500 tracking-tighter">
                03<span className="text-[#E11D48] text-2xl md:text-4xl ml-2 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">//</span>
              </span>
            </div>
            <div className="flex-1">
               <span className="text-[10px] font-mono text-[#E11D48] tracking-[0.2em] uppercase block mb-4">Development</span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0b0f14] mb-4 tracking-tight">{dict.steps[2]?.title}</h3>
              <p className="text-base leading-relaxed text-[#4F6D7A] max-w-xl">{dict.steps[2]?.desc}</p>
            </div>
            <div className="w-full lg:w-72 h-40 shrink-0 bg-[#0b0f14] border border-white/10 p-5 flex flex-col font-mono text-[10px] transition-all duration-500 group-hover:border-[#E11D48]/50 group-[.is-active]:border-[#E11D48]/50 group-hover:shadow-[0_10px_30px_rgba(225,29,72,0.2)] group-[.is-active]:shadow-[0_10px_30px_rgba(225,29,72,0.2)]">
               <div className="flex gap-2 mb-4">
                <div className="h-2 w-2 bg-zinc-700" />
                <div className="h-2 w-2 bg-zinc-700" />
                <div className="h-2 w-2 bg-[#E11D48]" />
              </div>
              <div className="text-zinc-600 mb-2">$ npm run build</div>
              <div className="text-zinc-400 mb-2">{">"} compiling...</div>
              <div className="text-[#E11D48] opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity flex items-center gap-2">
                <span>{">"} done</span>
                <span className="w-1.5 h-3 bg-[#E11D48]/70 animate-pulse" />
              </div>
            </div>
          </div>

          {/* PASO 04 */}
          <div data-index={3} className={`group flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-16 border-b border-zinc-300 gap-8 lg:gap-16 transition-all duration-700 
            ${visibleItems.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
            ${activeItem === 3 ? 'is-active' : (activeItem !== null ? 'opacity-40 grayscale-[50%]' : '')}`}
          >
            <div className="lg:w-48 shrink-0">
              <span className="text-6xl md:text-8xl font-black text-zinc-300 group-hover:text-[#E11D48] group-[.is-active]:text-[#E11D48] transition-colors duration-500 tracking-tighter">
                04<span className="text-[#E11D48] text-2xl md:text-4xl ml-2 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity">//</span>
              </span>
            </div>
            <div className="flex-1">
               <span className="text-[10px] font-mono text-[#E11D48] tracking-[0.2em] uppercase block mb-4">Deployment</span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0b0f14] mb-4 tracking-tight">{dict.steps[3]?.title}</h3>
              <p className="text-base leading-relaxed text-[#4F6D7A] max-w-xl">{dict.steps[3]?.desc}</p>
            </div>
            <div className="w-full lg:w-72 h-40 shrink-0 bg-white border border-zinc-200 p-5 flex items-end gap-2 transition-all duration-500 group-hover:border-[#E11D48]/30 group-[.is-active]:border-[#E11D48]/30 group-hover:shadow-[0_10px_30px_rgba(225,29,72,0.1)] group-[.is-active]:shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
              {[40, 70, 45, 90, 65, 100].map((height, i) => (
                <div key={i} className="w-full relative bg-zinc-200 group-hover:bg-[#E11D48]/80 group-[.is-active]:bg-[#E11D48]/80 transition-colors duration-500" style={{ height: `${height}%` }}>
                  {i === 5 && (
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 bg-[#E11D48] opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity delay-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}