import { siteData } from './data.js';

export const Navbar = (lang, currency) => {
    const sectionIds = [
        'hero-root',        // Inicio
        'catalog-section',  // Colección (Propiedades destacadas)
        'locations-root',   // Zonas
        'services-root',    // Servicios
        'insights-root'     // Insights (Blog)
    ];

    const linksHtmlDesktop = siteData.navbar.links.map((link, i) => 
        `<a href="#${sectionIds[i]}" class="nav-link hover:text-white transition-colors duration-200">${link[lang]}</a>`
    ).join('');

    // Ajuste de tipografía móvil: más pequeña, espaciada y en mayúsculas
    const linksHtmlMobile = siteData.navbar.links.map((link, i) => 
        `<a href="#${sectionIds[i]}" class="nav-link-mobile text-2xl font-light uppercase tracking-widest hover:text-gray-300 transition">${link[lang]}</a>`
    ).join('');

    const socialsHtml = siteData.socials.map(social => `
        <a href="${social.url}" target="_blank" class="text-white/50 hover:text-white transition-all duration-300 hover:scale-110">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="${social.icon}"/></svg>
        </a>
    `).join('');

    const brandLogo = `
        <a href="#hero-root" class="nav-link flex items-center gap-3 font-bold text-xl tracking-tight group shrink-0">
            <div class="bg-white/10 group-hover:bg-white/20 p-2 rounded-xl transition-all border border-white/10">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <span class="text-white antialiased">${siteData.brandName[lang]}</span>
        </a>
    `;

    return `
        <nav id="main-nav" class="fixed w-full top-0 z-[100] bg-[#0A2640]/90 backdrop-blur-md text-white border-b border-white/10 transition-transform duration-300 ease-in-out">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
                
                ${brandLogo}
                
                <div class="hidden lg:flex gap-8 text-sm font-medium text-white/70">
                    ${linksHtmlDesktop}
                </div>

                <div class="flex items-center gap-4">
                    <div class="hidden lg:flex items-center gap-4">
                        <div class="relative group">
                            <button class="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all">
                                <span class="uppercase">${lang}</span>
                                <span class="text-white/30">|</span>
                                <span class="uppercase">${currency}</span>
                                <svg class="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            
                            <div class="absolute right-0 mt-2 w-48 bg-[#0A2640] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-[110]">
                                <div class="p-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">${lang === 'es' ? 'Idioma' : 'Language'}</div>
                                <div class="flex gap-1 mb-2 text-center">
                                    <button data-lang="es" class="flex-1 py-2 rounded-lg text-xs ${lang === 'es' ? 'bg-white text-[#0A2640] font-bold' : 'hover:bg-white/5'} transition">ES</button>
                                    <button data-lang="en" class="flex-1 py-2 rounded-lg text-xs ${lang === 'en' ? 'bg-white text-[#0A2640] font-bold' : 'hover:bg-white/5'} transition">EN</button>
                                </div>
                                <div class="p-2 text-[10px] uppercase tracking-widest text-white/40 font-bold">${lang === 'es' ? 'Moneda' : 'Currency'}</div>
                                <div class="flex gap-1 text-center">
                                    <button data-currency="mxn" class="flex-1 py-2 rounded-lg text-xs ${currency === 'mxn' ? 'bg-white text-[#0A2640] font-bold' : 'hover:bg-white/5'} transition">MXN</button>
                                    <button data-currency="usd" class="flex-1 py-2 rounded-lg text-xs ${currency === 'usd' ? 'bg-white text-[#0A2640] font-bold' : 'hover:bg-white/5'} transition">USD</button>
                                </div>
                            </div>
                        </div>
                                            
                        <div class="hidden lg:flex items-center gap-4 border-l border-white/10 pl-4 ml-2">
                            ${socialsHtml}
                        </div>
                    </div>

                    <button id="btn-menu-toggle" class="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
        </nav>

        <div id="mobile-menu" class="fixed inset-0 z-[110] bg-[#0A2640] translate-x-full transition-transform duration-500 lg:hidden flex flex-col">
            <div class="px-6 py-4 flex justify-between items-center border-b border-white/10">
                ${brandLogo}
                <button id="btn-menu-close" class="p-2 text-white hover:bg-white/10 rounded-full transition">
                    <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center gap-10 p-6 text-white text-center">
                <div class="flex flex-col gap-8">
                    ${linksHtmlMobile}
                </div>
                
                <div class="w-full max-w-[300px] h-px bg-white/10 my-4"></div>

                <div class="flex justify-center gap-10">
                    ${socialsHtml.replace(/w-5 h-5/g, 'w-8 h-8')} 
                </div>

                <div class="w-full max-w-[300px] space-y-4">
                    <div class="flex bg-white/5 rounded-full p-1 border border-white/10">
                        <button data-lang="es" class="flex-1 py-3 rounded-full ${lang === 'es' ? 'bg-white text-[#0A2640] font-bold shadow-lg' : 'text-white/50'} transition">ES</button>
                        <button data-lang="en" class="flex-1 py-3 rounded-full ${lang === 'en' ? 'bg-white text-[#0A2640] font-bold shadow-lg' : 'text-white/50'} transition">EN</button>
                    </div>
                    <div class="flex bg-white/5 rounded-full p-1 border border-white/10">
                        <button data-currency="mxn" class="flex-1 py-3 rounded-full ${currency === 'mxn' ? 'bg-white text-[#0A2640] font-bold shadow-lg' : 'text-white/50'} transition">MXN</button>
                        <button data-currency="usd" class="flex-1 py-3 rounded-full ${currency === 'usd' ? 'bg-white text-[#0A2640] font-bold shadow-lg' : 'text-white/50'} transition">USD</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};