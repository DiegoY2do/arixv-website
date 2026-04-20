// js/components/booking-logic.js

// 1. Estado Central de la Reserva
const bookingState = {
    step: 1,
    selectedServices: [], 
    specialistsPerService: {}, 
    date: null,
    time: null,
    client: { name: '', phone: '', email: '', notes: '' },
    actualAssignments: {},
    appliedPromo: null // <-- NUEVO: Guarda si hay un descuento de paquete activo
};

// Funciones globales para alertas
const showCustomAlert = (message) => {
    const modal = document.getElementById('alert-modal');
    const content = document.getElementById('alert-modal-content');
    document.getElementById('alert-modal-text').textContent = message;
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); }, 10);
};

const hideCustomAlert = () => {
    const modal = document.getElementById('alert-modal');
    const content = document.getElementById('alert-modal-content');
    modal.classList.add('opacity-0'); content.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
};

// 2. Función Principal de Renderizado
const renderBookingApp = () => {
    const container = document.getElementById('booking-container');
    const data = window.siteData;

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <div class="w-full lg:w-2/3">
                <form id="booking-wizard" class="flex flex-col relative min-h-[500px]">
                    
                    <div class="flex items-center justify-between border-b border-brand-sand/30 pb-6 mb-12 relative overflow-x-auto scrollbar-hide">
                        <div class="absolute bottom-[-1px] left-0 h-[1px] bg-brand-dark transition-all duration-500 ease-in-out" id="progress-bar" style="width: 25%;"></div>
                        <button type="button" class="step-nav active font-sans text-xs uppercase tracking-widest text-brand-dark flex-shrink-0 mr-6" data-step="1">01. Servicios</button>
                        <button type="button" class="step-nav font-sans text-xs uppercase tracking-widest text-brand-charcoal/50 flex-shrink-0 mr-6 transition-colors duration-300 cursor-not-allowed" data-step="2" disabled>02. Especialistas</button>
                        <button type="button" class="step-nav font-sans text-xs uppercase tracking-widest text-brand-charcoal/50 flex-shrink-0 mr-6 transition-colors duration-300 cursor-not-allowed" data-step="3" disabled>03. Fecha</button>
                        <button type="button" class="step-nav font-sans text-xs uppercase tracking-widest text-brand-charcoal/50 flex-shrink-0 transition-colors duration-300 cursor-not-allowed" data-step="4" disabled>04. Datos</button>
                    </div>

                    <div id="steps-container" class="relative overflow-hidden">
                        
                        <div id="step-1" class="step-view w-full opacity-100 transition-opacity duration-300">
                            <!-- Banner VIP -->
                            <div id="ritual-message-container" class="hidden mb-6 p-4 bg-brand-sand/10 border-l-2 border-brand-dark">
                                <p class="font-sans text-sm text-brand-dark">
                                    <span class="font-bold uppercase tracking-widest text-xs mr-2">Paquete VIP Aplicado:</span> 
                                    <span id="ritual-name-display" class="font-serif italic font-medium"></span>.
                                    <span class="block text-xs text-brand-charcoal mt-1">Si desmarcas un servicio del paquete, se cobrarán los precios individuales regulares.</span>
                                </p>
                            </div>

                            <h3 id="step-1-title" class="font-serif text-3xl text-brand-dark mb-8">¿Qué servicios deseas hoy?</h3>
                            
                            <div id="services-list" class="flex flex-col gap-4"></div>
                            
                            <div id="show-all-services-container" class="hidden mt-6 text-center">
                                <button type="button" id="btn-show-all" class="font-sans text-xs uppercase tracking-widest text-brand-charcoal hover:text-brand-dark border-b border-brand-charcoal hover:border-brand-dark pb-1 transition-all focus:outline-none">
                                    + Agregar servicios de otras categorías
                                </button>
                            </div>
                            
                            <div class="mt-12 flex justify-end pt-8 border-t border-brand-sand/30">
                                <button type="button" class="btn-next border border-brand-dark px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-light transition-all duration-300 focus:outline-none" data-target="2">Continuar</button>
                            </div>
                        </div>

                        <div id="step-2" class="step-view hidden w-full opacity-0 transition-opacity duration-300">
                            <h3 class="font-serif text-3xl text-brand-dark mb-8">Tus especialistas</h3>
                            <p class="font-sans text-sm text-brand-charcoal mb-8">Selecciona quién quieres que realice cada servicio.</p>
                            <div id="specialists-dynamic-list" class="flex flex-col gap-10"></div>
                            <div class="mt-12 flex justify-between items-center border-t border-brand-sand/30 pt-8">
                                <button type="button" class="btn-prev text-brand-charcoal text-xs font-sans uppercase tracking-[0.2em] hover:text-brand-dark transition-colors focus:outline-none" data-target="1">Volver</button>
                                <button type="button" class="btn-next border border-brand-dark px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-light transition-all duration-300 focus:outline-none" data-target="3">Continuar</button>
                            </div>
                        </div>

                        <div id="step-3" class="step-view hidden w-full opacity-0 transition-opacity duration-300">
                            <h3 class="font-serif text-3xl text-brand-dark mb-8">Selecciona tu horario</h3>
                            <div class="flex flex-col gap-10">
                                <div class="relative group border-b border-brand-sand/50 pb-8">
                                    <label class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-4 block">Fecha de la sesión</label>
                                    <input type="text" id="booking-date" class="w-full bg-transparent py-4 font-serif text-2xl text-brand-dark focus:outline-none cursor-pointer placeholder-brand-charcoal/30 border-none rounded-none shadow-none" placeholder="Elige un día en el calendario..." readonly>
                                </div>
                                <div>
                                    <label class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-6 block">Horarios disponibles</label>
                                    <div id="time-slots-container" class="grid grid-cols-3 md:grid-cols-4 gap-4 opacity-50 pointer-events-none transition-opacity duration-300">
                                        <p class="col-span-full font-sans text-sm text-brand-charcoal py-4 italic">Selecciona una fecha para ver disponibilidad</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-12 flex justify-between items-center border-t border-brand-sand/30 pt-8">
                                <button type="button" class="btn-prev text-brand-charcoal text-xs font-sans uppercase tracking-[0.2em] hover:text-brand-dark transition-colors focus:outline-none" data-target="2">Volver</button>
                                <button type="button" class="btn-next border border-brand-dark px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-light transition-all duration-300 focus:outline-none" data-target="4">Continuar</button>
                            </div>
                        </div>
                        
                        <div id="step-4" class="step-view hidden w-full opacity-0 transition-opacity duration-300">
                            <h3 class="font-serif text-3xl text-brand-dark mb-8">Tus detalles</h3>
                            <div class="flex flex-col gap-8 pt-4">
                                <div class="relative group">
                                    <input type="text" id="client-name" required class="w-full bg-transparent border-b border-brand-charcoal/30 py-3 font-sans text-brand-dark focus:outline-none focus:border-brand-dark transition-colors peer" placeholder=" ">
                                    <label for="client-name" class="absolute left-0 top-3 font-sans text-brand-charcoal/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-dark peer-valid:-top-4 peer-valid:text-xs peer-valid:text-brand-dark cursor-text">Nombre completo *</label>
                                </div>
                                <div class="relative group">
                                    <input type="email" id="client-email" required class="w-full bg-transparent border-b border-brand-charcoal/30 py-3 font-sans text-brand-dark focus:outline-none focus:border-brand-dark transition-colors peer" placeholder=" ">
                                    <label for="client-email" class="absolute left-0 top-3 font-sans text-brand-charcoal/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-dark peer-valid:-top-4 peer-valid:text-xs peer-valid:text-brand-dark cursor-text">Correo electrónico *</label>
                                </div>
                                <div class="relative group">
                                    <input type="tel" id="client-phone" required class="w-full bg-transparent border-b border-brand-charcoal/30 py-3 font-sans text-brand-dark focus:outline-none focus:border-brand-dark transition-colors peer" placeholder=" ">
                                    <label for="client-phone" class="absolute left-0 top-3 font-sans text-brand-charcoal/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-dark peer-valid:-top-4 peer-valid:text-xs peer-valid:text-brand-dark cursor-text">Teléfono / WhatsApp *</label>
                                </div>
                                <div class="relative group mt-4">
                                    <textarea id="client-notes" rows="2" class="w-full bg-transparent border-b border-brand-charcoal/30 py-3 font-sans text-brand-dark focus:outline-none focus:border-brand-dark transition-colors peer resize-none" placeholder=" "></textarea>
                                    <label for="client-notes" class="absolute left-0 top-3 font-sans text-brand-charcoal/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-dark peer-valid:-top-4 peer-valid:text-xs peer-valid:text-brand-dark cursor-text">Notas o peticiones especiales (Opcional)</label>
                                </div>
                            </div>
                            <div class="mt-12 flex justify-between items-center border-t border-brand-sand/30 pt-8">
                                <button type="button" class="btn-prev text-brand-charcoal text-xs font-sans uppercase tracking-[0.2em] hover:text-brand-dark transition-colors focus:outline-none" data-target="3">Volver</button>
                                <button type="submit" id="confirm-booking-btn" class="bg-brand-dark text-brand-light px-10 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark/90 transition-all duration-300 focus:outline-none">Confirmar Reserva</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="w-full lg:w-1/3">
                <div class="sticky top-32 bg-brand-light/30 border border-brand-sand/30 p-8 flex flex-col h-fit shadow-sm">
                    <h4 class="font-sans text-xs uppercase tracking-widest text-brand-dark mb-8 border-b border-brand-sand/30 pb-4">Resumen de la Sesión</h4>
                    
                    <div id="summary-services" class="flex flex-col gap-6 mb-8 min-h-[4rem]">
                        <p class="font-sans text-sm text-brand-charcoal italic font-light">Aún no has seleccionado ningún servicio.</p>
                    </div>
                    
                    <div class="flex flex-col gap-3 mb-6 pt-6 border-t border-brand-sand/30 text-brand-dark font-sans text-sm">
                        <div class="flex justify-between items-center">
                            <span class="font-sans text-xs text-brand-charcoal">Fecha:</span>
                            <span id="summary-date" class="font-medium font-sans text-sm">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="font-sans text-xs text-brand-charcoal">Horario:</span>
                            <span id="summary-time" class="font-medium font-sans text-sm">-</span>
                        </div>
                        <div class="flex justify-between items-center mt-2 pb-4 border-b border-brand-sand/30">
                            <span class="font-sans text-xs text-brand-charcoal">Duración est.:</span>
                            <span id="summary-duration" class="font-medium font-sans text-sm">0 min</span>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-end pt-6 mt-auto">
                        <span class="font-sans text-xs uppercase tracking-widest text-brand-dark">Total a Invertir</span>
                        <span id="summary-total" class="font-serif text-3xl text-brand-dark">$0</span>
                    </div>
                </div>
            </div>

        </div>

        <div id="alert-modal" class="hidden fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[110] flex items-center justify-center p-6 opacity-0 transition-opacity duration-300">
            <div class="bg-brand-light max-w-sm w-full p-8 shadow-2xl text-center transform scale-95 transition-transform duration-300" id="alert-modal-content">
                <div class="w-12 h-12 rounded-full bg-brand-sand/20 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-6 h-6 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 class="font-serif text-2xl text-brand-dark mb-2">Aviso</h3>
                <p id="alert-modal-text" class="font-sans text-sm text-brand-charcoal mb-8"></p>
                <button type="button" id="close-alert-btn" class="w-full border border-brand-dark bg-brand-dark text-brand-light px-6 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-transparent hover:text-brand-dark transition-all duration-300 focus:outline-none">Entendido</button>
            </div>
        </div>

        <div id="booking-modal" class="hidden fixed inset-0 bg-brand-dark/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 opacity-0 transition-opacity duration-500">
            <div class="relative bg-brand-light max-w-lg w-full p-10 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] scale-95 transition-transform duration-500" id="modal-content">
                <button id="close-modal" class="absolute top-6 right-6 text-brand-charcoal hover:text-brand-dark transition-colors focus:outline-none" aria-label="Cerrar confirmación">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div class="text-center mb-10 pb-6 border-b border-brand-sand/30">
                    <h4 class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-3">Tu Momento en MUSE</h4>
                    <h2 class="font-serif text-4xl text-brand-dark italic">¡Reserva Confirmada!</h2>
                </div>
                <div id="modal-details" class="flex flex-col gap-6 font-sans text-brand-dark mb-8"></div>
                
                <div data-html2canvas-ignore="true" class="flex flex-col gap-4 justify-center border-t border-brand-sand/30 pt-10 mt-8 w-full max-w-sm mx-auto">
                    <button id="download-ticket" class="w-full border border-brand-dark px-6 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark hover:text-brand-light transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Descargar como Imagen
                    </button>
                    <a href="index.html" class="w-full bg-brand-dark text-brand-light px-6 py-4 text-xs font-sans uppercase tracking-[0.2em] hover:bg-brand-dark/90 transition-all duration-300 flex items-center justify-center focus:outline-none">
                        Volver al Inicio
                    </a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('close-alert-btn').addEventListener('click', hideCustomAlert);

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('categoria');
    const serviceParam = urlParams.get('servicio');
    const ritualParam = urlParams.get('ritual'); 

    // --- NUEVA LÓGICA DE PRECIOS PROMOCIONALES ---
    if (ritualParam && data.promotions) {
        const promo = data.promotions.find(r => r.id === ritualParam);
        
        if (promo && promo.includes) {
            // Limpiamos el texto del precio ("$3,200" -> 3200) para poder sumar/restar
            const numericPrice = parseInt(promo.price.replace(/[$,]/g, ''));
            
            // Guardamos el paquete aplicado
            bookingState.appliedPromo = { 
                id: promo.id, 
                name: promo.title, 
                price: numericPrice, 
                includedIds: promo.includes 
            };

            document.getElementById('ritual-message-container').classList.remove('hidden');
            document.getElementById('ritual-name-display').textContent = promo.title;

            // Agregamos todos los servicios incluidos al carrito
            promo.includes.forEach(serviceId => {
                const srvMatch = data.services.find(s => s.id === serviceId);
                if (srvMatch && !bookingState.selectedServices.some(s => s.id === srvMatch.id)) {
                    bookingState.selectedServices.push({
                        id: srvMatch.id, name: srvMatch.name, price: parseInt(srvMatch.price), duration: parseInt(srvMatch.duration)
                    });
                    bookingState.specialistsPerService[srvMatch.id] = { id: 'any', name: 'Cualquiera' };
                }
            });
            setTimeout(updateSummaryPanel, 100);
        }
    } 
    else if (serviceParam) {
        const serviceToAutoSelect = data.services.find(srv => srv.id === serviceParam);
        if (serviceToAutoSelect) {
            bookingState.selectedServices.push({
                id: serviceToAutoSelect.id, name: serviceToAutoSelect.name, price: parseInt(serviceToAutoSelect.price), duration: parseInt(serviceToAutoSelect.duration)
            });
            bookingState.specialistsPerService[serviceToAutoSelect.id] = { id: 'any', name: 'Cualquiera' };
            setTimeout(updateSummaryPanel, 100);
        }
    }

    const bookableServices = data.services.filter(srv => !srv.isVariablePrice);

    if (categoryParam) {
        const filteredServices = bookableServices.filter(srv => srv.category === categoryParam);
        renderServicesList(filteredServices, bookableServices);
        document.getElementById('step-1-title').textContent = `Servicios de ${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`;
        document.getElementById('show-all-services-container').classList.remove('hidden');
    } else {
        renderServicesList(bookableServices, null);
    }

    attachNavigationListeners();
    attachModalListeners();
};

