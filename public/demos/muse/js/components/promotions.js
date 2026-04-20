// js/components/promotions.js
const renderPromotions = () => {
    const promoSection = document.getElementById('promotions');
    const promosData = window.siteData.promotions;

    const cardsHTML = promosData.map(promo => `
        <div class="relative group border border-brand-sand/20 bg-brand-dark p-10 md:p-14 hover:border-brand-sand/50 transition-colors duration-500 flex flex-col h-full overflow-hidden">
            
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-brand-sand/5 rounded-full blur-3xl group-hover:bg-brand-sand/10 transition-colors duration-700 pointer-events-none"></div>

            <p class="font-sans text-brand-sand uppercase tracking-[0.3em] text-xs mb-4">
                ${promo.subtitle}
            </p>
            <h3 class="font-serif text-3xl md:text-4xl text-brand-light mb-6">
                ${promo.title}
            </h3>
            <p class="font-sans text-brand-light/70 font-light leading-relaxed mb-10 text-sm md:text-base">
                ${promo.description}
            </p>
            
            <ul class="mb-12 space-y-4 flex-grow">
                ${promo.features.map(feature => `
                    <li class="flex items-start gap-4">
                        <span class="text-brand-sand mt-1">
                            <svg class="w-4 h-4 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 12l1.5 1.5 6-6m2 2l6-6"></path>
                            </svg>
                        </span>
                        <span class="font-sans text-brand-light/90 text-sm font-light">${feature}</span>
                    </li>
                `).join('')}
            </ul>
            
            <div class="flex items-center justify-between border-t border-brand-sand/20 pt-8 mt-auto">
                <span class="font-serif text-3xl text-brand-light">${promo.price}</span>
                <a href="reserva.html?ritual=ritual-muse" class="font-sans text-xs uppercase tracking-widest text-brand-sand hover:text-brand-light transition-colors duration-300 flex items-center gap-2">
                    Reservar Ritual
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </a>
            </div>
        </div>
    `).join('');

    promoSection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full">
            
            <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-24">
                <div class="w-full md:w-1/2 text-center md:text-left">
                    <p class="font-sans text-brand-sand uppercase tracking-[0.2em] text-sm mb-4">Experiencias</p>
                    <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-light">Rituales <br/> Exclusivos</h2>
                </div>
                <div class="w-full md:w-1/2 flex justify-center md:justify-end">
                    <p class="font-sans text-brand-light/70 font-light max-w-sm text-center md:text-right text-sm">
                        Diseñados para ofrecerte una pausa en tu rutina y resaltar tu belleza en una sola sesión.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                ${cardsHTML}
            </div>
            
        </div>
    `;
};