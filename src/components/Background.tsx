export default function Background() {
  return (
    // 1. ACELERACIÓN POR HARDWARE: Creamos una capa aislada para la GPU
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none transform-gpu translate-z-0 will-change-transform">
      
      {/* CAPA 1: TEXTURA GEOMÉTRICA COMPLEJA */}
      {/* Añadimos translate-z-0 para que la máscara no recalcule en scroll */}
      <div 
        className="absolute inset-0 opacity-[0.03] transform-gpu translate-z-0"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(-45deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
      />

      {/* CAPA 2: RESPLANDORES GLOBAL ESTÁTICOS */}
      {/* Redujimos el blur a 150px (visualmente idéntico) y forzamos renderizado GPU */}
      <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-500/10 blur-[150px] transform-gpu translate-z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-purple-500/10 blur-[150px] transform-gpu translate-z-0" />

      {/* CAPA 3: TEXTURA DE RUIDO/GRANO */}
      {/* Eliminamos mix-blend-overlay (letal en móviles). 
          Ocultamos el ruido en móviles pequeños (hidden md:block) porque en pantallas de alta densidad de píxeles no se nota y solo gasta batería. */}
      <div 
        className="hidden md:block absolute inset-0 opacity-[0.04] transform-gpu translate-z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
    </div>
  );
}