const renderServicesList = (servicesToRender, allServicesArray) => {
    const listContainer = document.getElementById('services-list');
    
    const buildHTML = (array) => {
        return array.map(srv => {
            const isChecked = bookingState.selectedServices.some(s => s.id === srv.id);
            const inputCheckedAttribute = isChecked ? 'checked' : '';

            return `
                <label class="relative cursor-pointer block group has-[:checked]:bg-brand-dark has-[:checked]:border-brand-dark transition-all duration-300 border border-brand-sand/40 hover:border-brand-dark/50 bg-brand-light">
                    <input type="checkbox" name="services" value="${srv.id}" 
                           data-name="${srv.name}" data-price="${srv.price}" data-duration="${srv.duration}"
                           class="service-checkbox hidden" ${inputCheckedAttribute}>
                    
                    <div class="p-6 flex justify-between items-center">
                        <div class="flex flex-col pr-4">
                            <span class="font-sans text-base md:text-lg mb-1 text-brand-dark group-has-[:checked]:text-brand-light transition-colors duration-300">${srv.name}</span>
                            <span class="font-sans font-light text-xs md:text-sm line-clamp-1 text-brand-charcoal group-has-[:checked]:text-brand-light/70 transition-colors duration-300">${srv.description}</span>
                        </div>
                        <div class="flex items-center gap-4 flex-shrink-0 ml-4">
                            <span class="font-serif text-xl text-brand-dark group-has-[:checked]:text-brand-light flex-shrink-0 transition-colors duration-300">$${srv.price.toLocaleString('es-MX')}</span>
                            <div class="w-6 h-6 rounded-full border border-brand-charcoal/30 flex items-center justify-center group-has-[:checked]:border-brand-light group-has-[:checked]:bg-brand-light transition-all duration-300">
                                <svg class="w-3 h-3 text-brand-dark opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                    </div>
                </label>
            `;
        }).join('');
    };

    listContainer.innerHTML = buildHTML(servicesToRender);

    const btnShowAll = document.getElementById('btn-show-all');
    if (btnShowAll && allServicesArray) {
        const newBtn = btnShowAll.cloneNode(true);
        btnShowAll.parentNode.replaceChild(newBtn, btnShowAll);
        newBtn.addEventListener('click', () => {
            listContainer.innerHTML = buildHTML(allServicesArray);
            document.getElementById('step-1-title').textContent = "Todos los servicios disponibles";
            document.getElementById('show-all-services-container').classList.add('hidden');
            attachCheckboxListeners();
        });
    }

    const attachCheckboxListeners = () => {
        document.querySelectorAll('.service-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const el = e.target;
                const serviceData = { id: el.value, name: el.dataset.name, price: parseInt(el.dataset.price), duration: parseInt(el.dataset.duration) };

                if (el.checked) {
                    bookingState.selectedServices.push(serviceData);
                    bookingState.specialistsPerService[serviceData.id] = { id: 'any', name: 'Cualquiera' };
                } else {
                    bookingState.selectedServices = bookingState.selectedServices.filter(s => s.id !== serviceData.id);
                    delete bookingState.specialistsPerService[serviceData.id];
                }
                updateSummaryPanel();
            });
        });
    };
    attachCheckboxListeners();
};

