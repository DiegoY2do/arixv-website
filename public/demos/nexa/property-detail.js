import { propertiesData, siteData } from './data.js';
import { PropertiesGrid } from './properties.js';
import { ContactSection } from './contact.js';

export const PropertyDetail = (id, lang, formatPriceFn) => {
    // 1. Buscamos la propiedad. Aseguramos comparar como strings para evitar errores
    const prop = propertiesData.find(p => String(p.id) === String(id));
    if (!prop) {
        return `
        <div class="py-40 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <h2 class="text-3xl font-bold text-[#0A2640] mb-4">Propiedad no encontrada</h2>
            <a href="/" class="nav-link bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Volver al inicio
            </a>
        </div>`;
    }

    const description = prop.desc ? prop.desc[lang] : (lang === 'es' ? "Descripción no disponible." : "Description not available.");
    const sqm = prop.sqm || "--";
    const gallery = prop.gallery || [prop.img, prop.img];
    const amenities = prop.amenities || [];

    // Obtenemos 3 propiedades diferentes a la actual para sugerir
    const similarProps = propertiesData.filter(p => String(p.id) !== String(id)).slice(0, 3);

    return `
        <section class="w-full h-[70vh] lg:h-[85vh] relative bg-[#0A2640] overflow-hidden">
            <img src="${prop.img}" class="absolute inset-0 w-full h-full object-cover opacity-60">
            
            <div class="absolute inset-0 bg-gradient-to-b from-[#0A2640]/80 via-transparent to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A2640] via-[#0A2640]/40 to-transparent"></div>
            
            <a href="#hero-root" class="nav-link absolute top-24 left-6 md:top-32 md:left-12 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:-translate-x-1 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                ${lang === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
            </a>

            <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 z-10">
                <div class="max-w-[1440px] mx-auto">
                    <span class="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block text-white shadow-lg">
                        ${prop.type}
                    </span>
                    <h1 class="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-4 text-white tracking-tight drop-shadow-xl">
                        ${prop.title[lang]}
                    </h1>
                    <p class="text-slate-300 flex items-center gap-2 text-lg font-medium">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        ${prop.address}
                    </p>
                </div>
            </div>
        </section>

        <section class="py-16 lg:py-24 bg-white">
            <div class="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                
                <div class="lg:col-span-8 flex flex-col gap-16">
                    <div>
                        <h3 class="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">${lang === 'es' ? 'La Residencia' : 'The Residence'}</h3>
                        <p class="text-xl text-slate-600 leading-relaxed font-light text-justify">
                            ${description}
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        ${gallery.map((img, i) => `
                            <div class="relative ${i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'} rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm cursor-zoom-in group/img"
                                 onclick="
                                    document.getElementById('fancybox-img').src='${img}';
                                    document.getElementById('fancybox').dataset.current='${i}';
                                    document.getElementById('fancybox').classList.remove('hidden');
                                    document.getElementById('fancybox').classList.add('flex');
                                 ">
                                <img src="${img}" class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out">
                                
                                <div class="absolute inset-0 bg-[#0A2640]/0 group-hover/img:bg-[#0A2640]/20 transition-colors pointer-events-none"></div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                                    <div class="bg-white/90 backdrop-blur-sm text-[#0A2640] p-4 rounded-full shadow-lg transform group-hover/img:scale-110 transition-transform">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="lg:col-span-4">
                    <div class="sticky top-32 bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        
                        <div class="text-4xl md:text-5xl font-black text-[#0A2640] tracking-tight mb-8">
                            ${formatPriceFn(prop.raw_price_mxn, prop.raw_price_usd)}
                        </div>

                        <div class="grid grid-cols-3 gap-4 mb-8">
                            <div class="bg-white p-4 rounded-2xl text-center border border-slate-100 shadow-sm flex flex-col justify-center">
                                <span class="block text-2xl font-black text-[#0A2640] mb-1">${prop.beds}</span>
                                <span class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">${lang === 'es' ? 'Hab' : 'Beds'}</span>
                            </div>
                            <div class="bg-white p-4 rounded-2xl text-center border border-slate-100 shadow-sm flex flex-col justify-center">
                                <span class="block text-2xl font-black text-[#0A2640] mb-1">${prop.baths}</span>
                                <span class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">${lang === 'es' ? 'Baños' : 'Baths'}</span>
                            </div>
                            <div class="bg-white p-4 rounded-2xl text-center border border-slate-100 shadow-sm flex flex-col justify-center">
                                <span class="block text-2xl font-black text-[#0A2640] mb-1">${sqm}</span>
                                <span class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">m²</span>
                            </div>
                        </div>

                        ${amenities.length > 0 ? `
                            <ul class="flex flex-col gap-5 mb-10 border-t border-slate-200 pt-8">
                                ${amenities.map(am => `
                                    <li class="flex items-center gap-4 text-slate-600 font-medium">
                                        <div class="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${am.icon}"/></svg>
                                        </div>
                                        ${am[lang]}
                                    </li>
                                `).join('')}
                            </ul>
                        ` : ''}

                        <a href="https://wa.me/${siteData.contact.whatsapp.number}?text=Hola, me interesa agendar una visita para: ${prop.title[lang]}" target="_blank"
                           class="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="${siteData.socials.find(s => s.name === 'WhatsApp').icon}"></path></svg>
                            ${lang === 'es' ? 'Agendar Visita' : 'Schedule Visit'}
                        </a>
                    </div>
                </div>

            </div>
        </section>

        <section class="py-24 bg-slate-50 border-t border-slate-100">
            <div class="max-w-[1440px] mx-auto">
                <div class="px-6 md:px-12 lg:px-16 mb-12 flex items-center gap-6">
                    <h3 class="text-3xl md:text-4xl font-black text-[#0A2640] tracking-tight">
                        ${lang === 'es' ? 'Propiedades Similares' : 'Similar Properties'}
                    </h3>
                    <div class="h-[2px] flex-1 bg-slate-200 hidden md:block"></div>
                </div>
                ${PropertiesGrid(similarProps, lang, formatPriceFn)}
            </div>
        </section>

        ${ContactSection(lang)}

        <div id="fancybox" 
             data-gallery='${JSON.stringify(gallery)}' 
             data-current="0" 
             onclick="if(event.target === this) { this.classList.add('hidden'); this.classList.remove('flex'); }"
             class="hidden fixed inset-0 z-[200] bg-[#0A2640]/30 backdrop-blur-xl flex-col items-center justify-center transition-all select-none">
            
            <button onclick="document.getElementById('fancybox').classList.add('hidden'); document.getElementById('fancybox').classList.remove('flex');" class="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-50 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <button onclick="
                const fb = document.getElementById('fancybox');
                const gal = JSON.parse(fb.dataset.gallery);
                let i = parseInt(fb.dataset.current) - 1;
                if(i < 0) i = gal.length - 1;
                fb.dataset.current = i;
                document.getElementById('fancybox-img').src = gal[i];
            " class="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50 group">
                <div class="bg-white/10 group-hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group-hover:border-white/30">
                    <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </div>
            </button>

            <button onclick="
                const fb = document.getElementById('fancybox');
                const gal = JSON.parse(fb.dataset.gallery);
                let i = parseInt(fb.dataset.current) + 1;
                if(i >= gal.length) i = 0;
                fb.dataset.current = i;
                document.getElementById('fancybox-img').src = gal[i];
            " class="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50 group">
                <div class="bg-white/10 group-hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group-hover:border-white/30">
                    <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
            </button>

            <img id="fancybox-img" src="" class="max-w-[95vw] max-h-[85vh] object-contain rounded-xl shadow-2xl relative z-40 transition-opacity duration-300">
        </div>
    `;
};