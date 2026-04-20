import { siteData } from './data.js';

export const TestimonialsSection = (lang) => {
    const data = siteData.testimonials;

    return `
        <section class="w-full bg-white py-32 border-y border-slate-100 overflow-hidden">
            
            <div class="max-w-7xl mx-auto px-6">
                
                <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                    
                    <div class="w-full lg:w-5/12 animate-on-scroll">
                        <span class="flex items-center gap-3 text-blue-600 font-extrabold uppercase tracking-widest text-xs mb-6">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ${data.tag[lang]}
                        </span>
                        <h2 class="text-5xl md:text-6xl font-bold text-[#0A2640] mb-6 leading-[1.1] tracking-tight">
                            ${data.title[lang]}
                        </h2>
                        <p class="text-slate-500 text-lg leading-relaxed mb-10 max-w-md">
                            ${lang === 'es' ? 'No tomes solo nuestra palabra. Escucha las experiencias de quienes ya aseguraron su patrimonio con nosotros.' : 'Don\'t just take our word for it. Hear the experiences of those who have already secured their assets with us.'}
                        </p>
                        
                        <div class="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 max-w-sm">
                            <div class="text-4xl font-black text-[#0A2640]">98%</div>
                            <div class="text-sm font-bold text-slate-500 leading-snug">
                                ${lang === 'es' ? 'De clientes nos recomiendan a familiares y amigos.' : 'Of clients recommend us to family and friends.'}
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-7/12 relative animate-on-scroll">
                        <div class="absolute -top-10 -right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 z-0"></div>

                        <div class="relative z-10 flex flex-col gap-6 md:gap-8">
                            ${data.list.map((t, index) => `
                                <div class="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 flex flex-col gap-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] relative ${index === 1 ? 'md:ml-16' : 'md:mr-16 z-20' }">
                                    
                                    <svg class="absolute top-8 right-8 w-16 h-16 text-slate-50 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>

                                    <div class="flex gap-1 text-yellow-400 relative z-10">
                                        ${Array(t.stars).fill('<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>').join('')}
                                    </div>
                                    
                                    <p class="text-[#0A2640] font-medium text-lg md:text-xl leading-relaxed relative z-10">
                                        "${t.text[lang]}"
                                    </p>
                                    
                                    <div class="flex items-center gap-4 mt-2 border-t border-slate-100 pt-6 relative z-10">
                                        <img src="${t.avatar}" class="w-12 h-12 rounded-full object-cover shadow-sm">
                                        <div>
                                            <h4 class="font-extrabold text-[#0A2640] tracking-tight">${t.name}</h4>
                                            <p class="text-blue-600 text-xs font-bold uppercase tracking-wider">${t.role[lang]}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};