const buildSpecialistsView = () => {
    const listContainer = document.getElementById('specialists-dynamic-list');
    const teamData = window.siteData.team;
    let html = '';

    bookingState.selectedServices.forEach(srv => {
        const capableTeam = teamData.filter(member => member.skills && member.skills.includes(srv.id));
        const options = [ { id: 'any', name: 'Cualquiera', role: 'Primer horario disponible', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=200' }, ...capableTeam ];
        const currentSelection = bookingState.specialistsPerService[srv.id].id;

        html += `
            <div class="flex flex-col">
                <h4 class="font-serif text-2xl text-brand-dark mb-4 border-b border-brand-sand/30 pb-2">Para ${srv.name}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${options.map(member => `
                        <label class="relative cursor-pointer block group has-[:checked]:bg-brand-dark has-[:checked]:border-brand-dark transition-all duration-300 border border-brand-sand/40 hover:border-brand-dark/50 bg-brand-light">
                            <input type="radio" name="spec_${srv.id}" value="${member.id}" data-service-id="${srv.id}" data-name="${member.name}" class="specialist-radio hidden" ${member.id === currentSelection ? 'checked' : ''}>
                            <div class="p-4 flex items-center gap-4">
                                <img src="${member.img}" alt="${member.name}" class="w-14 h-14 rounded-full object-cover grayscale-[50%] group-has-[:checked]:grayscale-0 transition-all duration-300">
                                <div class="flex flex-col flex-grow pr-4">
                                    <span class="font-sans text-sm text-brand-dark font-medium group-has-[:checked]:text-brand-light transition-colors duration-300">${member.name}</span>
                                    <span class="font-sans font-light text-xs text-brand-charcoal group-has-[:checked]:text-brand-light/70 transition-colors duration-300">${member.role}</span>
                                </div>
                                <div class="w-5 h-5 flex-shrink-0 ml-auto rounded-full border border-brand-charcoal/30 flex items-center justify-center group-has-[:checked]:border-brand-light group-has-[:checked]:bg-brand-light transition-all duration-300">
                                    <svg class="w-3 h-3 text-brand-dark opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;
    document.querySelectorAll('.specialist-radio').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                bookingState.specialistsPerService[e.target.dataset.serviceId] = { id: e.target.value, name: e.target.dataset.name };
                updateSummaryPanel();
            }
        });
    });
};

