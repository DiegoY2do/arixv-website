import { siteData } from './data.js';

export const Footer = (lang) => {
    const data = siteData.footer;
    const socials = siteData.socials;

    // Reutilizamos el estilo del logo del Navbar para mantener consistencia de marca,
    // y le agregamos 'nav-link' para que actúe como un botón de "Volver arriba".
    const brandLogo = `
        <a href="#hero-root" class="nav-link inline-flex items-center gap-3 font-bold text-2xl tracking-tight group">
            <div class="bg-[#0A2640] p-2 rounded-xl transition-all">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <span class="text-[#0A2640] antialiased">${siteData.brandName[lang]}</span>
        </a>
    `;

    return `
        <footer class="w-full bg-white pt-24 pb-12 border-t border-slate-100">
            <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    
                    <div class="flex flex-col gap-6 lg:pr-8">
                        ${brandLogo}
                        <p class="text-slate-500 font-light leading-relaxed max-w-[280px] mt-2">
                            ${data.slogan[lang]}
                        </p>
                        <div class="flex gap-3 mt-4">
                            ${socials.map(social => `
                                <a href="${social.url}" target="_blank" class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all duration-300">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="${social.icon}"/></svg>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    ${data.columns.map(col => `
                        <div class="flex flex-col gap-8">
                            <h4 class="text-xs font-black uppercase tracking-[0.2em] text-blue-600">${col.title[lang]}</h4>
                            <ul class="flex flex-col gap-4">
                                ${col.links.map(link => {
                                    // Verificamos si es un link interno (#) para agregar nav-link
                                    const isInternal = link.url.startsWith('#');
                                    const linkClass = isInternal 
                                        ? 'nav-link text-slate-500 hover:text-blue-600 font-medium transition-colors' 
                                        : 'text-slate-500 hover:text-blue-600 font-medium transition-colors';
                                    
                                    return `
                                    <li>
                                        <a href="${link.url}" class="${linkClass}">
                                            ${link[lang]}
                                        </a>
                                    </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    `).join('')}

                    <div class="flex flex-col gap-8">
                        <h4 class="text-xs font-black uppercase tracking-[0.2em] text-blue-600">${data.contact.title[lang]}</h4>
                        <div class="flex flex-col gap-4">
                            <p class="text-slate-500 font-medium leading-relaxed">
                                ${data.contact.address}
                            </p>
                            <a href="mailto:${data.contact.email}" class="text-[#0A2640] font-bold hover:text-blue-600 transition-colors">
                                ${data.contact.email}
                            </a>
                        </div>
                    </div>

                </div>

                <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-slate-400 text-xs font-medium">
                        © ${new Date().getFullYear()} ${data.rights[lang]}
                    </p>
                    <div class="flex gap-6">
                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Designed by <span class="text-[#0A2640]">ARIX<span class="text-red-600">V</span></span>
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    `;
};