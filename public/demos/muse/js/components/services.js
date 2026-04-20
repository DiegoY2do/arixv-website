// js/components/services.js
const renderServices = () => {
    const servicesSection = document.getElementById('services');
    
    // MAGIA: Tomamos solo los 3 primeros servicios del arreglo
    const topServices = window.siteData.services.slice(0, 3);

    const servicesHTML = topServices.map((service, index) => {
        const isEven = index % 2 === 0;
        
        return `
            <div class="flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16 mb-16 lg:mb-24 last:mb-0 group">
                <div class="w-full md:w-3/4 lg:w-1/2 mx-auto lg:mx-0 relative overflow-hidden">
                    <div class="aspect-[4/5] lg:aspect-[4/3] overflow-hidden rounded-sm relative">
                        <div class="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                        <img src="${service.img}" alt="${service.name}" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000 ease-out">
                    </div>
                    <span class="absolute -bottom-4 ${isEven ? '-right-2' : '-left-2'} font-serif text-6xl lg:text-8xl text-brand-sand/20 select-none">
                        0${index + 1}
                    </span>
                </div>

                <div class="w-full md:w-3/4 lg:w-1/2 mx-auto lg:mx-0 flex flex-col ${isEven ? 'items-center lg:items-start' : 'items-center lg:items-end'} text-center ${isEven ? 'lg:text-left' : 'lg:text-right'} mt-6 lg:mt-0">
                    <p class="font-sans text-brand-charcoal uppercase tracking-[0.3em] text-xs mb-3">${service.category}</p>
                    <h3 class="font-serif text-3xl md:text-4xl text-brand-dark mb-4 leading-tight">${service.name}</h3>
                    <p class="font-sans text-brand-charcoal font-light leading-relaxed mb-6 max-w-sm text-sm md:text-base">${service.description}</p>
                    
                    <a href="servicios.html?id=${service.id}" class="group/btn relative inline-block py-3 overflow-hidden">
                        <span class="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-brand-dark group-hover/btn:text-brand-light transition-colors duration-500 px-6">Ver detalles</span>
                        <div class="absolute inset-0 w-0 bg-brand-dark group-hover/btn:w-full transition-all duration-500 ease-in-out"></div>
                        <div class="absolute bottom-0 left-0 w-full h-[1px] bg-brand-dark"></div>
                    </a>
                </div>
            </div>
        `;
    }).join('');

    servicesSection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full">
            <div class="mb-16 lg:mb-24 text-center flex flex-col items-center pt-8">
                <p class="font-sans text-brand-charcoal uppercase tracking-[0.2em] text-xs md:text-sm mb-4">Nuestra Experiencia</p>
                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6">Servicios Destacados</h2>
                <div class="w-16 h-[1px] bg-brand-charcoal mb-6"></div>
                <p class="font-sans font-light text-brand-charcoal max-w-md text-sm md:text-base">Cuidado integral diseñado para resaltar tu belleza natural con técnicas de vanguardia.</p>
            </div>

            <div class="flex flex-col">
                ${servicesHTML}
            </div>

            <!-- NUEVO BOTÓN PARA VER EL CATÁLOGO COMPLETO -->
            <div class="mt-20 text-center flex justify-center">
                <a href="servicios.html" class="inline-block border border-brand-dark text-brand-dark px-12 py-5 text-sm font-sans uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-light transition-all duration-300 shadow-sm hover:shadow-md">
                    Ver todos los servicios
                </a>
            </div>
        </div>
    `;
};