const initCalendarAndSlots = () => {
    if (typeof flatpickr !== "undefined" && !document.getElementById('booking-date')._flatpickr) {
        flatpickr("#booking-date", {
            locale: "es", minDate: "today", disable: [ function(date) { return (date.getDay() === 0); } ],
            onChange: function(selectedDates, dateStr, instance) {
                bookingState.date = dateStr;
                document.getElementById('summary-date').textContent = instance.formatDate(selectedDates[0], "l, j \\de F");
                bookingState.time = null; document.getElementById('summary-time').textContent = "-";
                generateTimeSlots(dateStr);
            }
        });
    }
};

const generateTimeSlots = (dateStr) => {
    const container = document.getElementById('time-slots-container');
    const data = window.siteData;
    const teamData = data.team;
    let totalDuration = bookingState.selectedServices.reduce((sum, srv) => sum + srv.duration, 0);
    const openHour = 10, closeHour = 19, intervalMins = 30; 
    let html = '';

    const isSessionFeasibleSecuencial = (startTimeSESION, serviceIndex, assignedSpecialists) => {
        if (serviceIndex === bookingState.selectedServices.length) return true;

        const currentService = bookingState.selectedServices[serviceIndex];
        const duracionesAnteriores = bookingState.selectedServices.slice(0, serviceIndex).reduce((sum, s) => sum + s.duration, 0);
        const totalMins = parseInt(startTimeSESION.split(':')[0]) * 60 + parseInt(startTimeSESION.split(':')[1]) + duracionesAnteriores;
        
        const hInSRV = Math.floor(totalMins / 60);
        const mInSRV = totalMins % 60;
        const hEndSRV = hInSRV + Math.floor((mInSRV + currentService.duration) / 60);
        const mEndSRV = (mInSRV + currentService.duration) % 60;

        const qualifiedFree = teamData.filter(member => {
            if (!member.skills || !member.skills.includes(currentService.id)) return false; 
            const dayAppointments = data.mockAppointments[dateStr] || {};
            for(let h = hInSRV; h < hEndSRV; h++) {
                for(let m = (h === hInSRV ? mInSRV : 0); m < (h === hEndSRV ? mEndSRV : 60); m += 30) {
                    if(dayAppointments[`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`] === member.id) return false; 
                }
            }
            return true; 
        });

        for (const specialist of qualifiedFree) {
            if (isSessionFeasibleSecuencial(startTimeSESION, serviceIndex + 1, [...assignedSpecialists, specialist.id])) return true; 
        }
        return false; 
    };

    for(let h = openHour; h < closeHour; h++) {
        for(let m = 0; m < 60; m += intervalMins) {
            const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            let isAvailable = true;
            const endHourSESION = Math.floor((h * 60 + m + totalDuration) / 60);
            const endMinSESION = (h * 60 + m + totalDuration) % 60;
            
            if (endHourSESION > closeHour || (endHourSESION === closeHour && endMinSESION > 0)) isAvailable = false;
            else if (!isSessionFeasibleSecuencial(timeStr, 0, [])) isAvailable = false;

            if(isAvailable) {
                const isSelectedTime = (bookingState.time === timeStr);
                const selectionClasses = isSelectedTime ? 'bg-brand-dark text-brand-light border-brand-dark' : 'text-brand-dark border-brand-sand/40';
                html += `<button type="button" class="time-slot-btn ${selectionClasses} border py-3 font-sans text-sm hover:border-brand-dark hover:bg-brand-dark hover:text-brand-light focus:outline-none transition-all duration-300 rounded-sm shadow-sm" data-time="${timeStr}">${timeStr}</button>`;
            } else {
                html += `<button type="button" disabled class="border border-brand-sand/20 py-3 font-sans text-sm text-brand-charcoal/30 bg-brand-light/50 cursor-not-allowed line-through rounded-sm">${timeStr}</button>`;
            }
        }
    }

    container.innerHTML = html;
    container.classList.remove('opacity-50', 'pointer-events-none');
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('bg-brand-dark', 'text-brand-light', 'border-brand-dark'));
            e.target.classList.add('bg-brand-dark', 'text-brand-light', 'border-brand-dark');
            bookingState.time = e.target.dataset.time;
            document.getElementById('summary-time').textContent = bookingState.time;
        });
    });
};

