  "use client";

  import { useState, useRef } from "react";
  import Image from "next/image";
  import Link from "next/link";

  interface ProjectCardProps {
    title: string;
    category: string;
    desc: string;
    image: string;
    link: string;
    viewProjectText: string;
  }

  export default function ProjectCard({ title, category, desc, image, link, viewProjectText }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!cardRef.current) return;
      const card = cardRef.current.getBoundingClientRect();
      const x = e.clientX - card.left;
      const y = e.clientY - card.top;
      const centerX = card.width / 2;
      const centerY = card.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    return (
      <Link 
        href={link}
        className="group block relative w-full"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={cardRef}
          className="relative w-full transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* 1. CONTENEDOR DE IMAGEN: rounded-none (cuadrado absoluto) y borde rojo en hover */}
          <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-none bg-[#080b0f] border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-[#E11D48]/50 group-hover:shadow-[0_20px_40px_rgba(225,29,72,0.1)]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-[1.05] grayscale-[30%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
              sizes="(max-w-7xl) 50vw, 100vw"
            />
            
            {/* Overlay con matiz rojo sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            
            {/* 2. BADGE SUPERIOR CUADRADO: Estilo editorial */}
            <div className="absolute top-0 left-0 z-20">
              <span className="inline-block px-4 py-2 bg-[#E11D48] text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                {category}
              </span>
            </div>
          </div>

          {/* 3. TEXTOS: Tipografía más ruda y acentos rojos */}
          <div className="mt-8 px-0">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#E11D48] transition-colors duration-300 tracking-tighter">
                {title}
              </h3>
              {/* Línea técnica roja en hover */}
              <div className="h-px flex-1 bg-white/10 group-hover:bg-[#E11D48]/30 transition-colors duration-500" />
            </div>
            
            <p className="text-zinc-400 line-clamp-2 leading-relaxed font-light mb-8 max-w-md">
              {desc}
            </p>

            {/* 4. CTA "Ver Proyecto": Cuadrito rojo pulsante */}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors duration-300">
              <span className="w-2 h-2 bg-[#E11D48] group-hover:animate-ping" />
              {viewProjectText}
            </div>
          </div>
        </div>
      </Link>
    );
  }