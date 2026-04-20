import { siteData, propertiesData } from './data.js';

export const LocationsSection = (lang) => {
    const data = siteData.locations;

    return `
        <section class="max-w-7xl mx-auto px-6 py-24">
            
            <div class="text-center mb-16 animate-on-scroll">
                <span class="text-blue-600 font-extrabold uppercase tracking-[0.2em] text-xs mb-4 inline-block">
                    ${data.tag[lang]}
                </span>
                <h2 class="text-4xl md:text-5xl font-bold text-[#0A2640] mb-6 leading-tight">
                    ${data.title[lang]}
                </h2>
                <p class="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                    ${data.desc[lang]}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px] animate-on-scroll">
                ${data.areas.map(area => {
                    // LÓGICA DE CONTEO REAL:
                    // Filtramos propertiesData buscando las que incluyan el nombre de la zona en su dirección
                    const realCount = propertiesData.filter(prop => 
                        prop.address.toLowerCase().includes(area.name.toLowerCase())
                    ).length;

                    return `
                    <div data-loc-id="${area.id}" class="relative rounded-[2rem] overflow-hidden group cursor-pointer ${area.colSpan} ${area.rowSpan} shadow-sm hover:shadow-2xl transition-shadow duration-500">
                        
                        <img src="${area.img}" alt="${area.name}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out">
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0A2640]/90 via-[#0A2640]/40 to-transparent transition-opacity duration-300"></div>
                        
                        <div class="absolute inset-0 p-8 flex flex-col justify-end">
                            <h3 class="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                ${area.name}
                            </h3>
                            <div class="flex items-center gap-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span class="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    ${realCount} ${lang === 'es' ? 'Propiedades' : 'Properties'}
                                </span>
                                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0A2640]">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            
        </section>
    `;
};