// js/components/location.js
const renderLocation = () => {
    const locationSection = document.getElementById('location');
    const data = window.siteData.location;
    const contactData = window.siteData.contact;

    const hoursHTML = data.hours.map(schedule => `
        <div class="flex justify-between items-center py-3 border-b border-brand-charcoal/20 last:border-0">
            <span class="font-sans text-brand-dark text-sm md:text-base">${schedule.days}</span>
            <span class="font-sans text-brand-charcoal font-light text-sm md:text-base">${schedule.time}</span>
        </div>
    `).join('');

    locationSection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div class="w-full lg:w-1/2 flex flex-col">
                <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">Encuéntranos</p>
                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-12">${data.title}</h2>
                
                <div class="flex flex-col gap-12">
                    <div>
                        <h4 class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-4">Dirección</h4>
                        <p class="font-serif text-2xl text-brand-dark mb-6 max-w-sm leading-snug">
                            ${data.address}
                        </p>
                        <a href="${data.mapLink}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-brand-dark transition-all">
                            <span class="w-8 h-[1px] bg-brand-dark group-hover:w-12 transition-all duration-300 ease-in-out"></span>
                            <span class="opacity-70 group-hover:opacity-100 transition-opacity duration-300">Abrir en App de Mapas</span>
                        </a>
                    </div>
                    
                    <div>
                        <h4 class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-4">Horarios de Atención</h4>
                        <div class="flex flex-col max-w-sm">
                            ${hoursHTML}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-4">Contacto</h4>
                        <div class="flex flex-col gap-2">
                            <a href="https://api.whatsapp.com/send/?phone=525621434770&text=Hola%2C+quiero+desarrollar+un+proyecto+web+y+me+interesa+conocer+su+proceso%2C+tiempos+y+costos.&type=phone_number&app_absent=0" target="_blank" class="font-sans text-brand-dark text-base hover:opacity-70 transition-opacity duration-300 w-fit">
                                ${contactData.phone}
                            </a>
                            <a href="mailto:${contactData.email}" class="font-sans text-brand-dark text-base hover:opacity-70 transition-opacity duration-300 w-fit">
                                ${contactData.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div class="w-full max-w-xl aspect-square lg:aspect-[4/5] relative shadow-2xl overflow-hidden bg-brand-sand/10 border border-brand-sand/30">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.9300174621144!2d-99.19775956439233!3d19.43105896025233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d202018dd4f7dd%3A0xb178536ecf28eede!2sAv.%20Pdte.%20Masaryk%2C%20Polanco%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1776639584687!5m2!1ses-419!2smx" 
                        class="absolute inset-0 w-full h-full grayscale-[50%] contrast-[1.1] brightness-[0.95] border-0" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>

        </div>
    `;
};
