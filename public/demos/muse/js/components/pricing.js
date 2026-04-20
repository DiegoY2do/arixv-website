// js/components/pricing.js
const renderPricing = () => {
    const pricingSection = document.getElementById('pricing');
    const pricingData = window.siteData.pricing;

    const pricingHTML = pricingData.map(cat => `
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-20 last:mb-0">
            
            <div class="lg:w-1/3 relative">
                <div class="sticky top-32">
                    <h3 class="font-serif text-3xl md:text-4xl text-brand-dark mb-4">${cat.category}</h3>
                    <p class="font-sans text-xs uppercase tracking-[0.2em] text-brand-charcoal opacity-60">Servicios seleccionados</p>
                </div>
            </div>
            
            <div class="lg:w-2/3 flex flex-col gap-6 lg:gap-8 pt-2 lg:pt-0">
                ${cat.items.map(item => `
                    <div class="group flex justify-between items-end gap-4 cursor-default">
                        
                        <span class="font-sans text-brand-dark text-base md:text-lg">
                            ${item.name}
                        </span>
                        
                        <div class="flex-grow border-b border-brand-charcoal/30 border-dashed mb-1 md:mb-2 group-hover:border-brand-dark transition-colors duration-300"></div>
                        
                        <span class="font-serif text-xl md:text-2xl text-brand-dark whitespace-nowrap transform group-hover:-translate-y-1 transition-transform duration-300">
                            ${item.price}
                        </span>
                        
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    pricingSection.innerHTML = `
        <div class="max-w-5xl mx-auto w-full">
            
            <div class="text-center mb-16 md:mb-24 flex flex-col items-center">
                <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">Inversión en ti</p>
                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-8">Nuestras Tarifas</h2>
                <div class="w-16 h-[1px] bg-brand-charcoal"></div>
            </div>

            <div class="flex flex-col">
                ${pricingHTML}
            </div>
            
            <div class="mt-20 text-center">
                <p class="font-sans text-sm font-light text-brand-charcoal italic">
                    * Todos los precios son estimaciones base. El costo final puede variar según la longitud del cabello, estado actual o diseño específico solicitado en el estudio.
                </p>
            </div>
            
        </div>
    `;
};