// 6. Actualizar el Panel Lateral (Ticket) - AHORA CON INTELIGENCIA DE PRECIOS
const updateSummaryPanel = () => {
    const summaryContainer = document.getElementById('summary-services');
    const summaryTotal = document.getElementById('summary-total');
    const summaryDuration = document.getElementById('summary-duration');

    if (bookingState.selectedServices.length === 0) {
        summaryContainer.innerHTML = `<p class="font-sans text-sm text-brand-charcoal italic font-light">Aún no has seleccionado ningún servicio.</p>`;
        summaryTotal.textContent = "$0";
        summaryDuration.textContent = "0 min";
        return;
    }

    // Verificamos si la promoción sigue activa (El usuario NO desmarcó ningún servicio del paquete)
    let isPromoActive = false;
    if (bookingState.appliedPromo) {
        const allIncluded = bookingState.appliedPromo.includedIds.every(id => 
            bookingState.selectedServices.some(s => s.id === id)
        );
        isPromoActive = allIncluded;
    }

    let totalVal = 0;
    let totalDur = 0;
    let html = '';

    // Agregamos una etiqueta arriba si hay promo
    if (isPromoActive) {
        html += `<div class="mb-4 pb-2 border-b border-brand-sand/30 flex justify-between items-center font-sans">
                    <span class="font-bold text-brand-dark text-xs uppercase tracking-widest inline-flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                        Paquete VIP Activo
                    </span>
                 </div>`;
    }

    bookingState.selectedServices.forEach(srv => {
        totalDur += srv.duration;
        
        const actualSpecialist = bookingState.actualAssignments[srv.id];
        const specialistSelection = bookingState.specialistsPerService[srv.id];
        
        let specialistNameToDisplay = 'Cualquiera';
        if (actualSpecialist) { specialistNameToDisplay = window.siteData.team.find(m => m.id === actualSpecialist).name; } 
        else if (specialistSelection && specialistSelection.id !== 'any') { specialistNameToDisplay = specialistSelection.name; }

        // Si el servicio es parte de la promo activa, mostramos "Incluido" y su precio tachado
        const isPartOfPromo = isPromoActive && bookingState.appliedPromo.includedIds.includes(srv.id);
        
        let priceHTML = '';
        if (isPartOfPromo) {
            priceHTML = `<span class="text-[10px] text-brand-charcoal/50 line-through mr-2">$${srv.price.toLocaleString('es-MX')}</span>
                         <span class="text-sm font-semibold text-brand-dark">Incluido</span>`;
        } else {
            totalVal += srv.price; // Solo sumamos el precio de los que NO son parte de la promo
            priceHTML = `$${srv.price.toLocaleString('es-MX')}`;
        }

        html += `
            <div class="flex justify-between items-start font-sans mb-3">
                <div class="flex flex-col pr-2">
                    <span class="font-medium text-brand-dark text-sm">${srv.name}</span>
                    <span class="text-xs text-brand-charcoal">con ${specialistNameToDisplay}</span>
                </div>
                <span class="font-serif text-lg text-brand-dark flex-shrink-0 ml-4 flex flex-col items-end leading-tight">${priceHTML}</span>
            </div>
        `;
    });

    // Sumamos el costo total del paquete si está activo
    if (isPromoActive) {
        totalVal += bookingState.appliedPromo.price;
        // Ocultamos el mensaje de alerta arriba si está todo bien, o lo mostramos si rompió el paquete
        document.getElementById('ritual-message-container').classList.remove('hidden');
    } else if (bookingState.appliedPromo) {
        document.getElementById('ritual-message-container').classList.add('hidden'); // Lo ocultamos si rompió el paquete
    }

    summaryContainer.innerHTML = html;
    summaryTotal.textContent = `$${totalVal.toLocaleString('es-MX')}`;
    const hours = Math.floor(totalDur / 60); const minutes = totalDur % 60;
    summaryDuration.textContent = hours > 0 ? `${hours}h ${minutes > 0 ? minutes + 'm' : ''}` : `${minutes}m`;
};

