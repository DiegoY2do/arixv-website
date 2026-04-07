"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

interface ServicesProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    items: {
      dev: { title: string; desc: string };
      ecommerce: { title: string; desc: string };
      design: { title: string; desc: string };
      maintenance: { title: string; desc: string };
    };
  };
}

// TARJETA ANIMADA: Ahora con esquinas afiladas (rounded-none) y hover en rojo
function AnimatedServiceCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`group relative flex flex-col justify-end overflow-hidden rounded-none border border-[#4F6D7A]/30 bg-[#0b0f14] shadow-2xl transition-all duration-700 hover:border-[#E11D48]/80 hover:shadow-[0_20px_40px_rgba(225,29,72,0.15)] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Services({ dict }: ServicesProps) {
  return (
    <section id="servicios" className="relative w-full pt-24 pb-32 lg:pt-32 lg:pb-48 bg-[#DBE9EE]/30">
      
      {/* FONDO: Cuadrícula técnica desvanecida (Estilo Brutalista) */}
      <div className="absolute top-0 right-0 w-full sm:w-3/4 lg:w-1/2 h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A30_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A30_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_left,black_10%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Cabecera */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          
          {/* BADGE EDITORIAL CUADRADO */}
          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-white/60 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
            {dict.badge}
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-[#0b0f14] sm:text-5xl lg:text-6xl">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base text-[#4F6D7A] sm:text-lg">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          
          {/* SERVICIO 1: DESARROLLO (Mockup de código cuadrado y técnico) */}
          <AnimatedServiceCard className="md:col-span-2 min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-6 left-6 sm:right-10 sm:left-10 min-h-[12rem] rounded-none border border-white/10 bg-[#080b0f] p-5 sm:p-6 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 overflow-hidden">
              <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                {/* Botones de ventana cuadrados */}
                <div className="h-2.5 w-2.5 bg-zinc-600" />
                <div className="h-2.5 w-2.5 bg-zinc-600" />
                <div className="h-2.5 w-2.5 bg-[#E11D48]" />
              </div>
              <div className="space-y-2 font-mono text-[11px] sm:text-[13px] leading-relaxed break-words whitespace-pre-wrap">
                <div><span className="text-[#E11D48]">import</span> <span className="text-white">{"{ "}</span><span className="text-[#C0D6DF]">ScaleCore</span><span className="text-white">{" }"}</span> <span className="text-[#E11D48]">from</span> <span className="text-[#4F6D7A]">{"'@/engine'"}</span>;</div>
                <div className="mt-3"><span className="text-[#E11D48]">const</span> <span className="text-[#C0D6DF]">Architecture</span> <span className="text-white">=</span> <span className="text-white">()</span> <span className="text-[#E11D48]">{"=>"}</span> <span className="text-white">{"{"}</span></div>
                <div className="pl-6"><span className="text-zinc-500 italic">{"// High performance web solutions"}</span></div>
                <div className="text-white">{"}"}</div>
              </div>
            </div>
            <div className="relative z-10 p-8 sm:p-10 pt-56 flex flex-col items-start bg-gradient-to-t from-[#0b0f14] via-[#0b0f14] to-transparent">
              <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">{dict.items.dev.title}</h3>
              <p className="mb-8 text-base leading-relaxed text-[#C0D6DF] max-w-md">{dict.items.dev.desc}</p>
              <Link href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#DBE9EE] hover:text-[#E11D48] transition-colors group/link">
                {dict.cta}
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedServiceCard>

          {/* SERVICIO 2: DISEÑO (Mockup de interfaz cortante y geométrica) */}
          <AnimatedServiceCard className="min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E11D48]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-8 left-8 h-48 rounded-none border border-white/10 bg-[#151d26] p-6 shadow-2xl transition-transform duration-700 group-hover:scale-105 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="h-2 w-16 bg-[#4F6D7A]/50" />
                <div className="flex gap-2"><div className="h-2.5 w-2.5 bg-zinc-600" /><div className="h-2.5 w-2.5 bg-[#E11D48]" /></div>
              </div>
              <div className="h-20 w-full bg-zinc-800 border border-white/5 mb-4" />
              <div className="grid grid-cols-2 gap-3 opacity-60">
                <div className="h-8 w-full bg-[#E11D48]/80" />
                <div className="h-8 w-full bg-zinc-700" />
              </div>
            </div>
            <div className="relative z-10 p-8 sm:p-10 pt-60 flex flex-col items-start bg-gradient-to-t from-[#0b0f14] via-[#0b0f14] to-transparent">
              <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">{dict.items.design.title}</h3>
              <p className="mb-8 text-base leading-relaxed text-[#C0D6DF]">{dict.items.design.desc}</p>
              <Link href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#DBE9EE] hover:text-[#E11D48] transition-colors group/link">
                {dict.cta}
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedServiceCard>

          {/* SERVICIO 3: SEO/METRICS (Mockup crudo y analítico) */}
          <AnimatedServiceCard className="min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#E11D48]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-8 left-8 h-48 overflow-hidden rounded-none border border-white/10 bg-[#080b0f] p-6 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <div className="flex justify-between items-center mb-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Metrics</div>
                <div className="h-6 w-14 border border-[#E11D48]/50 bg-[#E11D48]/10 flex items-center justify-center text-[10px] text-[#E11D48] font-bold">99%</div>
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center h-8 w-full border border-white/5 bg-white/5 px-3">
                    <div className={`h-1.5 bg-zinc-600 ${i === 0 ? 'w-24' : i === 1 ? 'w-16' : 'w-20'}`} />
                    <div className="h-1.5 w-4 bg-[#E11D48]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 p-8 sm:p-10 pt-60 flex flex-col items-start bg-gradient-to-t from-[#0b0f14] via-[#0b0f14] to-transparent">
              <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">{dict.items.maintenance.title}</h3>
              <p className="mb-8 text-base leading-relaxed text-[#C0D6DF]">{dict.items.maintenance.desc}</p>
              <Link href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#DBE9EE] hover:text-[#E11D48] transition-colors group/link">
                {dict.cta}
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedServiceCard>

          {/* SERVICIO 4: ECOMMERCE (Mockup comercial directo) */}
          <AnimatedServiceCard className="md:col-span-2 min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-6 left-6 sm:right-10 sm:left-10 h-48 rounded-none border border-white/10 bg-[#080b0f] p-6 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] overflow-hidden">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Cart Summary</div>
                    <div className="text-sm text-white font-medium">$189.00</div>
                </div>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between h-8 bg-white/5 items-center px-4"><div className="h-1.5 w-20 bg-zinc-600" /></div>
                    <div className="flex justify-between h-8 bg-white/5 items-center px-4"><div className="h-1.5 w-16 bg-zinc-600" /></div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 h-10 bg-[#E11D48] flex items-center justify-center font-bold text-white text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#E11D48] transition-colors cursor-pointer">
                  Checkout Now
                </div>
            </div>
            <div className="relative z-10 p-8 sm:p-10 pt-64 flex flex-col items-start bg-gradient-to-t from-[#0b0f14] via-[#0b0f14] to-transparent">
              <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">{dict.items.ecommerce.title}</h3>
              <p className="mb-8 text-base leading-relaxed text-[#C0D6DF] max-w-md">{dict.items.ecommerce.desc}</p>
              <Link href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#DBE9EE] hover:text-[#E11D48] transition-colors group/link">
                {dict.cta}
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedServiceCard>

        </div>
      </div>
    </section>
  );
}