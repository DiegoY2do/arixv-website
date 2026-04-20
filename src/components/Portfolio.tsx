"use client";

import Link from "next/link";
import Image from "next/image";

interface Project {
  title: string;
  category: string;
  desc: string;
  image: string;
  link: string;
}

interface PortfolioProps {
  dict: {
    badge: string;
    title: string;
    subtitle: string;
    viewProject: string;
    startProject: string;
    projects: Project[];
  };
}

export default function Portfolio({ dict }: PortfolioProps) {
  return (
    // 1. CORTE LIMPIO: Padding simétrico (py-24 lg:py-32), eliminamos el padding inferior gigante.
    // Añadimos un borde superior sutil para separar limpiamente de la sección anterior.
    <section id="portafolio" className="relative w-full py-24 lg:py-32 bg-[#0b0f14] border-t border-white/5">
      
      {/* FONDO BRUTALISTA: Puntos rojos tenues, igual que en el Hero oscuro */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">

          {/* COLUMNA IZQUIERDA: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col">
            
            {/* 2. BADGE EDITORIAL: Cuadrado, borde sutil, acento en rojo */}
            <div className="mb-8 inline-flex self-start items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-[#E11D48]/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
              <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
              {dict.badge}
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 leading-[1.1]">
              {dict.title}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-sm">
              {dict.subtitle}
            </p>

            {/* Línea divisoria técnica */}
            <div className="hidden lg:block w-full h-px bg-white/10" />
          </div>

          {/* COLUMNA DERECHA: Lista de Proyectos */}
          <div className="lg:col-span-8 flex flex-col gap-24 lg:gap-32">
            {dict.projects.map((project, index) => (
              <Link
                key={index}
                href={project.link || "#"}
                target="_blank"
                className="group flex flex-col gap-8"
              >
                {/* 3. GEOMETRÍA ESTRICTA: rounded-none en lugar de rounded-2xl, borde duro */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-none bg-[#080b0f]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    // Agregamos un ligero filtro escala de grises que desaparece en hover para dar más dramatismo
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  {/* Overlay con matiz rojo sutil en hover */}
                  <div className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Categoría con estilo terminal */}
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                        0{index + 1} <span className="mx-2 text-[#E11D48]">//</span> {project.category}
                      </span>
                    </div>
                    {/* 4. ACENTO CARMESÍ en el título al hacer hover */}
                    <h3 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-[#E11D48] transition-colors duration-300 tracking-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 max-w-xl text-base leading-relaxed font-light">
                      {project.desc}
                    </p>
                  </div>

                  {/* 5. BOTÓN CUADRADO: Sin curvas, fondo sólido rojo en hover */}
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mt-4 sm:mt-0 rounded-none border border-white/10 bg-transparent group-hover:bg-[#E11D48] group-hover:border-[#E11D48] transition-all duration-300 shadow-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}