const attachNavigationListeners = () => {
    const changeStep = (targetStep) => {
        const currentStep = bookingState.step;
        if (currentStep === targetStep) return;
        if (targetStep === 2) buildSpecialistsView(); 
        if (targetStep === 3) initCalendarAndSlots(); 

        const currentView = document.getElementById(`step-${currentStep}`);
        const targetView = document.getElementById(`step-${targetStep}`);
        currentView.classList.remove('opacity-100'); currentView.classList.add('opacity-0');

        setTimeout(() => {
            currentView.classList.add('hidden'); targetView.classList.remove('hidden');
            setTimeout(() => { targetView.classList.remove('opacity-0'); targetView.classList.add('opacity-100'); }, 50);
            document.getElementById('progress-bar').style.width = `${(targetStep / 4) * 100}%`;

            document.querySelectorAll('.step-nav').forEach(nav => {
                const stepNum = parseInt(nav.dataset.step);
                if (stepNum <= targetStep) {
                    nav.classList.remove('text-brand-charcoal/50', 'cursor-not-allowed'); nav.classList.add('text-brand-dark'); nav.removeAttribute('disabled');
                } else {
                    nav.classList.add('text-brand-charcoal/50', 'cursor-not-allowed'); nav.classList.remove('text-brand-dark'); nav.setAttribute('disabled', 'true');
                }
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
        bookingState.step = targetStep;
    };

    document.querySelectorAll('.btn-next, .btn-prev').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = parseInt(e.target.dataset.target);
            if (target === 2 && bookingState.selectedServices.length === 0) return showCustomAlert("Por favor, selecciona al menos un servicio.");
            if (target === 4 && (!bookingState.date || !bookingState.time)) return showCustomAlert("Por favor, selecciona una fecha y un horario.");
            changeStep(target);
        });
    });
};

