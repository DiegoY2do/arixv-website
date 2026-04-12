"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeroProps {
  dict: {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
    secondaryCta: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const pathname = usePathname();
  const titleParts = dict.heroTitle.split('*');

  // Función para forzar el scroll suave a las secciones
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const elem = document.getElementById(targetId);
    
    if (elem) {
      e.preventDefault(); // Evita que Next.js ignore el clic
      elem.scrollIntoView({ behavior: "smooth" });
      
      // Actualiza la URL para que refleje la sección actual
      window.history.pushState(null, "", `${pathname}#${targetId}`);
    }
  };

  return (
    <section className="relative w-full bg-[#0b0f14] pt-24 pb-24 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
      
      {/* FONDO */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.04]" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA */}
          <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
            
            {/* BADGE EDITORIAL */}
            <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-[#E11D48]/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
              <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
              DIGITAL PRODUCT STUDIO
            </div>

            <h1 className="text-4xl font-bold text-white sm:text-5xl xl:text-6xl tracking-tight leading-[1.1]">
              {titleParts[0]}
              {titleParts[1] && (
                <span className="text-[#E11D48] px-1">
                  {titleParts[1]}
                </span>
              )}
              {titleParts[2]}
            </h1>
            
            <p className="mt-6 text-base font-normal leading-relaxed text-zinc-400 sm:text-lg lg:max-w-md">
              {dict.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
              {/* BOTÓN PRIMARIO: Interceptado con handleNavClick */}
              <Link
                href="https://wa.me/525621434770?text=Hola%2C%20quiero%20desarrollar%20un%20proyecto%20web%20y%20me%20interesa%20conocer%20su%20proceso%2C%20tiempos%20y%20costos." 
                target="_blank"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold text-white transition-all duration-300 bg-[#E11D48] border border-[#E11D48] hover:bg-transparent hover:text-[#E11D48]"
              >
                {dict.cta}
              </Link>

              {/* BOTÓN SECUNDARIO: Interceptado con handleNavClick */}
              <Link
                href="#portafolio"
                onClick={(e) => handleNavClick(e, 'proyectos')}
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold text-white transition-all duration-300 bg-transparent border border-white/20 hover:border-white"
              >
                {dict.secondaryCta}
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 perspective-1000 flex items-center justify-center">
            
            <div className="absolute w-[380px] h-[480px] transform-gpu scale-[0.65] sm:scale-90 lg:scale-100 rotate-x-[15deg] rotate-y-[-20deg] rotate-z-[5deg] hover:rotate-x-[10deg] hover:rotate-y-[-15deg] transition-transform duration-700 ease-out">
              
              {/* Tarjeta UI Principal */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#0f151c] shadow-2xl overflow-hidden border border-white/10 flex flex-col z-20">
                <div className="h-48 border-b border-white/10 w-full relative bg-[#151d26]">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-2.5 h-2.5 bg-zinc-600" />
                    <div className="w-2.5 h-2.5 bg-zinc-600" />
                    <div className="w-2.5 h-2.5 bg-[#E11D48]" />
                  </div>
                  <div className="absolute bottom-0 left-4 right-4 h-24 bg-white/5 border-t border-x border-white/10" />
                </div>
                <div className="p-8 flex-1">
                  <div className="w-1/3 h-4 bg-zinc-700 mb-6" />
                  <div className="space-y-4">
                    <div className="w-full h-2 bg-zinc-800" />
                    <div className="w-5/6 h-2 bg-zinc-800" />
                    <div className="w-4/6 h-2 bg-zinc-800" />
                  </div>
                  <div className="mt-10 flex gap-3">
                    <div className="w-28 h-10 bg-[#E11D48]" />
                    <div className="w-24 h-10 border border-zinc-700" />
                  </div>
                </div>
              </div>

              {/* Tarjeta Secundaria Flotante */}
              <div className="absolute top-12 -right-8 w-[240px] h-[160px] bg-[#E11D48] shadow-[0_20px_40px_rgba(225,29,72,0.2)] border-none p-6 z-30 animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-white" />
                  <div>
                    <div className="w-20 h-2 bg-white/50 mb-2" />
                    <div className="w-12 h-2 bg-white/30" />
                  </div>
                </div>
                <div className="w-full h-1 bg-white/30 mb-2" />
                <div className="w-4/5 h-1 bg-white/30" />
              </div>

              {/* Tarjeta Terciaria Flotante */}
              <div className="absolute bottom-16 -left-12 w-[280px] h-[200px] bg-[#0f151c] shadow-[0_30px_50px_rgba(0,0,0,0.5)] border border-white/10 p-6 z-30 animate-[float_8s_ease-in-out_infinite_reverse]">
                <div className="w-1/2 h-4 bg-zinc-700 mb-6" />
                <div className="flex items-end gap-3 h-24">
                  <div className="w-1/4 bg-zinc-800 h-[40%]" />
                  <div className="w-1/4 bg-zinc-700 h-[70%]" />
                  <div className="w-1/4 bg-[#E11D48] h-[50%]" />
                  <div className="w-1/4 bg-zinc-600 h-[100%]" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}