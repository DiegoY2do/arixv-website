// js/components/testimonials.js
const renderTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials');
    const testimonialsData = window.siteData.testimonials;

    // 1. Generamos los Dots
    const dotsHTML = testimonialsData.map((_, index) => `
        <button class="w-2 h-2 rounded-full bg-brand-charcoal transition-all duration-300 focus:outline-none test-dot ${index === 0 ? 'opacity-100 scale-125' : 'opacity-30'}" data-index="${index}"></button>
    `).join('');

    // 2. Generamos las Tarjetas
    const cardsHTML = testimonialsData.map(testimonial => `
        <div class="test-card flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center bg-brand-light border border-brand-sand/30 p-10 md:p-12 relative group hover:border-brand-dark transition-colors duration-500 flex flex-col justify-between">
            
            <span class="absolute top-4 left-6 font-serif text-[8rem] leading-none text-brand-sand/20 group-hover:text-brand-sand/40 transition-colors duration-500 select-none">
                "
            </span>
            
            <div class="relative z-10 mb-10 mt-6">
                <p class="font-sans text-brand-charcoal font-light leading-relaxed text-base">
                    ${testimonial.text}
                </p>
            </div>
            
            <div class="flex items-center gap-4 border-t border-brand-sand/30 pt-6 mt-auto">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full object-cover grayscale-[30%]">
                <div>
                    <h4 class="font-serif text-lg text-brand-dark leading-none mb-1">${testimonial.name}</h4>
                    <p class="font-sans text-xs uppercase tracking-widest text-brand-charcoal opacity-70">
                        ${testimonial.service}
                    </p>
                </div>
            </div>
        </div>
    `).join('');

    testimonialsSection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full px-6 lg:px-12">
            
            <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-24">
                <div class="w-full md:w-2/3">
                    <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">Voces Reales</p>
                    <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark">Lo que dicen <br class="hidden md:block"/>nuestras musas</h2>
                </div>
                <div class="w-full md:w-1/3 flex md:justify-end">
                    <div class="w-16 h-[1px] bg-brand-charcoal mb-2"></div>
                </div>
            </div>

            <div class="relative w-full">
                <div id="test-track" class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide lg:!overflow-visible lg:justify-between scroll-smooth">
                    ${cardsHTML}
                </div>
            </div>
            
            <div class="flex justify-center gap-4 mt-8 lg:hidden">
                ${dotsHTML}
            </div>
            
        </div>
    `;

    // 3. Lógica de Interacción
    const track = document.getElementById('test-track');
    const dots = document.querySelectorAll('.test-dot');
    const cards = document.querySelectorAll('.test-card');

    // Novedad: Lógica para ocultar el dot sobrante en Tablets
    const adjustDotsForScreenSize = () => {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        if (dots.length > 0) {
            // Si es tablet (caben 2 tarjetas), la última tarjeta nunca estará alineada a la izquierda.
            // Ocultamos el último punto para que solo haya 2 "paradas".
            dots[dots.length - 1].style.display = isTablet ? 'none' : 'block';
        }
    };

    const updateDots = (activeIndex) => {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.remove('opacity-30');
                dot.classList.add('opacity-100', 'scale-125');
            } else {
                dot.classList.add('opacity-30');
                dot.classList.remove('opacity-100', 'scale-125');
            }
        });
    };

    track.addEventListener('scroll', () => {
        if (window.innerWidth >= 1024) return;

        let activeIndex = 0;
        let minDistance = Infinity;
        const trackRect = track.getBoundingClientRect();

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(cardRect.left - trackRect.left);
            
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });

        updateDots(activeIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const cardToScroll = cards[index];
            const scrollPosition = cardToScroll.offsetLeft - track.offsetLeft;
            
            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });

    // Ejecutamos la validación de tamaño al iniciar y al redimensionar la ventana
    adjustDotsForScreenSize();
    window.addEventListener('resize', adjustDotsForScreenSize);
};