import { getDictionary, Locale } from "@/dictionaries/getDictionary";

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  // Aquí está la diferencia: extraemos 'privacy'
  const privacy = dict.privacy;

  return (
    <main className="relative min-h-screen bg-[#05080a] pt-40 pb-24 border-t border-white/5">
      
      {/* FONDO TÉCNICO SUTIL */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_#E11D48_1px,_transparent_1px)] bg-[size:32px_32px] opacity-[0.03]" />

      <article className="mx-auto max-w-3xl px-6 relative z-10">
        
        {/* CABECERA LEGAL */}
        <header className="mb-16">
          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-[#E11D48]/30 bg-[#E11D48]/5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#E11D48]">
            <span className="w-1.5 h-1.5 bg-[#E11D48] animate-pulse" />
            {privacy.badge} //
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {privacy.title}
          </h1>
          
          <div className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 border-b border-white/10 pb-8">
            <span>{privacy.version}</span>
            <span className="text-[#E11D48]">//</span>
            <span>{privacy.lastUpdated}</span>
          </div>
        </header>

        {/* CONTENIDO DEL DOCUMENTO MAPEADO DINÁMICAMENTE */}
        <div className="space-y-12 text-base md:text-lg leading-relaxed text-zinc-400 font-light">
          
          {privacy.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
                {section.title}
              </h2>
              
              {/* Renderiza los párrafos si existen */}
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="space-y-4">
                  {section.paragraphs.map((p, pIndex) => (
                    <p key={`p-${pIndex}`}>{p}</p>
                  ))}
                </div>
              )}

              {/* Renderiza la lista si existe */}
              {section.list && section.list.length > 0 && (
                <ul className="list-none space-y-4 pl-0 mt-4">
                  {section.list.map((listItem, lIndex) => {
                    const [boldPart, ...rest] = listItem.split(':');
                    return (
                      <li key={`l-${lIndex}`} className="relative pl-6">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#E11D48]" />
                        {rest.length > 0 ? (
                          <>
                            <strong className="text-white">{boldPart}:</strong>
                            {rest.join(':')}
                          </>
                        ) : (
                          listItem
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}

          {/* SECCIÓN DE CONTACTO */}
          <section className="mt-16 pt-8 border-t border-white/5">
            <h2 className="text-xl font-bold tracking-tight text-white mb-4">
              {privacy.contact.title}
            </h2>
            <p>
              {privacy.contact.text}{' '}
              <a href={`mailto:${privacy.contact.email}`} className="text-[#E11D48] hover:text-white transition-colors relative pb-1 group inline-block">
                {privacy.contact.email}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E11D48] group-hover:bg-white transition-colors" />
              </a>
            </p>
          </section>

        </div>
      </article>
    </main>
  );
}