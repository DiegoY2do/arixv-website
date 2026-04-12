"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  lang: string;
  dict: {
    logo: string;
    home: string;
    services: string;
    portfolio: string;
    process: string;
    about: string;
    contact: string;
    cta: string;
  };
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    const currentHash = window.location.hash; 
    
    startTransition(() => {
      router.replace(`${newPath}${currentHash}`, { scroll: false });
    });
    
    setIsMenuOpen(false);
  };

  // NUEVA FUNCIÓN: Fuerza el scroll sin importar la URL actual
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsMenuOpen(false); // Siempre cerramos el menú primero
    
    // Buscamos la sección en la página actual
    const elem = document.getElementById(targetId);
    
    if (elem) {
      e.preventDefault(); // Evitamos que Next.js ignore el clic
      elem.scrollIntoView({ behavior: "smooth" }); // Hacemos el scroll manual
      
      // Actualizamos la URL sutilmente para que quede el registro
      window.history.pushState(null, "", `/${lang}#${targetId}`);
    }
    // Si el elemento NO existe (ej. estás en una página de blog y quieres ir a inicio#servicios), 
    // no hacemos e.preventDefault(), dejando que Next.js navegue normalmente a esa página.
  };

  useEffect(() => {
    setIsScrolled(window.scrollY > 50);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navItems = [
    { label: dict.home, href: "home" },
    { label: dict.services, href: "servicios" },
    { label: dict.portfolio, href: "portafolio" },
    { label: dict.process, href: "proceso" },
    { label: dict.about, href: "nosotros" },
  ];

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header
        className={`fixed top-0 z-[60] w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isMenuOpen 
            ? "py-6 bg-[#0b0f14]"
            : isScrolled 
              ? "py-4 bg-[#0b0f14]/90 backdrop-blur-xl " 
              : "py-8 bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          
          <div className="flex w-1/4 justify-start">
            <Link 
              href={`/${lang}`} 
              className="group flex items-center gap-2" 
              onClick={(e) => {
                if (pathname === `/${lang}`) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  history.pushState("", document.title, window.location.pathname);
                }
                setIsMenuOpen(false);
              }}
            >
              <Image src="/arixv.webp" alt={dict.logo || "Logo"} width={120} height={32} className="h-7 w-auto object-contain transition-transform" priority />
              <span className="h-1.5 w-1.5 bg-[#E11D48] animate-pulse rounded-full" />
            </Link>
          </div>

          <nav className="hidden lg:flex w-2/4 justify-center">
            <ul className="flex items-center gap-10">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${lang}#${item.href}`} 
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group relative text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
                  >
                    <span className="mr-1 text-[#E11D48] opacity-0 transition-opacity group-hover:opacity-100">//</span>
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#E11D48] transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex w-1/4 justify-end items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center font-mono text-[10px] font-bold tracking-[0.3em] text-zinc-500">
                <button onClick={() => handleLanguageChange('es')} disabled={isPending} className={`transition-colors hover:text-[#E11D48] ${lang === 'es' ? 'text-white' : ''}`}>ES</button>
                <span className="mx-2 opacity-10">/</span>
                <button onClick={() => handleLanguageChange('en')} disabled={isPending} className={`transition-colors hover:text-[#E11D48] ${lang === 'en' ? 'text-white' : ''}`}>EN</button>
              </div>
              <Link 
                href="https://wa.me/525621434770?text=Hola%2C%20quiero%20desarrollar%20un%20proyecto%20web%20y%20me%20interesa%20conocer%20su%20proceso%2C%20tiempos%20y%20costos." 
                target="_blank"
                className="bg-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#05080a] transition-all hover:bg-[#E11D48] hover:text-white"
              >
                {dict.cta}
              </Link>
            </div>

            {/* HAMBURGUESA */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex flex-col items-end justify-center gap-[5px] p-2 focus:outline-none lg:hidden z-[70]"
              aria-label="Menú"
            >
              <span className={`block h-[2px] transition-all duration-500 ${isMenuOpen ? "w-7 translate-y-[7px] rotate-45 bg-[#E11D48]" : "w-8 bg-white"}`} />
              <span className={`block h-[2px] transition-all duration-500 ${isMenuOpen ? "w-7 opacity-0" : "w-5 bg-white group-hover:w-8"}`} />
              <span className={`block h-[2px] transition-all duration-500 ${isMenuOpen ? "w-7 -translate-y-[7px] -rotate-45 bg-[#E11D48]" : "w-6 bg-white group-hover:w-8"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL */}
      <div 
        className={`fixed inset-0 z-[55] h-screen w-full bg-[#05080a] overflow-y-auto transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#E11D48_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="min-h-full flex flex-col justify-between p-12 pb-24 relative z-10">
          <nav className="flex flex-col gap-8 mt-24">
            <span className="font-mono text-[10px] text-[#E11D48] tracking-[0.5em] uppercase font-bold mb-4">// Menú</span>
            {navItems.map((item, index) => (
              <div key={index} className="overflow-hidden">
                <Link
                  href={`/${lang}#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block text-5xl font-black tracking-tighter text-white transition-all duration-700 hover:text-[#E11D48] ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className={`flex flex-col gap-10 border-t border-white/10 pt-10 mt-16 transition-all duration-700 delay-700 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Language //</span>
              <div className="flex items-center gap-6 text-sm font-black text-white">
                <button onClick={() => handleLanguageChange('es')} disabled={isPending} className={`${lang === 'es' ? 'text-[#E11D48]' : 'opacity-40'}`}>ES</button>
                <button onClick={() => handleLanguageChange('en')} disabled={isPending} className={`${lang === 'en' ? 'text-[#E11D48]' : 'opacity-40'}`}>EN</button>
              </div>
            </div>

            <Link
              href={`/${lang}#contacto`}
              onClick={(e) => handleNavClick(e, 'contacto')}
              className="flex w-full h-20 shrink-0 items-center justify-center bg-white text-[#05080a] text-xs font-black uppercase tracking-[0.3em] hover:bg-[#E11D48] hover:text-white transition-colors"
            >
              {dict.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}