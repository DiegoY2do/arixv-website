import { siteData } from './data.js';

export const Hero = (lang) => {
    const data = siteData.hero;

    return `
        <section class="relative w-full h-[85vh] min-h-[680px] lg:min-h-[600px] flex items-center justify-center mb-36 lg:mb-24">
            
            <div class="absolute inset-0 z-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" alt="Luxury Real Estate" class="w-full h-full object-cover object-center scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]">
                <div class="absolute inset-0 bg-gradient-to-r from-[#0A2640]/90 via-[#0A2640]/50 to-transparent"></div>
            </div>

            <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pt-16 pb-40 lg:pb-16">
                
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-8 lg:mb-10 max-w-4xl drop-shadow-lg animate-on-scroll">
                    ${data.title[lang]}
                </h1>
                
                <div class="flex animate-on-scroll">
                    <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+quiero+desarrollar+un+proyecto+web+y+me+interesa+conocer+su+proceso%2C+tiempos+y+costos.&type=phone_number&app_absent=0" target="_blank" class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 backdrop-blur-sm overflow-hidden">
                        <span class="relative z-10 tracking-widest text-sm uppercase">${data.btn[lang]}</span>
                        <div class="absolute inset-0 h-full w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-[200%] -skew-x-12 -ml-20 transition-all duration-700 ease-out"></div>
                    </a>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full px-6 flex justify-center z-[50] translate-y-1/2">
                <div id="search-root" class="w-full max-w-6xl"></div>
            </div>

        </section>
    `;
};

