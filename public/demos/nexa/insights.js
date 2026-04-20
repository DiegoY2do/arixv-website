import { siteData } from './data.js';

export const InsightsSection = (lang) => {
    const data = siteData.insights;

    return `
        <section class="w-full bg-white py-32 border-t border-slate-100 overflow-hidden">
            <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-on-scroll">
                    <div class="max-w-2xl">
                        <div class="flex items-center gap-4 mb-6">
                            <span class="w-8 h-[1px] bg-blue-600/50"></span>
                            <span class="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs">
                                ${data.tag[lang]}
                            </span>
                        </div>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A2640] tracking-tight leading-tight mb-4">
                            ${data.title[lang]}
                        </h2>
                        <p class="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                            ${data.desc[lang]}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col border-t-2 border-[#0A2640] animate-on-scroll">
                    ${data.articles.map((article, index) => `
                        <div data-blog-id="${article.id}" class="group relative py-8 lg:py-10 border-b border-slate-200 cursor-pointer transition-all duration-500 hover:bg-slate-50">
                            
                            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12 relative z-10 px-4">
                                
                                <div class="flex items-start gap-6 lg:gap-12 flex-1">
                                    <span class="text-slate-300 font-light text-3xl md:text-4xl tracking-tighter w-12 pt-1 shrink-0">
                                        0${index + 1}
                                    </span>
                                    <div class="flex flex-col">
                                        <div class="flex items-center gap-3 mb-3">
                                            <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                                                ${article.category[lang]}
                                            </span>
                                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                ${article.readTime[lang]}
                                            </span>
                                        </div>
                                        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A2640] group-hover:text-blue-600 transition-colors leading-tight max-w-3xl">
                                            ${article.title[lang]}
                                        </h3>
                                    </div>
                                </div>

                                <div class="flex items-center justify-between lg:justify-end gap-8 w-full lg:w-auto shrink-0 pl-18 lg:pl-0">
                                    
                                    <div class="hidden md:block w-48 h-32 rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 shrink-0 relative">
                                        <img src="${article.img}" alt="Article thumbnail" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out">
                                    </div>

                                    <div class="flex items-center gap-6">
                                        <span class="text-slate-400 text-sm md:text-base font-medium whitespace-nowrap">
                                            ${article.date[lang]}
                                        </span>
                                        
                                        <div class="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shrink-0">
                                            <svg class="w-5 h-5 text-slate-400 group-hover:text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-12 flex justify-center md:hidden animate-on-scroll">
                    <a href="#" class="group flex items-center gap-3 text-slate-500 font-bold uppercase tracking-widest text-xs">
                        ${data.btn[lang]}
                        <div class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </a>
                </div>

            </div>
        </section>
    `;
};