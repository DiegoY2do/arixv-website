import { siteData, propertiesData } from './data.js';

export const ExclusiveSection = (lang, currency, formatPriceFn) => {
    const data = siteData.exclusive;
    
    // Filtramos las propiedades exclusivas y tomamos solo las primeras 3
    const exclusiveItems = propertiesData
        .filter(prop => prop.exclusive === true)
        .slice(0, 3);

    return `
        <section class="w-full bg-[#0A2640] py-32 md:py-40 relative overflow-hidden">
            
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

                <div class="text-center max-w-3xl mx-auto mb-24 animate-on-scroll">
                    <div class="flex items-center justify-center gap-4 mb-6">
                        <span class="w-8 h-[1px] bg-yellow-500/50"></span>
                        <span class="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs">
                            ${data.tag[lang]}
                        </span>
                        <span class="w-8 h-[1px] bg-yellow-500/50"></span>
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        ${data.title[lang]}
                    </h2>
                    <p class="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
                        ${data.desc[lang]}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-12 animate-on-scroll">
                    ${exclusiveItems.map((item, index) => {
                        const rawPrice = currency === 'mxn' ? item.raw_price_mxn : item.raw_price_usd;
                        
                        // EL SECRETO DEL DISEÑO: Empujamos la tarjeta del centro hacia abajo en escritorio
                        const staggerClass = index === 1 ? "md:translate-y-16" : "";

                        return `
                        <a href="#" data-id="${item.id}" class="property-link group block ${staggerClass}">
                            
                            <div class="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-8 shadow-2xl border border-white/5">
                                <img src="${item.img}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out">
                                
                                <div class="absolute inset-0 bg-[#0A2640]/20 group-hover:bg-transparent transition-colors duration-500"></div>

                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-75">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div class="px-2">
                                <h3 class="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-yellow-500 transition-colors">
                                    ${item.title[lang]}
                                </h3>
                                <p class="text-xl font-medium text-yellow-500/90 mb-5">
                                    ${formatPriceFn ? formatPriceFn(rawPrice, currency) : rawPrice}
                                </p>

                                <div class="w-full h-[1px] bg-white/10 mb-5 group-hover:bg-yellow-500/30 transition-colors"></div>

                                <div class="flex items-center gap-5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <span class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                        ${item.beds} Hab
                                    </span>
                                    <span class="w-1 h-1 bg-slate-600 rounded-full"></span>
                                    <span class="flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                                        ${item.sqm} m²
                                    </span>
                                </div>
                            </div>
                        </a>
                        `;
                    }).join('')}
                </div>

                <div class="mt-20 md:mt-32 flex justify-center animate-on-scroll">
                    <a href="#" class="group flex items-center gap-4 text-white uppercase tracking-widest text-xs font-bold hover:text-yellow-500 transition-colors px-8 py-4 rounded-full border border-white/20 hover:border-yellow-500 bg-white/5 backdrop-blur-sm">
                        ${data.view_all[lang]}
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>
                
            </div>
        </section>
    `;
};