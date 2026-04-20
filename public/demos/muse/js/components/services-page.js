// js/components/services-page.js

const renderServicesCatalog = () => {
    const catalogContainer = document.getElementById('services-catalog');
    const allServices = window.siteData.services;
    
    const urlParams = new URLSearchParams(window.location.search);
    const detailId = urlParams.get('id');
    const categoryParam = urlParams.get('categoria');

    // 1. Lógica anti-imágenes rotas
    const getSafeImage = (srv) => {
        if (srv.img && srv.img.trim() !== '') return srv.img;
        const cleanCat = srv.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const fallbackImages = {
            'cabello': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000',
            'uñas': 'https://images.unsplash.com/photo-1604654894610-df490998700d?q=80&w=1000',
            'pestañas': 'https://images.unsplash.com/photo-1583001931036-64047783ad9e?q=80&w=1000'
        };
        return fallbackImages[cleanCat] || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000';
    };

    // 2. Creador de Tarjetas (Catálogo General)
    const buildCards = (servicesArray) => {
        if(servicesArray.length === 0) {
            return `<div class="col-span-full py-20 text-center"><p class="font-sans text-brand-charcoal italic">No hay servicios en esta categoría.</p></div>`;
        }

        return servicesArray.map(srv => {
            const imageUrl = getSafeImage(srv);
            
            // Lógica inteligente para el texto del precio
            const priceDisplay = srv.isVariablePrice ? `Desde $${srv.price.toLocaleString('es-MX')}` : `$${srv.price.toLocaleString('es-MX')}`;
            
            return `
            <div class="group flex flex-col h-full bg-white border border-brand-sand/30 hover:border-brand-dark/30 transition-all duration-500">
                <a href="servicios.html?id=${srv.id}" class="block w-full aspect-[4/3] overflow-hidden relative bg-brand-sand/10 cursor-pointer">
                    <div class="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img src="${imageUrl}" alt="${srv.name}" class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out">
                    <span class="absolute top-4 left-4 bg-brand-light px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-brand-dark font-medium shadow-sm z-20">
                        ${srv.category}
                    </span>
                </a>

                <div class="p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-4 gap-4">
                        <a href="servicios.html?id=${srv.id}" class="font-serif text-2xl text-brand-dark hover:text-brand-charcoal transition-colors">${srv.name}</a>
                        <span class="font-serif text-xl text-brand-dark flex-shrink-0 whitespace-nowrap">${priceDisplay}</span>
                    </div>
                    <p class="font-sans font-light text-sm text-brand-charcoal/80 leading-relaxed mb-8">
                        ${srv.description}
                    </p>
                    <div class="mt-auto flex justify-between items-center border-t border-brand-sand/30 pt-6">
                        <span class="font-sans text-xs uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            ${srv.duration} min
                        </span>
                        <a href="servicios.html?id=${srv.id}" class="font-sans text-xs uppercase tracking-[0.2em] text-brand-dark flex items-center gap-2 group/link focus:outline-none">
                            <span class="font-semibold group-hover/link:text-brand-charcoal transition-colors duration-300">Ver Detalles</span>
                            <span class="w-4 h-[1px] bg-brand-dark group-hover/link:w-8 transition-all duration-300"></span>
                        </a>
                    </div>
                </div>
            </div>
        `}).join('');
    };

    // 3. Encontramos el contenedor de los filtros en tu HTML
    const filterContainer = document.querySelector('.filter-btn')?.closest('.flex'); 

    // 4. INYECCIÓN DE LA VISTA DE DETALLE POR ENCIMA DEL CATÁLOGO
    if (detailId) {
        const service = allServices.find(s => s.id === detailId);
        if (service) {
            const imageUrl = getSafeImage(service);
            
            // Lógica inteligente para el precio en la vista de detalle
            const priceDisplay = service.isVariablePrice ? `Desde $${service.price.toLocaleString('es-MX')}` : `$${service.price.toLocaleString('es-MX')}`;
            
            // Generación dinámica del Botón Principal (WhatsApp vs Reserva)
            let actionButtonHTML = '';
            if (service.isVariablePrice) {
                const waMsg = encodeURIComponent(`Hola MUSE, me gustaría cotizar el servicio de ${service.name}.`);
                // NOTA: Reemplaza "525512345678" por el número de WhatsApp real del estudio
                actionButtonHTML = `
                    <a href="https://wa.me/525512345678?text=${waMsg}" target="_blank"
                       class="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white text-center px-10 py-5 text-sm font-sans uppercase tracking-[0.2em] hover:bg-[#1DA851] hover:scale-[1.02] transition-all duration-300 shadow-lg w-full sm:w-auto">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        Cotizar por WhatsApp
                    </a>
                `;
            } else {
                actionButtonHTML = `
                    <a href="reserva.html?categoria=${service.category}&servicio=${service.id}" 
                       class="inline-block bg-brand-dark text-brand-light text-center px-10 py-5 text-sm font-sans uppercase tracking-[0.2em] hover:bg-brand-dark/90 hover:scale-[1.02] transition-all duration-300 shadow-lg w-full sm:w-auto">
                        Agendar este servicio
                    </a>
                `;
            }

            const detailWrapper = document.createElement('div');
            detailWrapper.id = 'service-detail-view';
            detailWrapper.className = 'w-full animate-fade-in mb-24';
            
            detailWrapper.innerHTML = `
                <div class="mb-10">
                    <a href="servicios.html" class="font-sans text-xs uppercase tracking-[0.2em] text-brand-charcoal hover:text-brand-dark flex items-center gap-3 transition-colors duration-300">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver al catálogo
                    </a>
                </div>

                <div class="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center border-b border-brand-sand/30 pb-20">
                    
                    <div class="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto">
                        <div class="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden relative rounded-sm shadow-sm">
                            <img src="${imageUrl}" alt="${service.name}" class="w-full h-full object-cover">
                            <div class="absolute top-6 left-6 bg-brand-light/90 backdrop-blur-sm px-4 py-2 font-sans text-xs uppercase tracking-widest text-brand-dark">
                                ${service.category}
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                        <h1 class="font-serif text-4xl lg:text-5xl text-brand-dark mb-6">${service.name}</h1>
                        
                        <div class="flex items-center justify-center lg:justify-start gap-6 md:gap-8 mb-8 pb-8 border-b border-brand-sand/40">
                            <span class="font-serif text-3xl text-brand-dark">${priceDisplay}</span>
                            <div class="w-px h-8 bg-brand-sand/50"></div>
                            <span class="font-sans text-xs md:text-sm tracking-widest text-brand-charcoal uppercase flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Duración: ${service.duration} min
                            </span>
                        </div>
                        
                        <p class="font-sans font-light text-brand-charcoal leading-loose text-base lg:text-lg mb-12 max-w-2xl mx-auto lg:mx-0">
                            ${service.description}
                        </p>
                        
                        <div class="flex justify-center lg:justify-start">
                            ${actionButtonHTML}
                        </div>
                    </div>
                </div>
            `;
            
            if (filterContainer) {
                filterContainer.parentNode.insertBefore(detailWrapper, filterContainer);
            }
        }
    }

    // 5. LÓGICA DEL CATÁLOGO INFERIOR (Filtros y Cuadrícula intactos)
    if (filterContainer) filterContainer.style.display = 'flex'; 
    catalogContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const applyFilter = (filterValue) => {
        filterButtons.forEach(b => {
            if (b.dataset.filter === filterValue || (filterValue === 'all' && b.dataset.filter === 'all')) {
                b.classList.add('active', 'border-brand-dark', 'text-brand-dark');
                b.classList.remove('border-transparent', 'text-brand-charcoal');
            } else {
                b.classList.remove('active', 'border-brand-dark', 'text-brand-dark');
                b.classList.add('border-transparent', 'text-brand-charcoal');
            }
        });

        if (filterValue === 'all') {
            catalogContainer.innerHTML = buildCards(allServices);
        } else {
            const filtered = allServices.filter(srv => srv.category === filterValue);
            catalogContainer.innerHTML = buildCards(filtered);
        }
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = e.target.dataset.filter;
            
            const detailView = document.getElementById('service-detail-view');
            if (detailView) {
                detailView.style.display = 'none';
                window.history.pushState({}, '', window.location.pathname + '?categoria=' + filterValue);
            }

            catalogContainer.style.opacity = '0';
            setTimeout(() => { 
                applyFilter(filterValue); 
                catalogContainer.style.opacity = '1'; 
            }, 300);
            catalogContainer.classList.add('transition-opacity', 'duration-300');
        });
    });

    // 6. ¿Qué mostramos en la parte de abajo al cargar la página?
    if (detailId) {
        const service = allServices.find(s => s.id === detailId);
        applyFilter(service ? service.category : 'all');
    } else if (categoryParam) {
        applyFilter(categoryParam);
    } else {
        applyFilter('all');
    }
};