const attachModalListeners = () => {
    const confirmBtn = document.getElementById('confirm-booking-btn');
    const modal = document.getElementById('booking-modal');
    const modalContent = document.getElementById('modal-content');
    const modalScrollWrapper = document.getElementById('modal-scroll-wrapper');
    const closeModal = document.getElementById('close-modal');
    const downloadTicket = document.getElementById('download-ticket');
    const bookingForm = document.getElementById('booking-wizard');
    const data = window.siteData;
    const teamData = data.team;

    if(!confirmBtn) return;

    confirmBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const name = document.getElementById('client-name').value; const email = document.getElementById('client-email').value; const phone = document.getElementById('client-phone').value;

        if(!name || !email || !phone) return showCustomAlert("Por favor, completa los datos obligatorios (*).");

        confirmBtn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-brand-light inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Procesando...`;
        confirmBtn.disabled = true;

        const feasibleCombinations = [];

        const findAllFeasibleAssignments = (startTimeSESION, serviceIndex, assignedSpecialists) => {
            if (serviceIndex === bookingState.selectedServices.length) return feasibleCombinations.push(assignedSpecialists);
            const currentService = bookingState.selectedServices[serviceIndex];
            const duracionesAnteriores = bookingState.selectedServices.slice(0, serviceIndex).reduce((sum, s) => sum + s.duration, 0);
            const totalMins = parseInt(startTimeSESION.split(':')[0]) * 60 + parseInt(startTimeSESION.split(':')[1]) + duracionesAnteriores;
            const hInSRV = Math.floor(totalMins / 60); const mInSRV = totalMins % 60;
            const hEndSRV = hInSRV + Math.floor((mInSRV + currentService.duration) / 60); const mEndSRV = (mInSRV + currentService.duration) % 60;

            const qualifiedFree = teamData.filter(member => {
                if (!member.skills || !member.skills.includes(currentService.id)) return false; 
                const dayAppointments = data.mockAppointments[bookingState.date] || {};
                for(let h = hInSRV; h < hEndSRV; h++) {
                    for(let m = (h === hInSRV ? mInSRV : 0); m < (h === hEndSRV ? mEndSRV : 60); m += 30) {
                        if(dayAppointments[`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`] === member.id) return false; 
                    }
                }
                return true; 
            });

            let candidates = qualifiedFree;
            const userSelection = bookingState.specialistsPerService[currentService.id];
            if (userSelection && userSelection.id !== 'any') candidates = qualifiedFree.filter(m => m.id === userSelection.id);

            for (const specialist of candidates) findAllFeasibleAssignments(startTimeSESION, serviceIndex + 1, [...assignedSpecialists, specialist.id]);
        };

        findAllFeasibleAssignments(bookingState.time, 0, []);

        if (feasibleCombinations.length === 0) {
            console.error("Error asignando especialistas.");
            showCustomAlert("Hubo un error interno al asignar especialistas. Por favor, intenta de nuevo o llama al estudio.");
            confirmBtn.innerHTML = "Confirmar Reserva"; confirmBtn.disabled = false; return;
        }

        bookingState.actualAssignments = {};
        bookingState.selectedServices.forEach((srv, index) => {
            const userSelection = bookingState.specialistsPerService[srv.id];
            if (userSelection && userSelection.id !== 'any') {
                bookingState.actualAssignments[srv.id] = userSelection.id;
            } else {
                const viableSpecialistsAtThisTurn = feasibleCombinations.map(comb => comb[index]);
                const uniqueViable = [...new Set(viableSpecialistsAtThisTurn)];
                if (uniqueViable.length > 1) { bookingState.actualAssignments[srv.id] = uniqueViable[Math.floor(Math.random() * uniqueViable.length)]; } 
                else if (uniqueViable.length === 1) { bookingState.actualAssignments[srv.id] = uniqueViable[0]; }
            }
        });

        bookingState.client = { name, email, phone, notes: document.getElementById('client-notes').value };

        setTimeout(() => {
            renderModalDetails(); bookingForm.classList.add('hidden'); modal.classList.remove('hidden');
            setTimeout(() => { modal.classList.remove('opacity-0'); modalScrollWrapper.classList.remove('scale-95'); }, 50);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500); 
    });

    // RENDERIZAR TICKET FINAL (CON INTELIGENCIA DE PRECIOS VIP)
    const renderModalDetails = () => {
        const detailsContainer = document.getElementById('modal-details');
        
        let isPromoActive = false;
        if (bookingState.appliedPromo) {
            isPromoActive = bookingState.appliedPromo.includedIds.every(id => bookingState.selectedServices.some(s => s.id === id));
        }

        let totalVal = isPromoActive ? bookingState.appliedPromo.price : 0;
        let totalDur = 0;
        let servicesHTML = '';

        bookingState.selectedServices.forEach(srv => {
            totalDur += srv.duration;
            const actualSpecialist = window.siteData.team.find(m => m.id === bookingState.actualAssignments[srv.id]);
            
            const isPartOfPromo = isPromoActive && bookingState.appliedPromo.includedIds.includes(srv.id);
            let priceHTML = '';
            
            if (isPartOfPromo) {
                priceHTML = `<span class="text-[10px] text-brand-charcoal/50 line-through mr-1">$${srv.price.toLocaleString('es-MX')}</span>
                             <span class="text-sm font-semibold text-brand-dark">Incluido</span>`;
            } else {
                if(!isPromoActive) totalVal += srv.price;
                priceHTML = `$${srv.price.toLocaleString('es-MX')}`;
            }

            servicesHTML += `
                <div class="flex justify-between items-start text-brand-dark text-sm mb-3 font-sans border-b border-brand-sand/10 pb-2 last:border-0 last:pb-0">
                    <div class="flex flex-col pr-2 flex-grow">
                        <span class="font-medium text-brand-dark text-sm">${srv.name}</span>
                        <span class="text-[10px] uppercase tracking-widest text-brand-charcoal/80">con ${actualSpecialist.name}</span>
                    </div>
                    <span class="font-serif text-lg text-brand-dark flex-shrink-0 ml-4 flex flex-col items-end leading-tight">${priceHTML}</span>
                </div>
            `;
        });

        const totalHours = Math.floor(totalDur / 60); const totalMinutes = totalDur % 60;
        const durationStr = totalHours > 0 ? `${totalHours}h ${totalMinutes > 0 ? totalMinutes + 'm' : ''}` : `${totalMinutes}m`;

    detailsContainer.innerHTML = `
            <div class="flex flex-col gap-1 text-center md:text-left">
                <p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-1">Para el cliente</p>
                <p class="font-serif text-3xl text-brand-dark">${bookingState.client.name}</p>
                <p class="font-sans font-light text-sm text-brand-charcoal/80">${bookingState.client.email}</p>
            </div>
            
            <div class="border-t border-brand-sand/30 pt-6 mt-2 flex flex-col md:flex-row gap-8 justify-between">
                <div class="flex flex-col gap-1 text-center md:text-left">
                    <p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-1">Tu cita</p>
                    <p class="font-serif text-3xl text-brand-dark">${bookingState.date}</p>
                    <p class="font-sans font-light text-xl text-brand-dark">a las ${bookingState.time}</p>
                </div>
                <div class="flex-shrink-0 flex-col gap-2 text-center md:text-right border-l md:border-l-0 pl-6 md:pl-0 border-brand-sand/30">
                    <p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal">Duración est.</p>
                    <p class="font-sans font-medium text-sm text-brand-dark">${durationStr}</p>
                    <p class="font-sans text-xs uppercase tracking-widest text-brand-dark mt-4">Inversión Total</p>
                    <p class="font-serif text-4xl text-brand-dark">$${totalVal.toLocaleString('es-MX')}</p>
                </div>
            </div>

            <div class="border-t border-brand-sand/30 pt-6 mt-2">
                <div class="flex items-center mb-4">
                    <p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal m-0">
                        Detalle de Servicios
                    </p>
                    ${isPromoActive ? `<span class="font-sans text-xs uppercase tracking-widest text-brand-dark font-medium ml-2">- VIP: ${bookingState.appliedPromo.name}</span>` : ''}
                </div>
                ${servicesHTML}
            </div>

            ${bookingState.client.notes ? `<div class="border-t border-brand-sand/30 pt-6 mt-2"><p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal mb-2">Notas Especiales</p><p class="font-sans font-light text-sm italic text-brand-charcoal/80">${bookingState.client.notes}</p></div>` : ''}

            <div class="mt-8 p-5 bg-brand-sand/10 border-l-2 border-brand-dark text-brand-charcoal text-sm font-sans leading-relaxed text-left">
                <p><strong class="font-medium text-brand-dark">Nota importante:</strong> Te pedimos llegar con 15 minutos de anticipación. Para poder garantizar la calidad y el tiempo de tu experiencia, pasados esos 15 minutos de tolerancia, la cita será cancelada automáticamente.</p>
            </div>
        `;
    };

    const close = () => { modal.classList.add('opacity-0'); modalScrollWrapper.classList.add('scale-95'); setTimeout(() => { modal.classList.add('hidden'); window.location.href = 'index.html'; }, 500); };
    closeModal.addEventListener('click', close); window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }); modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

    downloadTicket.addEventListener('click', () => {
        downloadTicket.disabled = true; downloadTicket.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-brand-dark inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generando Imagen...`;
        setTimeout(() => {
            html2canvas(document.getElementById('modal-content'), { backgroundColor: '#FAF9F6', scale: 3, useCORS: true, logging: false, scrollY: -window.scrollY, windowWidth: 1024, onclone: (clonedDoc) => {
                clonedDoc.querySelectorAll('[data-html2canvas-ignore="true"]').forEach(el => el.style.display = 'none');
                const clonedContent = clonedDoc.getElementById('modal-content');
                clonedContent.style.maxHeight = 'none'; clonedContent.style.height = 'auto'; clonedContent.style.overflow = 'visible'; clonedContent.style.width = '800px'; clonedContent.style.padding = '48px'; 
            }}).then(canvas => {
                const link = document.createElement('a'); link.href = canvas.toDataURL("image/png");
                link.download = `MUSE_Ticket_${bookingState.client.name.split(' ')[0] || 'Cliente'}.png`; link.click();
                downloadTicket.disabled = false; downloadTicket.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Descargar como Imagen`;
            }).catch(error => { showCustomAlert("Hubo un error al generar la imagen. Intenta tomar una captura de pantalla manual."); downloadTicket.disabled = false; downloadTicket.innerHTML = `Reintentar descarga`; });
        }, 300); 
    });
};