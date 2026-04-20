import { siteData } from './data.js';

export const BlogDetail = (id, lang) => {
    // 1. Buscamos el artículo actual
    const article = siteData.insights.articles.find(a => a.id === id);
    
    if (!article) return `<div class="py-32 text-center text-2xl font-bold text-slate-400">Artículo no encontrado</div>`;

    // 2. Buscamos los DEMÁS artículos (excluyendo el actual) para la sección inferior
    const otherArticles = siteData.insights.articles.filter(a => a.id !== id);

    // Extraemos el contenido
    const contentParagraphs = article.content ? article.content[lang] : [lang === 'es' ? 'Contenido en redacción...' : 'Content being written...'];

    return `

        <article class="bg-white pt-32 pb-12">
            
            <header class="max-w-6xl mx-auto px-6 mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-on-scroll">
                
                <div class="lg:col-span-7 order-2 lg:order-1">
                    <div class="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span class="text-blue-600">${article.category[lang]}</span>
                        <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>${article.date[lang]}</span>
                    </div>
                    
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A2640] tracking-tight leading-[1.1] mb-8">
                        ${article.title[lang]}
                    </h1>
                    
                    <div class="flex items-center gap-4 border-t border-slate-100 pt-6">
                        <div class="w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-slate-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[#0A2640] font-bold text-sm">${article.author}</span>
                            <span class="text-slate-400 text-xs font-medium">${article.readTime[lang]}</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 order-1 lg:order-2">
                    <div class="w-full aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
                        <img src="${article.img}" alt="${article.title[lang]}" class="w-full h-full object-cover">
                    </div>
                </div>
            </header>

            <div class="max-w-5xl mx-auto px-6">
                
                <div class="md:columns-2 gap-12 md:gap-16 text-lg md:text-xl font-light leading-relaxed text-slate-600 text-justify mb-16">
                    <p class="mb-8 break-inside-avoid-column first-letter:text-7xl first-letter:font-black first-letter:text-[#0A2640] first-letter:float-left first-letter:mr-4 first-letter:-mt-3 first-letter:leading-none">
                        ${contentParagraphs[0]}
                    </p>
                    ${contentParagraphs.length > 1 ? `<p class="mb-8 break-inside-avoid-column">${contentParagraphs[1]}</p>` : ''}
                </div>

                ${article.quote ? `
                <div class="my-20 py-12 border-y border-slate-200 text-center animate-on-scroll relative max-w-4xl mx-auto">
                    <span class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-blue-500">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </span>
                    <blockquote class="text-3xl md:text-4xl font-black text-[#0A2640] tracking-tight leading-tight italic">
                        "${article.quote[lang]}"
                    </blockquote>
                </div>
                ` : ''}

                <div class="md:columns-2 gap-12 md:gap-16 text-lg md:text-xl font-light leading-relaxed text-slate-600 text-justify mb-16">
                    ${contentParagraphs.slice(2).map(p => `
                        <p class="mb-8 break-inside-avoid-column">${p}</p>
                    `).join('')}
                </div>

            </div>
        </article>

        ${otherArticles.length > 0 ? `
        <section class="bg-slate-50 py-24 border-t border-slate-100">
            <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
                
                <div class="mb-12 flex items-center justify-between">
                    <h3 class="text-3xl font-black text-[#0A2640] tracking-tight">
                        ${lang === 'es' ? 'Sigue Leyendo' : 'Keep Reading'}
                    </h3>
                    <div class="h-[2px] flex-1 bg-slate-200 ml-8 hidden md:block"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${otherArticles.slice(0, 2).map(other => `
                        <div data-blog-id="${other.id}" class="group cursor-pointer flex flex-col sm:flex-row gap-6 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
                            
                            <div class="w-full sm:w-40 h-48 sm:h-auto rounded-3xl overflow-hidden shrink-0 relative">
                                <img src="${other.img}" class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out">
                            </div>
                            
                            <div class="flex flex-col justify-center py-2 pr-4">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                                        ${other.category[lang]}
                                    </span>
                                </div>
                                <h4 class="text-xl font-bold text-[#0A2640] group-hover:text-blue-600 transition-colors leading-snug mb-3">
                                    ${other.title[lang]}
                                </h4>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    ${other.readTime[lang]} 
                                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>

            </div>
        </section>
        ` : ''}
    `;
};