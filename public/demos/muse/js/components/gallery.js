// js/components/gallery.js
const renderGallery = () => {
    const gallerySection = document.getElementById('gallery');
    const images = window.siteData.gallery;

    // 1. Inyectamos la estructura base (Cambiamos las clases del contenedor por Grid Mosaico)
    gallerySection.innerHTML = `
        <div class="max-w-7xl mx-auto w-full">
            <div class="text-center mb-12 md:mb-16 flex flex-col items-center">
                <p class="font-sans text-brand-dark uppercase tracking-[0.2em] text-sm mb-4">Nuestro Trabajo</p>
                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-8">Galería</h2>
                <div class="w-16 h-[1px] bg-brand-charcoal mb-10"></div>
                
                <div class="flex flex-wrap justify-center gap-4 md:gap-8 font-sans text-xs uppercase tracking-widest">
                    <button class="filter-btn active text-brand-dark border-b border-brand-dark pb-1 transition-all" data-filter="all">Todos</button>
                    <button class="filter-btn text-brand-charcoal opacity-60 hover:opacity-100 pb-1 transition-all" data-filter="cabello">Cabello</button>
                    <button class="filter-btn text-brand-charcoal opacity-60 hover:opacity-100 pb-1 transition-all" data-filter="uñas">Uñas</button>
                    <button class="filter-btn text-brand-charcoal opacity-60 hover:opacity-100 pb-1 transition-all" data-filter="pestañas">Pestañas</button>
                </div>
            </div>

            <div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[160px] md:auto-rows-[220px] lg:auto-rows-[280px] grid-flow-dense w-full"></div>
        </div>
        <div id="lightbox-container"></div>
    `;

    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightboxContainer = document.getElementById('lightbox-container');

    let currentFilteredImages = [];
    let currentImageIndex = 0;

    // 2. Funciones del Lightbox Avanzado
    const openLightbox = (index) => {
        currentImageIndex = index;
        const imgData = currentFilteredImages[currentImageIndex];

        lightboxContainer.innerHTML = `
            <div id="lightbox-overlay" class="fixed inset-0 z-[100] bg-brand-dark/95 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300">
                
                <button id="lightbox-close" class="absolute top-6 right-6 lg:top-10 lg:right-10 text-brand-light/70 hover:text-brand-light transition-colors p-2 focus:outline-none z-50">
                    <svg class="w-10 h-10 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <button id="lightbox-prev" class="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 text-brand-light/50 hover:text-brand-light transition-colors p-4 focus:outline-none z-50">
                    <svg class="w-10 h-10 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <button id="lightbox-next" class="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 text-brand-light/50 hover:text-brand-light transition-colors p-4 focus:outline-none z-50">
                    <svg class="w-10 h-10 stroke-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path></svg>
                </button>

                <div class="relative w-full max-w-4xl max-h-[85vh] px-8 lg:px-24 flex flex-col items-center justify-center">
                    <img src="${imgData.src}" alt="${imgData.alt}" id="lightbox-img" class="max-w-full max-h-[75vh] object-contain shadow-2xl scale-95 transition-all duration-300">
                    <p id="lightbox-caption" class="text-brand-light/80 font-sans font-light text-sm mt-6 text-center">
                        ${imgData.alt}
                    </p>
                </div>
            </div>
        `;

        setTimeout(() => {
            const overlay = document.getElementById('lightbox-overlay');
            const img = document.getElementById('lightbox-img');
            
            overlay.classList.remove('opacity-0');
            img.classList.remove('scale-95');
            img.classList.add('scale-100');
            document.body.classList.add('overflow-hidden');

            document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
            document.getElementById('lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
            document.getElementById('lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });
            
            overlay.addEventListener('click', (e) => {
                if(e.target === overlay) closeLightbox();
            });
            document.addEventListener('keydown', handleKeyboard);
        }, 10);
    };

    const navigateLightbox = (direction) => {
        currentImageIndex = (currentImageIndex + direction + currentFilteredImages.length) % currentFilteredImages.length;
        const newImgData = currentFilteredImages[currentImageIndex];
        const imgElement = document.getElementById('lightbox-img');
        const captionElement = document.getElementById('lightbox-caption');

        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = newImgData.src;
            imgElement.alt = newImgData.alt;
            captionElement.textContent = newImgData.alt;
            imgElement.style.opacity = 1;
        }, 200); 
    };

    const closeLightbox = () => {
        const overlay = document.getElementById('lightbox-overlay');
        const img = document.getElementById('lightbox-img');

        overlay.classList.add('opacity-0');
        img.classList.remove('scale-100');
        img.classList.add('scale-95');

        setTimeout(() => {
            lightboxContainer.innerHTML = ''; 
            document.body.classList.remove('overflow-hidden'); 
            document.removeEventListener('keydown', handleKeyboard);
        }, 300); 
    };

    const handleKeyboard = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    };

    // 3. Lógica para renderizar imágenes
    const renderImages = (filter) => {
        galleryGrid.style.opacity = 0;
        
        setTimeout(() => {
            currentFilteredImages = filter === 'all' 
                ? images 
                : images.filter(img => img.category === filter);

            galleryGrid.innerHTML = currentFilteredImages.map((img, index) => {
                // EL CEREBRO DEL MOSAICO: 
                // Asignamos proporciones de forma dinámica según su orden para que luzca desordenado pero perfecto
                let spanClasses = 'col-span-1 row-span-1'; // Tamaño base
                
                if (index === 0 || index % 7 === 0) {
                    spanClasses = 'col-span-2 row-span-2'; // Bloque Gigante
                } else if (index % 4 === 0) {
                    spanClasses = 'col-span-1 row-span-2'; // Bloque Vertical Alto
                } else if (index % 5 === 0) {
                    spanClasses = 'col-span-2 row-span-1'; // Bloque Horizontal Ancho
                }

                return `
                <div class="relative group overflow-hidden bg-brand-sand/20 cursor-pointer gallery-item ${spanClasses}" data-index="${index}">
                    <div class="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                        <span class="text-brand-light font-sans text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            Ver detalle
                        </span>
                    </div>
                    <img src="${img.src}" alt="${img.alt}" class="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out" loading="lazy">
                </div>
                `;
            }).join('');
            
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', () => {
                    openLightbox(parseInt(item.dataset.index));
                });
            });

            galleryGrid.style.opacity = 1;
        }, 300);
    };

    // 4. Lógica de los botones de filtro
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'text-brand-dark', 'border-b', 'border-brand-dark');
                b.classList.add('text-brand-charcoal', 'opacity-60');
            });

            const target = e.target;
            target.classList.remove('text-brand-charcoal', 'opacity-60');
            target.classList.add('active', 'text-brand-dark', 'border-b', 'border-brand-dark');

            renderImages(target.dataset.filter);
        });
    });

    galleryGrid.style.transition = 'opacity 0.3s ease-in-out';
    renderImages('all');
};