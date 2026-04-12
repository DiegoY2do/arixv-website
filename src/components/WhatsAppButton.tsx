"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface WhatsAppButtonProps {
  phoneNumber: string; // Ej: "34600000000" (sin el +)
  message?: string;    // Mensaje predeterminado opcional
}

export default function WhatsAppButton({ phoneNumber, message = "Hola, estoy interesado en desarrollar un sitio web y me gustaría conocer cómo pueden ayudarme." }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // El botón solo aparece después de hacer un poco de scroll para no saturar el Hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Verificación inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Formateamos la URL de WhatsApp
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[90] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-14 h-14 items-center justify-center overflow-hidden bg-[#05080a]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#E11D48] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(225,29,72,0.15)] active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        {/* Indicador de estado "En línea" - Punto pulsante sutil */}
        <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E11D48] opacity-60"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E11D48]"></span>
        </span>

        {/* Icono de WhatsApp - Monocromático que se vuelve verde oficial en hover */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 text-zinc-400 transition-colors duration-300 group-hover:text-[#25D366]" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>

        {/* Efecto de borde brillante técnico */}
        <div className="absolute inset-0 border border-[#E11D48] opacity-0 transition-opacity duration-300 group-hover:opacity-20 scale-105 group-hover:scale-100" />
      </Link>
    </div>
  );
}