"use client";

import { useState, ReactNode } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  dict: {
    badge: string;
    title: string;
    moreQuestions: string;
    ctaText: string;
    items: FAQItem[];
  };
}

// Badge con el estilo técnico que venimos usando
const SectionBadge = ({ children }: { children: ReactNode }) => (
  <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md">
    <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
    {children}
  </div>
);

export default function FAQ({ dict }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full py-24 lg:py-40 bg-[#05080a] border-t border-white/5">
      
      {/* TEXTURA TÉCNICA: Puntos radiales muy oscuros */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        
        <div className="mb-20">
          <SectionBadge>{dict.badge}</SectionBadge>
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl leading-[1.1] max-w-3xl">
            {dict.title}
          </h2>
        </div>

        {/* LISTA DE PREGUNTAS: Estilo Editorial Brutalista */}
        <div className="flex flex-col border-t border-white/10">
          {dict.items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`group border-b border-white/10 transition-colors duration-500 ${isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-10 lg:py-12 text-left outline-none"
                >
                  <div className="flex items-center gap-8 lg:gap-16">
                    {/* Número con prefijo técnico */}
                    <span className={`font-mono text-sm font-bold transition-colors duration-500 ${isOpen ? "text-[#E11D48]" : "text-zinc-600"}`}>
                      // 0{index + 1}
                    </span>
                    <span className={`text-xl md:text-3xl font-bold transition-colors duration-500 tracking-tight ${isOpen ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                      {item.question}
                    </span>
                  </div>
                  
                  {/* Selector + / - en Rojo Carmesí */}
                  <div className={`relative w-8 h-8 shrink-0 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <div className="absolute w-full h-[2px] bg-[#E11D48]" />
                    <div className={`absolute h-full w-[2px] bg-[#E11D48] transition-all duration-300 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-12 pl-12 lg:pl-32 pr-6 lg:pr-20">
                      {/* Línea de acento lateral */}
                      <div className="flex gap-8">
                        <div className="w-px h-auto bg-gradient-to-b from-[#E11D48] to-transparent shrink-0 opacity-50" />
                        <p className="text-lg md:text-xl leading-relaxed text-zinc-400 font-light">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER DE SECCIÓN: Bloque de Cierre */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-xl text-zinc-400 font-light italic">
              {dict.moreQuestions}
            </p>
            
            <a 
              href="https://wa.me/525621434770?text=Hola%2C%20quiero%20desarrollar%20un%20proyecto%20web%20y%20me%20interesa%20conocer%20su%20proceso%2C%20tiempos%20y%20costos." 
              target="_blank"
              className="group relative inline-flex h-16 items-center justify-center px-10 bg-white text-[#05080a] text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#E11D48] hover:text-white"
            >
              <span className="relative z-10">{dict.ctaText}</span>
              {/* Decoración técnica que aparece al hover */}
              <div className="absolute -right-2 -top-2 w-4 h-4 border-t-2 border-r-2 border-[#E11D48] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
        </div>

      </div>
    </section>
  );
}