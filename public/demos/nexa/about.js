import { siteData } from './data.js';

export const AboutSection = (lang) => {
    const data = siteData.about_method;

    return `
        <section class="max-w-[1440px] mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 overflow-hidden">
            
            <div class="w-full lg:w-1/2 relative">
                <div class="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl z-10 aspect-[4/3] md:aspect-[4/5] lg:aspect-square group">
                    <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior moderno" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000">
                    <div class="absolute inset-0 bg-[#0A2640]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div class="absolute bottom-4 right-4 md:-bottom-8 md:-right-8 lg:-bottom-12 lg:-right-12 bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 flex items-center gap-3 md:gap-4 animate-[bounce-slow_3s_ease-in-out_infinite]">
                    <div class="w-10 h-10 md:w-14 md:h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <p class="text-[#0A2640] font-black text-lg md:text-xl leading-none md:leading-normal mb-1 md:mb-0">4.9/5</p>
                        <p class="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">${lang === 'es' ? 'Calificación' : 'Rating'}</p>
                    </div>
                </div>
                
                <div class="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-70"></div>
            </div>

            <div class="w-full lg:w-1/2 flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                    <span class="w-8 h-[2px] bg-blue-600"></span>
                    <span class="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">
                        ${data.tag[lang]}
                    </span>
                </div>
                
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A2640] mb-6 leading-[1.1] tracking-tight">
                    ${data.title[lang]}
                </h2>
                
                <p class="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 max-w-lg font-light">
                    ${data.desc[lang]}
                </p>

                <div class="flex flex-col gap-8 mb-12">
                    ${data.features.map(feat => `
                        <div class="flex gap-5 md:gap-6 group/feat">
                            <div class="w-14 h-14 shrink-0 bg-slate-50 text-slate-400 border border-slate-100 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover/feat:bg-blue-600 group-hover/feat:text-white group-hover/feat:border-blue-600 transition-all duration-300 transform group-hover/feat:-translate-y-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${feat.icon}"></path></svg>
                            </div>
                            <div>
                                <h4 class="text-xl font-bold text-[#0A2640] mb-2 group-hover/feat:text-blue-600 transition-colors">${feat.title[lang]}</h4>
                                <p class="text-slate-500 leading-relaxed text-sm md:text-base max-w-sm font-light">${feat.desc[lang]}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div>
                    <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+quiero+desarrollar+un+proyecto+web+y+me+interesa+conocer+su+proceso%2C+tiempos+y+costos.&type=phone_number&app_absent=0" target="_blank" class="inline-flex items-center justify-center bg-[#0A2640] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                        ${data.btn[lang]}
                    </a>
                </div>
            </div>
            
        </section>
    `;
};