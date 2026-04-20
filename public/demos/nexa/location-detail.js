import { siteData, propertiesData } from './data.js';
import { PropertiesGrid } from './properties.js';

export const LocationDetail = (id, lang, formatPriceFn) => {
    const area = siteData.locations.areas.find(a => a.id === id);
    if (!area) return `<div class="py-32 text-center text-2xl font-bold text-slate-400">Zona no encontrada</div>`;

    const filteredProperties = propertiesData.filter(prop => 
        prop.address.toLowerCase().includes(area.name.toLowerCase())
    );

    const highlights = area.highlights || [];
    const gallery = area.gallery || [];
    
    const img1 = gallery[0] || area.img;
    const img2 = gallery[1] || area.img;
    const img3 = gallery[2] || area.img;

    return `
        <section class="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
            
            <button onclick="window.location.reload()" class="absolute top-4 left-4 md:top-8 md:left-8 z-50 text-slate-400 hover:text-[#0A2640] transition-colors group flex items-center gap-3 font-bold tracking-wider uppercase text-xs">
                <span class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#0A2640] group-hover:text-white group-hover:border-[#0A2640] transition-all bg-white/80 backdrop-blur-sm shadow-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                </span>
                <span class="hidden md:inline-block">${lang === 'es' ? 'Volver' : 'Back'}</span>
            </button>

            <div class="max-w-[1440px] mx-auto px-4 md:px-6">
                
                <div class="text-center max-w-3xl mx-auto pt-16 md:pt-4 mb-12">
                    <span class="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
                        ${lang === 'es' ? 'Guía de Zona' : 'Area Guide'}
                    </span>
                    <h1 class="text-5xl md:text-7xl font-black text-[#0A2640] leading-none tracking-tighter mb-6">
                        ${area.name}
                    </h1>
                    <p class="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                        ${area.desc ? area.desc[lang] : ''}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 h-[50vh] md:h-[65vh]">
                    <div class="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden group shadow-lg">
                        <img src="${area.img}" alt="${area.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    
                    <div class="hidden md:block md:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden group shadow-md">
                        <img src="${img1}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    
                    <div class="hidden md:block md:col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden group shadow-md">
                        <img src="${img2}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                    
                    <div class="md:col-span-2 md:row-span-1 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-8 group hover:bg-[#0A2640] transition-colors duration-500 cursor-default">
                        <span class="text-5xl md:text-6xl font-black text-[#0A2640] group-hover:text-white transition-colors duration-500 mb-2">
                            ${filteredProperties.length}
                        </span>
                        <span class="text-xs uppercase font-bold text-slate-400 tracking-[0.2em] group-hover:text-blue-300 transition-colors duration-500 text-center">
                            ${lang === 'es' ? 'Residencias en catálogo' : 'Residences in catalog'}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        ${highlights.length > 0 ? `
        <section class="py-24 bg-white border-t border-slate-100">
            <div class="max-w-[1440px] mx-auto px-6">
                <div class="mb-16 text-center">
                    <h2 class="text-3xl md:text-4xl font-black text-[#0A2640] tracking-tight">
                        ${lang === 'es' ? 'El Estilo de Vida' : 'The Lifestyle'}
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    ${highlights.map((hl) => `
                        <div class="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 hover:-translate-y-2 hover:shadow-lg transition-all duration-500 group">
                            <div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${hl.icon}"/></svg>
                            </div>
                            <h3 class="text-xl font-bold text-[#0A2640] mb-3">${hl.title[lang]}</h3>
                            <p class="text-slate-500 leading-relaxed font-light">${hl.text[lang]}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

<section class="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
            <div class="max-w-[1440px] mx-auto">
                
                <div class="px-6 md:px-12 lg:px-16 mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="w-full md:w-auto">
                        <span class="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                            ${lang === 'es' ? 'Colección Exclusiva' : 'Exclusive Collection'}
                        </span>
                        <h3 class="text-4xl md:text-5xl font-black text-[#0A2640] tracking-tight">
                            ${lang === 'es' ? 'Propiedades Disponibles' : 'Available Properties'}
                        </h3>
                    </div>
                    <div class="hidden md:block h-[2px] flex-1 bg-slate-200 ml-8 mb-4"></div>
                </div>

                <div class="w-full relative">
                    ${filteredProperties.length > 0 
                        ? PropertiesGrid(filteredProperties, lang, formatPriceFn)
                        : `
                        <div class="text-center py-24 bg-white rounded-[3rem] mx-6 md:mx-16 border border-slate-200 shadow-sm">
                            <svg class="w-16 h-16 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"></path></svg>
                            <p class="text-slate-500 font-medium text-xl">${lang === 'es' ? 'No hay propiedades listadas en esta zona por el momento.' : 'No properties listed in this area at the moment.'}</p>
                        </div>
                        `
                    }
                </div>
                
            </div>

            <style>
                /* Si hay una sola propiedad en el carrusel, forzamos su centrado */
                #slider-container > .carousel-card:first-child:nth-last-child(1) {
                    margin-left: auto !important;
                    margin-right: auto !important;
                }
                
                /* En pantallas móviles, ocultamos los botones flotantes del carrusel.
                   Esto evita que se encimen en la foto. El usuario hará scroll natural (swipe) */
                @media (max-width: 768px) {
                    .group\\/slider > button {
                        display: none !important;
                    }
                }
            </style>
        </section>
    `;
};