"use client";

interface ContactProps {
  dict: {
    badge: string;
    title: string;
    description: string;
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      servicePlaceholder: string;
      messagePlaceholder: string;
      submitText: string;
    };
    contactInfo: {
      email: string;
      social: string;
    };
  };
}

export default function Contact({ dict }: ContactProps) {
  return (
    <section id="contacto" className="relative w-full py-24 lg:py-40 bg-[#DBE9EE]/30">
      
      {/* CUADRÍCULA TÉCNICA DE FONDO */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#4F6D7A15_1px,transparent_1px),linear-gradient(to_bottom,#4F6D7A15_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: Formulario de Gran Tamaño (7 Columnas) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <form className="flex flex-col border border-zinc-300 bg-white shadow-[20px_20px_0px_0px_rgba(11,15,20,0.03)]">
              
              {/* Campos de ancho completo para máxima legibilidad */}
              <div className="border-b border-zinc-300">
                <input 
                  type="text" 
                  placeholder={dict.form.namePlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                />
              </div>

              <div className="border-b border-zinc-300">
                <input 
                  type="email" 
                  placeholder={dict.form.emailPlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                />
              </div>

              <div className="border-b border-zinc-300">
                <input 
                  type="text" 
                  placeholder={dict.form.servicePlaceholder}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                />
              </div>

              <div>
                <textarea 
                  placeholder={dict.form.messagePlaceholder}
                  rows={6}
                  className="w-full bg-transparent px-10 py-8 text-xl text-[#0b0f14] placeholder:text-zinc-400 focus:outline-none focus:bg-zinc-50 transition-all resize-none rounded-none border-l-4 border-l-transparent focus:border-l-[#E11D48]"
                  required
                ></textarea>
              </div>

              {/* Botón de acción masivo */}
              <button 
                type="submit"
                className="w-full h-24 bg-[#0b0f14] text-white text-xs font-black uppercase tracking-[0.5em] transition-all hover:bg-[#E11D48] active:bg-black"
              >
                {dict.form.submitText}
              </button>
            </form>
          </div>

          {/* COLUMNA DERECHA: Información Editorial (5 Columnas) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="mb-10 inline-flex items-center gap-3 px-5 py-2.5 border border-[#E11D48]/30 bg-white text-[10px] uppercase tracking-[0.3em] font-bold text-[#E11D48] w-fit">
              <span className="w-2 h-2 bg-[#E11D48] animate-pulse" />
              {dict.badge}
            </div>
            
            <h2 className="text-6xl font-bold tracking-tighter text-[#0b0f14] lg:text-8xl leading-[0.9] mb-10">
              {dict.title}
            </h2>
            
            <p className="text-2xl leading-relaxed text-[#4F6D7A] font-light mb-16 max-w-md">
              {dict.description}
            </p>

            {/* Detalles de contacto con estilo minimalista */}
            <div className="space-y-12 pt-12 border-t border-zinc-300">
              <div className="group">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#E11D48] block mb-4">Email Principal //</span>
                <a href="mailto:hola@agencia.com" className="text-3xl font-bold text-[#0b0f14] hover:tracking-widest transition-all duration-500 block">
                  hola@agencia.com
                </a>
              </div>
              
              <div className="space-y-6">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 block">Social //</span>
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  {["Instagram", "LinkedIn", "WhatsApp"].map((social) => (
                    <a key={social} href="#" className="text-sm font-black uppercase tracking-widest text-[#0b0f14] hover:text-[#E11D48] transition-colors relative pb-2 overflow-hidden group">
                      {social}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E11D48] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}