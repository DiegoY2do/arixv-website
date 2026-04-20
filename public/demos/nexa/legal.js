import { legalData } from './data.js';

export const LegalPage = (id, lang) => {
    const data = legalData[id];
    
    if (!data) return `<div class="py-40 text-center text-2xl font-bold text-[#0A2640]">Página no encontrada</div>`;

    // --- DISEÑO PARA FAQ (ACORDEÓN) ---
    if (id === 'faq') {
        return `
            <section class="pt-40 pb-24 bg-slate-50 min-h-[80vh]">
                <div class="max-w-3xl mx-auto px-6">
                    <div class="text-center mb-16">
                        <h1 class="text-4xl md:text-5xl font-black text-[#0A2640] mb-4 tracking-tight">${data.title[lang]}</h1>
                        <p class="text-slate-500 text-lg">${lang === 'es' ? 'Resolvemos tus dudas al instante.' : 'We solve your doubts instantly.'}</p>
                    </div>

                    <div class="flex flex-col gap-4">
                        ${data.items.map((item, i) => `
                            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                                <button class="faq-btn w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group">
                                    <span class="font-bold text-[#0A2640] group-hover:text-blue-600 transition-colors text-lg">${item.q[lang]}</span>
                                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ml-4 group-hover:bg-blue-50 transition-colors">
                                        <svg class="faq-icon w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </button>
                                <div class="faq-answer hidden px-6 pb-6 text-slate-500 font-light leading-relaxed">
                                    ${item.a[lang]}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    // --- DISEÑO PARA PRIVACIDAD Y TÉRMINOS (EDITORIAL) ---
    return `
        <section class="pt-40 pb-24 bg-white min-h-[80vh]">
            <div class="max-w-4xl mx-auto px-6">
                <div class="mb-12 pb-8 border-b border-slate-100">
                    <h1 class="text-4xl md:text-5xl font-black text-[#0A2640] mb-4 tracking-tight">${data.title[lang]}</h1>
                    <p class="text-slate-400 font-bold tracking-widest uppercase text-xs">${data.date[lang]}</p>
                </div>
                
                <div class="prose-custom text-slate-600 font-light leading-relaxed text-lg space-y-2">
                    ${data.content[lang]}
                </div>
            </div>
        </section>
    `;
};