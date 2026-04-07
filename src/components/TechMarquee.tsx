"use client";

export default function TechMarquee() {
  const technologies = [
    {
      name: "Next.js",
      svg: (
        <svg viewBox="0 0 180 180" className="w-10 h-10 fill-current"><path d="M90 0C40.294 0 0 40.294 0 90s40.294 90 90 90 90-40.294 90-90S139.706 0 90 0zm61.594 133.091L66.702 54.183A8.34 8.34 0 0060.03 51h-.103a8.216 8.216 0 00-8.225 8.219v61.562a8.218 8.218 0 008.222 8.219 8.218 8.218 0 008.223-8.219V74.832l73.492 92.484a73.204 73.204 0 01-51.64 20.684c-40.584 0-73.484-32.9-73.484-73.484S49.416 16.516 90 16.516s73.484 32.9 73.484 73.484a73.2 73.2 0 01-11.89 39.513v.01l-.001-.001v-12.79a8.218 8.218 0 00-8.223-8.218 8.218 8.218 0 00-8.222 8.218v26.36z" /></svg>
      )
    },
    {
      name: "React",
      svg: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 fill-current"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
      )
    },
    {
      name: "Shopify",
      svg: (
        <svg viewBox="0 0 448 512" className="w-10 h-10 fill-current"><path d="M388.32,104.1a4.66,4.66,0,0,0-4.4-1.49L242.41,135.53a47.53,47.53,0,0,0-36.26,38.81L187.35,316c-3.11,21.57,13.88,41,35.61,41H376a31.33,31.33,0,0,0,30.41-23.75l27.18-108.6A112.43,112.43,0,0,0,388.32,104.1ZM334.33,313.25h-55V214a11,11,0,0,1,11-11h33a11,11,0,0,1,11,11Zm81-111.41-27.18,108.6a9.34,9.34,0,0,1-9.07,7.07h-22.8V214a33.06,33.06,0,0,0-33-33h-33a33.06,33.06,0,0,0-33,33v103.4H195.42L214,177a25.54,25.54,0,0,1,19.46-20.84l141.5-32.92a24.16,24.16,0,0,1,24.13,6.23A90.41,90.41,0,0,1,415.36,201.84ZM122.56,316c-3.11,21.57,13.88,41,35.61,41h16V335h-16a13.39,13.39,0,0,1-13-9.52l-23.44-80.11A66.24,66.24,0,0,0,61.43,197.8L35.26,192a11,11,0,0,1-8.31-13l9.08-39.75a11,11,0,0,1,13.15-8.15l26.17,5.85a88.34,88.34,0,0,1,64.24,63.4l24.46,110.19A13.35,13.35,0,0,1,122.56,316Z"/></svg>
      )
    },
    {
      name: "WordPress",
      svg: (
        <svg viewBox="0 0 512 512" className="w-10 h-10 fill-current"><path d="M61.7 169.4l101.5 278C92.2 413 43.3 340.2 43.3 256c0-30.9 6.6-60.1 18.4-86.6zm337.9 75.9c0-26.3-9.4-44.5-17.5-58.7-10.8-17.5-20.9-32.4-20.9-49.9 0-19.6 14.8-37.8 35.7-37.8.9 0 1.8.1 2.8.2-37.9-34.7-88.3-55.9-143.7-55.9-74.3 0-139.7 38.1-177.8 95.9 5 .2 9.7.3 13.7.3 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l90.5 269.7 27.3-81.8-38.6-116.3c-11.5-.7-22.3-2-22.3-2-11.5-.7-10.1-18.2 1.3-17.5 0 0 35.1 2.7 56 2.7 22.2 0 56.7-2.7 56.7-2.7 11.5-.7 12.8 16.2 1.4 17.5 0 0-11.5 1.3-24.3 2l89.6 266.3 8.3-28.1c11.4-38.7 27.6-80.1 27.6-117.9zm-152.8 98l-52.1 150.3c20 5.6 41.1 8.5 62.9 8.5 24.3 0 47.5-4.1 69-11.6l-79.8-147.2zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 493.5c-131.2 0-237.5-106.3-237.5-237.5S124.8 18.5 256 18.5 493.5 124.8 493.5 256 387.2 493.5 256 493.5z"/></svg>
      )
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg viewBox="0 0 54 33" className="w-10 h-10 fill-current"><path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" /></svg>
      )
    },
    {
      name: "Figma",
      svg: (
        <svg viewBox="0 0 38 57" className="w-10 h-10 fill-current"><path fill="currentColor" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="currentColor" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v19H9.5A9.5 9.5 0 0 1 0 47.5z"/><path fill="currentColor" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="currentColor" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="currentColor" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>
      )
    }
  ];

  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative py-12 overflow-hidden w-full bg-[#DBE9EE]/30">
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      {/* TEXTURA UNIFICADA MOVIDA A LA IZQUIERDA: left-0 y mask-image apuntando a to_right */}
      <div className="absolute top-0 left-0 w-full sm:w-3/4 lg:w-1/2 h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A30_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A30_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_right,black_10%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-white/60 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48] backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
            Potenciado por tecnologías modernas
          </div>
        </div>

        <div className="mask-edges w-full overflow-hidden">
          <div className="animate-scroll flex items-center gap-16 md:gap-28">
            {duplicatedTech.map((tech, i) => (
              <div 
                key={i} 
                className="group flex items-center gap-4 transition-all duration-300 cursor-default opacity-50 hover:opacity-100"
              >
                <div className="text-[#0b0f14] transition-colors duration-300 group-hover:text-[#E11D48]">
                  {tech.svg}
                </div>
                <span className="text-xl md:text-2xl font-black font-sans tracking-tighter text-[#0b0f14] transition-colors duration-300 group-hover:text-[#E11D48]">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}