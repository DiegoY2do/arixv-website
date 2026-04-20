import { siteData, propertiesData } from './data.js';

export const ServicesSection = (lang) => {
    const data = siteData.services;

    return `
        <section class="w-full bg-slate-50 py-32">
            <div class="max-w-7xl mx-auto px-6">
                
                <div class="text-center mb-20 animate-on-scroll">
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

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
                    ${data.list.map((srv, index) => `
                        <div class="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-100 transition-all duration-500 transform hover:-translate-y-2 group">
                            
                            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${srv.icon}"></path>
                                </svg>
                            </div>
                            
                            <h3 class="text-2xl font-bold text-[#0A2640] mb-4">${srv.title[lang]}</h3>
                            
                            <p class="text-slate-500 leading-relaxed">
                                ${srv.desc[lang]}
                            </p>
                            
                            <div class="mt-8 pt-6 border-t border-slate-50">
                                <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+quiero+desarrollar+un+proyecto+web+y+me+interesa+conocer+su+proceso%2C+tiempos+y+costos.&type=phone_number&app_absent=0" target="_blank" class="inline-flex items-center gap-2 text-sm font-bold text-[#0A2640] hover:text-blue-600 transition-colors">
                                    ${lang === 'es' ? 'Ponte en contacto' : 'Get in touch'}
                                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </div>
                            
                        </div>
                    `).join('')}
                </div>

            </div>
        </section>
    `;
};