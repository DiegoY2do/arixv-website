"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  dict: {
    badge: string;
    title: string;
    items: Testimonial[];
  };
}

const DURATION = 6000;
const UPDATE_INTERVAL = 30; 

// BADGE UNIFICADO
const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-[#E11D48]/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md">
    <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
    {children}
  </div>
);

export default function Testimonials({ dict }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [progress, setProgress] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % dict.items.length);
    setProgress(0);
  }, [dict.items.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((current) => (current - 1 + dict.items.length) % dict.items.length);
    setProgress(0);
  }, [dict.items.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          nextTestimonial();
          return 0;
        }
        return prevProgress + (100 / (DURATION / UPDATE_INTERVAL));
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, nextTestimonial]);

  return (
    <section id="testimonios" className="relative w-full py-24 lg:py-32 bg-[#0b0f14] border-t border-white/5">
      
      {/* FONDO BRUTALISTA */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/10 pb-12">
          <div>
            <SectionBadge>{dict.badge}</SectionBadge>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.title}
            </h2>
          </div>
          
          {/* Contador Técnico */}
          <div className="flex items-end gap-3 font-mono">
            <span className="text-4xl font-black text-[#E11D48] leading-none">
              {(activeIndex + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-xl text-zinc-600 leading-none mb-1">/</span>
            <span className="text-xl text-zinc-600 leading-none mb-1">
              {dict.items.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* CONTENEDOR DE LA CITA */}
        <div className="relative min-h-[300px] sm:min-h-[250px] lg:min-h-[200px] mb-16">
          {dict.items.map((item, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                activeIndex === index
                  ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                  : "opacity-0 translate-y-8 z-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Comillas grandes como acento */}
                <div className="text-[#E11D48] opacity-80 shrink-0">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>
                
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight text-white max-w-4xl">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PIE DE TESTIMONIO Y CONTROLES */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t border-white/10 relative">
          
          {/* Barra de progreso global */}
          <div 
            className="absolute top-[-1px] left-0 h-[1px] bg-[#E11D48] transition-all ease-linear"
            style={{ 
              width: `${progress}%`,
              transitionDuration: `${UPDATE_INTERVAL}ms`
            }}
          />

          {/* Info del Autor Activo */}
          <div className="relative h-12 w-full sm:w-auto overflow-hidden">
             {dict.items.map((item, index) => (
                <div 
                  key={`author-${index}`}
                  className={`absolute top-0 left-0 flex flex-col transition-all duration-500 ${
                    activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.author}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#E11D48] mt-1">
                    {item.role}
                  </span>
                </div>
             ))}
          </div>

          {/* Flechas de Navegación Cuadradas */}
          <div className="flex gap-4 shrink-0">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-white/20 bg-transparent text-white transition-all duration-300 hover:bg-[#E11D48] hover:border-[#E11D48]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 flex items-center justify-center border border-white/20 bg-transparent text-white transition-all duration-300 hover:bg-[#E11D48] hover:border-[#E11D48]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}