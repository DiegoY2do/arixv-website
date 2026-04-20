import { propertiesData } from './data.js';

const PropertyCard = (prop, lang, formatPriceFn) => `
    <div class="carousel-card shrink-0 snap-center md:snap-start h-full">
        <article data-prop-id="${prop.id}" class="group bg-white rounded-[2.5rem] p-4 flex flex-col hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full cursor-pointer relative top-0 hover:-top-2">
            
            <div class="relative overflow-hidden rounded-[1.8rem] mb-5 aspect-[4/3] bg-slate-100 shrink-0">
                <img src="${prop.img}" alt="${prop.title[lang]}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out">
                
                <div class="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-2 rounded-full uppercase tracking-wider flex items-center gap-2">
                    <span class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> 
                        ${prop.beds}
                    </span>
                    <span class="w-1 h-1 bg-white/50 rounded-full"></span>
                    <span class="flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"></path></svg> 
                        ${prop.baths}
                    </span>
                </div>
            </div>

            <div class="px-2 flex flex-col flex-1">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 truncate">${prop.address}</p>
                <h3 class="text-xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors line-clamp-1">${prop.title[lang]}</h3>
                
                <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="font-black text-slate-900 text-xl tracking-tight">
                        ${formatPriceFn(prop.raw_price_mxn, prop.raw_price_usd)}
                    </span>
                    <div class="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-[#0A2640] group-hover:border-[#0A2640] group-hover:text-white transition-all duration-300 shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </div>
            </div>
            
        </article>
    </div>
`;

export const PropertiesGrid = (data, lang, formatPriceFn) => {
    if (data.length === 0) return `<div class="col-span-full py-20 text-center text-slate-500 font-bold">Sin resultados</div>`;
    
    return `
        <style>
            /* Ocultamos la barra de scroll nativa */
            .nexa-slider::-webkit-scrollbar { display: none; }
            .nexa-slider { -ms-overflow-style: none; scrollbar-width: none; }

            /* Cálculos exactos usando Variables de CSS */
            :root {
                --gap: 24px;
            }
            .carousel-card {
                /* CAMBIO 1: Móvil 100% del ancho para evitar el margen fantasma */
                width: 100%; 
            }
            @media (min-width: 768px) {
                .carousel-card { 
                    /* Tablet: 2 tarjetas. Restamos la mitad del gap */
                    width: calc(50% - (var(--gap) / 2)); 
                }
            }
            @media (min-width: 1024px) {
                .carousel-card { 
                    /* Escritorio: 3 tarjetas. Restamos 2/3 del gap */
                    width: calc(33.333% - (var(--gap) * 2 / 3)); 
                }
            }
        </style>

        <div class="relative w-full max-w-[1440px] mx-auto group/slider">
            
            <button onclick="
                const s = document.getElementById('slider-container');
                const scrollAmount = window.innerWidth >= 1024 ? s.clientWidth : s.clientWidth * 0.85;
                s.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            " class="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md text-[#0A2640] border border-slate-200 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all hover:bg-[#0A2640] hover:text-white hover:scale-110 opacity-0 group-hover/slider:opacity-100 disabled:opacity-0 hidden md:flex">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <button onclick="
                const s = document.getElementById('slider-container');
                const scrollAmount = window.innerWidth >= 1024 ? s.clientWidth : s.clientWidth * 0.85;
                s.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            " class="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-md text-[#0A2640] border border-slate-200 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all hover:bg-[#0A2640] hover:text-white hover:scale-110 opacity-0 group-hover/slider:opacity-100 hidden md:flex">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div id="slider-container" class="nexa-slider flex gap-[24px] overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 px-0 md:px-2 w-full">
                ${data.map(prop => PropertyCard(prop, lang, formatPriceFn)).join('')}
            </div>

            <div class="flex items-center justify-center gap-6 mt-4 md:hidden">
                <button onclick="
                    const s = document.getElementById('slider-container');
                    s.scrollBy({ left: -s.clientWidth, behavior: 'smooth' });
                " class="w-12 h-12 bg-white text-[#0A2640] border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                <button onclick="
                    const s = document.getElementById('slider-container');
                    s.scrollBy({ left: s.clientWidth, behavior: 'smooth' });
                " class="w-12 h-12 bg-white text-[#0A2640] border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            
        </div>
    `;
};