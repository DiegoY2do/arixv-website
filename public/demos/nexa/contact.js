import { siteData } from './data.js';

export const ContactSection = (lang) => {
    const data = siteData.contact;

    return `
        <section class="w-full bg-[#0A2640] py-24 overflow-hidden">
            <div class="max-w-7xl mx-auto px-6">
                
                <div class="flex flex-col lg:flex-row gap-16 items-center">
                    
                    <div class="w-full lg:w-1/2 animate-on-scroll">
                        <span class="text-blue-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-6 block">
                            ${data.tag[lang]}
                        </span>
                        <h2 class="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                            ${data.title[lang]}
                        </h2>
                        <p class="text-slate-400 text-lg leading-relaxed mb-12 max-w-md">
                            ${data.desc[lang]}
                        </p>

                        <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+quiero+desarrollar+un+proyecto+web+y+me+interesa+conocer+su+proceso%2C+tiempos+y+costos.&type=phone_number&app_absent=0" target="_blank" 
                        class="group inline-flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-3 pr-10 rounded-[2rem] transition-all duration-500">
                            <div class="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="${siteData.socials.find(s => s.name === 'WhatsApp').icon}"></path>
                                </svg>
                            </div>
                            <div class="flex flex-col text-left">
                                <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">${data.whatsapp.label[lang]}</span>
                                <span class="text-white font-bold text-lg tracking-tight">${data.whatsapp.text[lang]}</span>
                            </div>
                        </a>
                    </div>

                    <div class="w-full lg:w-1/2 animate-on-scroll">
                        <form class="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col gap-6">
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex flex-col gap-2">
                                    <label class="text-xs font-black uppercase tracking-widest text-[#0A2640] ml-2">${data.form.name[lang]}</label>
                                    <input type="text" placeholder="John Doe" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="text-xs font-black uppercase tracking-widest text-[#0A2640] ml-2">${data.form.phone[lang]}</label>
                                    <input type="tel" placeholder="+52 ..." class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all">
                                </div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-black uppercase tracking-widest text-[#0A2640] ml-2">${data.form.email[lang]}</label>
                                <input type="email" placeholder="john@example.com" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all">
                            </div>

                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-black uppercase tracking-widest text-[#0A2640] ml-2">${data.form.message[lang]}</label>
                                <textarea rows="3" placeholder="..." class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"></textarea>
                            </div>

                            <button type="submit" class="w-full bg-blue-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-[#0A2640] transition-colors shadow-xl shadow-blue-600/20">
                                ${data.form.btn[lang]}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    `;
};